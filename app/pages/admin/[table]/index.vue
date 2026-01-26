<template>
  <div class="min-w-0">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">{{ table }} List</h1>
      <!-- Create button -->
      <button @click="router.push(`/admin/${table}/create`)" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        Create New
      </button>
    </div>
    
    <div class="mb-4 flex flex-wrap gap-4 items-center">
      <!-- Search Component -->
      <Search 
        v-model="search" 
        @search="fetchData" 
        placeholder="Search..."
      />

      <!-- Filters Component -->
      <Filters
        :filter-configs="tableConfig?.filters"
        :active-filters="activeFilters"
        :relation-data="relationData"
        :get-filter-options="getFilterOptions"
        @update:active-filters="handleFilterUpdate"
        @reset-filters="resetFilters"
      />
    </div>

    <div v-if="loading" class="flex justify-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
    
    <!-- Admin Table Component -->
    <div v-else :style="{ maxWidth: tableWidth }" class="border border-gray-200 rounded-lg overflow-x-auto overflow-y-auto max-h-[calc(100vh-300px)]">
      <TableList
        :items="items"
        :displayed-columns="displayedColumns"
        :relation-data="relationData"
        :current-sort-field="currentSortField"
        :current-sort-direction="currentSortDirection"
        :loading="loading"
        :detail-fields="tableConfig?.detailFields || []"
        :actions="listActions"
        @sort="handleSort"
        @toggle-boolean="handleToggleBoolean"
        @action="handleAction"
      />
    </div>

      <!-- Pagination -->
      <div class="mt-6">
        <AdminPagination 
          :current-page="page"
          :total-pages="serverTotalPages"
          :records-per-page="limit"
          @page-change="handlePageChange"
          @records-per-page-change="handleRecordsPerPageChange"
        />
      </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import config from '~/config'
import * as schema from '~~/server/database/schema'
import type { TableConfig, ColumnConfig, FilterConfig, FilterOption } from '~/config/types'
// Import the new components
import TableList from '~/components/admin/TableList.vue'
import Search from '~/components/admin/Search.vue'
import Filters from '~/components/admin/Filters.vue'


// Define the interface for the shape of the imported config object
interface ConfigExports {
  getTableConfig: (tableName: string, schema: Record<string, any>) => TableConfig;
  getAllTableNames: () => Promise<string[]>;
}

const route = useRoute()
const router = useRouter()

// Always use only the table name (last segment if array or string)
const getTableName = (param: string | string[] | undefined): string | null => {
  if (param === undefined) {
    return null; // Explicitly handle undefined
  }
  if (Array.isArray(param)) {
    return param.length > 0 ? param[param.length - 1] : null;
  } else if (typeof param === 'string') {
    return param;
  } else {
    return null;
  }
};

// Initialize table ref
const table = ref<string | null>(getTableName(route.params.table));
const items = ref<any[]>([])
const loading = ref(false)
const page = ref(Number(route.query.page) || 1)
const limit = ref(Number(route.query.limit) || 20)
const totalPages = ref(1)
const totalItems = ref(0)
const search = ref(typeof route.query.search === 'string' ? route.query.search : '')

// State for sorting
const currentSortField = ref<string | null>(null);
const currentSortDirection = ref<'asc' | 'desc' | null>(null);

// State for filters
const activeFilters = ref<Record<string, string | number | boolean>>({});

// Store relation data
const relationData = ref<Record<string, Record<string, any>>>({})

// Use modal composable for generic modal management
const { openModal } = useModal()

// Use system composable for sidebar state
const { sidebarCollapsed } = useSystem()

// Computed property for dynamic table width based on sidebar state
const tableWidth = computed(() => {
  return sidebarCollapsed.value ? 'calc(100vw - 4rem)' : 'calc(100vw - 16rem)'
})

// Use server's totalPages
const serverTotalPages = computed(() => totalPages.value)

// Function to handle page changes from the Pagination component
const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= serverTotalPages.value && newPage !== page.value) {
    page.value = newPage
    const currentQuery: Record<string, any> = { ...route.query, page: String(newPage) };
    router.push({ query: currentQuery });
    fetchData();
  }
}

