<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <div v-if="errorMessage" class="bg-red-100 text-red-800 p-4 rounded-md mb-8">
      {{ errorMessage }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatCard
        title="Users"
        :value="stats.totalUsers"
        :change="userIncrease"
        :icon="UserGroupIcon"
        icon-color="bg-blue-500"
        :period="getPeriodLabel()"
      />
      <StatCard
        title="Designs"
        :value="stats.totalDesigns"
        :change="designIncrease"
        :icon="PhotoIcon"
        icon-color="bg-green-500"
        :period="getPeriodLabel()"
      />
      <StatCard
        title="Subscriptions"
        :value="stats.totalSubscriptions"
        :change="subscriptionIncrease"
        :icon="CreditCardIcon"
        icon-color="bg-purple-500"
        :period="getPeriodLabel()"
      />
      <StatCard
        title="Orders"
        :value="stats.totalOrders"
        :change="orderIncrease"
        :icon="ShoppingBagIcon"
        icon-color="bg-orange-500"
        :period="getPeriodLabel()"
      />
      <StatCard
        title="AI Images"
        :value="stats.totalAiImages || 0"
        :change="aiImageIncrease"
        :icon="SparklesIcon"
        icon-color="bg-pink-500"
        :period="getPeriodLabel()"
      />
    </div>

      <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div class="flex gap-2">
            <button
              v-for="type in ['users', 'designs', 'subscriptions', 'orders', 'aiImages']"
              :key="type"
              @click="setDataType(type)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                dataType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ type === 'aiImages' ? 'AI Images' : type.charAt(0).toUpperCase() + type.slice(1) }}
            </button>
          </div>

          <div class="flex gap-2 items-center">
            <button
              v-for="range in ['day', 'week', 'month']"
              :key="range"
              @click="setDateRange(range)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                timeRange === range
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ range.charAt(0).toUpperCase() + range.slice(1) }}
            </button>

            <div class="flex items-center gap-2">
              <input
                type="date"
                v-model="customStartDate"
                @change="handleCustomDateRange"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start Date"
              >
              <span class="text-gray-500">-</span>
              <input
                type="date"
                v-model="customEndDate"
                @change="handleCustomDateRange"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="End Date"
              >
            </div>
          </div>
        </div>

        <div class="flex gap-2 items-center mb-4">
          <span class="text-sm font-medium text-gray-600">Stat Period:</span>
          <button
            v-for="period in ['day', 'week', 'month']"
            :key="period"
            @click="statPeriod = period"
            :class="[
              'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
              statPeriod === period
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ period.charAt(0).toUpperCase() + period.slice(1) }}
          </button>
        </div>

        <div v-if="chartData.length === 0" class="text-center py-8 text-gray-500">
          No data available for selected period
        </div>

        <template v-else>
          <div class="mb-4 text-lg font-semibold text-gray-700">
            Total: {{ periodTotal.toLocaleString() }}
          </div>

          <StatsChart :data="chartData" :data-type="dataType" />
          <StatsDataTable :data="chartData" />
        </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { format, parseISO, subDays, isValid } from 'date-fns'
import {
  UserGroupIcon,
  PhotoIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'admin' })

const loading = ref(true)
const errorMessage = ref<string | null>(null)
const dataType = ref<'users' | 'designs' | 'subscriptions' | 'orders' | 'aiImages'>('users')
const timeRange = ref<'day' | 'week' | 'month' | 'custom'>('day')
const statPeriod = ref<'day' | 'week' | 'month'>('day')
const customStartDate = ref<string>('')
const customEndDate = ref<string>('')

const stats = ref({
  totalUsers: 0,
  totalDesigns: 0,
  totalSubscriptions: 0,
  totalOrders: 0,
  totalAiImages: 0,
  usersByDate: [] as any[],
  designsByDate: [] as any[],
  subscriptionsByDate: [] as any[],
  ordersByDate: [] as any[],
  aiImagesByDate: [] as any[]
})

