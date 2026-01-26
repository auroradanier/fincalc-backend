import { tables } from '~~/server/middleware/db'
import { eq, and, sql } from 'drizzle-orm'
import { H3Event, readBody, getRouterParam, defineEventHandler, createError } from 'h3'
import type { PgTable } from 'drizzle-orm/pg-core'
import slugify from 'slugify'

// Common stop words for slug generation
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'in', 
  'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 
  'with', 'the', 'this', 'but', 'they', 'have', 'had'
])

// Helper to generate slugs
function generateSlug(name: string) {
  // Convert to lowercase and split into words
  const words = name.toLowerCase().split(/[^a-z0-9]+/)
  
  // Remove stop words and empty strings
  const filteredWords = words.filter(word => 
    word && !STOP_WORDS.has(word)
  )

  // Join words and limit length
  const baseSlug = filteredWords.join('-')
  const truncatedSlug = baseSlug.slice(0, 50)

  // Use slugify for final cleanup
  return slugify(truncatedSlug, {
    lower: true,    // convert to lower case
    strict: true,   // strip special characters
    trim: true      // trim leading and trailing replacement chars
  })
}

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
    const body = await readBody(event)

    if (!body.id) {
      throw createError({
        statusCode: 400,
        message: 'ID is required for update'
      })
    }

    // Handle slug generation if needed
    if ('slug' in table && !body.slug) {
      const nameField = 'title' in table ? 'title' : 'name'
      if (nameField in body && body[nameField]) {
        let slug = generateSlug(body[nameField])
        let slugExists = true
        let counter = 0
        let finalSlug = slug
        
        while (slugExists) {
          const existing = await db.select()
            .from(table)
            .where(and(
              eq((table as any).slug, finalSlug),
              sql`${(table as any).id} != ${body.id}`
            ))
            .limit(1)
          
          if (!existing || existing.length === 0) {
            slugExists = false
          } else {
            counter++
            finalSlug = `${slug}-${counter}`
          }
        }
        
        body.slug = finalSlug
      }
    }

    // Process all fields and handle timestamp conversion dynamically based on schema
    for (const [fieldName, fieldValue] of Object.entries(body)) {
      if (fieldName in table && fieldValue !== null && fieldValue !== undefined) {
        const field = (table as any)[fieldName]
        if (field && field.config && field.config.mode === 'timestamp') {
          // Convert to Date object for timestamp mode fields
          body[fieldName] = new Date(fieldValue as string | number | Date)
        }
        // Non-timestamp fields are left as-is
      }
    }



    // Update the record
    const results = await db.update(table)
      .set(body)
      .where(eq((table as any).id, body.id))
      .returning()

    const result = results[0]

    if (!result) {
      throw createError({
        statusCode: 404,
        message: `Record with ID ${body.id} not found`
      })
    }

    return {
      success: true,
      data: result
    }
  } catch (error: any) {
    console.error('Error in PUT:', error instanceof Error ? error.message : error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error in PUT request'
    })
  }
})