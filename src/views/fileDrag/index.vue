<template>
  <div>
    <div
      class="drag-area"
      ref="dragArea"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @dragenter="handleDragEnter"
    >
      <input class="file-input" type="file" />
      <img class="preview" v-if="fileUrl" :src="fileUrl" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const dragArea = ref(null)
  const fileUrl = ref('')

  const handleDragLeave = (event: any) => {
    console.log('handleDragLeave', event)
    dragArea.value.classList.remove('drag-area-active')
  }
  const handleDragEnter = (event: any) => {
    console.log('handleDragEnter', event)
    dragArea.value.classList.add('drag-area-active')
  }
  const handleDrop = (event: any) => {
    dragArea.value.classList.remove('drag-area-active')
    const files = event.dataTransfer.files
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      fileUrl.value = e.target.result
    }
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
