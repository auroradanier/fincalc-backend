<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Edit {{ table }}: {{ id }}</h1>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="!itemDetail || !tableConfig" class="text-center py-8 text-gray-500">
      Item not found or table configuration could not be loaded for editing.
    </div>

    <div v-else class="bg-white rounded-xl p-6 shadow-sm">
      <form @submit.prevent="saveChanges">
        <!-- Iterate over detailFields if available -->
        <template v-if="tableConfig.detailFields">
          <div v-for="field in tableConfig.detailFields" :key="field.key" class="py-4 flex items-center">
            <!-- Use field.label from detailFields -->
            <label :for="field.key" class="text-sm font-medium text-gray-500 w-1/4 capitalize">{{ field.label || field.key }}<span v-if="isFieldRequired(field.key)" class="text-red-500 ml-1">*</span>:</label>
             <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 w-3/4">
               <template v-if="itemDetail && editableItemDetail">
                 <!-- Check if field has readOnly flag or has inline editing enabled (but not editOnly fields which should be editable in edit) -->
                 <template v-if="(field.readOnly || hasInlineEditing(field.key)) && !field.editOnly">
                   <!-- Special handling for boolean fields in readOnly mode -->
                   <template v-if="field.type === 'boolean'">
                     <div class="flex items-center">
                       <div class="w-4 h-4 border border-gray-300 rounded flex items-center justify-center" :class="itemDetail[field.key] ? 'bg-blue-500 text-white' : 'bg-gray-100'">
                         <svg v-if="itemDetail[field.key]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                           <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                         </svg>
                       </div>
                       <span class="ml-2 text-gray-700 font-medium">{{ itemDetail[field.key] ? 'Yes' : 'No' }}</span>
                     </div>
                   </template>
                   <!-- Display as plain text for other field types -->
                   <template v-else>
                     <span class="text-gray-700 font-medium">{{ itemDetail[field.key] }}</span>
                   </template>
                 </template>
                 <template v-else>
                    <!-- Render input based on field type or default logic -->
                    <template v-if="(field.editComponent || field.type) === 'number'">
                       <!-- Use Reka UI NumberField for number types -->
                       <NumberFieldRoot
                         :modelValue="editableItemDetail[field.key]"
                         @update:modelValue="(value) => { editableItemDetail[field.key] = value }"
                         :id="field.key"
                         class="flex items-center w-full">
                         <NumberFieldInput class="w-full border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"/>
                         <NumberFieldDecrement class="px-3 py-2 border border-l-0 border-gray-300 text-gray-700 hover:bg-gray-100">-</NumberFieldDecrement>
                         <NumberFieldIncrement class="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-100">+</NumberFieldIncrement>
                       </NumberFieldRoot>
                     </template>
                    <template v-else-if="(field.editComponent || field.type) === 'text'">
                       <!-- Use standard input for text types -->
                       <input
                        :id="field.key"
                        v-model="editableItemDetail[field.key]"
                        type="text"
                        class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                      />
                    </template>
                     <template v-else-if="(field.editComponent || field.type) === 'textarea'">
                       <textarea
                        :id="field.key"
                        v-model="editableItemDetail[field.key]"
                        :rows="field.rows || 5"
                        class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                       ></textarea>
                     </template>
                     <template v-else-if="(field.editComponent || field.type) === 'boolean'">
                       <!-- Use standard HTML checkbox for boolean fields -->
                       <input
                         :id="field.key"
                         v-model="editableItemDetail[field.key]"
                         type="checkbox"
                         class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                       />
                    </template>
                     <template v-else-if="(field.editComponent || field.type) === 'image'">
                       <!-- Image upload field -->
                       <div class="space-y-4">
                         <!-- Current image preview -->
                         <div v-if="editableItemDetail[field.key]" class="relative inline-block">
                           <img
                             :src="(field as any).format ? (field as any).format(editableItemDetail[field.key]) : editableItemDetail[field.key]"
                             :alt="field.label || field.key"
                             class="w-24 h-24 object-cover rounded border border-gray-300"
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
                             <span>{{ uploadingImages[field.key] ? 'Uploading...' : (editableItemDetail[field.key] ? 'Change Image' : 'Upload Image') }}</span>
                           </button>
                           <span v-if="uploadErrors[field.key]" class="text-red-500 text-sm">{{ uploadErrors[field.key] }}</span>
                         </div>
                       </div>
                     </template>
                     <template v-else-if="(field.editComponent || field.type) === 'select' && field.options && !field.relation">
                       <!-- Use Reka UI Select for fields with static options -->
                       <SelectRoot
                         :modelValue="editableItemDetail[field.key]"
                         @update:modelValue="(value) => { editableItemDetail[field.key] = value }"
                         :id="field.key"
                         class="w-full">
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
                     <!-- Handle relation type, defaulting to select if editComponent is not specified -->
                     <template v-else-if="(field.editComponent || field.type) === 'select' && field.relation">
                       <!-- Use Reka UI Select for relation types -->
                       <SelectRoot
                         :modelValue="editableItemDetail[field.key]"
                         @update:modelValue="(value) => { editableItemDetail[field.key] = value }"
                         :id="field.key"
                         class="w-full">
                         <SelectTrigger class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 flex justify-between items-center">
                           <SelectValue :placeholder="`Select ${field.label || field.key}`"/>
                           <SelectIcon class="ml-2 h-4 w-4 opacity-50"/>
                         </SelectTrigger>
                         <SelectPortal>
                           <SelectContent class="relative z-50 max-h-60 overflow-y-auto rounded-md border bg-white text-gray-700 shadow-md">
                             <SelectViewport class="p-1">
                               <!-- Check if the data ref exists and has a value before iterating -->
                               <template v-if="relationOptions && field.relation && relationOptions[field.relation.table] && relationOptions[field.relation.table].data && relationOptions[field.relation.table].data.items">
                                 <SelectItem v-for="option in (relationOptions[field.relation.table].data.items as any[]).filter((opt: any) => field.relation && opt[field.relation.valueField] !== null && opt[field.relation.valueField] !== undefined && opt[field.relation.valueField] !== '')" :key="(option as any)[(field.relation as any).valueField]" :value="(option as any)[(field.relation as any).valueField]" class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                   <SelectItemText>{{ (option as any)[(field.relation as any).displayField] }}</SelectItemText>
                                 </SelectItem>
                               </template>
                               <template v-else-if="!field.relation || !relationOptions?.[field.relation.table]?.data?.items">
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
                     <template v-else-if="(field.editComponent || field.type) === 'datepicker' || (field.editComponent || field.type) === 'datetime'">
                       <!-- Use standard input for date types as a fallback -->
                       <input
                         :id="field.key"
                         type="date"
                         :value="formatDateForInput(field.key)"
                         @input="(e) => handleDateInput(e, field.key)"
                         class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                       />
                     </template>
                    <template v-else-if="(field.editComponent || field.type) === 'timefield'">
                      <!-- Use Reka UI TimeField for time types -->
                      <TimeFieldRoot
                        :modelValue="editableItemDetail[field.key]"
                        @update:modelValue="(value) => { editableItemDetail[field.key] = value }"
                        :id="field.key"
                        class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 flex items-center">
                        <TimeFieldInput part="hour" />
                        <span class="mx-1">:</span>
                        <TimeFieldInput part="minute" />
                      </TimeFieldRoot>
                    </template>
                    <template v-else-if="field.type === 'json'">
                      <!-- JSON field as plain textarea without constraints -->
                      <div class="w-full">
                        <textarea
                          :id="field.key"
                          :value="getJsonDisplayValue(field.key)"
                          @input="(e) => updateJsonField(e, field.key)"
                          @blur="validateJsonField(field.key, editableItemDetail[field.key])"
                          :rows="6"
                          class="w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2 font-mono text-sm"
                          :class="jsonValidationErrors[field.key] ? 'border-red-500 bg-red-50' : 'border-gray-300'"
                          :placeholder="`Enter text for ${field.label || field.key}`"
                        ></textarea>
                        <div v-if="jsonValidationErrors[field.key]" class="mt-1 text-sm text-red-600">
                          {{ jsonValidationErrors[field.key] }}
                        </div>
                      </div>
                    </template>
                     <!-- Placeholder for other types like date, datetime -->
                    <template v-else>
                      <input
                        :id="field.key"
                        v-model="editableItemDetail[field.key]"
                        type="text"
                         :placeholder="`Input for ${field.type || 'unknown'} type not fully implemented`"
                        class="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                      />
                    </template>
                  </template>
               </template>
               <template v-else>
                 <!-- Display loading state or placeholder if data is not yet available -->
                 <span class="text-gray-500">Loading...</span>
               </template>
             </div>
          </div>
        </template>
        <!-- Fallback to iterating over editableItemDetail keys if detailFields is not defined -->
         <template v-else>
           <div v-for="key in Object.keys(editableItemDetail || {})":key="key" class="py-4 flex items-center">
            <label :for="key" class="text-sm font-medium text-gray-500 w-1/4 capitalize">{{ key }}:</label>
             <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 w-3/4">
               <!-- Default rendering for fallback -->
                 <input
                  :id="key"
                  v-model="editableItemDetail[key]"
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
          <button 
            type="submit" 
            :disabled="hasJsonValidationErrors"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>

    <div v-if="saveSuccess" class="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
      Changes saved successfully!
    </div>
    <div v-if="saveError" class="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
      Error saving changes: {{ saveError }}
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import config from '~/config'
import * as schema from '~~/server/database/schema'
import type { TableConfig, DetailFieldConfig, ColumnConfig } from '~/config/types'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'; // Import Reka UI Checkbox components
import { NumberFieldRoot, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from 'reka-ui'; // Import Reka UI Number Field components
import { SelectRoot, SelectTrigger, SelectValue, SelectPortal, SelectContent, SelectViewport, SelectItem, SelectItemText, SelectIcon } from 'reka-ui'; // Import Reka UI Select components
import { // Import Reka UI Date Picker components
  DatePickerAnchor,
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerClose,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
} from 'reka-ui';
import { TimeFieldRoot, TimeFieldInput } from 'reka-ui'; // Import Reka UI Time Field components
import { $fetch } from 'ofetch'; // Import $fetch for SSR compatible API calls

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
const id = ref<string | null>(getSingleRouteParam(route.params.id));

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
    console.error(`Edit Page: Schema for table "${table.value}" not found.`);
    return null;
  }
  const configData = (config as ConfigExports).getTableConfig(table.value, tableSchema) as TableConfig;
  return configData;
});

