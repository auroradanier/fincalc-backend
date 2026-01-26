<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Create New {{ table }}</h1>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="!tableConfig" class="text-center py-8 text-gray-500">
      Table configuration not found.
    </div>

    <div v-else class="bg-white rounded-xl p-6 shadow-sm">
      <form @submit.prevent="createItem">
        <!-- Iterate over detailFields if available -->
        <template v-if="tableConfig.detailFields">
          <div v-for="field in tableConfig.detailFields" :key="field.key" class="py-4 flex items-center">
            <!-- Skip fields marked as readOnly, editOnly, or the 'id' field for creation -->
            <template v-if="!field.readOnly && !field.editOnly && field.key !== 'id'">
              <label :for="field.key" class="text-sm font-medium text-gray-500 w-1/4 capitalize">{{ field.label || field.key }}<span v-if="isFieldRequired(field.key)" class="text-red-500 ml-1">*</span>:</label>
              <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 w-3/4">
                <!-- Render input based on field type or default logic -->
                <template v-if="(field.editComponent || field.type) === 'text'">
                   <input
                    :id="field.key"
                    v-model="newItemData[field.key]"
                    type="text"
                    class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                  />
                </template>
                 <template v-else-if="(field.editComponent || field.type) === 'number'">
                   <!-- Use Reka UI NumberField for number types -->
                   <NumberFieldRoot v-model="newItemData[field.key]" :id="field.key" class="flex items-center w-full">
                      <NumberFieldInput class="w-full border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"/>
                      <NumberFieldDecrement class="px-3 py-2 border border-l-0 border-gray-300 text-gray-700 hover:bg-gray-100">-</NumberFieldDecrement>
                      <NumberFieldIncrement class="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-100">+</NumberFieldIncrement>
                   </NumberFieldRoot>
                </template>
                 <template v-else-if="(field.editComponent || field.type) === 'textarea'">
                   <textarea
                    :id="field.key"
                    v-model="newItemData[field.key]"
                    :rows="field.rows || 5"
                    class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                   ></textarea>
                 </template>
                 <template v-else-if="(field.editComponent || field.type) === 'boolean'">
                    <!-- Use standard HTML checkbox for boolean fields -->
                   <input
                     :id="field.key"
                     v-model="newItemData[field.key]"
                     type="checkbox"
                     class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                   />
                 </template>
                 <template v-else-if="(field.editComponent || field.type) === 'select' && field.options && !field.relation">
                   <!-- Use Reka UI Select for fields with static options -->
                   <SelectRoot v-model="newItemData[field.key]" :id="field.key" class="w-full">
                      <SelectTrigger class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 flex justify-between items-center">
                         <SelectValue :placeholder="`Select ${field.label || field.key}`"/>
                         <SelectIcon class="ml-2 h-4 w-4 opacity-50"/>
                      </SelectTrigger>
                      <SelectPortal>
                         <SelectContent class="relative z-50 max-h-60 overflow-y-auto rounded-md border bg-white text-gray-700 shadow-md">
                            <SelectViewport class="p-1">
                               <SelectItem v-for="option in field.options" :key="String(option.value)" :value="String(option.value)" class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                  <SelectItemText>{{ option.label }}</SelectItemText>
                               </SelectItem>
                            </SelectViewport>
                         </SelectContent>
                      </SelectPortal>
                   </SelectRoot>
                 </template>
                 <template v-else-if="((field.editComponent || field.type) === 'select' || field.type === 'relation') && field.relation">
                   <!-- Use Reka UI Select for relation types -->
                   <SelectRoot v-model="newItemData[field.key]" :id="field.key" class="w-full">
                      <SelectTrigger class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 flex justify-between items-center">
                         <SelectValue :placeholder="`Select ${field.label || field.key}`"/>
                         <SelectIcon class="ml-2 h-4 w-4 opacity-50"/>
                      </SelectTrigger>
                      <SelectPortal>
                         <SelectContent class="relative z-50 max-h-60 overflow-y-auto rounded-md border bg-white text-gray-700 shadow-md">
                            <SelectViewport class="p-1">
                               <!-- Check if the data ref exists and has a value before iterating -->
                               <template v-if="field.relation && relationOptions?.[field.relation.table]?.value?.items">
                                  <SelectItem v-for="option in (relationOptions[field.relation.table].value.items as any[]).filter((opt: any) => field.relation && opt[field.relation.valueField] !== null && opt[field.relation.valueField] !== undefined && opt[field.relation.valueField] !== '')" :key="(option as any)[(field.relation as any).valueField]" :value="(option as any)[(field.relation as any).valueField]" class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                     <SelectItemText>{{ (option as any)[(field.relation as any).displayField] }}</SelectItemText>
                                  </SelectItem>
                               </template>
                               <template v-else-if="!field.relation || !relationOptions?.[field.relation.table]?.value?.items">
                                  <!-- Handle case where relation data is not available or loading -->
                                  <SelectItem value="loading-placeholder" disabled class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-gray-500 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                     <SelectItemText>Loading or no options available</SelectItemText>
                                  </SelectItem>
                               </template>
                            </SelectViewport>
                         </SelectContent>
                      </SelectPortal>
                   </SelectRoot>
                </template>
                 <template v-else-if="field.type === 'json'">
                   <!-- JSON field as plain textarea without constraints -->
                   <textarea
                     :id="field.key"
                     :value="getJsonDisplayValue(field.key)"
                     @input="(e) => updateJsonField(e, field.key)"
                     :rows="6"
                     class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 font-mono text-sm"
                     :placeholder="`Enter JSON for ${field.label || field.key}`"
                   ></textarea>
                 </template>
                 <template v-else-if="(field.editComponent || field.type) === 'image'">
                   <!-- Image upload field -->
                   <div class="space-y-4">
                     <!-- Current image preview -->
                     <div v-if="newItemData[field.key]" class="relative inline-block">
                        <img
                          :src="(field as any).format ? (field as any).format(newItemData[field.key]) : newItemData[field.key]"
                          :alt="field.label || field.key"
                          class="w-8 h-8 object-cover rounded border border-gray-300"
                          @error="handleImageError"
                        />
                       <button
                         type="button"
                         @click="removeImage(field.key)"
                         class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                       >
                         ×
                       </button>
                     </div>
                     <!-- Upload button -->
                     <div class="flex items-center space-x-4">
                       <input
                         :id="`${field.key}-upload`"
                         type="file"
                         accept="image/*"
                         @change="(event) => handleImageUpload(event, field.key)"
                         class="hidden"
                         :ref="`fileInput-${field.key}`"
                       />
                       <button
                         type="button"
                         @click="triggerFileInput(field.key)"
                         :disabled="uploadingImages[field.key]"
                         class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                       >
                         <svg v-if="uploadingImages[field.key]" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                           <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         <span>{{ uploadingImages[field.key] ? 'Uploading...' : (newItemData[field.key] ? 'Change Image' : 'Upload Image') }}</span>
                       </button>
                       <span v-if="uploadErrors[field.key]" class="text-red-500 text-sm">{{ uploadErrors[field.key] }}</span>
                     </div>
                   </div>
                </template>
                 <!-- Placeholder for other types like date, datetime -->
                <template v-else>
                  <input
                    :id="field.key"
                    v-model="newItemData[field.key]"
                    type="text"
                     :placeholder="`Input for ${field.type || 'unknown'} type not fully implemented`"
                    class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                  />
                </template>
              </div>
            </template>
          </div>
        </template>
        <!-- Fallback to iterating over schema keys if detailFields is not defined -->
        <template v-else>
           <div v-for="key in (tableConfig ? Object.keys(schema[table as keyof typeof schema] || {}).filter(key => key !== 'id') : [])" :key="key" class="py-4 flex items-center">
             <label :for="key" class="text-sm font-medium text-gray-500 w-1/4 capitalize">{{ key }}:</label>
             <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 w-3/4">
                 <!-- Default rendering for fallback -->
                 <input
                   :id="key"
                   v-model="newItemData[key]"
                   type="text"
                    class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                 />
             </div>
           </div>
        </template>

        <div class="mt-6 flex justify-end">
          <button type="button" @click="router.back()" class="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Create Item
          </button>
        </div>
      </form>
    </div>

    <div v-if="createSuccess" class="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
      Item created successfully! (ID: {{ createdItemId }})
    </div>
    <div v-if="createError" class="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
      Error creating item: {{ createError }}
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import config from '~/config'
import * as schema from '~~/server/database/schema'
import type { TableConfig, DetailFieldConfig, ColumnConfig } from '~/config/types'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'; // Import Reka UI Checkbox components
import { NumberFieldRoot, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from 'reka-ui'; // Import Reka UI Number Field components
import { SelectRoot, SelectTrigger, SelectValue, SelectPortal, SelectContent, SelectViewport, SelectItem, SelectItemText, SelectIcon } from 'reka-ui'; // Import Reka UI Select components

definePageMeta({ layout: 'admin' });

const route = useRoute();
const router = useRouter();

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

const table = ref<string | null>(getSingleRouteParam(route.params.table));

// Define the interface for the shape of the imported config object
interface ConfigExports {
  getTableConfig: (tableName: string, schema: Record<string, any>) => TableConfig;
}

// Function to check if a field is required by reading from schema
const isFieldRequired = (fieldKey: string): boolean => {
  if (!table.value) return false;
  const schemaKey = table.value as keyof typeof schema;
  const tableSchema = schema[schemaKey];
  if (!tableSchema) return false;

  // Access the column definition directly from the table schema
  const field = (tableSchema as any)[fieldKey];
  const isRequired = field && field.notNull === true;
  return isRequired;
};

// Get table config
const tableConfig = computed(() => {
  if (!table.value) return null;
  const schemaKey = table.value as keyof typeof schema;
  const tableSchema = schema[schemaKey];
   if (!tableSchema) {
    console.error(`Create Page: Schema for table "${table.value}" not found.`);
    return null;
   }
  const configData = (config as ConfigExports).getTableConfig(table.value, tableSchema) as TableConfig;
  return configData;
});

// Store relation options for select fields - Now a ref to store results from multiple useFetch
// The values will now be the data refs returned by useFetch
const relationOptions = reactive<Record<string, any>>({}); // Change to reactive

onMounted(async () => {
  if (table.value) { // Ensure table name is available
    const currentTableConfig = tableConfig.value; // Access computed value
    if (currentTableConfig && currentTableConfig.detailFields) {
      // Fix: Check for fields with either type='relation' OR editComponent='select' that have a relation property
      const relationFields = currentTableConfig.detailFields.filter(field =>
        ((field.type === 'relation' || field.editComponent === 'select') && field.relation)
      );

      // Use Promise.all to fetch all relation options concurrently
      const fetchPromises = relationFields.map(async field => {
        if (field.relation) {
          const apiUrl = `/api/v1/${field.relation.table}?limit=1000`;
          console.log('Create Page: useFetch attempting to fetch relation options from URL (onMounted):', apiUrl);
          const { data, pending, error } = await useFetch(apiUrl);

          console.log('Create Page: useFetch data from relations (onMounted) ', data);
          // Store the data ref
          return { tableName: field.relation.table, dataRef: data };
        }
        return null; // Return null for fields without relation
      });

      // Await all fetch promises and populate relationOptions
      const results = await Promise.all(fetchPromises);
      results.forEach(result => {
        if (result && result.tableName && result.dataRef) {
          relationOptions[result.tableName] = result.dataRef; // No .value for reactive objects
        }
      });
      console.log('Create Page: relationOptions populated (onMounted):', relationOptions);
    }
  }
});

const newItemData = ref<any>({}); // Data for the new item
const loading = ref(false);
const createSuccess = ref(false);
const createError = ref<string | null>(null);
const createdItemId = ref<string | null>(null);

// Image upload state
const uploadingImages = ref<Record<string, boolean>>({});
const uploadErrors = ref<Record<string, string>>({});


// Image handling functions
const triggerFileInput = (fieldKey: string) => {
  const fileInput = document.getElementById(`${fieldKey}-upload`) as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
};

const removeImage = (fieldKey: string) => {
  newItemData.value[fieldKey] = null;
  // Clear any upload errors for this field
  if (uploadErrors.value[fieldKey]) {
    delete uploadErrors.value[fieldKey];
  }
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
};

const handleImageUpload = async (event: Event, fieldKey: string) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  uploadingImages.value[fieldKey] = true;
  uploadErrors.value[fieldKey] = '';

  try {
    const formData = new FormData();
    formData.append('files', file);
    const { getImageBasePath } = await import('~~/shared/utils/imageTools');

    // Get upload target from field configuration
    const field = tableConfig.value?.detailFields?.find(f => f.key === fieldKey);
    const imageTarget = field?.uploadTarget || 'default';
    const imagePath = getImageBasePath(imageTarget);
    formData.append('path', `${imagePath}/${Date.now()}-${file.name}`);
    formData.append('generateSizes', 'true');
    formData.append('target', imageTarget);

    const response = await $fetch('/api/storage/upload', {
      method: 'POST',
      body: formData
    });

    if (response && typeof response === 'object' && 'success' in response && response.success && 'data' in response && response.data && 'fileName' in response.data) {
       // Save only the filename, not the full URL
       newItemData.value[fieldKey] = response.data.fileName;
     } else {
       throw new Error('Invalid response from upload endpoint');
     }
  } catch (error) {
    console.error('Upload error:', error);
    uploadErrors.value[fieldKey] = 'Failed to upload image. Please try again.';
   } finally {
     uploadingImages.value[fieldKey] = false;
     // Clear the file input
     input.value = '';
   }
 };

