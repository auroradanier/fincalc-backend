const hasValidHeader = (request: any, env: any, ctx: any) => {
  const authHeader = request.headers.get?.('x-custom-auth-key');
  return authHeader === env.AUTH_KEY_SECRET;
};

function authorizeRequest(request: any, env: any, ctx: any) {
  switch (request.method) {
    case 'DELETE':
      return hasValidHeader(request, env, ctx);
    default:
      return false;
  }
}

export default defineEventHandler(async (event) => {
  try {
    const request = {
      method: event.method,
      headers: event.headers
    };

    if (!authorizeRequest(request, event.context.cloudflare.env, null)) {
      throw createError({
        statusCode: 403,
        message: 'Forbidden'
      })
    }

    const body = await event.context.cloudflare.request.json();
    const path = body.path;

    if (!path || typeof path !== 'string') {
      throw createError({
        statusCode: 400,
        message: 'Path is required'
      })
    }

    const bucket = event.context.cloudflare.env.STORAGE
    if (!bucket) {
      throw createError({
        statusCode: 500,
        message: 'Storage not configured'
      })
    }

    await bucket.delete(path)

    return {
      success: true,
      data: {
        deleted: path
      }
    }

  } catch (error: any) {
    console.error('[Delete] Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete file',
      statusCode: error.statusCode || 500
    }
  }
})