// Get table config
const tableConfig = computed(() => {
  if (!table.value) return null;
  // Get the schema from the imported schema object
  const schemaKey = table.value as keyof typeof schema;
  const tableSchema = schema[schemaKey];
  if (!tableSchema) return null;
  // Use getTableConfig from the imported config object
  const loadedConfig = (config as ConfigExports).getTableConfig(table.value, tableSchema) as TableConfig; // Use the typed config object
  
  // Initialize sort based on defaultSort in config if not already set
  if (loadedConfig.defaultSort && !currentSortField.value) {
      currentSortField.value = loadedConfig.defaultSort.field;
      currentSortDirection.value = loadedConfig.defaultSort.direction;
  }

  // Initialize active filters from query params if available
  const initialFilters: Record<string, string | number | boolean> = {}; // More specific type
  if (route.query) {
      for (const filterConfig of loadedConfig.filters || []) {
          const queryValue = route.query[filterConfig.key];
          // Only include query value if it's not undefined, null, or an empty string, and not the string 'undefined'
          if (queryValue !== undefined && queryValue !== null && queryValue !== '' && String(queryValue) !== 'undefined') {
              // Attempt to parse boolean/number from query string based on filter type
              if (filterConfig.type === 'boolean') {
                  initialFilters[filterConfig.key] = String(queryValue) === 'true';
              } else if (filterConfig.type === 'select' && typeof queryValue === 'string') { // Select values can be strings or numbers
                 // Check if the value is numeric, if so parse it as number
                 const numValue = parseFloat(queryValue);
                 if (!isNaN(numValue) && isFinite(numValue)) {
                    initialFilters[filterConfig.key] = numValue;
                 } else {
                    initialFilters[filterConfig.key] = queryValue; // Keep as string if not a valid number
                 }
              } else if (typeof queryValue === 'string') {
                  initialFilters[filterConfig.key] = queryValue;
              }
          }
      }
       // Only update activeFilters if there are actual filters from query params to apply
       if(Object.keys(initialFilters).length > 0) {
         activeFilters.value = initialFilters;
       }
  }

  return loadedConfig;
});

// Computed property to determine which columns to display based on config
const displayedColumns = computed(() => {
  if (!tableConfig.value) return [];
  const columns = [...tableConfig.value.columns];
  
  // Filter out hidden columns
  const visibleColumns = columns.filter(col => !col.hidden);
  
  // Always add actions column
  visibleColumns.push({
    key: 'actions',
    title: 'Actions',
    type: 'actions'
  });
  
  return visibleColumns;
});

// Computed property to filter actions for list page
const listActions = computed(() => {
  if (!tableConfig.value?.actions) return [];
  return tableConfig.value.actions.filter(action => action.showInList !== false);
});

// Function to handle filter updates from AdminFilters component
const handleFilterUpdate = (newFilters: Record<string, string | number | boolean>) => {
    activeFilters.value = newFilters;
    applyFilters(); // Apply filters and update URL when filters change
};

// Function to get filter options, including fetching relation data if necessary
const getFilterOptions = (filterConfig: FilterConfig): FilterOption[] => {
  if (filterConfig.options) {
    return filterConfig.options;
  }
  // If it's a relation filter, use the fetched relation data
  const columnConfig = tableConfig.value?.columns.find(col => col.key === filterConfig.key);
  
  // Ensure columnConfig, relation, and relation.table are defined before accessing relationData
  if (columnConfig?.type === 'relation' && columnConfig.relation?.table) { 
      const relationItems = relationData.value[columnConfig.relation.table];
      if(relationItems) { // Ensure relation items are loaded
          // Explicitly type the item parameter and access properties safely
          return Object.values(relationItems).map((item: Record<string, any>) => ({
            value: item[columnConfig.relation!.valueField], // Use non-null assertion after checks
            label: item[columnConfig.relation!.displayField], // Use non-null assertion after checks
          }));
      }
  }
  return []; // No options if not a defined select filter or relation filter with data
};