// Check if there are any JSON validation errors
const hasJsonValidationErrors = computed(() => {
  return Object.keys(jsonValidationErrors.value).length > 0;
});

const itemDetail = ref<any | null>(null);
const editableItemDetail = ref<any | null>(null); // Data to be edited
const loading = ref(false);
const saveSuccess = ref(false);
const saveError = ref<string | null>(null);

// Image upload state
const uploadingImages = ref<Record<string, boolean>>({});
const uploadErrors = ref<Record<string, string>>({});

// JSON field validation state
const jsonValidationErrors = ref<Record<string, string>>({});



// Function to check if a field has inline editing enabled in columns configuration
const hasInlineEditing = (fieldKey: string) => {
  if (!tableConfig.value?.columns) return false;
  const column = tableConfig.value.columns.find(col => col.key === fieldKey);
  return column?.editComponent !== undefined;
};

// Store relation options for select fields - Now a ref to store results from multiple useFetch
// The values will now be the data refs returned by useFetch
const relationOptions = ref<Record<string, any>>({}); // Initialize as empty object ref


// Fetch relation options directly in async setup, after itemDetail is fetched
// This is more complex in edit because fetching relations depends on itemDetail config and itemDetail itself
// We will fetch relations after itemDetail is successfully fetched
watch(itemDetail, async (newItemDetail) => {
  if (newItemDetail && tableConfig.value) {
     const currentTableConfig = tableConfig.value;
     if (currentTableConfig.detailFields) {
      const relationFields = currentTableConfig.detailFields.filter(field => (field.type === 'relation' || field.type === 'image') && field.relation);

      const fetchPromises = relationFields.map(async field => {
        if (field.relation) {
          const apiUrl = `/api/v1/${field.relation.table}?limit=1000`;
          console.log('Edit Page: useFetch attempting to fetch relation options from URL (after itemDetail fetch):', apiUrl);
          const { data, pending, error } = await useFetch(apiUrl);
          // Store the actual data value from useFetch instead of storing the ref, which was causing access issues in the template.
          return { tableName: field.relation.table, dataRef: data.value };
        }
        return null;
      });

      const results = await Promise.all(fetchPromises);
      results.forEach(result => {
        if (result && result.tableName && result.dataRef) {
          relationOptions.value[result.tableName] = result.dataRef;
        }
      });
      console.log('Edit Page: relationOptions populated (after itemDetail fetch):', relationOptions.value);
     }
  }
}, { immediate: true }); // Fetch immediately if itemDetail is already available on mount

