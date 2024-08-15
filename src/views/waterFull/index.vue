<template>
  <div class="water-full">
    <div
      class="water-full-item"
      v-for="item in list"
      :key="item.id"
      :style="{ width: `${item.with}px`, height: `${item.height}px`, backgroundColor: item.bg }"
    >
      {{ item.content }}
    </div>
  </div>
</template>
<!-- 瀑布流组件 -->
<script setup lang="ts">
  const waterFull = ref(null)
  const list = reactive<Record<string, any>[]>([])
  const pageX = ref(0)
  const width = 230
  const num = ref(0)
  const heightList = ref<number[]>([])

  const debounce = (fn: Function, delay: number) => {
    let timer: any = null
    return function (...args: any) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }

  onMounted(() => {
    pageX.value = document.documentElement.clientWidth || document.body.clientWidth
    num.value = Math.floor(pageX.value / width)
    console.log(num.value)
    heightList.value = Array.from({ length: num.value }, () => 0)

    createDiv()
  })

  function generateHexValue() {
    // 生成一个6位的16进制数值
    let hexValue = '#'
    for (let i = 0; i < 6; i++) {
      hexValue += '0123456789ABCDEF'[Math.floor(Math.random() * 16)]
    }
    return hexValue
  }
  const createDiv = () => {
    for (let i = 0; i < 15; i++) {
      let obj = {
        id: i,
        content: `内容${i}`,
        with: width,
        height: Math.floor(Math.random() * 100) + 250,
        bg: generateHexValue(),
      }
      list.push(obj)
    }
  }
</script>

<style>
  .water-full {
    position: relative;
  }
  .water-full-item {
    position: absolute;
  }
</style>
