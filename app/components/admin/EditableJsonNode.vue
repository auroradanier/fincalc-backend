<template>
  <div class="editable-json-node">
    <!-- Object/Array with children -->
    <div v-if="isObject || isArray" class="json-object">
      <div 
        class="json-key-container flex items-center hover:bg-gray-50 rounded px-1 py-0.5"
      >
        <!-- Expand/Collapse Icon -->
        <svg 
          :class="{ 'rotate-90': isExpanded }"
          class="w-3 h-3 mr-1 transition-transform text-gray-500 cursor-pointer"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          @click="toggleExpansion"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        
        <!-- Key name (editable if not root and in editing mode) -->
        <input
          v-if="keyName !== null && isEditingKey && isEditing"
          v-model="editableKeyName"
          @blur="saveKeyName"
          @keydown.enter.prevent="saveKeyName"
          @keydown.esc="cancelKeyEdit"
          class="json-key text-blue-600 font-medium bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500 mr-1"
          ref="keyInput"
        />
        <span 
          v-else-if="keyName !== null" 
          :class="{ 'cursor-pointer hover:bg-blue-50 px-1 rounded': isEditing }"
          class="json-key text-blue-600 font-medium"
          @click="isEditing ? startKeyEdit() : null"
        >
          {{ keyName }}:
        </span>
        
        <!-- Type indicator -->
        <span class="json-type text-gray-500 ml-1">
          {{ isArray ? 'Array[' + Object.keys(data).length + ']' : 'Object{' + Object.keys(data).length + '}' }}
        </span>
        
        <!-- Preview when collapsed -->
        <span v-if="!isExpanded" class="json-preview text-gray-400 ml-2 truncate">
          {{ isArray ? '[...]' : '{...}' }}
        </span>
      </div>
      
      <!-- Children (when expanded) -->
      <div v-if="isExpanded" class="json-children ml-4 border-l border-gray-200 pl-2 mt-1">
        <EditableJsonNode
          v-for="(value, key) in data"
          :key="key"
          :data="value"
          :keyName="String(key)"
          :path="[...path, String(key)]"
          :expanded="expanded"
          :isEditing="isEditing"
          @toggle="$emit('toggle', $event)"
          @update="handleChildUpdate"
          @rename="handleChildRename"
        />
      </div>
    </div>
    
    <!-- Primitive values -->
    <div v-else class="json-primitive flex items-center px-1 py-0.5">
      <!-- Editable key name -->
      <input
        v-if="keyName !== null && isEditingKey && isEditing"
        v-model="editableKeyName"
        @blur="saveKeyName"
        @keydown.enter.prevent="saveKeyName"
        @keydown.esc="cancelKeyEdit"
        class="json-key text-blue-600 font-medium bg-transparent border-b border-blue-300 focus:outline-none focus:border-blue-500 mr-2"
        ref="keyInput"
      />
      <span 
        v-else-if="keyName !== null" 
        :class="{ 'cursor-pointer hover:bg-blue-50 px-1 rounded': isEditing }"
        class="json-key text-blue-600 font-medium mr-2"
        @click="isEditing ? startKeyEdit() : null"
      >
        {{ keyName }}:
      </span>
      
      <!-- Editable value -->
      <input
        v-if="isEditingValue && isEditing"
        v-model="editableValue"
        @blur="saveValue"
        @keydown.enter.prevent="saveValue"
        @keydown.esc="cancelValueEdit"
        :class="getValueClass(data)"
        class="json-value bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 flex-1"
        ref="valueInput"
      />
      <span 
        v-else
        :class="[getValueClass(data), { 'cursor-pointer hover:bg-gray-50 px-1 rounded': isEditing }]" 
        class="json-value flex-1"
        @click="isEditing ? startValueEdit() : null"
      >
        {{ formatValue(data) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'

interface Props {
  data: any
  keyName?: string | null
  path: string[]
  expanded: Set<string>
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  keyName: null,
  isEditing: false
})

const emit = defineEmits<{
  toggle: [path: string[]]
  update: [path: string[], key: string, value: any]
  rename: [path: string[], oldKey: string, newKey: string, value: any]
}>()

// Editing states
const isEditingKey = ref(false)
const isEditingValue = ref(false)
const editableKeyName = ref('')
const editableValue = ref('')

// Template refs
const keyInput = ref<HTMLInputElement>()
const valueInput = ref<HTMLInputElement>()

// Check data types
const isObject = computed(() => 
  props.data !== null && 
  typeof props.data === 'object' && 
  !Array.isArray(props.data)
)

const isArray = computed(() => Array.isArray(props.data))

// Check if current node is expanded
const isExpanded = computed(() => {
  const pathKey = props.path.join('.')
  return props.expanded.has(pathKey)
})

// Toggle expansion
const toggleExpansion = () => {
  emit('toggle', props.path)
}

// Key editing functions
const startKeyEdit = () => {
  if (props.keyName === null) return
  editableKeyName.value = props.keyName
  isEditingKey.value = true
  nextTick(() => {
    keyInput.value?.focus()
    keyInput.value?.select()
  })
}

const saveKeyName = () => {
  if (editableKeyName.value.trim() && editableKeyName.value !== props.keyName && props.keyName) {
    emit('rename', props.path.slice(0, -1), props.keyName, editableKeyName.value.trim(), props.data)
  }
  isEditingKey.value = false
}

const cancelKeyEdit = () => {
  isEditingKey.value = false
  editableKeyName.value = ''
}

// Value editing functions
const startValueEdit = () => {
  editableValue.value = formatValueForEdit(props.data)
  isEditingValue.value = true
  nextTick(() => {
    valueInput.value?.focus()
    valueInput.value?.select()
  })
}

const saveValue = () => {
  const newValue = parseValue(editableValue.value)
  emit('update', props.path.slice(0, -1), props.keyName || '', newValue)
  isEditingValue.value = false
}

const cancelValueEdit = () => {
  isEditingValue.value = false
  editableValue.value = ''
}

// Handle child updates
const handleChildUpdate = (path: string[], key: string, value: any) => {
  emit('update', path, key, value)
}

// Handle child renames
const handleChildRename = (path: string[], oldKey: string, newKey: string, value: any) => {
  emit('rename', path, oldKey, newKey, value)
}

// Format primitive values for display
const formatValue = (value: any): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'boolean') return value.toString()
  if (typeof value === 'number') return value.toString()
  return String(value)
}

