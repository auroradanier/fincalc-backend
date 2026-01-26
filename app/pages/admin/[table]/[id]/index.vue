<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Details for {{ table }}: {{ id }}</h1>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="!itemDetail || !tableConfig" class="text-center py-8 text-gray-500">
      Item not found or table configuration could not be loaded.
    </div>

    <div v-else class="bg-white rounded-xl p-6 shadow-sm">
      <dl class="divide-y divide-gray-200">
        <!-- Iterate over detailFields if available -->
        <template v-if="tableConfig.detailFields">
          <div v-for="field in tableConfig.detailFields" :key="field.key" class="py-4 flex">
            <dt class="text-sm font-medium text-gray-500 w-1/4 capitalize">{{ field.label || field.key }}<span v-if="field?.required" class="text-red-500 ml-1">*</span>:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 w-3/4">
              <!-- Display value based on field config or default logic -->
              <template v-if="itemDetail && itemDetail[field.key] !== undefined && itemDetail[field.key] !== null">
                 <template v-if="field.format">
                    {{ field.format(itemDetail[field.key]) }}
                 </template>
                 <template v-else-if="field.type === 'boolean' || typeof itemDetail[field.key] === 'boolean'">
                    <button 
                      @click="toggleBoolean(field.key)"
                      :disabled="field.readOnly"
                      :class="[
                        'px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200',
                        {
                          'cursor-not-allowed opacity-60': field.readOnly,
                          'cursor-pointer': !field.readOnly,
                          'bg-green-100 text-green-800': itemDetail[field.key],
                          'bg-red-100 text-red-800': !itemDetail[field.key],
                          'hover:bg-green-200': itemDetail[field.key] && !field.readOnly,
                          'hover:bg-red-200': !itemDetail[field.key] && !field.readOnly
                        }
                      ]"
                    >
                      {{ itemDetail[field.key] ? 'Yes' : 'No' }}
                    </button>
                 </template>
                 <template v-else-if="field.type === 'date' || field.type === 'datetime' || (typeof itemDetail[field.key] === 'string' && itemDetail[field.key].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/))">
                    {{ itemDetail && formatDateTime(itemDetail[field.key]) }}
                 </template>
                 <template v-else-if="field.type === 'image' && itemDetail && itemDetail[field.key]">
                   <!-- Display image preview -->
                   <div class="relative">
                     <img 
                       :src="(field as any).format ? (field as any).format(itemDetail[field.key]) : itemDetail[field.key]" 
                       :alt="itemDetail ? itemDetail[field.key] : ''"
                       :title="itemDetail ? itemDetail[field.key] : ''"
                       class="max-w-xs max-h-24 object-contain rounded-lg border border-gray-200"
                       @error="handleImageError"
                     />
                   </div>
                 </template>
                 <template v-else-if="field.type === 'relation' && field.relation && relationData[field.relation.table] && itemDetail && itemDetail[field.key]">
                      <!-- Display value from related data, using displayField -->
                     {{ relationData[field.relation.table][itemDetail[field.key]]?.[field.relation.displayField] || 'N/A' }}
                 </template>
                 <template v-else-if="field.type === 'json'">
                   <div v-if="field.readOnly">
                     <EditableJsonTreeViewer 
                       v-if="itemDetail?.[field.key]"
                       :data="itemDetail[field.key]" 
                       :label="field.label || field.key"
                       :field-key="field.key"
                       :table-name="table ?? ''"
                       :item-id="id ?? ''"
                       @updated="() => {}"
                     />
                     <div v-else class="text-gray-500 italic">No data</div>
                   </div>
                   <div v-else>
                     <EditableJsonTreeViewer 
                       v-if="itemDetail && itemDetail[field.key] !== undefined"
                       :data="itemDetail[field.key]" 
                       :label="field.label || field.key"
                       :field-key="field.key"
                       :table-name="table ?? ''"
                        :item-id="id ?? ''"
                       @updated="(fieldKey, newData) => handleJsonUpdate(fieldKey, newData)"
                     />
                     <div v-else class="text-gray-500 italic">Loading...</div>
                   </div>
                 </template>
                 <template v-else-if="(field as any).inlineEdit && (field as any).editComponent === 'multiselect'">
                   <!-- Inline multiselect field -->
                   <div class="flex items-center space-x-2">
                     <div class="flex flex-wrap gap-1">
                       <span v-for="option in getMultiselectArray(itemDetail?.[field.key] || '')" :key="option" 
                             class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                         {{ option }}
                       </span>
                       <span v-if="!itemDetail?.[field.key] || getMultiselectArray(itemDetail?.[field.key] || '').length === 0" 
                             class="text-gray-500 text-sm">No {{ field.label.toLowerCase() }} assigned</span>
                     </div>
                     <button @click="openMultiselectEditor(field.key, (field as any).options)" 
                             class="ml-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors">
                       Edit
                     </button>
                   </div>
                 </template>
                 <template v-else>
                    {{ itemDetail && itemDetail[field.key] }}
                 </template>
              </template>
              <template v-else>
                 N/A
              </template>
            </dd>
          </div>
        </template>
        <!-- Fallback to iterating over itemDetail keys if detailFields is not defined -->
         <template v-else>
          <div v-for="key in Object.keys(itemDetail || {})":key="key" class="py-4 flex">
            <dt class="text-sm font-medium text-gray-500 w-1/4 capitalize">{{ key }}:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 w-3/4">
              {{ itemDetail ? itemDetail[key] : '' }}
            </dd>
          </div>
         </template>
      </dl>
    </div>

    <div class="mt-6">
      <button @click="router.back()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
        Back to List
      </button>
      <button v-if="itemDetail" @click="router.push(`/admin/${table}/${id}/edit`)" class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Edit
      </button>
      <button 
        v-for="action in detailActions" 
        :key="action.key"
        @click="handleAction(action.key)"
        :class="[
          'ml-4 px-4 py-2 rounded-md transition-colors duration-200',
          action.variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' :
          action.variant === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-700' :
          'bg-green-500 text-white hover:bg-green-600'
        ]"
      >
        {{ action.title }}
      </button>
    </div>
  </div>

  <!-- Multiselect Editor Modal -->
  <div v-if="showMultiselectEditor" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
      <h3 class="text-lg font-semibold mb-4">Edit {{ editingField }}</h3>
      <div class="space-y-2 mb-4">
        <div v-for="option in availableOptions" :key="option" class="flex items-center">
          <input 
            :id="`option-${option}`"
            type="checkbox" 
            :checked="selectedOptions.includes(option)"
            @change="toggleOption(option)"
            class="mr-2"
          >
          <label :for="`option-${option}`" class="capitalize">{{ option }}</label>
        </div>
      </div>
      <div class="flex justify-end space-x-2">
        <button 
          @click="showMultiselectEditor = false"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button 
          @click="saveMultiselect"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import config from '~/config'
