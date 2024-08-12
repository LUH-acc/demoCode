<template>
  <div class="chat-box">
    <div class="chat-header">
      <!-- <div > -->
      <div
        class="chat-user"
        v-for="item in chatUserList"
        :key="item.userId"
        @click="getChatUser(item)"
      >
        {{ item.name }}
      </div>
      <!-- </div> -->
    </div>
    <div class="chat-content">
      <div class="chat-message">
        <p v-for="item in msgList" :key="item.id">
          {{ item.text }}
        </p>
      </div>
      <button @click="sendMsg">发送</button>
      <button @click="getMsg">接收</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { chatUserList } from './index'
  import axios from 'axios'

  const chatUser = ref({})
  onMounted(() => {
    // chatUser.value = chatUserList[0]
    function whl() {}
    whl.getVal = function () {
      console.log('123')
    }
    const whls = new whl()
    console.log(whl.getVal())

    // whls.getVal()
  })
  const msgList = reactive<Record<string, unknown>[]>([])
  const getChatUser = <T extends Record<string, unknown>>(User: T) => {
    console.log(User)
    chatUser.value = User
  }
  const sendMsg = () => {
    // fetch('http://127.0.0.1:3000/sendMsg?a=1', {
    //   method: 'POST',
    //   // headers: {
    //   //   'Content-Type': 'application/json;',
    //   // },
    //   body: JSON.stringify({
    //     text: 'hello',
    //   }),
    // }).then(async (res) => {
    //   const resVal = await res.json()
    //   msgList.push({
    //     id: new Date().getTime(),
    //     text: resVal.data.text,
    //   })
    // })
    axios
      .post('http://127.0.0.1:3000/sendMsg', {
        text: 'hello',
        ...chatUser.value,
      })
      .then(() => {
        msgList.push({
          id: new Date().getTime(),
          text: 'hello',
        })
      })
  }
  const getMsg = () => {
    fetch('http://127.0.0.1:3000/getMsg').then(async (res) => {
      const resVal = await res.json()
      msgList.push({
        id: new Date().getTime(),
        text: resVal.data.text,
      })
      console.log(msgList)
    })
  }
</script>

<style scoped lang="less">
  .chat-box {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  .chat-content {
    flex: 1;
    overflow: auto;
  }
  .chat-message {
    border: 1px solid #000;
    min-height: 300px;
  }
  .chat-header {
    display: flex;
    flex-wrap: nowrap;
    width: 100vw;
    overflow-x: auto;
    padding: 4px 8px;
    .chat-user {
      flex-shrink: 0;
      padding: 5px 8px;
      border: 1px solid blue;
      margin-right: 5px;
    }
  }
  .cutImg {
    width: 200px;
    height: 200px;
  }
</style>
