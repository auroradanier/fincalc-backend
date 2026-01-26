import { defineEventHandler, readBody, createError, getHeaders, setHeader } from 'h3'
import { allMcpTools } from '~~/server/utils/mcp/tools/index'
import { randomUUID } from 'node:crypto'

// Custom MCP Streamable HTTP implementation according to specification
// https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http

interface JSONRPCRequest {
  jsonrpc: '2.0'
  id: string | number
  method: string
  params?: any
}

interface JSONRPCResponse {
  jsonrpc: '2.0'
  id: string | number
  result: any
}

interface JSONRPCError {
  jsonrpc: '2.0'
  id: string | number
  error: {
    code: number
    message: string
    data?: any
  }
}

type JSONRPCMessage = JSONRPCRequest | JSONRPCResponse | JSONRPCError

// Error codes from JSON-RPC 2.0 specification
const ErrorCode = {
  ParseError: -32700,
  InvalidRequest: -32600,
  MethodNotFound: -32601,
  InvalidParams: -32602,
  InternalError: -32603
} as const

// MCP protocol version
const PROTOCOL_VERSION = '2025-06-18'

// Session storage (in-memory for this implementation)
const sessions = new Map<string, { initialized: boolean }>()

function createJSONRPCResponse(id: string | number, result: any): JSONRPCResponse {
  return {
    jsonrpc: '2.0',
    id,
    result
  }
}

function createJSONRPCError(id: string | number, code: number, message: string, data?: any): JSONRPCError {
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message,
      data
    }
  }
}

async function handleInitialize(request: JSONRPCRequest, sessionId?: string): Promise<JSONRPCResponse | JSONRPCError> {
  try {
    const { protocolVersion, capabilities, clientInfo } = request.params || {}
    
    // Validate protocol version
    if (protocolVersion !== PROTOCOL_VERSION) {
      return createJSONRPCError(
        request.id,
        ErrorCode.InvalidParams,
        `Unsupported protocol version: ${protocolVersion}. Expected: ${PROTOCOL_VERSION}`
      )
    }

    // Mark session as initialized if we have a session ID
    if (sessionId) {
      sessions.set(sessionId, { initialized: true })
    }

    return createJSONRPCResponse(request.id, {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: {
        tools: {},
        resources: {},
        logging: {}
      },
      serverInfo: {
        name: 'postermaker-mcp-server',
        version: '1.0.0'
      }
    })
  } catch (error: any) {
    return createJSONRPCError(
      request.id,
      ErrorCode.InternalError,
      error.message || 'Initialize failed'
    )
  }
}

async function handleToolsList(request: JSONRPCRequest): Promise<JSONRPCResponse | JSONRPCError> {
  try {
    const tools = Object.values(allMcpTools).map(tool => ({
      name: tool.name,
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema
    }))

    return createJSONRPCResponse(request.id, { tools })
  } catch (error: any) {
    return createJSONRPCError(
      request.id,
      ErrorCode.InternalError,
      error.message || 'Tools list failed'
    )
  }
}

async function handleToolsCall(request: JSONRPCRequest, headers: Headers): Promise<JSONRPCResponse | JSONRPCError> {
  try {
    const { name, arguments: args } = request.params || {}
    
    if (!name) {
      return createJSONRPCError(
        request.id,
        ErrorCode.InvalidParams,
        'Tool name is required'
      )
    }

    // Find the tool
    const tool = Object.values(allMcpTools).find(t => t.name === name)
    if (!tool) {
      return createJSONRPCError(
        request.id,
        ErrorCode.MethodNotFound,
        `Tool '${name}' not found`
      )
    }

    // Validate parameters using Zod schema if available
    let validatedArgs = args || {}
    if ('validationSchema' in tool && tool.validationSchema) {
      try {
        const { z } = require('zod')
        const zodSchema = z.object((tool as any).validationSchema)
        validatedArgs = zodSchema.parse(args || {})
      } catch (validationError: any) {
        return createJSONRPCError(
          request.id,
          ErrorCode.InvalidParams,
          `Parameter validation failed: ${validationError.message}`,
          validationError.errors
        )
      }
    }

    // Execute the tool
    const result = await tool.handler(validatedArgs, headers)
    
    console.log('[MCP] Tool execution completed:')
    
    // Format result according to MCP specification
    const mcpResult = {
      content: [
        {
          type: "text",
          text: typeof result === 'string' ? result : JSON.stringify(result)
        }
      ],
      isError: false
    }
    
    const response = createJSONRPCResponse(request.id, mcpResult)
    
    return response
    
  } catch (error: any) {
    return createJSONRPCError(
      request.id,
      ErrorCode.InternalError,
      error.message || 'Tool execution failed'
    )
  }
}