import * as schema from '~~/server/database/schema'
import type { TableConfig, DetailFieldConfig, ColumnConfig } from '~/config/types'
import EditableJsonNode from '~/components/admin/EditableJsonNode.vue'
import EditableJsonTreeViewer from '~/components/admin/EditableJsonTreeViewer.vue'

definePageMeta({ layout: 'admin' });

const route = useRoute();
const router = useRouter();

// Helper to extract single string param or null from route param
const getSingleRouteParam = (param: string | string[] | undefined): string | null => {
  if (param === undefined) {
    return null; // Explicitly handle undefined input
  }
  if (Array.isArray(param)) {
    // Ensure the element is a string or null
    const lastParam = param[param.length - 1];
    return typeof lastParam === 'string' ? lastParam : null;
  } else if (typeof param === 'string') {
    return param;
  } else {
    return null; // Handles other unexpected types
  }
};

// Initialize table and id refs by calling the helper with the route params
const table = ref<string | null>(getSingleRouteParam(route.params.table));
const id = ref<string | null>(getSingleRouteParam(route.params.id));

// Define the interface for the shape of the imported config object
interface ConfigExports {
  getTableConfig: (tableName: string, schema: Record<string, any>) => TableConfig;
}

// Get table config
const tableConfig = computed(() => {
  if (!table.value) return null;
  // Get the schema from the imported schema object
  const schemaKey = table.value as keyof typeof schema;
  const tableSchema = schema[schemaKey];
  if (!tableSchema) return null;
  // Use getTableConfig from the imported config object
  const loadedConfig = (config as ConfigExports).getTableConfig(table.value, tableSchema) as TableConfig;
  console.log('Edit Page: Loaded tableConfig', loadedConfig);
  return loadedConfig;
});

// Computed property to filter actions for detail page
const detailActions = computed(() => {
  if (!tableConfig.value?.actions) return [];
  return tableConfig.value.actions.filter(action => action.showInDetail !== false);
});

const itemDetail = ref<any | null>(null);
const loading = ref(false);

// Store relation data for relation fields in detail view
const relationData = ref<Record<string, Record<string, any>>>({});

// JSON expansion state management
const expandedJsonFields = ref<Set<string>>(new Set());