// Function to apply filters
const applyFilters = () => {
  page.value = 1; // Reset page when filters change
  // Update query params in URL
   const currentQuery: Record<string, any> = { ...route.query, page: '1' }; // Explicitly type
   if(tableConfig.value?.filters) {
       for(const filterConfig of tableConfig.value.filters) {
           const filterValue = activeFilters.value[filterConfig.key];
           // Only add filter to query if it has a non-empty value (exclude '' and null/undefined)
           if (filterValue !== null && filterValue !== '') {
               // Convert boolean/number values to string for query params
                currentQuery[filterConfig.key] = String(filterValue);
           } else {
               // Remove filter from query if value is null or empty string
               delete currentQuery[filterConfig.key];
           }
       }
   }
  router.push({ query: currentQuery });
  fetchData(); // fetchData will read the updated query params
};

// Function to reset filters
const resetFilters = () => {
  activeFilters.value = {}; // Clear all active filters
  page.value = 1; // Reset page
  // Remove filter query params from URL
  const query: Record<string, any> = { ...route.query }; // Explicitly type
  if(tableConfig.value?.filters) {
      for(const filterConfig of tableConfig.value.filters) {
          delete query[filterConfig.key];
      }
  }
  query.page = '1'; // Ensure page is reset in URL
   // Preserve sort parameters when resetting filters
   if(currentSortField.value) { query.sort = currentSortField.value; }
   if(currentSortDirection.value) { query.order = currentSortDirection.value; }

  router.push({ query });
};





// Function to handle sorting
const handleSort = (columnKey: string) => {
  if (!tableConfig.value) return;
  const column = tableConfig.value.columns.find(col => col.key === columnKey);
  if (column && column.sortable) {
    if (currentSortField.value === columnKey) {
      // If already sorting by this column, reverse direction
      currentSortDirection.value = currentSortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      // Otherwise, sort by this column in ascending order and set the field
      currentSortField.value = columnKey;
      currentSortDirection.value = 'asc';
    }
    
    // Reset page to 1 and fetch data with new sort
    page.value = 1;
    // Update query params in URL with sort and reset page
    const currentQuery: Record<string, any> = { ...route.query, page: '1' }; // Explicitly type
    if(currentSortField.value) { currentQuery.sort = currentSortField.value; }
    if(currentSortDirection.value) { currentQuery.order = currentSortDirection.value; }
    if(column.sortSubKey) { 
      currentQuery.sortSubKey = column.sortSubKey; 
    } else {
      // Remove sortSubKey from query if column doesn't have one
      delete currentQuery.sortSubKey;
    }
    router.push({ query: currentQuery });
  }
};


