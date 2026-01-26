<template>
  <div>
    <!-- Mobile menu overlay -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-40 lg:hidden"
      @click="toggleSidebar"
    >
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
    </div>

    <!-- Sidebar -->
    <div 
      :class="[
        'fixed top-16 left-0 z-30 bg-gray-900 transform transition-all duration-300 ease-in-out flex flex-col',
        isCollapsed ? 'w-16' : 'w-64',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'h-[calc(100vh-4rem)]'
      ]"
    >
      <!-- Sidebar header with collapse button -->
      <div class="flex items-center justify-between h-12 px-4 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div v-if="!isCollapsed" class="text-white font-semibold text-sm">
          Navigation
        </div>
        <button 
          @click="toggleCollapse"
          class="text-gray-300 hover:text-white p-1 rounded transition-colors hidden lg:block"
          :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <ChevronLeftIcon v-if="!isCollapsed" class="h-5 w-5" />
          <ChevronRightIcon v-if="isCollapsed" class="h-5 w-5" />
        </button>
        <!-- Mobile close button -->
        <button 
          @click="toggleSidebar"
          class="text-gray-300 hover:text-white p-1 rounded transition-colors lg:hidden"
        >
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 min-h-0">
        <div v-if="isCollapsed" class="space-y-2">
          <!-- Collapsed view - show icons only -->
          <div v-for="category in sidenavConfig" :key="category.name" class="space-y-1">
            <NuxtLink
              v-for="item in category.items"
              :key="item.name"
              :to="item.href"
              :class="[
                $route.path === item.href
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex items-center justify-center px-3 py-3 text-sm font-medium rounded-md transition-colors'
              ]"
              :title="item.name"
            >
              <span class="text-xs font-bold">{{ item.name.charAt(0).toUpperCase() }}</span>
            </NuxtLink>
          </div>
        </div>
        
        <AccordionRoot 
          v-else
          type="multiple" 
          :default-value="defaultOpenCategories"
          class="space-y-2"
        >
          <AccordionItem 
            v-for="category in sidenavConfig" 
            :key="category.name" 
            :value="category.name"
            class="border-none"
          >
            <AccordionHeader>
              <AccordionTrigger class="flex items-center justify-between w-full px-3 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors">
                {{ category.name }}
                <ChevronDownIcon class="h-4 w-4 transition-transform duration-200" />
              </AccordionTrigger>
            </AccordionHeader>
            
            <AccordionContent class="pb-2">
              <div class="space-y-1 ml-2">
                <NuxtLink
                  v-for="item in category.items"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    $route.path === item.href
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
                  ]"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import sidenavConfig from '~/config/nav/sidenav'
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const isOpen = ref(false)
const { sidebarCollapsed: isCollapsed } = useSystem()

// Default open categories (all categories open by default)
const defaultOpenCategories = computed(() => 
  sidenavConfig.map(category => category.name)
)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// Expose the toggle functions for parent components
defineExpose({
  toggleSidebar,
  toggleCollapse,
  isOpen,
  isCollapsed
})
</script>

<style scoped>
/* Custom styles for accordion trigger rotation */
[data-state="open"] .h-4 {
  transform: rotate(180deg);
}
</style>