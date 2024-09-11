<template>
  <div class="target" @click="handleClick">
    <div class="target-title">
      <div class="target-name">
        <span><van-icon name="arrow-down" /></span>
        <span class="target-name-text">life100</span>
      </div>
      <div class="target-num">0/2</div>
    </div>
    <ul class="target-list">
      <li class="target-item"> 1.爬山顶看日出日落 </li>
      <li class="target-item"> 2.进行一次徒步 </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const handleClick = () => {
    console.log('targetCard clicked')
  }
</script>

<style scoped lang="less">
  .target {
    margin: 10px 15px;
    padding: 12px;
    background-color: #fff;
    border-radius: 5px;
  }
  .target-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #ccc;
    .target-name-text {
      color: #aaa;
      padding-left: 5px;
    }
  }
  .target-list {
    margin: 10px 8px;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #f6f7f9;
    .target-item {
      font-size: 14px;
      font-weight: 500;
      padding: 5px 0;
    }
  }
</style>
