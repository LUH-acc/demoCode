<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- <transition name="fade" mode="out-in"> -->
      <component :is="Component" />
      <!-- </transition> -->
    </router-view>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="less"></style>
