<template>
  <div class="video-container">
    <div>
      <input type="file" @change="handleFileChange" />
    </div>
    <div>
      <div style="text-align: center;">视频帧画面</div>
      <div class="show-img">
        <img :src="imgUrl" alt="">
      </div>
      <div class="video-img-container" v-if="imgList.length">
        <div class="video-img" v-for="(item, index) in imgList" :key="index" @click="imgUrl = item.url">
          <img :src="item.url" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div>
    v-for of
    <div v-for="(item, index) of Obj" :key="index">
    {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const imgList = ref<{ [x: string]: any }>([])
  const videoDuration = ref(0)
  const imgUrl = ref('https://via.placeholder.com/300x500')
  const NUM = 7

  const Obj = reactive([
  {
    name: '张三',
    age: 20,
    address: '北京市',
  },
  {
    name: '张三',
    age: 20,
    address: '北京市',
  }
  ])

  const handleFileChange = async (e: Event) => {
    const file = (e.target as any).files[0]
    await getVideoDuration(file)
    let len = Math.floor(videoDuration.value / NUM)
    console.log(len);
    
    for (let index = 0; index < NUM; index++) {
      // 保证顺序一致
      const res = await cuptureVideo(file, len * index)
        imgList.value.push({
          id: index,
          ...res,
        })
        
    }
  }

  const canvas = document.createElement('canvas')
  canvas.width = 300
  canvas.height = 200
  // 截取图片
  const cuptureVideo = (file, time) => {
    return new Promise((resolve) => {
      const vde = document.createElement('video')
      vde.currentTime = time
      vde.muted = true
      vde.autoplay = true
      vde.src = URL.createObjectURL(file)
      vde.oncanplay = () => {
        const ctx = canvas.getContext('2d')
        ctx.drawImage(vde, 0, 0, canvas.width, canvas.height)
        destroyVideo(vde)
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          return resolve({
            url,
            blob,
          })
        })
      }
    })
  }
  // 计算视频时长&获取第一张图片
  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const vde = document.createElement('video')
      vde.muted = true
      vde.autoplay = true
      vde.currentTime = 1
      vde.src = URL.createObjectURL(file)
      // 获取第一张图片
      vde.oncanplay = () => {
        // 获取视频时长，计算多次截图的间隔
        videoDuration.value = Math.floor(vde.duration)
        destroyVideo(vde)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(vde, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blob) => {
          imgUrl.value= URL.createObjectURL(blob)
        })
        resolve(vde.duration)
      }
    })
  }
  // 清除引用
  const destroyVideo = (video: any) => {
    video.onloadedmetadata = null
    video.pause();
    URL.revokeObjectURL(video.src)
  }
</script>

<style scoped lang="less">
  .video-img-container {
    display: flex;
    height: 100px;
    width: 500px;
    justify-content: space-around;
    .video-img {
      margin: 10px 4px;
      width: 100px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .video-container {
    margin: 10px auto;
    display: flex;
    align-items: center;
  }
  .show-img {
    width: 500px;
    height: 500px;
    text-align: center;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
</style>
