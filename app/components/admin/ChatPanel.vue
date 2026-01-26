<template>
  <div>
    <!-- Chat Panel -->
    <div 
      :class="[
        'fixed top-4 h-[calc(100vh-2rem)] w-96 bg-white shadow-2xl rounded-lg transform transition-transform duration-300 ease-in-out z-[60] border border-gray-200',
        isOpen ? 'right-4 translate-x-0' : '-right-96 translate-x-0'
      ]"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white rounded-t-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <ChatBubbleOvalLeftEllipsisIcon class="w-6 h-6 text-white" />
            <div>
              <h2 class="text-lg font-semibold">AI Assistant</h2>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="$emit('close')"
              class="p-2 hover:bg-white/20 rounded-lg"
              title="Close Chat"
            >
              <XMarkIcon class="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <!-- Chat Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3" style="height: calc(100vh - 350px);">
        <div v-if="messages.length === 0" class="text-center text-gray-500 py-8">
          <ChatBubbleLeftRightIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p class="font-medium">Start a conversation</p>
          <p class="text-sm">Ask me anything!</p>
        </div>

        <div 
          v-for="message in messages" 
          :key="message.id"
          class="flex"
          :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div v-if="message.role === 'user'" class="flex items-start space-x-3 justify-end">
            <div 
              class="max-w-xs px-3 py-2 rounded-lg text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
            >
              <p>{{ message.content }}</p>
              <p class="text-xs mt-1 opacity-70">
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>
          <div v-else class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CpuChipIcon class="w-5 h-5 text-white" />
            </div>
            <div 
              class="max-w-xs px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-900"
            >
              <p>{{ message.content }}</p>
              <p class="text-xs mt-1 opacity-70">
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-gray-100 text-gray-900 max-w-xs px-3 py-2 rounded-lg">
            <div class="flex items-center space-x-2">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
              <span class="text-xs text-gray-500">AI is thinking...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="border-t border-gray-200 p-4 rounded-b-lg">
        <form @submit.prevent="handleSendMessage" class="space-y-3">
          <div>
              <textarea
                ref="messageInput"
                v-model="newMessage"
                @keydown="handleKeydown"
                placeholder="Type your message..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y text-sm min-h-[80px]"
                rows="6"
              ></textarea>
            </div>
            <div class="flex space-x-2">
              <button
                type="button"
                @click="clearChat"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 flex items-center justify-center text-sm"
                title="Clear Chat"
              >
                <span>Reset</span>
              </button>
              <button
                type="submit"
                :disabled="!newMessage.trim() || isLoading"
                class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
              >
                <PaperAirplaneIcon v-if="!isLoading" class="w-4 h-4" />
                <ArrowPathIcon v-else class="w-4 h-4 animate-spin" />
                <span>{{ isLoading ? 'Sending...' : 'Send' }}</span>
              </button>
            </div>
        </form>

        <!-- Error Display -->
        <div v-if="error" class="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-xs text-red-600">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useAI } from '~/composables/useAI'
import { 
  ChatBubbleOvalLeftEllipsisIcon, 
  XMarkIcon, 
  ChatBubbleLeftRightIcon, 
  CpuChipIcon, 
  PaperAirplaneIcon, 
  ArrowPathIcon 
} from '@heroicons/vue/24/outline'

// Props
interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
}>()

// Composables
const { messages, isLoading, error, sendMessage, clearMessages } = useAI()

// Local state
const newMessage = ref('')

// Methods
const handleSendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return
  
  const messageToSend = newMessage.value
  newMessage.value = ''
  
  await sendMessage(messageToSend)
}

const handleKeydown = (event: KeyboardEvent) => {
  // Send message on Ctrl+Enter
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    handleSendMessage()
  }
}

const clearChat = () => {
  clearMessages()
}

const formatTime = (timestamp: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(timestamp)
}

// Auto-scroll to bottom when new messages arrive
watch(messages, () => {
  nextTick(() => {
    const chatContainer = document.querySelector('.overflow-y-auto')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  })
}, { deep: true })

// Focus textarea when panel opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      const textarea = document.querySelector('textarea')
      if (textarea) {
        textarea.focus()
      }
    })
  }
})
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>