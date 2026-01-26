<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click.self="close">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
      <!-- Close button -->
      <button 
        @click="close" 
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Modal Header -->
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Grant Credits</h2>

      <!-- User Info -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <p class="text-sm text-gray-600">Granting credits to:</p>
        <p class="font-semibold text-gray-800">{{ user.name }}</p>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <!-- Credit Amount -->
        <div class="mb-4">
          <label for="creditAmount" class="block text-sm font-medium text-gray-700 mb-2">
            Credit Amount <span class="text-red-500">*</span>
          </label>
          <input
            id="creditAmount"
            v-model.number="formData.amount"
            type="number"
            min="1"
            step="1"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter credit amount"
          />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Enter a description for this credit grant"
          ></textarea>
        </div>

        <!-- Expiration Toggle -->
        <div class="mb-6">
          <label class="flex items-center cursor-pointer">
            <input
              v-model="formData.shouldExpire"
              type="checkbox"
              class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span class="ml-3 text-sm font-medium text-gray-700">
              Credits should expire in 1 year
            </span>
          </label>
          <p class="text-xs text-gray-500 mt-1 ml-8">
            If unchecked, credits will never expire
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button
            type="button"
            @click="close"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Granting...' : 'Grant Credits' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Props {
  isOpen: boolean
  user: {
    id: string
    name: string
    email: string
  }
}

interface Emits {
  (e: 'close'): void
  (e: 'submit', data: {
    amount: number
    description: string
    shouldExpire: boolean
  }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = reactive({
  amount: 1000,
  description: 'Admin credit grant',
  shouldExpire: true
})

const error = ref('')
const isSubmitting = ref(false)

const close = () => {
  emit('close')
  // Reset form
  formData.amount = 1000
  formData.description = 'Admin credit grant'
  formData.shouldExpire = true
  error.value = ''
}

const handleSubmit = () => {
  // Validation
  if (!formData.amount || formData.amount <= 0) {
    error.value = 'Please enter a valid credit amount'
    return
  }

  error.value = ''
  emit('submit', {
    amount: formData.amount,
    description: formData.description || 'Admin credit grant',
    shouldExpire: formData.shouldExpire
  })
}

// Expose isSubmitting for parent to control
defineExpose({
  setSubmitting: (value: boolean) => {
    isSubmitting.value = value
  },
  setError: (message: string) => {
    error.value = message
  }
})
</script>