// useAsyncData call removed
// const { data: relationOptions, pending: relationOptionsPending, error: relationOptionsError } = useAsyncData(
// ... existing code ...

onMounted(() => {
  if (table.value && id.value) {
    fetchItemDetail(table.value, id.value);
  } else {
    console.error('Table name or ID is missing from route parameters.');
    itemDetail.value = null;
    loading.value = false;
  }
});

function validateJsonField(fieldKey: string, value: any) {
  if (value === null || value === undefined || value === '') {
    // Empty or null values are valid
    delete jsonValidationErrors.value[fieldKey];
    return;
  }

  if (typeof value === 'string') {
    try {
      // Try to parse the JSON to validate it
      JSON.parse(value);
      // If parsing succeeds, remove any error for this field
      delete jsonValidationErrors.value[fieldKey];
    } catch (error) {
      // If parsing fails, store the error message
      jsonValidationErrors.value[fieldKey] = `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  } else {
    // If it's already an object/array, it's valid
    delete jsonValidationErrors.value[fieldKey];
  }
}

async function fetchItemDetail(tableName: string, itemId: string) {
  loading.value = true;
  saveSuccess.value = false;
  saveError.value = null;
  try {
    const apiUrl = `/api/v1/${tableName}/${itemId}`;
    const data: any = await $fetch(apiUrl);

    if (data.success && data.data) {
      itemDetail.value = data.data;
      // Initialize editableItemDetail with a deep clone of itemDetail
      editableItemDetail.value = JSON.parse(JSON.stringify(data.data));
      
      // Validate all JSON fields after loading
      if (tableConfig.value?.detailFields) {
        tableConfig.value.detailFields.forEach(field => {
          if (field.type === 'json') {
            validateJsonField(field.key, editableItemDetail.value[field.key]);
          }
        });
      }
    } else {
      itemDetail.value = null;
      console.error('Edit Page: Failed to fetch item details - success was false or data was missing:', data);
      saveError.value = data.message || 'Failed to load item data.';
    }
  } catch (err: any) {
    console.error('Edit Page: fetchItemDetail error:', err);
    itemDetail.value = null;
    saveError.value = err.message || 'An unexpected error occurred fetching item data.';
  } finally {
    loading.value = false;
  }
}

async function saveChanges() {
  if (!table.value || !id.value || !editableItemDetail.value) {
    saveError.value = 'Cannot save. Missing table, id, or data.';
    return;
  }

  // Prevent saving if there are JSON validation errors
  if (hasJsonValidationErrors.value) {
    saveError.value = 'Please fix the JSON validation errors before saving.';
    return;
  }

  loading.value = true;
  saveSuccess.value = false;
  saveError.value = null;

  try {
    // Create a copy of editableItemDetail and exclude readonly timestamp fields
    const dataToSave = { ...editableItemDetail.value };

    // Validate JSON fields before saving
    if (tableConfig.value?.detailFields) {
      tableConfig.value.detailFields.forEach(field => {
        if (field.type === 'json' && dataToSave[field.key] !== null && dataToSave[field.key] !== undefined) {
          const value = dataToSave[field.key];
          if (typeof value === 'string' && value.trim() !== '') {
            try {
              // Parse the JSON string to validate it
              const parsedJson = JSON.parse(value);
              dataToSave[field.key] = parsedJson;
            } catch (error) {
              throw new Error(`Invalid JSON format for field "${field.label || field.key}": ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
          }
        }

        // Remove readonly timestamp fields that shouldn't be updated by the client
        if (field.readOnly && (field.type === 'datetime' || field.key === 'createdAt' || field.key === 'updatedAt')) {
          delete dataToSave[field.key];
        }
      });
    }

    const apiUrl = `/api/v1/${table.value}/${id.value}`; // Assuming PUT or PATCH endpoint
    const res = await fetch(apiUrl, {
      method: 'PUT', // Or 'PATCH' depending on your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    });

    const data = await res.json();

    if (data.success) {
      saveSuccess.value = true;
      // Navigate back to the list page after successful save
      router.push(`/admin/${table.value}`);
    } else {
      saveError.value = data.message || 'Unknown error during save.';
    }
  } catch (err: any) {
    console.error('saveChanges error:', err);
    saveError.value = err.message || 'An unexpected error occurred.';
  } finally {
    loading.value = false;
  }
}