async function handleRequest(request: JSONRPCRequest, headers: Headers, sessionId?: string): Promise<JSONRPCResponse | JSONRPCError> {
  // Check if session is required and valid
  if (sessionId && request.method !== 'initialize') {
    const session = sessions.get(sessionId)
    if (!session || !session.initialized) {
      return createJSONRPCError(
        request.id,
        ErrorCode.InvalidRequest,
        'Session not initialized'
      )
    }
  }

  switch (request.method) {
    case 'initialize':
      return handleInitialize(request, sessionId)
    case 'tools/list':
      return handleToolsList(request)

    case 'tools/call':
      return handleToolsCall(request, headers)
    default:
      return createJSONRPCError(
        request.id,
        ErrorCode.MethodNotFound,
        `Method '${request.method}' not found`
      )
  }
}

export default defineEventHandler(async (event) => {
  try {
    // Log incoming request
    console.log(`[MCP] Incoming ${event.node.req.method} request:`, {
      url: event.node.req.url,
      headers: Object.fromEntries(Object.entries(getHeaders(event))),
      timestamp: new Date().toISOString()
    })
    
    // Get headers
    const headers = new Headers()
    const eventHeaders = getHeaders(event)
    for (const [key, value] of Object.entries(eventHeaders)) {
      if (typeof value === 'string') {
        headers.set(key, value)
      }
    }

    // Check Accept header for streamable HTTP transport
    const acceptHeader = headers.get('accept') || ''
    if (!acceptHeader.includes('application/json')) {
      console.log(`[MCP] Invalid Accept header: ${acceptHeader}`)
      throw createError({
        statusCode: 400,
        statusMessage: 'Accept header must include application/json for MCP Streamable HTTP transport'
      })
    }

    // Get session ID from header (optional for stateless mode)
    const sessionId = headers.get('mcp-session-id') || undefined
    
    // Handle different HTTP methods
    if (event.node.req.method === 'POST') {
      // Read and parse request body
      const body = await readBody(event)
      
      console.log('[MCP] Request body:', JSON.stringify(body, null, 2))
      
      // Validate JSON-RPC format
      const isNotification = body.method && body.id === undefined
      if (!isNotification && (!body.jsonrpc || !body.method || body.id === undefined)) {
        console.error('[MCP] Invalid JSON-RPC format:', body)
        return createError({
          statusCode: 400,
          statusMessage: 'Invalid JSON-RPC format'
        })
      }

      // Handle notifications (no response needed)
      if (isNotification) {
        console.log('[MCP] Handling notification:', body.method)
        return new Response(null, { status: 204 })
      }

      try {
         const eventHeaders = getHeaders(event)
         const headers = new Headers()
         for (const [key, value] of Object.entries(eventHeaders)) {
           if (typeof value === 'string') {
             headers.set(key, value)
           }
         }
         const sessionId = eventHeaders['mcp-session-id'] as string
         const response = await handleRequest(body, headers, sessionId)
         console.log('[MCP] Response:', JSON.stringify(response, null, 2))
         
         setHeader(event, 'content-type', 'application/json')
         if (sessionId) {
           setHeader(event, 'mcp-session-id', sessionId)
         }
         
         return response
       } catch (error) {
         console.error('[MCP] Server error:', error)
         return createError({
           statusCode: 500,
           statusMessage: 'Internal server error'
         })
       }
      
    } else if (event.node.req.method === 'GET') {
      // Handle SSE stream requests (not implemented in this simple version)
      console.log(`[MCP] GET request not supported`)
      throw createError({
        statusCode: 501,
        statusMessage: 'SSE streaming not implemented in test server'
      })
      
    } else {
      console.log(`[MCP] Method not allowed: ${event.node.req.method}`)
      throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
      })
    }
    
  } catch (error: any) {
    console.error(`[MCP] Server error:`, {
      error: error.message,
      statusCode: error.statusCode,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: `Internal MCP Error: ${error.message || 'Unknown error'}`
    })
  }
})
