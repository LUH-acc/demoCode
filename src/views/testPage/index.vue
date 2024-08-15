<template>
  <div>
    <canvas ref="canvas" width="200" height="200"></canvas>
  </div>
</template>

<script setup lang="ts">
  const canvas = ref(null) // 定义canvas变量

  onMounted(() => {
    drawArrow()
  })
  const drawArrow = function () {
    const ctx = canvas.value.getContext('2d') // 设置线条样式
    ctx.strokeStyle = '#000' // 线条颜色
    ctx.lineWidth = 2 // 线条宽度
    // 绘制螺旋形箭头

    ctx.beginPath()
    ctx.moveTo(50, 150) // 起点
    ctx.quadraticCurveTo(75, 130, 100, 100) // 第一段曲线
    ctx.quadraticCurveTo(125, 100, 125, 75) // 第二段曲线
    ctx.quadraticCurveTo(140, 75, 190, 30) // 第三段曲线
    // 箭头

    ctx.lineTo(180, 27) // 箭头上部分
    ctx.moveTo(190, 30) // 回到箭头下部分起点
    ctx.lineTo(188, 43) // 箭头下部分

    ctx.stroke() // 完成绘制
    // 设置透明背景（PNG导出时保持透明）

    canvas.value.style.backgroundColor = 'transparent'
  }
</script>

<style></style>
