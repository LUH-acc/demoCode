<template>
  <div>
    <div class="index-page">
      <div>index page </div>
      <div class="link" v-for="item in routerList" :key="item.name" @click="goPath(item.path)">
        go to {{ item.name }}
      </div>
    </div>
    <div class="test"> </div>
  </div>
</template>
<script setup lang="ts">
  import { routes } from '@/router'

  const router = useRouter()

  const routerList = ref<{ name: string; path: string }[]>([])

  const filterRoute = () => {
    routerList.value = routes
      .filter((item) => !item.meta || !item.meta.hidden)
      .map((item) => {
        return {
          name: item.name,
          path: item.path,
        }
      })
  }

  onMounted(() => {
    filterRoute()
    let testDom = document.querySelector('.test')
    const originStyle = window.getComputedStyle(testDom)
    // const container = document.createElement('div')
    const styleNames: string[] = Array.prototype.slice.apply(originStyle)
    // console.log(styleNames)

    styleNames.forEach((name) => {
      if (name === 'line-height' || name === 'padding-top') {
        console.log(originStyle.getPropertyValue(name))
      }
      // container.style.setProperty(name, originStyle.getPropertyValue(name))
    })
  })
  const goPath = (path: string) => {
    router.push(path)
  }
</script>
<style scoped lang="less">
  .index-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background-color: lightpink;
  }
  .link {
    border: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
  }
  .test {
    line-height: 1.6;
  }
</style>
