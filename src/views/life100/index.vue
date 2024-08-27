<template>
  <div class="life">
    <div class="life-container">
      <div class="life-header"> header </div>
      <div class="life-body">
        <div class="left">left</div>
        <div class="content">
          <div class="list">content</div>
        </div>
        <div class="right">right</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import _ from 'lodash'
  let lifeDom
  let leftHeaderDom
  let contentLefeDom
  onMounted(() => {
    lifeDom = document.querySelector('.life')
    leftHeaderDom = document.querySelector('.life-header')
    contentLefeDom = document.querySelector('.left')
    lifeDom.addEventListener('scroll', handleScroll)
  })

  const handleScroll = _.debounce(() => {
    console.log(lifeDom.scrollTop)

    if (lifeDom.scrollTop > 500) {
      leftHeaderDom.style.transform = 'translateY(-100%)'
      contentLefeDom.style.top = '20px'
    } else {
      contentLefeDom.style.top = '80px'
      leftHeaderDom.style.transform = 'translateY(0)'
    }
  }, 100)
</script>

<style lang="less" scoped>
  .life {
    height: 100vh;
    overflow: auto;
  }
  .life-container {
    // border: 1px solid red;
  }
  .life-header {
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: lightcoral;
    transition: transform 0.2s;
    transform: translateZ(0);
  }
  .life-body {
    margin: 20px auto;
    margin-top: 80px;
    display: flex;
    width: 60%;
    .left {
      position: sticky;
      top: 80px;
      width: 185px;
      height: 500px;
      background-color: burlywood;
    }
    .content {
      flex: 1;
      margin: 0 20px;
      overflow: auto;
      .list {
        height: 2000px;
        background-color: aquamarine;
      }
    }
    .right {
      width: 185px;
      height: 500px;
      background-color: cornflowerblue;
    }
  }
</style>
