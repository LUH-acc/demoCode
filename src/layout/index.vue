<template>
  <div class="layout">
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="footer">
      <!-- <div v-for="(item, index) in routes" :key="index" @click="() => router.push(item.path)">
        {{ item.meta.title }}
      </div> -->
      <div @click="handleClick('/index')"> 首页 </div>
      <div @click="handleClick('/about')"> 关于 </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { layoutRoutes } from '@/router'
  import { ref } from 'vue'
  const router = useRouter()
  const routes = ref(layoutRoutes)

  const handleClick = (path: string) => {
    router.push(path)
  }
</script>

<style scoped lang="less">
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content {
    flex: 1;
    overflow: auto;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: lightblue;
    padding: 0 20px;
    text-align: center;
    div {
      flex: 1;
    }
  }
</style>
