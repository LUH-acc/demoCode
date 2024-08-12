<template>
  <div>
    <div>
      <input type="file" name="file" @change="handleFileChange" />
    </div>
    <div>
      <div>
        <span>witdh:</span>
        <input type="text" v-model="imgWidth" @input="handleWidthChange" />
      </div>
      <div>
        <span>height:</span>
        <input type="text" v-model="imgHeight" @input="handleHeightChange" />
      </div>
      <div><button @click="confirm">确定</button></div>
      <div>
        <img ref="imgDom" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const imgWidth = ref()
  const imgHeight = ref()
  const imgDom = ref(null)
  const imgUrlCopy = ref('')
  const ratio = ref(1)
  const Nwidth = ref(0)
  const NHeigth = ref(0)
  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    const img = new Image()
    reader.onload = (e) => {
      img.src = e.target.result
      imgUrlCopy.value = e.target.result
      img.onload = () => {
        imgWidth.value = img.width
        imgHeight.value = img.height
        Nwidth.value = img.width
        NHeigth.value = img.height
        ratio.value = img.width / img.height
      }
    }
  }

  const handleWidthChange = () => {
    imgHeight.value = Math.floor(Number(imgWidth.value) / ratio.value)
  }
  const handleHeightChange = () => {
    imgWidth.value = Math.floor(Number(imgHeight.value) * ratio.value)
  }
  const confirm = () => {
    // imgDom.value.style.width = `${imgWidth.value}px`
    // imgDom.value.style.height = `${imgHeight.value}px`

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = imgWidth.value
    canvas.height = imgHeight.value
    const img = new Image()
    img.src = imgUrlCopy.value
    img.onload = () => {
      // Nwidth 原图片的宽
      // NHeigth 原图片的高
      ctx.drawImage(img, 0, 0, Nwidth.value, NHeigth.value, 0, 0, imgWidth.value, imgHeight.value)
      // imgDom.value.src = canvas.toDataURL()
      // canvas.toBlob((blob) => {
      //   const file = new File([blob], 'newImg.png', { type: 'image/png' })
      //   console.log(file)
      // })
      document.body.appendChild(canvas)
    }

    // imgDom.value.src = imgUrlCopy.value
    // const newImg = new Image()
    // newImg.src = imgUrlCopy.value
    // newImg.setAttribute('width', `${imgWidth.value}`)
    // newImg.setAttribute('height', `${imgHeight.value}`)
    // document.body.appendChild(newImg)
  }
</script>

<style scoped lang="less"></style>
