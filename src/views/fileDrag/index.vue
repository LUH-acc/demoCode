<template>
  <div>
    <div class="drag-area" ref="dragArea">
      <input class="file-input" type="file" @change="handleFile" />
      <img class="preview" v-if="fileUrl" :src="fileUrl" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const dragArea = ref(null)
  const fileUrl = ref('')

  onMounted(() => {
    init()
  })

  const init = () => {
    dragArea.value.addEventListener('dragover', handleDragOver)
    dragArea.value.addEventListener('dragenter', handleDragEnter)
    dragArea.value.addEventListener('drop', handleDrop)
  }

  const handleDragEnter = (event: any) => {
    console.log('handleDragEnter', event)
  }
  const handleDragOver = (event: any) => {
    event.preventDefault()
    dragArea.value.classList.add('drag-area-active')
  }
  const handleDrop = (event: any) => {
    console.log('handleDrop', event)
    event.preventDefault()
    dragArea.value.classList.remove('drag-area-active')
    const files = event.dataTransfer.files
    console.log(files)
    const file = files[0]
    console.log(file.type)

    // const reader = new FileReader()
    // reader.readAsDataURL(file)
    // reader.onload = (e) => {
    //   fileUrl.value = e.target.result
    // }
  }

  const handleFile = (event: any) => {
    console.log(event)
  }
</script>

<style scoped lang="less">
  .drag-area {
    margin: 20px auto;
    width: 150px;
    height: 150px;
    border-radius: 5px;
    background-color: #eee;
    position: relative;
  }
  .drag-area-active {
    background-color: #d9d9d9;
    outline: 2px dashed #409eff;
    padding: 10px;
  }
  .preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .file-input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>
