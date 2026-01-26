import { tables } from '~~/server/middleware/db'
import { eq } from 'drizzle-orm'
import { H3Event, getRouterParam, defineEventHandler, createError } from 'h3'
import type { PgTable } from 'drizzle-orm/pg-core'

// Helper to get table schema by name with proper typing
function getTableSchema(tableName: string): PgTable {
  if (!tableName) {
    throw createError({
      statusCode: 400,
      message: 'Table name is required'
    })
  }

  // Get the first segment of the path as the table name
  const baseTableName = tableName.split('/')[0]
  const tableKey = baseTableName as keyof typeof tables
  
  if (!tables[tableKey]) {
    throw createError({
      statusCode: 404,
      message: `Table ${baseTableName} not found`
    })
  }
  return tables[tableKey] as unknown as PgTable
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const tablePath = getRouterParam(event, 'table')
    if (!tablePath) {
      throw createError({
        statusCode: 400,
        message: 'Table path is required'
      })
    }

    const table = getTableSchema(tablePath)
    
    // Ensure database context exists
    if (!event.context.db) {
      throw createError({
        statusCode: 500,
        message: 'Database context is not initialized'
      })
    }

    const db = event.context.db
    const query = getQuery(event)

    if (!query.id) {
      throw createError({
        statusCode: 400,
        message: 'ID is required for deletion'
      })
    }

    // Check if record exists
    const existing = await db.select()
      .from(table)
      .where(eq((table as any).id, Number(query.id)))

    if (!existing || existing.length === 0) {
      throw createError({
        statusCode: 404,
        message: `Record with ID ${query.id} not found`
      })
    }

    // Delete the record
    await db.delete(table)
      .where(eq((table as any).id, Number(query.id)))

    return {
      success: true,
      message: `Record with ID ${query.id} deleted successfully`
    }
  } catch (error: any) {
    console.error('Error in DELETE:', error instanceof Error ? error.message : error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error in DELETE request'
    })
  }
})