// Function to toggle JSON field expansion
const toggleJsonExpansion = (fieldKey: string) => {
  if (expandedJsonFields.value.has(fieldKey)) {
    expandedJsonFields.value.delete(fieldKey);
  } else {
    expandedJsonFields.value.add(fieldKey);
  }
};

// Function to check if JSON field is expanded
const isJsonExpanded = (fieldKey: string): boolean => {
  return expandedJsonFields.value.has(fieldKey);
};

// Function to find detail field config by key
const findDetailFieldConfig = (key: string): DetailFieldConfig | undefined => {
  return tableConfig.value?.detailFields?.find(field => field.key === key);
};

// Function to fetch relation data for relation fields
const fetchRelationData = async (relation: DetailFieldConfig['relation'] | ColumnConfig['relation']) => {
  if (!relation || !relation.table || relationData.value[relation.table]) {
    return;
  }
  try {
    // Fetch all items for the relation table to populate relation data lookup
    const res = await fetch(`/api/v1/${relation.table}?limit=1000`); // Increased limit for relation data
    const data = await res.json();
    if (data.success) {
      const items = data.data.items;
      relationData.value[relation.table] = items.reduce((acc: any, item: any) => {
        // Use the valueField as the key in the relationData map
        acc[item[relation.valueField]] = item;
        return acc;
      }, {});
    } else {
      console.error('Failed to fetch relation data for', relation.table, ':', data.message);
    }
  } catch (err) {
    console.error('Error fetching relation data for', relation.table, ':', err);
  }
}

// Fetch item detail on mount if table and id are available and are strings
onMounted(() => {
  if (table.value && id.value) {
    fetchItemDetail(table.value, id.value);
  } else {
    console.error('Table name or ID is missing from route parameters.');
    itemDetail.value = null; // Ensure itemDetail is null if params are missing
    loading.value = false;
  }
});

// Watch tableConfig and itemDetail to fetch relation data once both are available
watch([tableConfig, itemDetail], ([newTableConfig, newItemDetail]) => {
  if (newTableConfig && newItemDetail) {
    // Fetch relation data for all relation fields present in itemDetail
    const fieldsToDisplay = Object.keys(newItemDetail || {}).filter(key => !(newTableConfig.excludeFieldsInDetail || []).includes(key));
    const relationFieldsKeys = fieldsToDisplay.filter(key => findDetailFieldConfig(key)?.type === 'relation' && findDetailFieldConfig(key)?.relation);
    for (const key of relationFieldsKeys) {
         const fieldConfig = findDetailFieldConfig(key);
         if(fieldConfig && fieldConfig.relation) fetchRelationData(fieldConfig.relation);
    }
  }
}, { immediate: true }); // Fetch immediately if tableConfig and itemDetail are already available on mount

async function fetchItemDetail(tableName: string, itemId: string) {
  loading.value = true;
  try {
    const apiUrl = `/api/v1/${tableName}/${itemId}`;
    console.log('Fetching item details:', apiUrl);
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log('API response:', data);

    if (data.success && data.data) {
      itemDetail.value = data.data;
      console.log('Edit Page: itemDetail fetched', itemDetail.value);
      console.log('Edit Page: itemDetail keys:', Object.keys(itemDetail.value));
      console.log('Edit Page: name field specifically:', itemDetail.value.name);
    } else {
      itemDetail.value = null; // Item not found or error
      console.error('Failed to fetch item details:', data.message);
    }
  } catch (err) {
    console.error('fetchItemDetail error:', err);
    itemDetail.value = null; // Set to null on error
  } finally {
    loading.value = false;
  }
}


// Function to format datetime values (Unix timestamps)
function formatDateTime(value: any): string {
  if (!value || typeof value !== 'number') return 'N/A';
  
  // Convert Unix timestamp (seconds) to Date
  const date = new Date(value * 1000);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  return date.toLocaleString();
}

// Function to format JSON values for display
function formatJsonValue(value: any): string {
  if (value === null || value === undefined) return 'null';
  
  try {
    // If it's already a string, try to parse it as JSON first
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return JSON.stringify(parsed, null, 2);
      } catch {
        // If parsing fails, it might be a plain string, return as is
        return value;
      }
    }
    
    // If it's an object or array, stringify it with formatting
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    
    // For other types, convert to string
    return String(value);
  } catch (error) {
    console.error('Error formatting JSON value:', error);
    return String(value);
  }
}

// Function to handle image loading errors
function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
  console.warn('Failed to load image:', img.src);
}