const initializeDateFields = () => {
  const today = new Date()
  let startDate: Date
  
  switch (timeRange.value) {
    case 'day':
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 30)
      break
    case 'week':
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 30)
      break
    case 'month':
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 30)
      break
    default:
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 30)
  }
  
  customStartDate.value = format(startDate, 'yyyy-MM-dd')
  customEndDate.value = format(today, 'yyyy-MM-dd')
}

const chartData = computed(() => {
  const data = []
  const today = new Date()
  let count: number
  let intervalDays: number
  
  switch (timeRange.value) {
    case 'day':
      count = 30
      intervalDays = 1
      break
    case 'week':
      count = 30
      intervalDays = 7
      break
    case 'month':
      count = 30
      intervalDays = 30
      break
    case 'custom':
      if (customStartDate.value && customEndDate.value) {
        const start = parseISO(customStartDate.value)
        const end = parseISO(customEndDate.value)
        if (isValid(start) && isValid(end)) {
          count = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
          intervalDays = 1
        }
      }
      break
    default:
      count = 30
      intervalDays = 1
  }
  
  for (let i = count - 1; i >= 0; i--) {
    const endDate = new Date(today)
    endDate.setDate(endDate.getDate() - (i * intervalDays))
    const endDateStr = format(endDate, 'yyyy-MM-dd')
    
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - (intervalDays - 1))
    const startDateStr = format(startDate, 'yyyy-MM-dd')
    
    let users = 0
    let designs = 0
    let subscriptions = 0
    let orders = 0
    let aiImages = 0
    
    if (timeRange.value === 'day' || timeRange.value === 'custom') {
      users = stats.value.usersByDate.find((u: any) => u.date === endDateStr)?.count || 0
      designs = stats.value.designsByDate.find((d: any) => d.date === endDateStr)?.count || 0
      subscriptions = stats.value.subscriptionsByDate.find((s: any) => s.date === endDateStr)?.count || 0
      orders = stats.value.ordersByDate.find((o: any) => o.date === endDateStr)?.count || 0
      aiImages = stats.value.aiImagesByDate.find((a: any) => a.date === endDateStr)?.count || 0
    } else {
      for (let j = 0; j < intervalDays; j++) {
        const checkDate = new Date(startDate)
        checkDate.setDate(checkDate.getDate() + j)
        const checkDateStr = format(checkDate, 'yyyy-MM-dd')
        
        users += stats.value.usersByDate.find((u: any) => u.date === checkDateStr)?.count || 0
        designs += stats.value.designsByDate.find((d: any) => d.date === checkDateStr)?.count || 0
        subscriptions += stats.value.subscriptionsByDate.find((s: any) => s.date === checkDateStr)?.count || 0
        orders += stats.value.ordersByDate.find((o: any) => o.date === checkDateStr)?.count || 0
        aiImages += stats.value.aiImagesByDate.find((a: any) => a.date === checkDateStr)?.count || 0
      }
    }
    
    data.push({
      date: endDateStr,
      users,
      designs,
      subscriptions,
      orders,
      aiImages
    })
  }
  
  return data
})

const getPeriodLabel = () => {
  const labels: Record<string, string> = {
    day: 'Last Day',
    week: 'Last Week',
    month: 'Last Month'
  }
  return labels[statPeriod.value]
}

const getTodayValue = (dataByDate: any[]) => {
  const today = new Date()
  const todayStr = format(today, 'yyyy-MM-dd')
  const todayData = dataByDate.find((item: any) => item.date === todayStr)
  return todayData ? todayData.count : 0
}

