export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const agentUrl = config.public.agentUrl

    if (!agentUrl) {
      throw new Error('Agent URL is not configured')
    }

    console.log('[Agent Proxy] Sending request to:', agentUrl)
    console.log('[Agent Proxy] Request body:', body)

    // Forward the request directly to the agent endpoint (without /chat suffix)
    const response = await fetch(agentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.message,
        history: body.history,
      }),
    })

    const data = await response.json()
    console.log('[Agent Proxy] Response status:', response.status)
    console.log('[Agent Proxy] Response data:', data)

    if (!response.ok) {
      console.error('[Agent Proxy] Remote server error:', data)
      setResponseStatus(event, response.status)
      return {
        error: data.error || `Remote server returned status ${response.status}`,
        details: data,
      }
    }

    return data
  } catch (error: any) {
    console.error('[Agent Proxy] Error:', error.message)
    console.error('[Agent Proxy] Stack:', error.stack)
    setResponseStatus(event, 500)
    return {
      error: error.message || 'Failed to process agent request',
    }
  }
})


