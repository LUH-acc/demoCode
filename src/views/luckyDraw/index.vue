<template>
  <scratchCard />
  <div class="box"> </div>
  <div class="btn">
    <svg
      class="btn-svg"
      width="15"
      height="15"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 50 L40 70 L70 40" stroke="#FFF" stroke-width="5" fill="none" />
    </svg>
  </div>
</template>

<script setup lang="ts">
  import scratchCard from '@/components/scratchCard.vue'

  const node = ref<HTMLElement | null>(null)

  onMounted(() => {
    node.value = document.querySelector('.box')
    //   node.value!.addEventListener('click', (event:MouseEvent) => {
    //     console.dir(node.value)
    //     let x = event.clientX - node.value!.offsetLeft
    //     let y = event.clientY - node.value!.offsetTop
    //     show(x, y)
    //   },false)
    node.value?.addEventListener('mousedown', (event: MouseEvent) => {
      handleClick(event)
    })
  })
  const handleClick = (event: MouseEvent) => {
    let x = event.clientX - node.value!.offsetLeft
    let y = event.clientY - node.value!.offsetTop
    show(x, y)
  }
  const show = (x: number, y: number) => {
    const frameElement = document.createDocumentFragment()
    for (let i = 0; i < 10; i++) {
      const showDom = createShowDom(x, y)
      frameElement.append(showDom)
    }
    node.value?.appendChild(frameElement)
  }
  const createShowDom = (X: number, Y: number) => {
    const showDom = document.createElement('div')
    showDom.style.position = 'absolute'
    showDom.style.left = X + 'px'
    showDom.style.top = Y + 'px'
    showDom.style.width = '8px'
    showDom.style.height = '8px'
    showDom.style.borderRadius = '50%'
    showDom.style.background = generateRandomCode()
    let randow = Math.random() * 200 - 100
    let randow2 = Math.random() * 200 - 100
    if (X + randow > node.value!.clientWidth) {
      randow = 0
    }
    if (Y + randow2 > node.value!.clientHeight) {
      randow2 = 0
    }
    const animator = showDom.animate(
      [
        { opacity: 1, transform: `translate(0)` },
        { opacity: 0.1, transform: `translate(${randow}px,${randow2}px)` },
      ],
      {
        duration: 1000,
        easing: 'ease-out',
        fill: 'forwards',
      },
    )
    animator.onfinish = () => {
      showDom.remove()
    }
    return showDom
  }

  const generateRandomCode = () => {
    var myRandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return myRandomColor
  }
</script>

<style scoped lang="less">
  .box {
    width: 100%;
    height: 500px;
    border: 1px solid;
    overflow: hidden;
  }
  .btn {
    width: 80px;
    height: 30px;
    position: relative;
    border: 1px solid lightblue;
    &::after {
      content: '';
      position: absolute;
      display: block;
      bottom: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background: linear-gradient(to bottom right, #fff 0%, #fff 49.9%, #309b96 50%, #309b96 100%);
    }
    .btn-svg {
      position: absolute;
      bottom: -1px;
      right: -3px;
      z-index: 1;
    }
  }
</style>
