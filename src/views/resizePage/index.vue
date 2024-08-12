<template>
  <div class="resize-page">
    <div class="container"></div>
    <div class="resize"></div>
    <div class="bottom"></div>
  </div>
</template>

<script setup lang="ts">
  const Y = ref(0)
  let resize = null
  let container = null
  let bottom = null
  const resizeHeight = ref(0)
  onMounted(() => {
    resize = document.querySelector('.resize')
    container = document.querySelector('.container')
    bottom = document.querySelector('.bottom')

    resize?.addEventListener('mousedown', mousedown)
  })
  const mousedown = (e) => {
    mouseup()
    Y.value = e.clientY
    document?.addEventListener('mousemove', mousemove, false)
    document.addEventListener('mouseup', mouseup, false)
  }
  const mouseup = () => {
    resizeHeight.value = bottom.offsetHeight
    document?.removeEventListener('mousemove', mousemove, false)
    document.removeEventListener('mouseup', mouseup, false)
  }
  const mousemove = (e) => {
    const height = Y.value - e.clientY
    bottom.style.height = `${resizeHeight.value + height}px`
  }
</script>

<style>
  .resize-page {
    display: flex;
    flex-direction: column;
    height: 700px;
    width: 100%;
  }
  .container {
    flex: 1;
    background-color: aqua;
  }
  .resize {
    min-height: 18px;
    cursor: row-resize;
    position: relative;
    z-index: 10;
  }
  .bottom {
    height: 300px;
    background-color: yellow;
  }
</style>
