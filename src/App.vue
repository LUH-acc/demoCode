<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- <transition name="fade" mode="out-in"> -->
      <component :is="Component" />
      <!-- </transition> -->
    </router-view>
  </div>
</template>
<script setup lang="ts">
  onMounted(() => {
    // 创建性能观察者实例来监听资源加载事件
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      for (const entry of entries) {
        // 过滤静态资源类型
        if (['img', 'script', 'css', 'link'].includes(entry.initiatorType)) {
          // console.log(
          //   `资源 ${entry.name} 类型 ${entry.initiatorType} 耗时：${entry.duration.toFixed(2)} 毫秒`,
          // )
        }
      }
    })

    // 开始观察 Resource Timing 类型的性能条目
    observer.observe({ entryTypes: ['resource'] })
  })
</script>

<style scoped lang="less"></style>