// Function to handle boolean toggle
const handleToggleBoolean = async (item: any, fieldKey: string) => {
  if (!table.value) return;
  
  try {
    const newValue = !item[fieldKey];
    const updateData = { id: item.id, [fieldKey]: newValue };
    
    const response = await fetch(`/api/v1/${table.value}/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (response.ok) {
      // Update the item in the local array
      item[fieldKey] = newValue;
    } else {
      const errorData = await response.text();
      console.error('Failed to update boolean field:', response.status, errorData);
    }
  } catch (error) {
    console.error('Error updating boolean field:', error);
  }
};

// Function to handle action button clicks
const handleAction = async (action: any, item: any) => {
  // Check if action has a modal configuration
  if (action.modal) {
    // Import action handler
    const { getActionHandler } = await import('~/config/actions');
    const actionHandler = getActionHandler(action.handler);
    
    if (actionHandler) {
      // Open modal with config and handler
      openModal(action.modal, item, actionHandler)
    } else {
      console.error(`Action handler '${action.handler}' not found`);
      alert('Action not available. Please try again.');
    }
    return
  }

  // Standard confirm dialog for actions without modal
  if (action.confirm) {
    const confirmed = confirm(`${action.confirm.title}\n\n${action.confirm.message}`);
    if (!confirmed) return;
  }
  
  try {
    const { getActionHandler } = await import('~/config/actions');
    const actionHandler = getActionHandler(action.handler);
    
    if (actionHandler) {
      const result = await actionHandler(item);
      if (result?.success) {
        await fetchData();
        alert(result.message || 'Action completed successfully!');
      }
    } else {
      console.error(`Action handler '${action.handler}' not found`);
      alert('Action not available. Please try again.');
    }
  } catch (error) {
    console.error('Error executing action:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    alert(`Error: ${errorMessage}`);
  }
};



// Function to fetch relation data for relation columns and filters
const fetchRelationData = async (relation: any) => {
  if (!relationData.value[relation.table]) {
    try {
      // Fetch all items for the relation table to populate filter options
      const res = await fetch(`/api/v1/${relation.table}?limit=1000`); // Increased limit for relation data
      const data = await res.json();
      if (data.success) {
        const items = data.data.items;
        relationData.value[relation.table] = items.reduce((acc: any, item: any) => {
          // Ensure the valueField is used as the key in the relationData map
          acc[item[relation.valueField]] = item;
          return acc;
        }, {});
      }
    } catch (err) {
      console.error('Error fetching relation data for', relation.table, ':', err);
    }
  }
}

async function fetchData() {
  loading.value = true
  try {
    if (!table.value || typeof table.value !== 'string') {
      console.error('Table name is not defined or is not a string.');
      items.value = [];
      totalPages.value = 1;
      totalItems.value = 0;
      loading.value = false;
      return;
    }

    const params = new URLSearchParams({
      page: String(page.value),
      limit: String(limit.value),
      ...(search.value ? { search: search.value } : {}),
      // Add sort parameters if available
      ...(currentSortField.value && currentSortDirection.value ? { sort: currentSortField.value, order: currentSortDirection.value } : {}),
      // Add sortSubKey if available in route query
      ...(route.query.sortSubKey ? { sortSubKey: String(route.query.sortSubKey) } : {}),
      // Add sortLower parameter based on current sort column config
      ...(currentSortField.value && tableConfig.value?.columns.find(col => col.key === currentSortField.value)?.sortLower ? { sortLower: 'true' } : {}),
      // Add filter parameters if available
      ...Object.fromEntries(
        // Convert filter values to strings for URL query parameters and exclude invalid values
        Object.entries(activeFilters.value)
              .filter(([key, value]) => value !== null && value !== '' && value !== undefined) // Explicitly exclude null, empty string, and undefined
              .map(([key, value]) => [key, String(value)]) // Convert remaining valid values to string
      )
    })
    const apiUrl = `/api/v1/${table.value}?${params}`
    const res = await fetch(apiUrl)
    const data = await res.json()
    if (data.success) {
      items.value = Array.isArray(data.data.items) ? data.data.items : []
      totalPages.value = data.data.pagination.totalPages
      totalItems.value = data.data.pagination.totalItems || 0

      // Fetch relation data for all relation columns and filters
      if (tableConfig.value) {
        const relationColumns = tableConfig.value.columns.filter(col => (col.type === 'relation' || col.type === 'image') && col.relation); // Filter early for defined relations
        const relationFilters = tableConfig.value.filters?.filter(f => f.type === 'select'); // Get select filters (assuming relations)

        const relationFilterColumns = relationFilters
                                      ?.map(f => tableConfig.value?.columns.find(col => col.key === f.key)) // Map filter keys back to column configs
                                      .filter(col => col?.type === 'relation' && col.relation) || []; // Filter out undefined and non-relation columns

        const allRelationConfigs = relationColumns.concat(relationFilterColumns.filter(col => col !== undefined)) as ColumnConfig[]; // Ensure concat is only on defined items and type is ColumnConfig[]
                                          
        // Ensure uniqueness and only fetch if relation config exists
        const uniqueRelationConfigs = Array.from(new Map(allRelationConfigs.map(item => [item.relation?.table, item.relation])).values())
                                          .filter(relation => relation !== undefined && relation.table); // Filter out undefined or invalid relations

        for (const relation of uniqueRelationConfigs) {
             await fetchRelationData(relation);
        }
      }
    } else {
      items.value = []
      totalPages.value = 1
      totalItems.value = 0
    }
  } catch (err) {
    console.error('fetchData error:', err)
  } finally {
    loading.value = false
  }
}

watch(() => route.params.table, (newTableParam) => {
  table.value = getTableName(newTableParam !== undefined ? newTableParam : undefined);
  page.value = 1
  // Reset sort and filters when table changes
  currentSortField.value = null;
  currentSortDirection.value = null;
  activeFilters.value = {};
  // Remove all query params except table
   const currentPath = route.path.split('/').slice(0, -1).join('/');
   router.push({ path: currentPath + '/' + table.value, query: {} });

  if (table.value && typeof table.value === 'string') {
    fetchData()
  }
})

// Watch search and filters for data fetching
watch([search, activeFilters], () => {
    // Reset page to 1 when search/filters change
    page.value = 1;
    // Update query params and fetch data
    const currentQuery: Record<string, any> = { ...route.query, page: '1' };
    if (search.value) {
        currentQuery.search = search.value;
    } else {
        delete currentQuery.search;
    }
    // Add filter parameters
    for (const [key, value] of Object.entries(activeFilters.value)) {
        if (value !== null && value !== '' && value !== undefined) {
            currentQuery[key] = String(value);
        }
    }
    // Preserve sort parameters
      if (currentSortField.value !== null) { currentQuery.sort = currentSortField.value; }
      if (currentSortDirection.value !== null) { currentQuery.order = currentSortDirection.value; }
    
    router.push({ query: currentQuery });
    fetchData();
}, { deep: true }); // Deep watch activeFilters

// Watch page changes for pagination
watch(page, (newPage) => {
  console.log('Page changed to:', newPage);
  // Update query params in URL
  const currentQuery: Record<string, any> = { ...route.query, page: String(newPage) };
  router.push({ query: currentQuery });
  // fetchData will be called by the route watcher
});

// Watch route query changes to fetch data when sort/filter parameters change
watch(() => route.query, (newQuery, oldQuery) => {
  // Only fetch data if the query actually changed and we're not in the initial mount
  if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
    fetchData();
  }
}, { deep: true });

onMounted(() => {
  if (table.value && typeof table.value === 'string') {
    // Initialize filters, sort, and search from query params on mount
    const initialFilters: Record<string, string | number | boolean> = {}; // More specific type
    const initialSortField = route.query.sort as string | undefined;
    const initialSortDirection = route.query.order as 'asc' | 'desc' | undefined;
    const initialSearch = route.query.search as string | undefined;

    if (tableConfig.value?.filters) {
       for (const filterConfig of tableConfig.value.filters) {
          const queryValue = route.query[filterConfig.key];
          if (queryValue !== undefined) {
             // Attempt to parse boolean/number from query string if filter type suggests it
              if (filterConfig.type === 'boolean') {
                  initialFilters[filterConfig.key] = queryValue === 'true';
              } else if (filterConfig.type === 'select' && typeof queryValue === 'string') { // Select values can be strings or numbers
                 // Check if the value is numeric, if so parse it as number
                 const numValue = parseFloat(queryValue);
                 if (!isNaN(numValue) && isFinite(numValue)) {
                    initialFilters[filterConfig.key] = numValue;
                 } else {
                    initialFilters[filterConfig.key] = queryValue; // Keep as string if not a valid number
                 }
              } else if (typeof queryValue === 'string') {
                  initialFilters[filterConfig.key] = queryValue;
              }
          }
       }
        // Only update activeFilters if there are actual filters from query params to apply
       if(Object.keys(initialFilters).length > 0) {
         activeFilters.value = initialFilters;
       }
    }

    // Initialize sort state from query params on mount if not already set by defaultSort
    if (!currentSortField.value && initialSortField) {
        currentSortField.value = initialSortField;
        // Default sort direction to 'asc' if not provided in query
        currentSortDirection.value = initialSortDirection || 'asc';
    }

    // Initialize search state from query params on mount
    if(initialSearch !== undefined) {
        search.value = initialSearch;
    }

    // Fetch data after initializing all state from query params
    fetchData();
  }
})

// Function to handle records per page changes from pagination component
const handleRecordsPerPageChange = (newRecordsPerPage: number) => {
  limit.value = newRecordsPerPage;
  page.value = 1; // Reset to first page when changing records per page
  const currentQuery: Record<string, any> = { ...route.query, page: '1', limit: String(newRecordsPerPage) };
  router.push({ query: currentQuery });
  // fetchData will be called by the route watcher
};

</script>

<style scoped>
/* Add some basic styling for filter controls */
.flex-wrap > div {
  flex-basis: 200px; /* Give filter controls a minimum width */
}
</style>
