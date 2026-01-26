<script setup lang="ts">
import { type Component } from 'vue'

interface Props {
  title: string
  value: number
  change: number
  icon: Component
  iconColor: string
  period?: string
}

const props = withDefaults(defineProps<Props>(), {
  period: 'Last Day'
})
</script>

<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-500">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">{{ value }}</p>
        <div class="flex items-center gap-2 mt-1">
          <p class="text-lg font-medium" :class="change >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ change >= 0 ? '+' : '' }}{{ change }}
          </p>
          <p class="text-xs text-gray-400">{{ period }}</p>
        </div>
      </div>
      <div :class="`${iconColor} p-3 rounded-full`">
        <component :is="icon" class="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
</template>
