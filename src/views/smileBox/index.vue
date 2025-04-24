<template>
  <div>
    <div class="box" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <p class="t">AAA码农欢仔</p>
      <p class="t">中奖一千万 </p>
      <div class="smile-container" ref="smile">
        <div class="smile">
          <div class="eye-box">
            <div class="eye" ref="eye"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as _ from 'lodash'
  const smile = ref()
  const eye = ref()
  const LENGTH = 250
  const HEIGHT = 200
  const rect = ref(null)
  onMounted(() => {
    rect.value = eye.value.getBoundingClientRect()
  })
  const handleMouseLeave = () => {
    eye.value.style.left = '15px'
    eye.value.style.top = '15px'
  }
  const handleMouseMove = _.throttle((e) => {
    let left = rect.value.left + 15
    let top = rect.value.top + 15
    let X = left - e.clientX
    let Y = Math.floor(top) - e.clientY

    let XRate = Math.round((X / LENGTH) * 100) / 100
    let YRate = Math.round((Y / HEIGHT) * 100) / 100
    eye.value.style.left = Math.floor(15 - 15 * XRate) + 'px'
    eye.value.style.top = Math.floor(15 - 15 * YRate) + 'px'
  }, 0)
</script>

<style lang="less" scoped>
  .box {
    background-color: #f4b5ae;
    width: 500px;
    height: 400px;
    margin: 0 auto;
    .t {
      text-align: center;
    }
  }
  .smile-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 300px;
  }
  .smile {
    width: 150px;
    height: 150px;
    border-radius: 999px;
    background-color: #f2cc84;
    position: relative;
    .eye-box {
      width: 60px;
      height: 60px;
      background-color: #fff;
      border-radius: 999px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .eye {
      width: 30px;
      height: 30px;
      background-color: #000;
      border-radius: 999px;
      position: absolute;
      top: 15px;
      left: 15px;
    }
  }
</style>
