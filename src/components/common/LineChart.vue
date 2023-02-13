<template>
  <LineChart :chart-data="chartData" :options="options" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ChartData, ChartOptions, Chart, registerables } from 'chart.js'
import { LineChart } from 'vue-chart-3'
import { CHART_CONFIG } from '@/constants/ChartConstants'

type Mode = 'pc' | 'mobile'
const props = withDefaults(
  defineProps<{
    data: Array<number>
    color: string
    title: string
    labels: Array<string>
    mode: Mode
  }>(),
  {
    data: () => [0],
    color: 'rgb(199, 61, 77)',
    title: '',
    mode: 'pc',
  },
)

Chart.register(...registerables)

const options = ref<ChartOptions<'line'>>({
  responsive: true,
  interaction: {
    mode: 'nearest',
    intersect: false,
  },
  plugins: {
    title: {
      display: true,
      // text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || ''
          if (label) {
            label += ': '
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y
          }
          return label
        },
      },
    },
  },
  scales: {
    y: {
      display: true,
      ticks: {
        font: {
          size:
            props.mode === 'mobile'
              ? CHART_CONFIG.TYCK_FONT_SIZE_MOBILE
              : CHART_CONFIG.TYCK_FONT_SIZE_PC,
        },
      },
    },
  },
})

const chartData = computed<ChartData<'line'>>(() => {
  return {
    labels: props.labels,
    datasets: [
      {
        label: props.title,
        data: props.data,
        backgroundColor: props.color,
        borderColor: props.color,
        borderWidth: 1,
        pointRadius:
          props.mode === 'mobile' ? 1.5 : CHART_CONFIG.POINT_RADIUS_SIZE_PC,
      },
    ],
  }
})
</script>
