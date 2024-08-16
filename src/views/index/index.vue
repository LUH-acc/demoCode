<template>
  <div>
    <div class="index-page">
      <div>index page </div>
      <div class="link" @click="handleClick()"> go lockyDraw </div>
      <div class="link" @click="goTODO">go todoList</div>
      <div class="link" @click="goPath('/chat')">go chat</div>
      <div class="link" @click="goPath('/canvasImg')">go canvasImg</div>
      <div class="link" @click="goPath('/dragPage')">go dragPage</div>
      <div class="link" @click="goPath('/resizePage')">go resizePage</div>
      <div class="link" @click="goPath('/toHtml')">go toHtml</div>
      <div class="link" v-for="item in routerList" :key="item.name" @click="goPath(item.path)">
        go to{{ item.name }}
      </div>
    </div>
    <div class="test"> asdfjaskdfjasdkfjasdkfjasldkfjalskdjflasdjfkasjdlfajsdl </div>
  </div>
</template>
<script setup lang="ts">
  const router = useRouter()

  const routerList = reactive([
    {
      name: 'canvas',
      path: '/canvas',
    },
    {
      name: 'changeImg',
      path: '/changeImg',
    },
    {
      name: 'boxShadowCanvas',
      path: '/boxShadowCanvas',
    },
    {
      name: 'waterFull',
      path: '/waterFull',
    },
    {
      name: 'testPage',
      path: '/testPage',
    },
  ])

  onMounted(() => {
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

  const handleClick = () => {
    console.log('执行')

    router.push('/luckyDraw')
  }
  const goTODO = () => {
    router.push('/todoList')
  }
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
    height: 1000px;
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
