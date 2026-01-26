<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center" style="background-color: rgba(0, 0, 0, 0.5);" @click.self="close">
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
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ config?.title || 'Modal' }}</h2>

      <!-- Dynamic Form Fields -->
      <form @submit.prevent="handleSubmit">
        <!-- Render fields dynamically based on config -->
        <div v-for="field in config?.fields" :key="field.key" class="mb-4">
          <!-- Text/Number Input -->
          <div v-if="field.type === 'text' || field.type === 'number'">
            <label :for="field.key" class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <input
              :id="field.key"
              v-model="formData[field.key]"
              :type="field.type"
              :required="field.required"
              :placeholder="field.placeholder"
              :min="field.min"
              :max="field.max"
              :step="field.step"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <!-- Textarea -->
          <div v-else-if="field.type === 'textarea'">
            <label :for="field.key" class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <textarea
              :id="field.key"
              v-model="formData[field.key]"
              :required="field.required"
              :placeholder="field.placeholder"
              :rows="field.rows || 3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
          </div>

          <!-- Checkbox -->
          <div v-else-if="field.type === 'checkbox'">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="formData[field.key]"
                type="checkbox"
                class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span class="ml-3 text-sm font-medium text-gray-700">
                {{ field.label }}
              </span>
            </label>
            <p v-if="field.description" class="text-xs text-gray-500 mt-1 ml-8">
              {{ field.description }}
            </p>
          </div>

          <!-- Select -->
          <div v-else-if="field.type === 'select'">
            <label :for="field.key" class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <select
              :id="field.key"
              v-model="formData[field.key]"
              :required="field.required"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
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
            {{ config?.cancelText || 'Cancel' }}
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? (config?.submittingText || 'Submitting...') : (config?.submitText || 'Submit') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

interface ModalField {
  key: string
  type: 'text' | 'number' | 'textarea' | 'checkbox' | 'select'
  label: string
  required?: boolean
  placeholder?: string
  description?: string
  defaultValue?: any
  min?: number
  max?: number
  step?: number
  rows?: number
  options?: { value: any; label: string }[]
}

interface ModalConfig {
  title: string
  fields: ModalField[]
  submitText?: string
  cancelText?: string
  submittingText?: string
}

interface Props {
  isOpen: boolean
  config: ModalConfig | null
}

interface Emits {
  (e: 'close'): void
  (e: 'submit', data: Record<string, any>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = reactive<Record<string, any>>({})
const error = ref('')
const isSubmitting = ref(false)

// Initialize form data when config changes
watch(() => props.config, (newConfig) => {
  if (newConfig) {
    // Reset form data
    Object.keys(formData).forEach(key => delete formData[key])
    
    // Set default values
    newConfig.fields.forEach(field => {
      formData[field.key] = field.defaultValue !== undefined ? field.defaultValue : getDefaultValue(field.type)
    })
  }
}, { immediate: true })

const getDefaultValue = (type: string) => {
  switch (type) {
    case 'checkbox':
      return false
    case 'number':
      return 0
    default:
      return ''
  }
}

const close = () => {
  emit('close')
  error.value = ''
  isSubmitting.value = false
}

const handleSubmit = () => {
  error.value = ''
  emit('submit', { ...formData })
}

// Expose methods for parent to control
defineExpose({
  setSubmitting: (value: boolean) => {
    isSubmitting.value = value
  },
  setError: (message: string) => {
    error.value = message
  }
})
</script>
