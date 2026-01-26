<template>
  <div v-if="filterConfigs?.length" class="flex gap-4 items-center">
    <div v-for="filterConfig in filterConfigs" :key="filterConfig.key" class="flex items-center gap-2">
      <label :for="`filter-${filterConfig.key}`" class="text-sm font-medium text-gray-700">{{ filterConfig.title }}:</label>
      <select 
        v-if="filterConfig.type === 'select'"
        :id="`filter-${filterConfig.key}`"
        :value="String(activeFilters[filterConfig.key] ?? '')"
        @change="updateFilter(filterConfig.key, ($event.target as HTMLSelectElement).value)"
        class="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All</option>
        <option 
          v-for="option in getFilterOptions(filterConfig)" 
          :key="String(option.value)" 
          :value="String(option.value)"
        >{{ option.label }}</option>
      </select>
      <!-- Add other filter types (boolean, text) here if needed -->
    </div>
    <button @click="$emit('resetFilters')" class="text-sm text-gray-500 hover:text-gray-700 underline">Reset Filters</button>
  </div>
</template>

<script setup lang="ts">
import type { FilterConfig, FilterOption } from '~/config/types';

const props = defineProps({
  filterConfigs: {
    type: Array as () => FilterConfig[] | undefined,
    default: () => [],
  },
  activeFilters: {
    type: Object as () => Record<string, string | number | boolean>,
    required: true,
  },
  relationData: {
    type: Object as () => Record<string, Record<string, any>>,
    required: true,
  },
  // getFilterOptions function is passed as a prop
  getFilterOptions: {
    type: Function as PropType<(filterConfig: FilterConfig) => FilterOption[]>,
    required: true,
  },
});

const emit = defineEmits(['update:activeFilters', 'resetFilters']);

const updateFilter = (key: string, value: string) => {
    const newFilters = { ...props.activeFilters };

    // Find the filter config to determine the correct type for the value
    const filterConfig = props.filterConfigs?.find(f => f.key === key);

    let typedValue: string | number | boolean | null = value;

    if (filterConfig) {
        if (filterConfig.type === 'boolean') {
            typedValue = value === 'true';
        } else if (filterConfig.type === 'select') {
            // Attempt to parse as number if it looks numeric
            const numValue = parseFloat(value);
             if (!isNaN(numValue) && isFinite(numValue)) {
                typedValue = numValue;
             } else {
                typedValue = value; // Keep as string if not a valid number
             }
        }
        // For other types (like 'text'), the value is already a string
    }

    // If the value is an empty string (from the 'All' option), set it to null or delete the key
    if (typedValue === '') {
        // Create a copy to avoid direct mutation issues
        const filtersWithoutKey = { ...newFilters };
        delete filtersWithoutKey[key]; 
        emit('update:activeFilters', filtersWithoutKey);
    } else {
        emit('update:activeFilters', { ...newFilters, [key]: typedValue }); // Emit new object
    }
};

</script> 