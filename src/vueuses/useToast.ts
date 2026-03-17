import myToast from '@/components/myToast.vue'
import { createApp } from 'vue'

const activeToasts: { [k in string | number]: any }[] = []

export default function useToast(msg = '', type = 'info', delay = 3000) {
  const div = document.createElement('div')
  const toastId = `toast-${Date.now()}`
  div.id = toastId
  const closeTop = () => {
    const length = activeToasts.length
    if (length === 0) return 20
    const lastToast = activeToasts[length - 1]
    return lastToast.top + lastToast.height + 10
  }
  const top = closeTop()

  document.body.appendChild(div)

  const app = createApp(myToast, { msg, type, toastId })
  app.mount('#' + toastId)

  setTimeout(() => {
    const toastEL = document.getElementById(toastId)?.querySelector('.toast')
    if (toastEL) {
      const height = toastEL.offsetHeight
      activeToasts.push({ id: toastId, top, height })
      toastEL.style.top = top + 'px'
    }
  }, 0)

  const close = () => {
    const toastDiv = document.getElementById(toastId)?.querySelector('.toast')
    toastDiv?.classList.add('toastEnd')
    toastDiv.addEventListener(
      'animationend',
      () => {
        // console.log('动画结束了。。。')

        app.unmount()
        document.body.removeChild(div)

        const index = activeToasts.findIndex((i) => i.id === toastId)
        if (index !== -1) {
          const top = activeToasts[index].height + 10
          activeToasts.splice(index, 1)

          for (let i = 0; i < activeToasts.length; i++) {
            activeToasts[i].top = activeToasts[i].top - top
            const toastEl = document.getElementById(activeToasts[i].id)?.querySelector('.toast')
            if (toastEl) {
              toastEl.style.top = activeToasts[i].top + 'px'
            }
          }
        }
      },
      { once: true },
    )
  }
  setTimeout(() => {
    close()
  }, delay)
}
