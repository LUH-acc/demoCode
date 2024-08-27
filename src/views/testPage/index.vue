<template>
  <div class="box">
    <div> test page </div>
    <div class="img-box">
      <img src="@/assets/pg1.jpg" alt="" />
    </div>
    <div>
      <button @click="handleClick">生成</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as domToImage from 'dom-to-image'

  const handleClick = () => {
    const img = document.querySelector('.box')
    domToImage.toPng(img).then((res) => {
      const a = document.createElement('a')
      a.href = res
      a.download = 'test.png'
      a.click()
    })
  }
</script>

<style lang="less" scoped>
  .img-box {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
</style>
