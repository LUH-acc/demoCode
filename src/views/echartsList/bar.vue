<template>
  <div id="bar"></div>
</template>

<script setup lang="ts">
  import { BarChart } from 'echarts/charts'
  import { useEcharts } from '.'
  const echarts = useEcharts(BarChart)
  const option: any = ref({})

  onMounted(() => {
    initChart()
  })

  const initChart = () => {
    let chartDom = document.getElementById('bar')
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
          type: 'bar',
        },
      ],
    }
    option.value && myChart.setOption(option.value)
  }
</script>

<style lang="less" scoped>
  #bar {
    height: 300px;
  }
</style>
