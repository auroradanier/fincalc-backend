<template>
  <div class="h-screen bg-gray-100 flex flex-col overflow-hidden">
    <!-- Top Navigation - Full Width -->
    <div class="fixed top-0 left-0 right-0 z-40">
      <AdminNavbar @toggle-sidebar="toggleSidebar" @toggle-chat="toggleChat" />
    </div>
    
    <!-- Layout with Sidebar -->
    <div class="flex flex-1 pt-16 h-full">
      <!-- Left Sidebar -->
      <AdminLeftSideNav ref="sidebarRef" />
      
      <!-- Main Content -->
      <main :class="[mainContentClasses, 'flex-1 py-6 px-4 overflow-y-auto min-h-0']">
        <slot />
      </main>
    </div>

    <!-- Chat Panel -->
    <AdminChatPanel :is-open="chatPanelOpen" @close="closeChatPanel" />

    <!-- Generic Modal -->
    <GenericModal
      :is-open="modalState.isOpen"
      :config="modalState.config"
      @close="closeModal"
      @submit="handleModalSubmit"
      ref="genericModalRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLeftSideNav from '~/components/admin/LeftSideNav.vue'
import AdminChatPanel from '~/components/admin/ChatPanel.vue'
import GenericModal from '~/components/admin/GenericModal.vue'

const sidebarRef = ref()
const { sidebarCollapsed } = useSystem()

// Chat panel state
const chatPanelOpen = ref(false)

// Modal management
const { modalState, closeModal, submitModal, setModalRef } = useModal()
const genericModalRef = ref()

onMounted(() => {
  if (genericModalRef.value) {
    setModalRef(genericModalRef.value)
  }
})

const handleModalSubmit = async (formData: Record<string, any>) => {
  try {
    const result = await submitModal(formData)
    if (result?.success) {
      // Emit event or refresh data if needed
      alert(result.message || 'Action completed successfully!')
    }
  } catch (error) {
    console.error('Modal submit error:', error)
  }
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleChat = () => {
  chatPanelOpen.value = !chatPanelOpen.value
}

const closeChatPanel = () => {
  chatPanelOpen.value = false
}

const mainContentClasses = computed(() => {
  return {
    'flex-1': true,
    'lg:ml-16': sidebarCollapsed.value,
    'lg:ml-64': !sidebarCollapsed.value
  }
})
</script>
