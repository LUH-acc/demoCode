<template>
  <div class="article-flod">
    <div class="content"> {{ contentText }} </div>
    <div class="footer" v-if="show">
      <span @click="showAll">点击展开全部,剩余 {{ ratio }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { contentText } from './text'

  const show = ref(true)
  const ratio = ref(0)
  let articleFlod: any

  onMounted(() => {
    const content = document.querySelector('.content')
    articleFlod = document.querySelector('.article-flod')
    const height = content.scrollHeight
    ratio.value = Math.floor((articleFlod.clientHeight / height) * 100)
  })
  const showAll = () => {
    show.value = false
    articleFlod.style.height = 'auto'
    articleFlod.style.overflow = 'visible'
  }
</script>

<style scoped lang="less">
  .article-flod {
    width: 800px;
    height: 700px;
    margin: 10px auto;
    overflow: hidden;
    position: relative;
  }
  .content {
    width: 100%;
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100px;
    background-color: lightblue;
  }
</style>
