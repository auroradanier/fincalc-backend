<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
    <div class="text-center max-w-md">
      <h1 class="text-6xl font-bold text-pink-600 mb-4">404</h1>
      <h2 class="text-2xl font-semibold mb-2">{{ $t('error.pageNotFound') }}</h2>
      <p class="text-gray-600 mb-8">{{ $t('error.redirecting') }}</p>
      
      <!-- Countdown timer -->
      <div class="mb-8">
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            class="bg-pink-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
            :style="{ width: `${(countdown / redirectDelay) * 100}%` }"
          ></div>
        </div>
        <p class="text-sm text-gray-500 mt-2">{{ $t('error.redirectingIn', { seconds: countdown }) }}</p>
      </div>
      
      <!-- Immediate redirect button -->
      <i18n-link 
        to="/"
        class="inline-block px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
      >
        {{ $t('error.goToHomepage') }}
      </i18n-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Set redirect delay in seconds
const redirectDelay = 5
const countdown = ref(redirectDelay)
let timer: NodeJS.Timeout | null = null

// Start countdown and redirect
onMounted(() => {
  // Log the 404 error
  console.log('[404] Page not found, redirecting to homepage')
  
  // Start countdown
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (timer) clearInterval(timer)
      navigateTo('/')
    }
  }, 1000)
})

// Clean up timer on component unmount
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

</script> 