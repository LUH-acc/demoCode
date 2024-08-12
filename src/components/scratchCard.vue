<template>
  <div class="scratch-card">
    原图像
    <canvas id="scratch-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  const canvas = ref<HTMLCanvasElement | null>(null)
  const ctx = ref<CanvasRenderingContext2D | null>(null)

  onMounted(() => {
    init()
  })
  const init = () => {
    canvas.value = document.querySelector('#scratch-canvas')
    // 创建 canvas 画布
    ctx.value = canvas.value!.getContext('2d')
    // 设置容器宽高
    canvas.value!.width = 300
    canvas.value!.height = 200
    // 填充颜色
    ctx.value!.fillStyle = '#cccccc'
    // 设置透明度
    ctx.value!.globalAlpha = 1
    // 填充矩形
    ctx.value!.fillRect(0, 0, canvas.value!.width, canvas.value!.height)
    // 注册事件
    canvas.value?.addEventListener('touchstart', handleTouchStart, false)
  }
  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault()
    canvas.value?.addEventListener('touchmove', handleTouchMove, false)
    document.addEventListener('touchend', handleTouchEnd, false)
  }
  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault()
    const touch = event.touches[0]
    // 计算坐标
    const x = touch.clientX - canvas.value!.offsetLeft
    const y = touch.clientY - canvas.value!.offsetTop
    draw(x, y)
  }
  const handleTouchEnd = (event: TouchEvent) => {
    event.preventDefault()
    canvas.value?.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
    calcData()
  }
  const draw = (x: number, y: number) => {
    ctx.value!.beginPath()
    // 画笔颜色
    ctx.value!.fillStyle = '#000000'
    // 重要：设置全局CompositeOperation属性，否则无法擦除
    ctx.value!.globalCompositeOperation = 'destination-out'
    // 画笔样式 圆形 大小10px
    ctx.value?.arc(x, y, 10, 0, 2 * Math.PI)
    // 填充
    ctx.value?.fill()
  }
  /**
   * @description 计算擦除效果
   * 如果大于画布的70%的像素被擦除，则移除画布
   */
  const calcData = () => {
    let canvasData = ctx.value!.getImageData(0, 0, canvas.value!.width, canvas.value!.height)

    let num = 0
    let max = canvasData.data.length / 4
    for (let i = 0; i < canvasData.data.length; i += 4) {
      if (canvasData.data[i + 3] == 0) {
        num++
      }
    }
    if (num >= max * 0.7) {
      canvas.value?.remove()
    }
  }
</script>

<style scoped lang="less">
  .scratch-card {
    position: relative;
    width: 300px;
    height: 200px;
    .result {
      position: absolute;
    }
    #scratch-canvas {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
    }
  }
</style>
