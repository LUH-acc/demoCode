<template>
  <div class="life">
    <div class="life-container">
      <div class="life-header"> 人生的100件事 </div>
      <div class="life-body">
        <div class="left">
          <div>已完成</div>
          <ul>
            <li>1. 滑雪</li>
            <li>2. 游泳</li>
          </ul>
        </div>
        <div class="content">
          <div class="list">
            <div class="item" v-for="item in 10" :key="item" @click="goDetail">
              <div class="item-top">
                <div class="avatar"><img src="@/assets/pg1.jpg" /></div>
                <div class="name">i am luh</div>
              </div>
              <div class="item-content"> 这是我的人生，我想要我的人生更精彩 </div>
              <div class="item-bottom" v-if="false">
                <div><van-icon name="thumb-circle-o" /></div>
                <div><van-icon name="comment-circle-o" /></div>
                <div><van-icon name="more-o" /></div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">right</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import _ from 'lodash'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  let lifeDom
  let leftHeaderDom
  let contentLefeDom

  onMounted(() => {
    lifeDom = document.querySelector('.life')
    leftHeaderDom = document.querySelector('.life-header')
    contentLefeDom = document.querySelector('.left')
    lifeDom.addEventListener('scroll', handleScroll)
  })

  const goDetail = () => {
    router.push('/lifeDetail')
  }

  const handleScroll = _.debounce(() => {
    console.log('handleScroll')

    if (lifeDom.scrollTop > 500) {
      leftHeaderDom.style.transform = 'translateY(-100%)'
      contentLefeDom.style.top = '20px'
    } else {
      contentLefeDom.style.top = '80px'
      leftHeaderDom.style.transform = 'translateY(0)'
    }
  }, 100)
</script>

<style lang="less" scoped>
  .life {
    height: 100vh;
    overflow: auto;
  }
  .life-container {
    // border: 1px solid red;
  }
  .life-header {
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    transition: transform 0.2s;
    transform: translateZ(0);
  }
  .life-body {
    margin: 20px auto;
    margin-top: 80px;
    display: flex;
    width: 60%;
    .left {
      position: sticky;
      top: 80px;
      width: 185px;
      height: 500px;
      background-color: burlywood;
    }
    .content {
      flex: 1;
      margin: 0 20px;
      overflow: auto;
      .list {
        // height: 2000px;
        // background-color: aquamarine;
      }
    }
    .right {
      width: 185px;
      height: 500px;
      background-color: cornflowerblue;
    }
  }
  .item {
    padding: 8px;
    margin-bottom: 15px;
    background: #fff;
    border-radius: 8px;
  }
  .item-top {
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .avatar {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 999px;
        border: 1px solid #ccc;
      }
    }
  }
  .item-content {
    min-height: 160px;
    padding: 10px 0;
    cursor: pointer;
    // border-bottom: 1px solid #ccc;
  }
  .item-bottom {
    margin-top: 5px;
    height: 35px;
    display: flex;
    align-items: center;
    div {
      height: 100%;
      flex: 1;
      text-align: center;
      font-size: 30px;
      cursor: pointer;
    }
  }
</style>
