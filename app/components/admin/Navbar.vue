<template>
  <nav class="bg-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <NuxtLink to="/admin" class="text-white font-bold">Posterlet</NuxtLink>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <button
                v-for="item in topnavConfig"
                :key="item.name"
                @click="handleItemClick(item)"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {{ item.name }}
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            @click="handleLogout"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import topnavConfig from '~/config/nav/topnav'
import type { TopNavItem } from '~/config/nav/topnav'

const route = useRoute()

// Emits
const emit = defineEmits<{
  'toggle-sidebar': []
  'toggle-chat': []
}>()

const handleItemClick = (item: TopNavItem) => {
  if (item.emit) {
    emit(item.emit as any)
  }
}

async function handleLogout() {  
  try {
    console.log('Calling logout endpoint...')
    const response = await $fetch('/api/admin/logout', { 
      method: 'POST',
      credentials: 'include'
    })
    console.log('Logout response:', response)
  } catch (e) {
    console.log('Logout endpoint returned error (expected):', e)
  }

  // Clear any cached credentials
  await $fetch('/admin/login', {
    headers: {
      'Authorization': 'Basic invalid'
    },
    credentials: 'include'
  }).catch(() => {
    console.log('Cleared credentials')
  })

  // Force reload with timestamp
  const timestamp = new Date().getTime()
  window.location.replace(`/admin/login?t=${timestamp}`)
}
</script>