async function createItem() {
  if (!table.value || !newItemData.value) {
    createError.value = 'Cannot create item. Missing table or data.';

    return;
  }

  loading.value = true;
  createSuccess.value = false;
  createError.value = null;
  createdItemId.value = null;

  try {
    const apiUrl = `/api/v1/${table.value}`;

    // Use useFetch for the creation request
    const { data, pending, error } = await useFetch(apiUrl, {
      method: 'POST', // Assuming POST endpoint for creation
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItemData.value),
    });

    // Handle the response from useFetch
    if (error.value) {
       console.error('Create Page: createItem useFetch error:', error.value);
       createError.value = error.value.message || 'An unexpected error occurred.';
    } else if ((data.value as any)?.success && (data.value as any)?.data?.id) {
      createSuccess.value = true;
      createdItemId.value = (data.value as any).data.id;
      // Clear form after success
      newItemData.value = {};
    } else {
      createError.value = (data.value as any)?.message || (data.value as any)?.error || 'Unknown error during creation.';
    }
  } catch (err: any) {
    console.error('Create Page: createItem error:', err);
    createError.value = err.message || 'An unexpected error occurred.';
  } finally {
    loading.value = false;
  }
}

// Function to get JSON display value for textarea
function getJsonDisplayValue(fieldKey: string): string {
  const value = newItemData.value[fieldKey];
  if (value === null || value === undefined) return '';

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
}

// Function to update JSON field with parsing
function updateJsonField(event: Event, fieldKey: string) {
  const target = event.target as HTMLTextAreaElement;
  const textValue = target.value;

  if (newItemData.value) {
    try {
      // Try to parse the JSON to validate it and store as object
      const parsedJson = JSON.parse(textValue);
      newItemData.value[fieldKey] = parsedJson;
    } catch (error) {
      // If parsing fails, store the raw text value for now
      // This allows users to continue editing invalid JSON
      newItemData.value[fieldKey] = textValue;
    }
  }
}
</script>
