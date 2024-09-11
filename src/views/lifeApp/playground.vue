<template>
  <div class="page-full flex-container">
    <nav-bar title="广场" :show-back="false"> </nav-bar>
    <div class="flex-scroll">
      <div class="user-card" v-for="item in userList" :key="item.name">
        <div class="user-info">
          <div class="avatar">
            <img src="@/assets/pg1.jpg" alt="" />
          </div>
          <div class="user-name">
            <span>{{ item.name }}</span>
            <span>今天 20:00</span>
          </div>
        </div>
        <div class="user-content">
          <p class="content"> {{ item.content }} </p>
          <div class="img-list">
            <div class="content-img" v-for="i in item.imgList" :key="i">
              <img src="@/assets/pg2.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const userList = ref([
    {
      name: '张三',
      content: '你有什么值得一提的事情？',
      imgList: [1, 2, 3],
    },
    {
      name: '张2',
      content: '你有什么值得一提的事情？我的人生充满机遇，我想分享给你。',
      imgList: [1, 2],
    },
    {
      name: '张3',
      content: '你有什么值得一提的事情？',
      imgList: [1],
    },
    {
      name: '张4',
      content: '你有什么值得一提的事情？',
      imgList: [1, 2, 3, 2],
    },
    {
      name: '张5',
      content: '你有什么值得一提的事情？',
      imgList: [1, 2, 3, 2, 3],
    },
  ])
</script>

<style scoped lang="less">
  .user-card {
    margin-top: 5px;
    padding: 10px;
    background-color: #fff;
  }
  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    .avatar {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .user-name {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      span:last-child {
        font-size: 12px;
        margin-top: 3px;
        color: #999;
      }
    }
  }
  .user-content {
    margin-top: 10px;
    .img-list {
      display: flex;
      flex-wrap: wrap;

      .content-img {
        width: 100px;
        height: 100px;
        margin: 10px 10px 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
