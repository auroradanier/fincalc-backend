export default defineEventHandler(async (event) => {
  try {
    const path = getQuery(event).path as string
    if (!path) {
      throw createError({
        statusCode: 400,
        message: 'No path provided'
      })
    }

    const bucket = event.context.cloudflare.env.STORAGE
    if (!bucket) {
      throw createError({
        statusCode: 500,
        message: 'Storage not configured'
      })
    }

    const file = await bucket.head(path)
    if (!file) {
      throw createError({
        statusCode: 404,
        message: 'File not found'
      })
    }

    return ''  // HEAD requests don't return body
  } catch (error) {
    if (error.statusCode === 404) {
      throw createError({
        statusCode: 404,
        message: 'File not found'
      })
    }
    return handleError(error, 'Failed to check file')
  }
}) 