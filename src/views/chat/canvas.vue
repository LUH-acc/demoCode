<template>
  <div class="chat-canvas">
    <canvas class="chat-canvas-box" ref="canvas"></canvas>
    <img :src="imgUrl" alt="" ref="img" class="img" />
  </div>
  <div>
    <input type="file" @change="handleFileChange" />
  </div>
  <div>
    <img class="img2" :src="img2Url" alt="" />
  </div>
</template>

<script setup lang="ts">
  const imgUrl = ref('')
  const canvas = ref(null)
  const img = ref(null)
  const img2Url = ref('')

  onMounted(() => {
    canvasInit()
  })
  // 图片原生宽度
  let naturalWidth = 0
  // 图片原生高度
  let naturalHeight = 0
  // 图片缩放比例
  let ratioX = 0
  let ratioY = 0
  const canvasInit = () => {
    img.value.onload = () => {
      naturalWidth = img.value?.naturalWidth
      naturalHeight = img.value?.naturalHeight
      canvas.value.width = img.value.width
      canvas.value.height = img.value.height
      ratioX = naturalWidth / img.value.width
      ratioY = naturalHeight / img.value.height
    }
    canvas.value.addEventListener('mousedown', handleMouseDown, false)
  }
  // 画框开始坐标
  let startX = 0
  let startY = 0
  // 画框宽度,高度
  let rectWidth = 0
  let rectHeight = 0
  // 鼠标按下
  const handleMouseDown = (e) => {
    startX = e.clientX
    startY = e.clientY
    canvas.value.addEventListener('mousemove', handleMouseMove, false)
    canvas.value.addEventListener('mouseup', handleMouseUp, false)
  }
  // 鼠标移动
  const handleMouseMove = (e) => {
    rectWidth = e.clientX - startX
    rectHeight = e.clientY - startY
    let ctx = canvas.value.getContext('2d')
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.fillStyle = '#000'
    ctx.strokeRect(startX, startY, rectWidth, rectHeight)
  }
  // 鼠标抬起
  const handleMouseUp = () => {
    canvas.value.removeEventListener('mousemove', handleMouseMove, false)
    canvas.value.removeEventListener('mouseup', handleMouseUp, false)
    draw()
  }
  // 绘画
  const draw = () => {
    const canvas2 = document.createElement('canvas')
    canvas2.width = 300
    canvas2.height = 300

    const ctx = canvas2.getContext('2d')
    ctx.clearRect(0, 0, 300, 300)
    ctx.drawImage(
      img.value,
      startX * ratioX,
      startY * ratioY,
      rectWidth * ratioX,
      rectHeight * ratioY,
      0,
      0,
      300,
      300,
    )
    img2Url.value = canvas2.toDataURL()
  }
  // 图片上传
  const handleFileChange = (e) => {
    const fileReader = new FileReader()
    // 读取file对象，转换成base64编码
    fileReader.readAsDataURL(e.target.files[0])
    fileReader.onload = (e) => {
      // imgUrl.value = e.target.result
      // 创建image标签，读取img的宽度和高度
      // const image = new Image()
      // image.src = e.target.result
      imgUrl.value = e.target.result
      console.log('123')

      // image.onload = () => {
      //   // 宽高
      //   image.style.width = 20 + 'px'
      //   image.style.height = 50 + 'px'
      //   // 图片地址
      //   document.body.appendChild(image)
      //   console.log(image.width, image.height)
      // }
    }
    // inspectImgWH({
    //   width: 200,
    //   height: 200,
    //   file: e.target.files[0],
    // })
    //   .then((res) => {
    //     console.log('res', res)
    //   })
    //   .catch((err) => {
    //     console.log('err', err)
    //   })
  }

  const inspectImgWH = (data: { width: number; height: number; src?: string; file?: File }) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      function handleImgLoad() {
        const imgW = img.width
        const imgH = img.height
        if (imgW > data.width || imgH > data.height) {
          reject({
            status: false,
            msg: '图片尺寸超过限制',
            naturalWidth: imgW,
            naturalHeight: imgH,
          })
        }
        resolve({
          status: true,
          msg: '图片尺寸符合要求',
          naturalWidth: imgW,
          naturalHeight: imgH,
        })
      }
      if (data.src) {
        img.src = data.src
        img.onload = handleImgLoad
      } else if (data.file) {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(data.file)
        fileReader.onload = (e) => {
          img.src = e.target?.result as string
          img.onload = handleImgLoad
        }
      } else {
        reject({ status: false, msg: '请传入图片地址或文件' })
      }
    })
  }
</script>

<style lang="less">
  .chat-canvas {
    position: relative;
  }
  .img {
    width: 300px;
    height: 450px;
  }
  .chat-canvas-box {
    position: absolute;
    top: 0 !important;
    bottom: 0 !important;
    cursor: crosshair;
    // border: 1px solid red;
  }
  .img2 {
    border-radius: 999px;
  }
</style>
