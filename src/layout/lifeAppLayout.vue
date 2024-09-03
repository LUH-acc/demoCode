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
      <div v-for="item in routes" :key="item.path" @click="handleClick(item.path)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const routes = [
    {
      name: '清单',
      path: '/life-list',
    },
    {
      name: '广场',
      path: '/life-playground',
    },
    {
      name: '通知',
      path: '/life-notify',
    },
    {
      name: '我',
      path: '/life-my',
    },
  ]

  const handleClick = (path: string) => {
    console.log(123, path)

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
    background-color: #fff;
    padding: 0 20px;
    text-align: center;
    div {
      flex: 1;
    }
  }
</style>
