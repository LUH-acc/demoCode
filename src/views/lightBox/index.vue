<template>
  <div class="container">
    <div class="item" ref="cardRef1"> </div>
    <div class="item" ref="cardRef2"></div>
    <div class="item" ref="cardRef3"></div>
  </div>
</template>

<script setup lang="ts">
  import { cardLightShow } from './index'
  const { cardRef: cardRef1 } = cardLightShow({})
  const { cardRef: cardRef2 } = cardLightShow({})
  const { cardRef: cardRef3 } = cardLightShow({})
</script>

<style lang="less" scoped>
  .container {
    width: 600px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    padding-top: 100px;
  }
  .item {
    width: 160px;
    height: 200px;
    background-color: #000;
    position: relative;
  }
  .light {
    position: absolute;
    width: 80px;
    height: 80px;
    background-color: lightblue;
    filter: blur(40px);
    position: absolute;
  }
</style>
