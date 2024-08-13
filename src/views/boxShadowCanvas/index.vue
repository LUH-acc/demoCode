<template>
  <div>
    <div class="img-box" :style="{ width: imgboxWidth + 'px' }">
      <img :src="imgUrl" alt="" />
    </div>
    <div>
      <input type="file" name="file" @change="handleFileChange" />
    </div>
    <div id="img-box">
      <span>canvas</span>
    </div>
    <div class="boxShadow" ref="boxShadow"> </div>
    <div><span>box-shadow</span></div>
  </div>
</template>

<script setup lang="ts">
  const imgUrl = ref()
  const boxShadow = ref()
  // 默认上传图片容器高度
  const imgboxWidth = ref(300)
  // 等比例图片高度
  const imgHeight = ref(0)
  // 流程
  // 文件对象 -> 读取文件内容 -> 显示图片 -> 绘制到canvas -> 获取像素点 -> 绘制阴影
  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      imgUrl.value = reader.result as string
      const img = new Image()
      img.src = imgUrl.value
      img.onload = () => {
        // 获取图片高度
        imgHeight.value = Math.floor(img.height * (imgboxWidth.value / img.width))
        // 显示图片
        createCanvas(img)
      }
    }
  }
  const createCanvas = (img: any) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = imgboxWidth.value
    canvas.height = imgHeight.value
    // 绘制图片到canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    // 将图片绘画到boxShadow
    document.querySelector('#img-box')?.appendChild(canvas)
    // 获取像素点
    const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let boxShadowStr = ''
    // 阴影像素点
    let x = 0
    let y = 0
    const maxLen = canvasData.data.length
    for (let i = 0; i < maxLen; i += 4) {
      boxShadowStr += `${x}px ${y}px rgb(${canvasData.data[i]}, ${canvasData.data[i + 1]}, ${canvasData.data[i + 2]}),`
      x++
      // 换行
      if (x >= canvas.width) {
        x = 0
        y++
      }
    }
    // 绘制阴影
    boxShadow.value.style.boxShadow = boxShadowStr.slice(0, boxShadowStr.length - 1)
  }
</script>

<style lang="less">
  .img-box {
    width: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .boxShadow {
    width: 1px;
    height: 1px;
  }
</style>
