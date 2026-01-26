<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { format } from 'date-fns'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
)

interface DataPoint {
  date: string
  [key: string]: any
}

interface Props {
  data: DataPoint[]
  dataType: string
}

const props = defineProps<Props>()

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: any = null

const getChartColor = () => {
  const colors: Record<string, string> = {
    users: 'rgba(59, 130, 246, 0.8)',
    designs: 'rgba(34, 197, 94, 0.8)',
    subscriptions: 'rgba(168, 85, 247, 0.8)',
    orders: 'rgba(249, 115, 22, 0.8)',
    aiImages: 'rgba(236, 72, 153, 0.8)'
  }
  return colors[props.dataType] || 'rgba(59, 130, 246, 0.8)'
}

const initChart = async () => {
  if (!chartCanvas.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  const labels = props.data.map(item => {
    const date = new Date(item.date)
    return format(date, 'yyMMdd')
  })

  const values = props.data.map(item => item[props.dataType] || 0)

  chartInstance = new ChartJS(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: props.dataType.charAt(0).toUpperCase() + props.dataType.slice(1),
        data: values,
        backgroundColor: getChartColor(),
        borderColor: getChartColor().replace('0.8', '1'),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  })
}

watch(() => props.data, async () => {
  await nextTick()
  await nextTick()
  initChart()
}, { deep: true })

watch(() => props.dataType, async () => {
  await nextTick()
  await nextTick()
  initChart()
})

watch(chartCanvas, async () => {
  if (chartCanvas.value) {
    await nextTick()
    await nextTick()
    initChart()
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<template>
  <div class="relative" style="height: 400px;">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
