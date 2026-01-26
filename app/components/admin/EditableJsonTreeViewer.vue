<template>
  <div class="editable-json-tree-viewer">
    <div class="mb-4 flex justify-between items-center">
      <h3 class="text-lg font-medium">JSON Editor</h3>
      <div class="space-x-2">
        <button
          v-if="!isEditing"
          @click="startEditing"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <template v-else>
          <button
            @click="saveChangesAndExit"
            :disabled="saving"
            class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Save' }}
          </button>
          <button
            @click="cancelEditing"
            :disabled="saving"
            class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Cancel
          </button>
        </template>
      </div>
    </div>

    <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>

    <div class="border rounded-lg p-4 bg-gray-50">
      <EditableJsonNode
        v-if="editableData !== null && editableData !== undefined"
        :data="editableData"
        :key-name="'root'"
        :path="[]"
        :expanded="expandedNodes"
        :is-editing="isEditing"
        @toggle="toggleNode"
        @update="handleUpdate"
        @rename="handleRename"
      />
      <div v-else class="text-gray-500 italic">No data</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import EditableJsonNode from './EditableJsonNode.vue'

interface Props {
  data: any
  label: string
  fieldKey: string
  tableName: string
  itemId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  updated: [fieldKey: string, newData: any]
}>()

// Reactive state
const editableData = ref<any>(null)
const originalData = ref<any>(null)
const isEditing = ref(false)
const saving = ref(false)
const error = ref('')
const expandedNodes = ref<Set<string>>(new Set())

// Initialize data
const initializeData = () => {
  try {
    if (typeof props.data === 'string') {
      editableData.value = JSON.parse(props.data)
    } else {
      editableData.value = props.data
    }
    originalData.value = JSON.parse(JSON.stringify(editableData.value))
  } catch (e) {
    error.value = 'Invalid JSON data'
    editableData.value = {}
    originalData.value = {}
  }
}

// Watch for data changes
watch(() => props.data, initializeData, { immediate: true })

// Functions
const startEditing = () => {
  isEditing.value = true
  error.value = ''
}

const cancelEditing = () => {
  editableData.value = JSON.parse(JSON.stringify(originalData.value))
  isEditing.value = false
  error.value = ''
}

const saveChangesAndExit = async () => {
  saving.value = true
  error.value = ''
  
  try {
    console.log('saveChangesAndExit - editableData.value:', editableData.value);
    console.log('saveChangesAndExit - props.fieldKey:', props.fieldKey);
    emit('updated', props.fieldKey, editableData.value)
    originalData.value = JSON.parse(JSON.stringify(editableData.value))
    isEditing.value = false
  } catch (e) {
    console.error('Save error:', e);
    error.value = 'Failed to save changes'
  } finally {
    saving.value = false
  }
}

const toggleNode = (path: string[]) => {
  const pathKey = path.join('.')
  if (expandedNodes.value.has(pathKey)) {
    expandedNodes.value.delete(pathKey)
  } else {
    expandedNodes.value.add(pathKey)
  }
}

const handleUpdate = (path: string[], key: string, value: any) => {
  // Navigate to the correct location in the data structure
  let current = editableData.value
  
  // Navigate to the parent object/array
  for (const pathKey of path) {
    if (current && typeof current === 'object') {
      current = current[pathKey]
    }
  }
  
  // Regular value update
  if (current && typeof current === 'object') {
    current[key] = value
  }
}

const handleRename = (path: string[], oldKey: string, newKey: string, value: any) => {
  // Navigate to the correct location in the data structure
  let current = editableData.value
  
  // Navigate to the parent object/array
  for (const pathKey of path) {
    if (current && typeof current === 'object') {
      current = current[pathKey]
    }
  }
  
  // Handle key rename
  if (current && typeof current === 'object' && oldKey in current) {
    // Delete the old key and set the new key
    delete current[oldKey]
    current[newKey] = value
  }
}
</script>