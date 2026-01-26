import { tables } from '~~/server/middleware/db'
import { like } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const hash = event.context.params?.hash
    
    if (!hash) {
      throw createError({
        statusCode: 400,
        message: 'Hash is required'
      })
    }

    const bucket = event.context.cloudflare.env.STORAGE
    
    if (!bucket) {
      throw createError({
        statusCode: 500,
        message: 'Storage not configured'
      })
    }

    const { db } = event.context

    if (!db) {
      throw createError({
        statusCode: 500,
        message: 'Database not available'
      })
    }

    // Get asset from database using the hash as filename (without extension)
  // Hash format is now: combinedHash.extension (perceptual hash + timestamp combined)
    const assets = await db.select()
      .from(tables.assets)
      .where(like(tables.assets.fileName, `${hash}.%`))

    const asset = assets[0]

    if (!asset) {
      throw createError({
        statusCode: 404,
        message: 'Asset not found'
      })
    }

    // Use the asset filename directly as storage path
    const storagePath = `assets/images/${asset.fileName}`
    
    // Get the file from R2 storage
    const object = await bucket.get(storagePath)
    
    if (!object) {
      throw createError({
        statusCode: 404,
        message: 'File not found in storage'
      })
    }

    // Set appropriate headers
    setHeader(event, 'Content-Type', asset.mimeType || 'image/jpeg')
    setHeader(event, 'Content-Length', asset.fileSize)
    setHeader(event, 'Cache-Control', 'public, max-age=31536000') // Cache for 1 year
    setHeader(event, 'ETag', `"${hash}"`)
    
    // Return the file stream
    return object.body

  } catch (error) {
    console.error('[Storage] Error serving file:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Error serving file'
    })
  }
})