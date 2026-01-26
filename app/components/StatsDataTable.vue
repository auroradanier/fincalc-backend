<script setup lang="ts">
import { format } from 'date-fns'

interface DataPoint {
  date: string
  users: number
  designs: number
  subscriptions: number
  orders: number
  aiImages: number
}

interface Props {
  data: DataPoint[]
}

const props = defineProps<Props>()

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return format(date, 'yyMMdd')
}
</script>

<template>
  <div class="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designs</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscriptions</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Images</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in data" :key="index" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDate(item.date) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.users }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.designs }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.subscriptions }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.orders }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.aiImages }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