// Function to handle boolean toggle
const toggleBoolean = async (fieldKey: string) => {
  if (!table.value || !id.value || !itemDetail.value) return;
  
  try {
    const newValue = !itemDetail.value[fieldKey];
    const updateData = { id: itemDetail.value.id, [fieldKey]: newValue };
    
    
    const response = await fetch(`/api/v1/${table.value}/${id.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (response.ok) {
      // Update the item in the local data
      itemDetail.value[fieldKey] = newValue;
    } else {
      const errorData = await response.text();
      console.error('Failed to update boolean field:', response.status, errorData);
    }
  } catch (error) {
    console.error('Error updating boolean field:', error);
  }
};


// Function to parse comma-separated values into array
function getMultiselectArray(valueString: string): string[] {
  if (!valueString || typeof valueString !== 'string') return [];
  return valueString.split(',').map(item => item.trim()).filter(item => item.length > 0);
}

// Function to open multiselect editor modal
const showMultiselectEditor = ref(false);
const editingField = ref('');
const availableOptions = ref<string[]>([]);
const selectedOptions = ref<string[]>([]);

function openMultiselectEditor(fieldKey: string, options: any[]) {
  editingField.value = fieldKey;
  // Handle options format from config (array of objects with value/label)
  if (options && Array.isArray(options)) {
    availableOptions.value = options.map((opt: any) => 
      typeof opt === 'object' && opt.value ? opt.value : opt
    );
  } else {
    availableOptions.value = [];
  }
  selectedOptions.value = getMultiselectArray(itemDetail.value?.[fieldKey] || '');
  showMultiselectEditor.value = true;
}

// Function to save multiselect changes
const saveMultiselect = async () => {
  if (!table.value || !id.value || !itemDetail.value) return;
  
  try {
    const newValue = selectedOptions.value.join(',');
    const updateData = { id: itemDetail.value.id, [editingField.value]: newValue };
    
    const response = await fetch(`/api/v1/${table.value}/${id.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    if (response.ok) {
      // Update the item in the local data
      itemDetail.value[editingField.value] = newValue;
      showMultiselectEditor.value = false;
    } else {
      const errorData = await response.text();
      console.error('Failed to update multiselect field:', response.status, errorData);
    }
  } catch (error) {
    console.error('Error updating multiselect field:', error);
  }
};

// Function to toggle option selection
function toggleOption(option: string) {
  const index = selectedOptions.value.indexOf(option);
  if (index > -1) {
    selectedOptions.value.splice(index, 1);
  } else {
    selectedOptions.value.push(option);
  }
}

// Function to handle JSON updates from editable tree
async function handleJsonUpdate(fieldKey: string, newData: any) {
  console.log('handleJsonUpdate called:', { fieldKey, newData, type: typeof newData });
  if (itemDetail.value && table.value && id.value) {
    // Update local data first
    itemDetail.value[fieldKey] = newData;
    console.log('Updated itemDetail:', itemDetail.value);
    
    // Save to database
    try {
      const dataToSave = {
        id: itemDetail.value.id,
        [fieldKey]: newData
      };
      
      const apiUrl = `/api/v1/${table.value}`;
      console.log('Saving to API:', apiUrl, dataToSave);
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave)
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Successfully saved to database:', result.data);
      } else {
        console.error('Failed to save to database:', result.message);
        // Optionally show error to user
      }
    } catch (error) {
      console.error('Error saving to database:', error);
      // Optionally show error to user
    }
  }
}

// Function to handle action button clicks
async function handleAction(actionKey: string) {
  if (!itemDetail.value || !tableConfig.value) return;
  
  const action = tableConfig.value.actions?.find((a: any) => a.key === actionKey);
  if (!action) return;
  
  // Check if action has a modal configuration
  if (action.modal) {
    const { getActionHandler } = await import('~/config/actions');
    const actionHandler = getActionHandler(action.handler);
    
    if (actionHandler) {
      openModal(action.modal, itemDetail.value, actionHandler)
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
      const result = await actionHandler(itemDetail.value);
      
      if (result?.success) {
        // Handle download action
        if (action.download && result.imageData && result.filename) {
          const link = document.createElement('a');
          link.href = `data:image/png;base64,${result.imageData}`;
          link.download = result.filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          alert(result.message || 'Download completed successfully!');
        } else {
          // Refresh the data to show updated state
          await fetchItemDetail();
          alert(result.message || 'Action completed successfully!');
        }
      }
    } else {
      console.error(`Action handler '${action.handler}' not found`);
      alert('Action not available. Please try again.');
    }
  } catch (error) {
    console.error('Error executing action:', error);
    alert('An error occurred. Please try again.');
  }
}
</script>