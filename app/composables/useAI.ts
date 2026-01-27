import { ref, readonly } from 'vue'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIResponse {
  text: string
  error?: string
}

export const useAI = () => {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const conversationHistory = ref('')

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    }
    messages.value.push(newMessage)
  }

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return

    isLoading.value = true
    error.value = null

    // Add user message
    addMessage('user', content)
    conversationHistory.value += `User: ${content}\n`

    try {
      // Send message to server-side proxy endpoint to avoid CORS issues
      const response = await fetch('/api/ai/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history: conversationHistory.value,
        }),
      })

      if (!response.ok) {
        throw new Error(`Agent request failed with status ${response.status}`)
      }

      const data = await response.json()
      const responseText = data.response || data.message || 'No response from agent'

      addMessage('assistant', responseText)
      
      // Update conversation history with assistant response
      conversationHistory.value += `Assistant: ${responseText}\n`
      
      // Check for end signal
      if (responseText.includes('[TASK_COMPLETE]')) {
        console.log('Agent signaled task completion')
      }

    } catch (err: any) {
      console.error('Error in sendMessage:', err)
      error.value = err.message || 'An error occurred while processing your message'
      const errorMessage = `Sorry, I encountered an error: ${error.value}`
      addMessage('assistant', errorMessage)
      conversationHistory.value += `Assistant: ${errorMessage}\n`
    } finally {
      isLoading.value = false
    }
  };

  const clearMessages = () => {
    messages.value = []
    error.value = null
    conversationHistory.value = ''
  }

  return {
    messages: readonly(messages),
    isLoading: readonly(isLoading),
    error: readonly(error),
    sendMessage,
    clearMessages,
    addMessage
  }
}