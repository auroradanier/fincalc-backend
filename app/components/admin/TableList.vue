<template>
  <div v-if="items.length && displayedColumns.length" class="shadow-md rounded-lg">
    <table class="bg-white border-collapse border border-gray-200 min-w-max">
      <thead class="sticky top-0 z-10">
        <tr class="bg-gray-100 border-b border-gray-200">
          <th 
            v-for="colConfig in displayedColumns" 
            :key="colConfig.key" 
            :class="[
              'px-4 py-2 text-left text-xs font-medium uppercase tracking-wider',
              {'cursor-pointer hover:bg-gray-200 text-gray-700 font-semibold': colConfig.sortable}
            ]"
            @click="colConfig.sortable && handleSort(colConfig.key)"
          >
            {{ colConfig.title }}
            <span v-if="colConfig.sortable" class="ml-1">
              <template v-if="currentSortField === colConfig.key">
                <span v-if="currentSortDirection === 'asc'">↑</span>
                <span v-else-if="currentSortDirection === 'desc'">↓</span>
              </template>
              <template v-else>
                <span class="text-gray-400">↕</span>
              </template>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id" :class="{'bg-gray-50': index % 2 === 1, 'hover:bg-gray-100': true}">
          <td 
            v-for="colConfig in displayedColumns" 
            :key="colConfig.key" 
            class="px-4 py-2 border-b border-gray-200"
            :title="colConfig.tooltip ? colConfig.tooltip(item[colConfig.key]) : undefined"
          >
            <template v-if="colConfig.type === 'link' && colConfig.link">
              <NuxtLink 
                v-if="colConfig.link.type === 'internal'"
                :to="`${colConfig.link.path}${item[colConfig.link.param || 'id']}`"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {{ item[colConfig.key] }}
              </NuxtLink>
              <a 
                v-else-if="colConfig.link.type === 'external'"
                :href="colConfig.link.externalUrl"
                target="_blank"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {{ item[colConfig.key] }}
              </a>
            </template>
            <template v-else-if="colConfig.type === 'relation' && colConfig.relation">
              <NuxtLink 
                :to="`/admin/${colConfig.relation.table}/${item[colConfig.key]}`"
                class="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {{ colConfig.format ? colConfig.format(item[colConfig.key], item, props.relationData) : getRelationDisplay(item[colConfig.key], colConfig.relation) }}
              </NuxtLink>
            </template>
            <template v-else-if="colConfig.type === 'boolean'">
              <button 
                @click="toggleBoolean(item, colConfig.key)"
                :disabled="isFieldReadOnly(colConfig.key)"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200',
                  {
                    'cursor-not-allowed opacity-60': isFieldReadOnly(colConfig.key),
                    'cursor-pointer': !isFieldReadOnly(colConfig.key),
                    'bg-green-100 text-green-800': item[colConfig.key],
                    'bg-red-100 text-red-800': !item[colConfig.key],
                    'hover:bg-green-200': item[colConfig.key] && !isFieldReadOnly(colConfig.key),
                    'hover:bg-red-200': !item[colConfig.key] && !isFieldReadOnly(colConfig.key)
                  }
                ]"
              >
                {{ item[colConfig.key] ? 'Yes' : 'No' }}
              </button>
            </template>
            <template v-else-if="colConfig.type === 'image'">
              <div v-if="item[colConfig.key]" class="flex items-center relative">
                <!-- General image handling for all image columns -->
                <NuxtLink 
                  v-if="colConfig.relation"
                  :to="`/admin/${colConfig.relation.table}/${item[colConfig.key]}`"
                  class="block"
                >
                  <img 
                    :src="colConfig.format ? colConfig.format(item[colConfig.key], item, props.relationData) : item[colConfig.key]" 
                    :alt="item[colConfig.key]"
                    class="w-8 h-8 object-cover rounded border border-gray-300 cursor-pointer"
                    @error="(e) => { (e.target as HTMLImageElement).style.display = 'none' }"
                    @mouseenter="hoveredImage = colConfig.hoverPreview ? colConfig.hoverPreview(item[colConfig.key], item, props.relationData) : null"
                    @mouseleave="hoveredImage = null"
                  />
                </NuxtLink>
                <img 
                  v-else
                  :src="colConfig.format ? colConfig.format(item[colConfig.key], item, props.relationData) : item[colConfig.key]" 
                  :alt="item[colConfig.key]"
                  class="w-8 h-8 object-cover rounded border border-gray-300"
                  @error="(e) => { (e.target as HTMLImageElement).style.display = 'none' }"
                  @mouseenter="hoveredImage = colConfig.hoverPreview ? colConfig.hoverPreview(item[colConfig.key], item, props.relationData) : null"
                  @mouseleave="hoveredImage = null"
                />
                <!-- Hover preview image -->
                <div 
                  v-if="hoveredImage === (colConfig.hoverPreview ? colConfig.hoverPreview(item[colConfig.key], item, props.relationData) : null)"
                  class="absolute z-50 left-10 top-0 p-2 bg-white rounded-lg shadow-xl border border-gray-200"
                >
                  <img 
                    :src="hoveredImage"
                    :alt="item[colConfig.key]"
                    class="max-w-xs max-h-64 object-contain rounded"
                  />
                </div>
              </div>
              <span v-else class="text-gray-400 text-sm">No image</span>
            </template>
            <template v-else-if="colConfig.format">
              {{ colConfig.format(item[colConfig.key], item, props.relationData) }}
            </template>
            <template v-else-if="colConfig.type === 'actions'">
              <div class="flex space-x-2">
                <button
                  v-for="action in actions"
                  :key="action.key"
                  @click="handleAction(action, item)"
                  :class="[
                    'px-3 py-1 text-sm rounded transition-colors duration-200',
                    action.variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                    action.variant === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-700' :
                    'bg-green-600 text-white hover:bg-green-700'
                  ]"
                >
                  {{ action.title }}
                </button>
              </div>
            </template>
            <template v-else>
              {{ item[colConfig.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
   <div v-else-if="!loading" class="text-center py-8 text-gray-500">No data found or configuration missing.</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ColumnConfig } from '~/config/types';

const props = defineProps({
  items: {
    type: Array as () => any[],
    required: true,
  },
  displayedColumns: {
    type: Array as () => ColumnConfig[],
    required: true,
  },
  relationData: {
    type: Object as () => Record<string, Record<string, any>>,
    required: true,
  },
  currentSortField: {
    type: String as () => string | null,
    default: null,
  },
  currentSortDirection: {
    type: String as () => 'asc' | 'desc' | null,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  detailFields: {
    type: Array as () => any[],
    default: () => []
  },
  actions: {
    type: Array as () => any[],
    default: () => []
  }
});

const emit = defineEmits(['sort', 'toggle-boolean', 'action']);

const hoveredImage = ref<string | null>(null);

// Function to handle sorting, emits an event up to the parent
const handleSort = (columnKey: string) => {
  const column = props.displayedColumns.find(col => col.key === columnKey);
  if (column?.sortable) { // Use optional chaining for safety
    emit('sort', columnKey);
  }
};

// Function to check if a field is readonly
const isFieldReadOnly = (fieldKey: string) => {
  const detailField = props.detailFields.find(field => field.key === fieldKey);
  return detailField?.readOnly === true;
};

// Function to handle boolean toggle, emits an event up to the parent
const toggleBoolean = (item: any, fieldKey: string) => {
  if (!isFieldReadOnly(fieldKey)) {
    emit('toggle-boolean', item, fieldKey);
  }
};

// Function to get relation display value
const getRelationDisplay = (value: any, relation: any) => {
  // Ensure relation data for the table exists
  const relationItems = props.relationData[relation.table];
  if (!relationItems) return value;
  
  const item = relationItems[value];
  return item ? item[relation.displayField] : value;
};

// Function to handle action button clicks
const handleAction = (action: any, item: any) => {
  emit('action', action, item);
};

</script>