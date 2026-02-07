<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
      <div class="mb-6">
        <svg class="mx-auto h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Admin Access</h1>
      
      <p class="text-gray-600 mb-6">
        This area is protected. Please authenticate using the browser login dialog.
      </p>
      
      <div class="space-y-3">
        <button
          @click="triggerAuth"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Enter Admin Area
        </button>
        
        <NuxtLink
          to="/"
          class="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to Home
        </NuxtLink>
      </div>
      
      <p class="mt-6 text-sm text-gray-500">
        If the login dialog doesn't appear, try refreshing the page or clearing your browser cache.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const triggerAuth = () => {
  // Make a request to trigger the basic auth dialog
  fetch('/admin', { cache: 'no-store' })
    .then(() => {
      // If successful, redirect to admin
      window.location.href = '/admin'
    })
    .catch(() => {
      // If failed, reload to trigger auth dialog again
      window.location.reload()
    })
}
</script>
