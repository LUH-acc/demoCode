<template>
  <div id="lineChart"></div>
</template>

<script setup lang="ts">
import { LineChart } from 'echarts/charts'
import { useEcharts } from './index'
const echarts = useEcharts(LineChart)
  const option: any = ref({})

  onMounted(() => {
    initChart()
  })

  const initChart = () => {
    let chartDom = document.getElementById('lineChart')
    let myChart = echarts.init(chartDom)
    option.value = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    }
    option.value && myChart.setOption(option.value)
  }
</script>

<style lang="less">
  #lineChart {
    height: 300px;
  }
</style>
