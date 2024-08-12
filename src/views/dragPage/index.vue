<template>
  <div class="drag-box">
    <div
      draggable="true"
      class="drag-item"
      v-for="(item, index) in list"
      :key="item.id"
      @dragstart="dragStart($event, index)"
      @dragenter="dragEnter($event, index)"
      @dragover="dragOver"
      @dragend="dragEnd"
    >
      {{ item.text }}
    </div>
  </div>
  <div class="box-outer">
    <div class="box-inner"></div>
  </div>
</template>

<script setup lang="ts">
  const list = reactive([
    { id: 1, name: 'apple1', text: 'apple1' },
    { id: 2, name: 'apple2', text: 'apple2' },
    { id: 3, name: 'apple3', text: 'apple3' },
    { id: 4, name: 'apple4', text: 'apple4' },
    { id: 5, name: 'apple5', text: 'apple5' },
  ])
  let dragIndex: number = 0
  let cloneDOM: HTMLElement
  const dragStart = (e: DragEvent, index: number) => {
    e.stopPropagation()
    dragIndex = index
    // const target = e.target as HTMLElement
    // cloneDOM = e.target.cloneNode(true) as HTMLElement
    // cloneDOM.style =
    //   'position:fixed;left:380px;top:0;z-index:999;pointer-events:none;width:300px;height:50px;background-color:rgba(0,0,0,0.5);'
    // console.log(e)
    // target.parentNode.appendChild(cloneDOM)
    setTimeout(() => {
      e.target.classList.add('dragging')
    }, 0)
  }
  const dragEnter = (e: DragEvent, index: number) => {
    e.preventDefault()
    if (dragIndex !== index) {
      const source = list[dragIndex]
      list.splice(dragIndex, 1)
      list.splice(index, 0, source)
      dragIndex = index
    }
  }
  const dragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    // cloneDOM.style.top = e.clientY + 'px'
  }
  const dragEnd = (e) => {
    e.target.classList.remove('dragging')
    // e.target.parentNode.removeChild(cloneDOM)
  }
</script>

<style>
  .drag-box {
    margin: 10px auto;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    width: 400px;
    position: relative;
  }
  .drag-item {
    height: 50px;
    background-color: lightblue;
    margin: 5px 10px;
  }
  .dragging {
    opacity: 0;
  }
  .box-inner {
    background-color: lightblue;
    width: 100px;
    height: 100px;
    resize: both;
    overflow: hidden;
  }
</style>