// Function to format date values for HTML date input (Unix timestamps)
function formatDateForInput(key: string) {
  if (!editableItemDetail.value || !(key in editableItemDetail.value)) {
    return '';
  }

  const value = editableItemDetail.value[key];

  if (!value || typeof value !== 'number') {
    return '';
  }

  // Convert Unix timestamp (seconds) to Date
  const date = new Date(value * 1000);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return '';
  }

  // Format as YYYY-MM-DD for HTML date input
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Function to handle date input changes
function handleDateInput(event: Event, key: string) {
  const target = event.target as HTMLInputElement;
  const dateString = target.value;

  console.log('handleDateInput called with:', { key, dateString, type: typeof dateString });

  if (dateString && editableItemDetail.value) {
    const date = new Date(dateString);
    console.log('Created date object:', { date, isValid: !isNaN(date.getTime()) });
    // Validate the date before using getTime()
    if (!isNaN(date.getTime())) {
      // Store as timestamp for database compatibility
      const timestamp = Math.floor(date.getTime() / 1000);
      console.log('Setting timestamp:', { key, timestamp });
      editableItemDetail.value[key] = timestamp;
    } else {
      console.error('Invalid date:', dateString);
      editableItemDetail.value[key] = null;
    }
  } else if (editableItemDetail.value) {
    // Clear the value if the input is empty
    editableItemDetail.value[key] = null;
  }
}