const getPreviousValue = (dataByDate: any[]) => {
  const today = new Date()
  let previousDate: Date
  let previousDateStr: string
  
  switch (statPeriod.value) {
    case 'day':
      previousDate = new Date(today)
      previousDate.setDate(previousDate.getDate() - 1)
      previousDateStr = format(previousDate, 'yyyy-MM-dd')
      break
    case 'week':
      previousDate = new Date(today)
      previousDate.setDate(previousDate.getDate() - 7)
      previousDateStr = format(previousDate, 'yyyy-MM-dd')
      break
    case 'month':
      previousDate = new Date(today)
      previousDate.setMonth(previousDate.getMonth() - 1)
      previousDateStr = format(previousDate, 'yyyy-MM-dd')
      break
    default:
      return 0
  }
  
  const previousData = dataByDate.find((item: any) => item.date === previousDateStr)
  return previousData ? previousData.count : 0
}

const todayUsers = computed(() => getTodayValue(stats.value.usersByDate))
const previousUsers = computed(() => getPreviousValue(stats.value.usersByDate))
const userIncrease = computed(() => todayUsers.value - previousUsers.value)

const todayDesigns = computed(() => getTodayValue(stats.value.designsByDate))
const previousDesigns = computed(() => getPreviousValue(stats.value.designsByDate))
const designIncrease = computed(() => todayDesigns.value - previousDesigns.value)

const todaySubscriptions = computed(() => getTodayValue(stats.value.subscriptionsByDate))
const previousSubscriptions = computed(() => getPreviousValue(stats.value.subscriptionsByDate))
const subscriptionIncrease = computed(() => todaySubscriptions.value - previousSubscriptions.value)

const todayOrders = computed(() => getTodayValue(stats.value.ordersByDate))
const previousOrders = computed(() => getPreviousValue(stats.value.ordersByDate))
const orderIncrease = computed(() => todayOrders.value - previousOrders.value)

const todayAiImages = computed(() => getTodayValue(stats.value.aiImagesByDate))
const previousAiImages = computed(() => getPreviousValue(stats.value.aiImagesByDate))
const aiImageIncrease = computed(() => todayAiImages.value - previousAiImages.value)

const periodTotal = computed(() => {
  return chartData.value.reduce((sum, item) => sum + item[dataType.value], 0)
})

const setDataType = (type: 'users' | 'designs' | 'subscriptions' | 'orders' | 'aiImages') => {
  dataType.value = type
}

const setDateRange = (range: 'day' | 'week' | 'month') => {
  timeRange.value = range
  
  const today = new Date()
  let startDate: Date
  
  switch (range) {
    case 'day':
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 30)
      break
    case 'week':
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - (78 * 7))
      break
    case 'month':
      startDate = new Date(today)
      startDate.setMonth(startDate.getMonth() - 72)
      break
    default:
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 30)
  }
  
  customStartDate.value = format(startDate, 'yyyy-MM-dd')
  customEndDate.value = format(today, 'yyyy-MM-dd')
  
  fetchStats()
}

const handleCustomDateRange = () => {
  if (customStartDate.value && customEndDate.value) {
    const start = parseISO(customStartDate.value)
    const end = parseISO(customEndDate.value)
    
    if (isValid(start) && isValid(end)) {
      const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysDiff > 90) {
        errorMessage.value = 'Date range cannot exceed 90 days'
        return
      }
      
      if (daysDiff < 0) {
        errorMessage.value = 'End date must be after start date'
        return
      }
      
      errorMessage.value = null
      fetchStats()
    }
  }
}

const fetchStats = async () => {
  try {
    let url = '/api/stats'
    
    if (timeRange.value === 'custom' && customStartDate.value && customEndDate.value) {
      url += `?startDate=${customStartDate.value}&endDate=${customEndDate.value}`
    } else if (timeRange.value === 'day' || timeRange.value === 'week' || timeRange.value === 'month') {
      url += `?range=${timeRange.value}`
    }
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.success) {
      stats.value = data.data
    } else {
      errorMessage.value = data.message || 'Failed to load stats'
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'An error occurred while loading stats'
  }
}

onMounted(async () => {
  initializeDateFields()
  await fetchStats()
  loading.value = false
})
</script>
