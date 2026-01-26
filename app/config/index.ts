import type { TableConfig } from './types'

// Use import.meta.glob to find all .ts files in the 'tables' directory relative to the current file
// This is a build-time feature processed by Vite/Nuxt 3.
// The result is an object mapping paths to module exports (because of eager: true).
const tableConfigModules = import.meta.glob('./tables/*.ts', { eager: true });

// Function to get table config or generate default config
export function getTableConfig(tableName: string, schema: Record<string, any>): TableConfig {
  let config: TableConfig | undefined;

  // Construct the expected path for the table config file relative to the glob pattern's base
  const configPath = `./tables/${tableName}.ts`;

  // Check if the module exists in the glob result
  if (tableConfigModules[configPath]) {
    try {
      // Access the default export of the eagerly imported module
      const importedModule = tableConfigModules[configPath] as { default: TableConfig };
      if (importedModule && importedModule.default) {
        config = importedModule.default;
      } else {
        console.warn(`Config file found for table: ${tableName} at path ${configPath}, but it has no default export.`);
      }
    } catch (error) {
      console.error(`Error loading config for table: ${tableName} from path ${configPath}`, error);
    }
  } else {
     console.warn(`No specific config file found for table: ${tableName} at path ${configPath}. Generating default config.`);
  }

  // If a specific config was loaded, return it
  if (config) {
    return config;
  }

  // Otherwise, generate a default config from the schema
  console.warn(`Generating default config for table: ${tableName}`);
  
  // Helper function to check if a field is required (not null)
  const isFieldRequired = (field: any): boolean => {
    console.log('Checking field for required:', field);
    // Check if the field has notNull property set to true
    return field && field.notNull === true;
  };
  
  // Helper function to determine field type from schema
  const getFieldType = (field: any): 'number' | 'boolean' | 'text' | 'textarea' | 'image' | 'date' | 'relation' | 'datetime' => {
    if (!field) return 'text';
    if (field.dataType === 'integer' && field.mode === 'boolean') return 'boolean';
    if (field.dataType === 'integer' && field.mode === 'timestamp') return 'datetime';
    if (field.dataType === 'integer') return 'number';
    if (field.dataType === 'text') return 'text';
    if (field.dataType === 'real') return 'number';
    return 'text';
  };
  
  return {
    columns: Object.keys(schema).map(key => ({
      key,
      title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    })),
    defaultSort: {
      field: 'id',
      direction: 'desc'
    },
    searchableFields: Object.keys(schema).filter(key => 
      typeof schema[key] === 'string' || 
      schema[key]?.dataType === 'text'
    ),
    perPage: 20,
    detailFields: Object.keys(schema).map(key => ({
      key,
      label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      type: getFieldType(schema[key]),
      required: isFieldRequired(schema[key]),
      readOnly: key === 'id' || key === 'createdAt' || key === 'updatedAt'
    }))
  }
}

// Function to get all available table names dynamically from import.meta.glob keys
// This function is intended to be called client-side.
export async function getAllTableNames(): Promise<string[]> {
  const tableNames: string[] = [];
  for (const path in tableConfigModules) {
    // The path will be something like './tables/topics.ts'
    const filename = path.split('/').pop(); // Get 'topics.ts'
    if (filename && filename.endsWith('.ts')) {
      const tableName = filename.replace('.ts', '');
      tableNames.push(tableName);
    }
  }

  // Sort the table names alphabetically for consistent display
  return tableNames.sort();
}

// Export the functions that should be publicly available
export default {
  getTableConfig,
  getAllTableNames
}