// Image upload functions
function triggerFileInput(fieldKey: string) {
  const fileInput = document.getElementById(`${fieldKey}-upload`) as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
}

function removeImage(fieldKey: string) {
  if (editableItemDetail.value) {
    editableItemDetail.value[fieldKey] = null;
  }
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
}

async function handleImageUpload(event: Event, fieldKey: string) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  if (!file) return;

  // Clear previous errors
  uploadErrors.value[fieldKey] = '';
  uploadingImages.value[fieldKey] = true;

  try {
    const formData = new FormData();
    formData.append('files', file);
    const { getImageBasePath } = await import('~~/shared/utils/imageTools.ts');

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
      editableItemDetail.value[fieldKey] = response.data.fileName;
    } else {
      uploadErrors.value[fieldKey] = response.message || 'Upload failed';
    }
  } catch (error: any) {
    console.error('Image upload error:', error);
    uploadErrors.value[fieldKey] = error.message || 'Upload failed';
  } finally {
    uploadingImages.value[fieldKey] = false;
    // Clear the file input
    input.value = '';
  }
}

// JSON field helper functions
function getJsonDisplayValue(fieldKey: string): string {
  if (!editableItemDetail.value || !(fieldKey in editableItemDetail.value)) {
    return '';
  }

  const value = editableItemDetail.value[fieldKey];

  if (value === null || value === undefined) {
    return '';
  }

  // If it's already a string, return as is
  if (typeof value === 'string') {
    return value;
  }

  // If it's an object or array, stringify it with formatting
  try {
    return JSON.stringify(value, null, 2);
  } catch (error) {
    return String(value);
  }
}

function updateJsonField(event: Event, fieldKey: string) {
  const target = event.target as HTMLTextAreaElement;
  const textValue = target.value;

  if (editableItemDetail.value) {
    // Store the raw text value without parsing
    // This allows users to input any text without restrictions
    editableItemDetail.value[fieldKey] = textValue;
  }
}

</script>
