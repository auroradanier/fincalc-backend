import { handleError } from '~~/server/utils/error'

export default defineEventHandler(async (event) => {
  try {
    const { prefix } = getQuery(event)
    
    if (!prefix) {
      throw createError({
        statusCode: 400,
        message: 'Prefix is required'
      })
    }

    const bucket = event.context.cloudflare.env.STORAGE
    if (!bucket) {
      throw createError({
        statusCode: 500,
        message: 'Storage not configured'
      })
    }

    console.log('[List] Listing files with prefix:', prefix)

    // List objects from R2
    const listed = await bucket.list({
      prefix,
      limit: 1000,  // Max allowed by R2
      delimiter: '/' // To group by directory
    })

    console.log('[List] Found files:', listed.objects.length)
    
    return {
      success: true,
      data: {
        files: listed.objects.map(obj => obj.key),
        truncated: listed.truncated,
        cursor: listed.cursor
      }
    }

  } catch (error) {
    console.error('[List] Error:', error)
    return handleError(error, 'Failed to list files')
  }
})