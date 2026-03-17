import { ref, onMounted, onUnmounted } from 'vue'

export function cardLightShow(option) {
  const showLight = ref(false)

  const cardRef = ref<HTMLElement | null>(null)
  const lightRef = ref<HTMLElement>(document.createElement('div'))

  let overflowIsHidden = ''

  const setLightStyle = () => {
    const { width = 60, height = 60, color = '#ff4132', blur = 40 } = option.light ?? {}
    const lightDom = lightRef.value
    lightDom.style.position = 'absolute'
    lightDom.style.width = `${width}px`
    lightDom.style.height = `${height}px`
    lightDom.style.background = color
    lightDom.style.filter = `blur(${blur}px)`
  }

  const addLight = () => {
    if (cardRef.value) {
      cardRef.value.appendChild(lightRef.value)
    }
  }
  const removeLight = () => {
    if (cardRef.value) {
      cardRef.value.removeChild(lightRef.value)
    }
  }

  const setCardOverflow = () => {
    const cardDom = cardRef.value
    if (cardDom) {
      overflowIsHidden = cardDom.style.overflow
      cardDom.style.overflow = 'hidden'
    }
  }
  const restoreCardOverflow = () => {
    const cardDom = cardRef.value
    if (cardDom) {
      cardDom.style.overflow = overflowIsHidden
    }
  }

  const onMouseEnter = () => {
    addLight()
    setCardOverflow()
  }
  const onMouseMove = (e) => {
    const { clientX, clientY } = e
    const cardDom = cardRef.value
    const lightDom = lightRef.value

    if (cardDom && lightDom) {
      const { x, y } = cardDom.getBoundingClientRect()
      const left = clientX - x - lightDom?.offsetWidth / 2
      const top = clientY - y - lightDom?.offsetHeight / 2
      lightDom.style.top = top + 'px'
      lightDom.style.left = left + 'px'

      const maxXRotation = 10 // x轴旋转角度
      const maxYRotation = 10 // y轴旋转角度

      const rangeX = 200 / 2
      const rangeY = 200 / 2

      const rotateX = ((clientX - x - rangeY) / rangeY) * maxXRotation
      const rotateY = -1 * ((clientY - y - rangeX) / rangeX) * maxYRotation

      cardDom.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
  }
  const onMouseLeave = () => {
    removeLight()
    restoreCardOverflow()
  }

  onMounted(() => {
    setLightStyle()
    cardRef.value?.addEventListener('mouseenter', onMouseEnter)
    cardRef.value?.addEventListener('mousemove', onMouseMove)
    cardRef.value?.addEventListener('mouseleave', onMouseLeave)
  })
  onUnmounted(() => {
    cardRef.value?.removeEventListener('mouseenter', onMouseEnter)
    cardRef.value?.removeEventListener('mousemove', onMouseMove)
    cardRef.value?.removeEventListener('mouseleave', onMouseLeave)
  })

  return {
    showLight,
    cardRef,
    lightRef,
  }
}
