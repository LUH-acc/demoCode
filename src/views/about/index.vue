<template>
  <div class="about" id="aboutbox">
    <h1>about</h1>
    <AboutComp :like="like" @changeLike="changeLike">
      hello world
      <template #likeText>
        <div>{{ like }} you</div>
      </template>
      <template #likeContent="content">
        {{ content.like }}
      </template>
    </AboutComp>
    <button v-print="printContent">打印</button>
  </div>
</template>

<script setup lang="ts">
  import AboutComp from './aboutComp'
  const like = ref('like')

  const changeLike = (val: string) => {
    like.value = val
  }
  const printContent = ref({
    id: 'aboutbox',
    // preview: true, // 预览工具是否启用
    // previewTitle: '预览页面的标题', // 预览页面的标题
    popTitle: '', // 打印页面的页眉
    previewBeforeOpenCallback() {
      console.log('正在加载预览窗口')
    },
    previewOpenCallback() {
      console.log('已经加载完预览窗口')
    },
    beforeOpenCallback(vue) {
      vue.printLoading = true
      console.log('打开之前')
    },
    openCallback(vue) {
      vue.printLoading = false
      console.log('执行了打印')
    },
    closeCallback() {
      console.log('关闭了打印工具')
    },
    clickMounted(vue) {
      console.log('点击了打印按钮')
      // vue.printSet.popTitle = vue.tableHead // 动态设置页眉
    },
  })
</script>

<style scoped lang="less">
  .about {
    height: 500px;
    background-color: aquamarine;
  }
</style>