// Format primitive values for editing
const formatValueForEdit = (value: any): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return value
  if (typeof value === 'boolean') return value.toString()
  if (typeof value === 'number') return value.toString()
  return String(value)
}

// Parse edited value back to appropriate type
const parseValue = (value: string): any => {
  const trimmed = value.trim()
  
  if (trimmed === 'null') return null
  if (trimmed === 'undefined') return undefined
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  
  // Try to parse as number
  const num = Number(trimmed)
  if (!isNaN(num) && isFinite(num)) return num
  
  // Try to parse as JSON (for objects/arrays)
  try {
    return JSON.parse(trimmed)
  } catch {
    // Return as string
    return trimmed
  }
}

// Get CSS class for different value types
const getValueClass = (value: any): string => {
  if (value === null || value === undefined) return 'text-gray-500 italic'
  if (typeof value === 'string') return 'text-green-600'
  if (typeof value === 'number') return 'text-purple-600'
  if (typeof value === 'boolean') return 'text-orange-600'
  return 'text-gray-800'
}
</script>

<style scoped>
.editable-json-node {
  font-size: 0.875rem;
  line-height: 1.4;
}

.json-key {
  font-weight: 500;
}

.json-value {
  word-break: break-word;
}

.json-preview {
  font-style: italic;
  max-width: 200px;
}
</style>