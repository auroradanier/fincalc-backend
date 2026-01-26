import { drizzle } from 'drizzle-orm/node-postgres'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../database/schema'

// Export schema for convenience
export const tables = schema

// Singleton database instance
let db: NodePgDatabase<typeof schema> | undefined

/**
 * Get or create the database instance (singleton pattern)
 */
function getDatabase(): NodePgDatabase<typeof schema> | undefined {
  if (!db) {
    const config = useRuntimeConfig()
    const connectionString = config.databaseUrl
    
    if (connectionString) {
      db = drizzle(connectionString, { schema })
    }
  }
  return db
}

export default defineEventHandler(async (event) => {
  // Attach database to event context using singleton
  event.context.db = getDatabase()
})

// Extend H3 context types
declare module 'h3' {
  interface H3EventContext {
    db: NodePgDatabase<typeof schema> | undefined
  }
}