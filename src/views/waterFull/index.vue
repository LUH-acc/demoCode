<template>
  <div>
    <div class="water-fall" :style="{ height: `${waterHeight}px` }">
      <div
        class="water-fall-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{
          width: `${item.with}px`,
          height: `${item.height}px`,
          backgroundColor: item.bg,
          top: item.top,
          left: item.left,
        }"
      >
        {{ item.content }}
      </div>
    </div>
    <div class="water-fall-loading"> loading... </div>
  </div>
</template>
<!-- 瀑布流组件 -->
<script setup lang="ts">
  const waterFall = ref(null)
  const list = reactive<Record<string, any>[]>([])
  const pageX = ref(0)
  const width = ref(0)
  const widthNative = 230
  const waterHeight = ref(0)
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
    // console.log(heightList.value)
    window.addEventListener('resize', resize)
    init()
    createDiv()
    observeLoading()
  })

  const observeLoading = () => {
    let box = document.querySelector('.water-full-loading')
    const observe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // box.style.display = 'none'
          // observe.disconnect()
          setTimeout(() => {
            createDiv()
          }, 2000)
        }
      })
    })
    observe.observe(box)
  }

  const addList = () => {
    // for (let index = 0; index < 10; index++) {
    //   const element = array[index]
    // }
  }

  const init = () => {
    // 获取页面宽度
    pageX.value = document.documentElement.clientWidth || document.body.clientWidth
    // 获取页面最大个数
    num.value = Math.floor(pageX.value / widthNative)
    // 每个容器的宽度
    width.value = Math.floor(pageX.value / num.value)

    // console.log(num.value)
    heightList.value = Array.from({ length: num.value }, () => 0)
  }

  const resize = debounce(() => {
    init()
    for (let i = 0; i < list.length; i++) {
      let index = isMin()
      let top = heightList.value[index] + 'px'
      list[i].top = top
      list[i].left = index * width.value + 'px'
      heightList.value[index] += list[i].height
    }
    isMax()
  }, 30)

  const isMin = () => {
    let index = 0
    let min = heightList.value[0]
    for (let i = 0; i < heightList.value.length; i++) {
      if (heightList.value[i] < min) {
        min = heightList.value[i]
        index = i
      }
    }
    return index
  }

  const isMax = () => {
    let index = 0
    let max = heightList.value[0]
    for (let i = 0; i < heightList.value.length; i++) {
      if (heightList.value[i] > max) {
        max = heightList.value[i]
        index = i
      }
    }
    waterHeight.value = max + 20
    return index
  }

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
      let index = isMin()
      let top = heightList.value[index] + 'px'
      let obj = {
        id: i,
        content: `内容${i}`,
        with: width,
        top,
        left: index * width.value + 'px',
        height: Math.floor(Math.random() * 100) + 250,
        bg: generateHexValue(),
      }
      heightList.value[index] += obj.height
      list.push(obj)
    }
    isMax()
  }
</script>

<style>
  .water-fall {
    position: relative;
    overflow-y: auto;
  }
  .water-fall-item {
    padding: 10px;
    position: absolute;
    box-sizing: border-box;
  }
  .water-fall-loading {
    height: 50px;
    background-color: lightblue;
  }
</style>
