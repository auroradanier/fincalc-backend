import { tables } from '~~/server/middleware/db'
import { sql, desc, asc, and, eq, like, or } from 'drizzle-orm'
import { H3Event, getRouterParam, defineEventHandler, createError, getQuery } from 'h3'
import type { PgTable } from 'drizzle-orm/pg-core'

// Helper to get table schema by name with proper typing
function getTableSchema(tableName: string): { table: PgTable, baseTableName: string, identifier?: string } {
  if (!tableName) {
    throw createError({
      statusCode: 400,
      message: 'Table name is required'
    })
  }

  // Get the first segment of the path as the table name
  const pathSegments = tableName.split('/')
  const baseTableName = pathSegments[0] as keyof typeof tables;

  if (!tables[baseTableName]) {
    throw createError({
      statusCode: 404,
      message: `Table ${baseTableName} not found`
    })
  }

  // If there's a second segment, it's the identifier (could be ID or slug)
  const identifier = pathSegments.length > 1 ? pathSegments[1] : undefined

  return {
    table: tables[baseTableName] as unknown as PgTable,
    baseTableName,
    identifier
  }
}

// Helper to validate query parameters against table schema
function validateQueryParams(
  table: PgTable,
  query: any,
  conditions: any[],
  baseTableName: string
): void {
  // Skip these reserved query parameters
  const reservedParams = new Set(['page', 'limit', 'search', 'sort', 'order', 'sortSubKey', 'sortLower'])
  
  // Get all valid column names from the table schema
  const validColumns = new Set(Object.keys(table))
  
  // Process each query parameter
  for (const [key, value] of Object.entries(query)) {
    if (reservedParams.has(key)) {
      continue;
    }

    // Skip if the value is an empty string or the string 'undefined'
    if (value === '' || String(value) === 'undefined') {
        continue;
    }

    if (!validColumns.has(key)) {
      throw createError({
        statusCode: 404,
        message: `Invalid query parameter: ${key} is not a valid field in table ${baseTableName}`
      })
    }

    // Use type assertion here to allow string indexing
    const column = (table as any)[key];
    
    // Check if column is actually a column object before accessing dataType
    if (!column || typeof column.dataType === 'undefined') {
         throw createError({
             statusCode: 400,
             message: `Invalid query parameter: ${key} is not a valid column in table ${baseTableName}`
         });
    }
    const columnType = column.dataType

    // Handle different column types appropriately
    // Check if this is a boolean field by checking known boolean column names or column type
    const booleanColumns = ['deleted', 'enabled']; // Add other boolean column names as needed
    const isBooleanColumn = booleanColumns.includes(key) || columnType === 'boolean';
    
    if (isBooleanColumn) {
      // Handle boolean values - support both integer (0/1) and text ('FALSE'/'TRUE') formats
      const inputValue = String(value).toLowerCase();
      
      if (inputValue === 'true') {
        // Search for both 1 and 'TRUE'
        conditions.push(or(eq(column as any, 1), eq(column as any, 'TRUE')));
      } else {
        // Search for both 0 and 'FALSE'
        conditions.push(or(eq(column as any, 0), eq(column as any, 'FALSE')));
      }
    } else if (columnType === 'integer' || columnType === 'number') {
      // Handle regular integers
      const numValue = Number(value);
      conditions.push(eq(column as any, numValue));
    } else {
      // Default to text comparison
      conditions.push(eq(column as any, value));
    }
  }
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

    const { table, baseTableName, identifier } = getTableSchema(tablePath)

    // Ensure database context exists
    if (!event.context.db) {
      throw createError({
        statusCode: 500,
        message: 'Database context is not initialized'
      })
    }

    const db = event.context.db
    const query = getQuery(event)

    // Build conditions
    const conditions = []

    // If we have an identifier in the path, attempt to fetch a single record
    if (identifier) {
      let condition
      // Check if the identifier looks like a numeric ID
      const isNumericId = /^[0-9]+$/.test(identifier)

      if ('id' in table) {
        // Fetch by ID (numeric or text)
        if (isNumericId) {
          condition = eq((table as any)['id'], Number(identifier))
        } else {
          condition = eq((table as any)['id'], identifier)
        }
      } else if ('slug' in table) {
        // Fetch by slug (fallback if table has no id)
        condition = eq((table as any)['slug'], identifier)
      } else {
        // Identifier provided, but table has neither 'id' nor 'slug' field
        throw createError({
          statusCode: 400,
          message: `Table ${baseTableName} does not support fetching by ID or slug.`
        })
      }

      try {
        // Get the single record by ID or slug
        const items = await db.select()
          .from(table)
          .where(condition)

        const item = items[0]

        if (!item) {
          // Return 404 if item not found
          return {
            success: false,
            error: {
              statusCode: 404,
              message: `${baseTableName} with identifier '${identifier}' not found`
            }
          }
        }

        // Return the single object
        return {
          success: true,
          data: item
        }
      } catch (dbError: any) {
        console.error('Database error:', dbError?.message || dbError)
        throw createError({
          statusCode: 500,
          message: 'Error querying database for single item'
        })
      }
    }
    // Otherwise, we're getting a paginated list
    else {
      const page = Number(query.page) || 1
      const limit = Number(query.limit) || 20
      const offset = (page - 1) * limit
      const search = query.search as string | undefined
      const sortField = query.sort as string | undefined;
      const sortOrder = query.order as 'asc' | 'desc' | undefined;
      const sortSubKey = query.sortSubKey as string | undefined;
      const sortLower = String(query.sortLower).toLowerCase() === 'true'; // Default to false

      // Add search condition if provided
      if (search && search.trim()) {
        const trimmedSearch = search.trim().substring(0, 50)

        const searchConditions = []
        // Iterate through table columns to find searchable text fields
        for (const columnName in table) {
          const column = (table as any)[columnName]
          // Assuming text columns are searchable. Adjust dataType check if needed.
          if (column && column.dataType === 'text') {
            searchConditions.push(like(column, `%${trimmedSearch}%`))
          }
        }
        if (searchConditions.length > 0) conditions.push(or(...searchConditions))
      }

      // Validate other query parameters against table schema
      validateQueryParams(table, query, conditions, baseTableName)

      // Determine the field to sort by and the sort order
      let orderByClause: any = desc((table as any).id); // Default sort by id desc

      // Apply sorting if sortField is provided and exists as a column in the table schema
      if (sortField && (table as any)[sortField]) {
         const columnToSort = (table as any)[sortField];
         
         // If sortSubKey is provided, sort by the subkey within the JSON field
         if (sortSubKey) {
           const isTextSubKey = isNaN(Number(sortSubKey)) && sortSubKey.length > 0;
           const sortDirection = sortOrder === 'desc' ? 'DESC' : 'ASC';
           
           if (sortLower && isTextSubKey) {
               // Case-insensitive sorting for JSON text fields
               orderByClause = sql.raw(`LOWER(COALESCE((${columnToSort.name}->>'${sortSubKey}')::text, '')) ${sortDirection}`);
             } else {
               // Regular sorting for JSON fields
               orderByClause = sql.raw(`COALESCE((${columnToSort.name}->>'${sortSubKey}')::text, '') ${sortDirection}`);
             }
         } else {
           // Regular column sorting
           const isTextColumn = columnToSort.dataType === 'text' || columnToSort.dataType === 'varchar';
           
           if (sortLower && isTextColumn) {
              // Case-insensitive sorting for text columns
              const sortDirection = sortOrder === 'desc' ? 'DESC' : 'ASC';
              orderByClause = sql.raw(`LOWER(${columnToSort.name}) ${sortDirection}`);
            } else {
              // Regular sorting for other column types
              orderByClause = sortOrder === 'desc' ? desc(columnToSort) : asc(columnToSort);
            }
         }
      } else if (sortField) {
          // If sortField was provided but doesn't exist in schema, throw an error
          throw createError({
             statusCode: 400,
             message: `Invalid sort field: ${sortField} for table ${baseTableName}`
          });
      }

      try {
        // Get total count with filters
        const totalCountQuery = db.select({ count: sql<number>`count(*)` })
          .from(table)
          .where(conditions.length ? and(...conditions) : undefined)
        
        const totalCountResults = await totalCountQuery

        const totalCount = totalCountResults[0]?.count || 0

        // Get records with pagination and filters
        const itemsQuery = db.select()
          .from(table)
          .where(conditions.length ? and(...conditions) : undefined)
          .limit(limit)
          .offset(offset)
          .orderBy(orderByClause);
          
        const items = await itemsQuery

        return {
          success: true,
          data: {
            items,
            pagination: {
              total: totalCount,
              page,
              limit,
              totalPages: Math.ceil(totalCount / limit)
            }
          }
        }
      } catch (dbError: any) {
        console.error('Database error:', dbError?.message || dbError)
        throw createError({
          statusCode: 500,
          message: 'Error querying database for list'
        })
      }
    }
  } catch (error: any) {
    console.error('Error in GET:', error instanceof Error ? error.message : error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error in GET request'
    })
  }
})