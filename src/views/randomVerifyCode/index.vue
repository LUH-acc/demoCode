<template>
  <div>
    <h1>Random Verify Code</h1>
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { random } from '@/utils/util'
  const canvas = ref<HTMLCanvasElement>()

  const randomStr = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const randomColor = (min = 0, max = 255) => {
    const r = random(min, max)
    const g = random(min, max)
    const b = random(min, max)
    return `rgb(${r}, ${g}, ${b})`
  }

  onMounted(() => {
    canvas.value.width = 120
    canvas.value.height = 40
    draw()
  })
  // 画验证码
  const draw = () => {
    let ctx = canvas.value.getContext('2d')
    // ctx.fillStyle = '#fff'
    ctx.fillStyle = randomColor(150, 210)
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.font = '20px Arial'
    for (let i = 0; i < 4; i++) {
      let text = randomStr[random(0, randomStr.length - 1)]
      const deg = random(-20, 30)
      ctx.textBaseline = 'top'
      ctx.fillStyle = randomColor(80, 150)
      ctx.save()
      ctx.translate(30 * i, 0)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(text, 10, 15)
      ctx.restore()
      drawLine(ctx)
    }
    drawPoint(ctx)
  }
  // 画线条
  const drawLine = (ctx) => {
    ctx.beginPath()
    ctx.moveTo(random(0, canvas.value.width), random(0, canvas.value.height))
    ctx.lineTo(random(0, canvas.value.width), random(0, canvas.value.height))
    ctx.stroke()
    ctx.closePath()
  }
  // 画点
  const drawPoint = (ctx) => {
    for (let i = 0; i < 20; i++) {
      ctx.beginPath()
      ctx.arc(random(0, canvas.value.width), random(0, canvas.value.height), 1, 0, 2 * Math.PI)
      ctx.fillStyle = randomColor(150, 200)
      ctx.closePath()
      ctx.fill()
    }
  }
</script>

<style lang="less" scoped></style>
