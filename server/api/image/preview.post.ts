import { generateDesignPreviews } from '~~/shared/utils/designPreview'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { designId, pageNumber, generateThumbnail } = body || {}

    if (!designId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Design ID is required'
      })
    }

    if (!event.context.db) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Database context is not initialized'
      })
    }

    const result = await generateDesignPreviews(designId, pageNumber, event.context.db)

    if (!result.success) {
      const errorDetails = result.results && result.results.length > 0 
        ? result.results.map((r: any) => r.error).filter(Boolean).join('; ')
        : 'No details available'
      
      return {
        success: false,
        designId,
        pageNumber: pageNumber || 'all',
        results: result.results,
        message: `Failed to generate previews: ${errorDetails}`
      }
    }

    let thumbnailUrl = null
    let imageData = null

    if (generateThumbnail && result.results && result.results.length > 0) {
      const firstResult = result.results[0]
      
      if (!firstResult.success) {
        return {
          success: false,
          designId,
          pageNumber: pageNumber || 'all',
          results: result.results,
          message: `Failed to generate preview: ${firstResult.error || 'Unknown error'}`
        }
      }
      
      if (!firstResult.imageBuffer) {
        return {
          success: false,
          designId,
          pageNumber: pageNumber || 'all',
          results: result.results,
          message: 'No image buffer generated'
        }
      }
      
      try {
        const uploadResult = await $fetch(`/api/storage/upload?target=template-thumbnail&generateSizes=true`, {
          method: 'POST',
          headers: {
            'Content-Type': 'image/webp',
          },
          body: firstResult.imageBuffer.toString('base64'),
        })

        if (uploadResult.success && uploadResult.data) {
          if (uploadResult.data.sizes && Array.isArray(uploadResult.data.sizes)) {
            const mdSize = uploadResult.data.sizes.find((s: any) => s.size === 'md')
            if (mdSize && mdSize.path) {
              thumbnailUrl = mdSize.path.split('/').pop() || ''
            }
          } else if (uploadResult.data.path) {
            thumbnailUrl = uploadResult.data.path.split('/').pop() || ''
          }
        }
        
        if (!thumbnailUrl) {
          return {
            success: false,
            designId,
            pageNumber: pageNumber || 'all',
            results: result.results,
            message: 'Failed to get thumbnail URL from upload response'
          }
        }
      } catch (uploadError) {
        return {
          success: false,
          designId,
          pageNumber: pageNumber || 'all',
          results: result.results,
          message: `Failed to upload thumbnail: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`
        }
      }
    } else if (!generateThumbnail && result.results && result.results.length > 0) {
      const firstResult = result.results[0]
      
      if (firstResult.success && firstResult.imageBuffer) {
        imageData = firstResult.imageBuffer.toString('base64')
      }
    }

    return {
      success: true,
      designId,
      pageNumber: pageNumber || 'all',
      results: result.results,
      thumbnailUrl,
      imageData,
      message: `Successfully generated ${result.results.filter((r: any) => r.success).length} preview(s)${thumbnailUrl ? ' and uploaded thumbnail' : ''}`
    }
  } catch (error) {
    console.error('Preview generation error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Failed to generate preview'
    })
  }
})