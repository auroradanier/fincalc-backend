export function handleError(error: unknown, defaultMessage = 'An error occurred') {
  console.error('[API Error]:', error)
  
  if (error instanceof Error) {
    const statusCode = (error as any).statusCode || 500
    throw createError({
      statusCode,
      message: error.message || defaultMessage
    })
  }

  throw createError({
    statusCode: 500,
    message: defaultMessage
  })
} 