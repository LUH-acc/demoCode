<template>
  <div class="chart-box">
    <ul class="chart-list">
      <li class="list-item" @click="goChart(item.path)" v-for="item in chartlist" :key="item.path">{{ item.name }}</li>
    </ul>
    <div class="chart-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()
  const chartlist = [
    {
      name: '折线图',
      path: '/lineChart'
    },
    {
      name: '柱状图',
      path: '/barChart'
    },
  ]
  const goChart = (path) => {
    router.push(path)
  }
</script>

<style lang="less" scoped>
.chart-box {
  display: flex;

}
.chart-list {
  width: 150px;
  height: 300px;
  .list-item {
    height: 50px;
    border: 1px solid #888;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
}
.chart-content {
  flex: 1;
  height: 300px;
}
</style>
