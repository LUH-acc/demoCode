<template>
  <div class="side-nav">
    <div class="side-nav-wrap">
      <ul class="side-nav-list">
        <li
          class="side-nav-item"
          :class="{ 'side-nav-item-acitve': item.id === activeId }"
          v-for="(item, index) in naveList"
          :key="item.id"
          @click="handleClick(item.id, index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="content" ref="content">
      <div class="content-item" v-for="item in naveList" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const naveList = reactive([
    {
      id: 'a',
      name: '我是a号标签',
      top: 0,
    },
    {
      id: 'b',
      name: '我是b号标签',
      top: 0,
    },
    {
      id: 'c',
      name: '我是c号标签',
      top: 0,
    },
    {
      id: 'd',
      name: '我是d号标签',
      top: 0,
    },
    {
      id: 'e',
      name: '我是e号标签',
      top: 0,
    },
    {
      id: 'f',
      name: '我是f号标签',
      top: 0,
    },
  ])
  const content = ref(null)
  const activeId = ref('a')
  let listDom
  onMounted(() => {
    listDom = document.querySelectorAll('.content-item')
    content.value.addEventListener('scroll', handleScroll)
    init()
  })

  const init = () => {
    listDom.forEach((item, index) => {
      let parentTop = content.value.getBoundingClientRect().top
      let itemTop = item.getBoundingClientRect().top
      // 获取元素距离父元素顶部的距离
      let top = Math.floor(itemTop - parentTop)
      naveList[index].top = top
    })
  }

  const handleClick = (id: string, index: number) => {
    activeId.value = id
    let top = naveList[index].top
    content.value.scrollTo({ top, behavior: 'smooth' })
  }

  const debounce = (func, wait = 100) => {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func(...args)
      }, wait)
    }
  }
  const handleScroll = debounce((e) => {
    let scrollTop = e.target.scrollTop
    for (let i = 0; i < naveList.length; i++) {
      if (scrollTop >= naveList[i].top * 0.85) {
        activeId.value = naveList[i].id
      }
    }
  })
</script>

<style scoped lang="less">
  .side-nav {
    display: flex;
    width: 700px;
    height: 800px;
    margin: 0 auto;
    border: 1px solid red;
    margin-top: 100px;
  }
  .side-nav-wrap {
    border: 1px solid green;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .side-nav-list {
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 10px;
    .side-nav-item {
      padding: 10px;
      cursor: pointer;
    }
    .side-nav-item-acitve {
      color: rgb(209, 133, 40);
    }
  }
  .content {
    flex: 1;
    overflow: auto;
  }
  .content-item {
    width: 100%;
  }
  .content-item:nth-child(even) {
    height: 200px;
    background-color: burlywood;
  }
  .content-item:nth-child(odd) {
    height: 300px;
    background-color: cadetblue;
  }
</style>
