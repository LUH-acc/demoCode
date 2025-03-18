<template>
    <div id="lineChart"></div>
</template>
  
<script setup lang='ts'>
  import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers'; 

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);


const option: any = ref({});

onMounted(() => { 
  initChart();
});

const initChart = () => {
  let chartDom = document.getElementById('lineChart');
  let myChart = echarts.init(chartDom);
  option.value = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
option.value && myChart.setOption(option.value);
}



</script>
  
<style lang="less">
  #lineChart {

    height: 300px;
  }
</style>