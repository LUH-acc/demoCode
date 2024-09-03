<template>
  <div class="page-full flex-container">
    <nav-bar :title="'有爱清单'" :show-back="false">
      <template #right>
        <van-icon name="search" />
      </template>
    </nav-bar>
    <van-tabs v-model:active="active" @click-tab="handleClick">
      <van-tab title="目标"></van-tab>
      <van-tab title="习惯"></van-tab>
      <van-tab title="手记"></van-tab>
    </van-tabs>
    <div class="flex-scroll">
      <target-card v-for="item in 10" :key="item"></target-card>
    </div>
    <div class="add-target" @click="goAddTarget"> <van-icon name="plus" /> </div>
  </div>
</template>

<script setup lang="ts">
  import targetCard from './comp/targetCard.vue'
  const active = ref(0)

  const handleClick = () => {
    console.log(active.value)
  }
  const goAddTarget = () => {
    console.log('go add target')
  }
</script>

<style scoped lang="less">
  .add-target {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 50px;
    box-shadow: 0px 0px 11px 3px rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
  }
</style>
