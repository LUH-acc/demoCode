<template>
  <div>
    <h1>canvas component</h1>
    <canvas ref="canvasDom" id="canvas" width="400" height="400"></canvas>
  </div>
</template>

<script setup lang="ts">
  const canvasDom = ref(null)

  onMounted(() => {
    const ctx = canvasDom.value.getContext('2d')
    // ctx?.beginPath()
    // ctx?.arc(100, 100, 50, 0, Math.PI * 2, true)
    // // ctx?.fillStyle = '#ffffff'
    // ctx.fillStyle = '#fff'
    // ctx.shadowColor = '#fff'
    // ctx.shadowBlur = 20
    // ctx.fill()
    createLinearGradientRect(ctx)
  })

  const createLinearGradientRect = (ctx) => {
    let grd = ctx.createLinearGradient(100, 100, 100, 200)
    grd.addColorStop(0, 'pink')
    grd.addColorStop(1, 'white')

    ctx.fillStyle = grd
    ctx.fillRect(100, 100, 200, 200)
  }
</script>

<style>
  #canvas {
    background-color: #000;
  }
</style>
