import { handleError } from '~~/server/utils/error'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { getImageBasePath } from '~~/shared/utils/imageTools'
import { customAlphabet } from 'nanoid'

// Create nanoid with lowercase alphabet only to avoid case conflicts
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12)

// Simple perceptual hash function for generating unique filenames
function generatePerceptualHash(buffer: Uint8Array): string {
  let hash = 0
  for (let i = 0; i < Math.min(buffer.length, 1000); i++) {
    const char = buffer[i]
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

export default defineEventHandler(async (event) => {
  try {
    const contentType = getHeader(event, 'content-type')
    let path: string
    let filename: string
    let fileContentType: string
    let generateSizes: boolean = false
    let target: string = 'default'
    let aiGenerated: boolean = false
    let originalName: string = ''
    let imageBuffer: Buffer

    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData uploads (from frontend)
      const formData = await readMultipartFormData(event)
      if (!formData) {
        throw createError({
          statusCode: 400,
          statusMessage: 'No form data received'
        })
      }

      const files = formData.filter(item => item.type && item.type.startsWith('image/'))
      if (files.length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'No image files found in form data'
        })
      }
      
      path = formData.find(item => item.name === 'path')?.data?.toString() || 'uploads'
      generateSizes = formData.find(item => item.name === 'generateSizes')?.data?.toString() === 'true'
      target = formData.find(item => item.name === 'target')?.data?.toString() || 'default'
      aiGenerated = formData.find(item => item.name === 'aiGenerated')?.data?.toString() === 'true'
      originalName = formData.find(item => item.name === 'originalName')?.data?.toString() || ''
      
      // Use the first file for processing
      const file = files[0]
      // Use the original filename from the file
      filename = file.filename || 'unknown'
      fileContentType = file.type || 'image/png'
      
      // Convert file data to Buffer
      if (!file.data) {
        throw createError({
          statusCode: 400,
          statusMessage: 'No file data received'
        })
      }
      imageBuffer = Buffer.from(file.data)
    } else {
      // Handle binary data (from server-side)
      const query = getQuery(event)
      path = String(query.path || 'uploads')
      generateSizes = String(query.generateSizes) === 'true'
      target = String(query.target || 'default')
      aiGenerated = String(query.aiGenerated) === 'true'
      originalName = String(query.originalName || '')
      filename = query.filename ? String(query.filename) : '' // Allow empty filename
      fileContentType = contentType || 'image/png'
      
      if (!path) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Path is required for binary uploads'
        })
      }
      
      // Read the raw body as buffer
      const rawBody = await readRawBody(event)
      if (!rawBody) {
        throw createError({
          statusCode: 400,
          statusMessage: 'No image data received'
        })
      }

      // Convert raw body to Buffer
      if (Buffer.isBuffer(rawBody)) {
        imageBuffer = rawBody
      } else if (typeof rawBody === 'string') {
        // If it's a string (base64 data), convert to Buffer
        imageBuffer = Buffer.from(rawBody, 'base64')
      } else if (rawBody && typeof rawBody === 'object' && 'byteLength' in rawBody) {
        // If it's an ArrayBuffer or similar, convert to Buffer
        imageBuffer = Buffer.from(rawBody as any)
      } else {
        // If it's a Uint8Array or similar
        imageBuffer = Buffer.from(rawBody as any)
      }
    }

    // Create Sharp instance from the image buffer
    const sharpImage = sharp(imageBuffer)
    const metadata = await sharpImage.metadata()

    if (!metadata.width || !metadata.height) {
      throw createError({
        statusCode: 400,
        message: 'Invalid image: could not determine dimensions'
      })
    }

    // Generate perceptual hash for content identification
    const hash = generatePerceptualHash(new Uint8Array(imageBuffer))
    
    // Generate unique filename using nanoid (12 characters, lowercase only)
    const uniqueId = nanoid()

    // Get S3/R2 configuration from runtime config
    const config = useRuntimeConfig()
    const s3Url = config.s3Url
    const s3KeyId = config.s3KeyId
    const s3AccessKey = config.s3AccessKey
    const s3BucketName = config.s3BucketName

    if (!s3Url || !s3KeyId || !s3AccessKey || !s3BucketName) {
      throw createError({
        statusCode: 500,
        message: 'S3 configuration not complete'
      })
    }

    // Initialize S3 client for Cloudflare R2
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: s3Url,
      credentials: {
        accessKeyId: s3KeyId,
        secretAccessKey: s3AccessKey,
      },
    })

    if (generateSizes && (fileContentType.startsWith('image/'))) {
      // Get image metadata
      const originalWidth = metadata.width || 0
      const originalHeight = metadata.height || 0
      
      // Generate filename using nanoid for consistency
      const baseFilename = `${uniqueId}.webp`
      const fileExtension = baseFilename.split('.').pop() || 'webp'
      const filenameWithoutExt = baseFilename.replace(`.${fileExtension}`, '')
      
      // Define size configurations
      const sizes = [
        { suffix: 'xs', width: 150, height: 150 },
        { suffix: 'sm', width: 300, height: 300 },
        { suffix: 'md', width: 600, height: 600 },
        { suffix: 'lg', width: 1200, height: 1200 },
        { suffix: 'full', width: originalWidth, height: originalHeight }, // Full size in WebP
        { suffix: 'raw', width: originalWidth, height: originalHeight } // Original format
      ]

      const uploadedFiles = []

      // Process each size
      for (const size of sizes) {
        // For raw and full size, use original dimensions
        let newWidth, newHeight
        if (size.suffix === 'raw' || size.suffix === 'full') {
          newWidth = originalWidth
          newHeight = originalHeight
        } else {
          // Calculate new dimensions maintaining aspect ratio
          const aspectRatio = originalWidth / originalHeight
          
          // Start with target size
          newWidth = size.width
          newHeight = size.height

          if (originalWidth > originalHeight) {
            newHeight = Math.round(newWidth / aspectRatio)
          } else {
            newWidth = Math.round(newHeight * aspectRatio)
          }

          // Never upscale - if calculated size is larger than original, use original size
          if (newWidth > originalWidth || newHeight > originalHeight) {
            newWidth = originalWidth
            newHeight = originalHeight
          }
        }

        // Process based on size type
        let processedBuffer: Buffer
        let finalContentType: string
        let finalExtension: string
        
        if (size.suffix === 'raw') {
          // Keep original file as-is, no conversion
          processedBuffer = imageBuffer
          finalContentType = fileContentType
          // Get original file extension from content type or filename
          if (filename && filename.includes('.')) {
            finalExtension = filename.split('.').pop() || 'png'
          } else {
            // Map content type to extension
            const extensionMap: Record<string, string> = {
              'image/jpeg': 'jpg',
              'image/jpg': 'jpg', 
              'image/png': 'png',
              'image/gif': 'gif',
              'image/webp': 'webp',
              'image/bmp': 'bmp',
              'image/tiff': 'tiff'
            }
            finalExtension = extensionMap[fileContentType] || 'png'
          }
        } else {
          // Convert to WebP (including 'full' size)
          processedBuffer = await sharpImage
            .resize(newWidth, newHeight)
            .webp()
            .toBuffer()
          finalContentType = 'image/webp'
          finalExtension = 'webp'
        }

        // Create path with size folder instead of filename suffix
        const sizedFilename = `${filenameWithoutExt}.${finalExtension}`
        
        // Construct base path based on target using shared function
        const basePath = getImageBasePath(target);
        
        const sizedPath = `${basePath}/${size.suffix}/${sizedFilename}`

        // Upload to S3/R2
        const uploadCommand = new PutObjectCommand({
          Bucket: s3BucketName,
          Key: sizedPath,
          Body: processedBuffer,
          ContentType: finalContentType,
        })

        await s3Client.send(uploadCommand)
        uploadedFiles.push({
          size: size.suffix,
          path: sizedPath,
          width: newWidth,
          height: newHeight
        })
      }

      // Save asset record using asset table endpoint
      const user = event.context.user
      let assetId = null;
      if (user?.id) {
        try {
          // Build metadata with all size dimensions
          const sizesMetadata = uploadedFiles.map(file => ({
            size: file.size,
            path: file.path,
            width: file.width,
            height: file.height
          }));

          const assetData = {
            userId: user.id,
            fileName: baseFilename,
            originalName: originalName || filename || baseFilename,
            description: null, // Can be set later by user
            mimeType: fileContentType, // Original file type
            fileSize: imageBuffer.length, // Original file size
            width: originalWidth,
            height: originalHeight,
            assetType: 'image',
            source: aiGenerated ? 'generate' : 'upload',
            target: target,
            hash: hash,
            aiGenerated: aiGenerated,
            isPublic: false,
            metadata: {
              sizes: sizesMetadata
            }
          }

          const assetResponse = await $fetch('/api/v2/assets/create', {
            method: 'POST',
            body: assetData,
            headers: {
              'Authorization': getHeader(event, 'authorization') || '',
              'Cookie': getHeader(event, 'cookie') || ''
            }
          })
          
          assetId = (assetResponse?.data as any)?.id || null;
          console.log('[Upload] Asset created with ID:', assetId);
        } catch (dbError) {
          console.error('[Upload] Asset creation error:', dbError)
          // Continue execution even if asset creation fails
        }
      }

      return {
        success: true,
        message: 'Images uploaded and resized successfully',
        data: {
          path: path,
          fileName: baseFilename,
          sizes: uploadedFiles,
          originalDimensions: {
            width: originalWidth,
            height: originalHeight
          },
          hash: hash,
          method: 'sharp_resize',
          assetId: assetId
        }
      }
    } else {
      // Single file upload without resizing - keep original format
      const originalWidth = metadata.width || 0
      const originalHeight = metadata.height || 0
      
      // Keep original file as-is, no conversion
      const processedBuffer = imageBuffer
      
      // Get original file extension from content type or filename
      let finalExtension: string
      if (filename && filename.includes('.')) {
        finalExtension = filename.split('.').pop() || 'png'
      } else {
        // Map content type to extension
        const extensionMap: Record<string, string> = {
          'image/jpeg': 'jpg',
          'image/jpg': 'jpg', 
          'image/png': 'png',
          'image/gif': 'gif',
          'image/webp': 'webp',
          'image/bmp': 'bmp',
          'image/tiff': 'tiff'
        }
        finalExtension = extensionMap[fileContentType] || 'png'
      }
      
      const finalFilename = `${uniqueId}.${finalExtension}`
      
      // Construct base path based on target using shared function
      const basePath = getImageBasePath(target);
      const finalPath = `${basePath}/${finalFilename}`

      const uploadCommand = new PutObjectCommand({
        Bucket: s3BucketName,
        Key: finalPath,
        Body: processedBuffer,
        ContentType: fileContentType,
      })

      await s3Client.send(uploadCommand)

      // Save asset record using asset table endpoint
      const user = event.context.user
      let assetId = null;
      if (user?.id) {
        try {
          const assetData = {
            userId: user.id,
            fileName: finalFilename,
            originalName: originalName || filename || finalFilename,
            description: null, // Can be set later by user
            mimeType: fileContentType,
            fileSize: imageBuffer.length,
            width: metadata.width || null,
            height: metadata.height || null,
            assetType: 'image',
            source: aiGenerated ? 'generate' : 'upload',
            target: target,
            hash: hash,
            aiGenerated: aiGenerated,
            isPublic: false
          }

          const assetResponse = await $fetch('/api/v2/assets/create', {
            method: 'POST',
            body: assetData,
            headers: {
              'Authorization': getHeader(event, 'authorization') || '',
              'Cookie': getHeader(event, 'cookie') || ''
            }
          })
          
          assetId = (assetResponse?.data as any)?.id || null;
          console.log('[Upload] Asset created with ID:', assetId);
        } catch (dbError) {
          console.error('[Upload] Asset creation error:', dbError)
          // Continue execution even if asset creation fails
        }
      }

      // Construct full URL using asset URL
      const fullUrl = `${config.public.assetUrl}/${finalPath}`

      return {
        success: true,
        message: 'File uploaded successfully',
        data: {
          path: finalPath,
          fileName: finalFilename,
          size: imageBuffer.length,
          contentType: fileContentType,
          hash: hash,
          assetId: assetId,
          width: originalWidth,
          height: originalHeight,
          mimeType: fileContentType,
          url: fullUrl
        }
      }
    }
  } catch (error: any) {
    console.error('[Upload] Error:', error)
    return handleError(error, 'upload')
  }
})