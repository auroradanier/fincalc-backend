<template>
  <div class="flex justify-between items-center">
    <!-- Pagination controls -->
    <div class="flex items-center gap-2">
      <!-- First Page Button -->
      <button 
        @click="goToPage(1)"
        :disabled="currentPage <= 1"
        class="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        First
      </button>
      
      <!-- Previous Page Button -->
      <button 
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      
      <!-- Page Numbers -->
      <template v-for="pageNum in visiblePages" :key="pageNum">
        <button 
          v-if="pageNum !== '...'"
          @click="goToPage(pageNum as number)"
          :class="{ 
            'bg-blue-500 text-white hover:bg-blue-600': pageNum === currentPage, 
            'bg-gray-100 text-gray-700 hover:bg-gray-200': pageNum !== currentPage 
          }"
          class="px-3 py-1 rounded"
        >
          {{ pageNum }}
        </button>
        <span v-else class="px-2 py-1 text-gray-500">...</span>
      </template>
      
      <!-- Next Page Button -->
      <button 
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
      
      <!-- Last Page Button -->
      <button 
        @click="goToPage(totalPages)"
        :disabled="currentPage >= totalPages"
        class="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last
      </button>
    </div>
    
    <!-- Page indicator showing current/total -->
    <div class="text-sm text-gray-600 font-medium">
      {{ currentPage }}/{{ totalPages }}
    </div>
    
    <!-- Records per page dropdown on the right -->
    <div class="flex items-center gap-2">
      <label for="records-per-page" class="text-sm text-gray-600">Records per page:</label>
      <select
        id="records-per-page"
        :value="recordsPerPage"
        @change="handleRecordsPerPageChange"
        class="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  recordsPerPage: number
}

interface Emits {
  (e: 'page-change', page: number): void
  (e: 'records-per-page-change', recordsPerPage: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Computed property for visible page numbers
const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const pages: (number | string)[] = []
  
  if (total <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    if (current <= 4) {
      // Show pages 2-5 and ellipsis
      for (let i = 2; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
    } else if (current >= total - 3) {
      // Show ellipsis and last 4 pages
      pages.push('...')
      for (let i = total - 4; i <= total - 1; i++) {
        pages.push(i)
      }
    } else {
      // Show ellipsis, current page area, ellipsis
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
    }
    
    // Always show last page
    if (total > 1) {
      pages.push(total)
    }
  }
  
  return pages
})

// Function to navigate to a specific page
const goToPage = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages && newPage !== props.currentPage) {
    emit('page-change', newPage)
  }
}

// Function to handle records per page change
const handleRecordsPerPageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newRecordsPerPage = parseInt(target.value)
  emit('records-per-page-change', newRecordsPerPage)
}
</script>