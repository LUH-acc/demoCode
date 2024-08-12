import { defineComponent, onMounted, ref } from 'vue'
import './index.less'
export default defineComponent({
  name: 'TodoList',
  setup(props) {
    const text = ref('asdasdftgsadfa我人哦无人机为人极为')
    const text2 = ref('')
    const ellipsis = '...'
    onMounted(() => {
      // console.log('mounted')
      // const todoListDom = document.querySelector('.todo-list')
      // const originStyle = window.getComputedStyle(todoListDom)
      // console.log(originStyle.lineHeight)
      // const match = originStyle.lineHeight.match(/\d+(\.\d+)?/)
      // createTextDom()
      calcEllipsised()
    })

    const pxToNum = (value: string | null) => {
      if (!value) {
        return 0
      }
      const match = value.match(/\d+(\.\d+)?/)
      return match ? Number(match[0]) : 0
    }

    const createTextDom = () => {
      const todoListDom = document.querySelector('.todo-list')
      const originStyle = window.getComputedStyle(todoListDom)
      const container = document.createElement('div')
      const styleList: string[] = Array.prototype.slice.apply(originStyle)
      styleList.forEach((style) => {
        container.style.setProperty(style, originStyle.getPropertyValue(style))
      })
      container.style.position = 'fixed'
      container.style.zIndex = '-9999'
      container.style.top = '-9999px'
      container.style.height = 'auto'
      container.style.minHeight = 'auto'
      container.style.maxHeight = 'auto'

      container.innerText = text.value
      document.body.appendChild(container)
      return container
    }

    const calcEllipsisText = (container, maxHeight) => {
      const end = text.value.length
      const middle = end >> 1
      console.log(text.value, middle, end)

      const calcMiddle = (leftPart: [number, number], rightPart: [number, number]) => {
        if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
          return text.value.slice(0, leftPart[0]) + ellipsis + text.value.slice(rightPart[1], end)
        }
        const lefeMiddle = Math.floor((leftPart[1] + leftPart[0]) / 2)
        const rightMiddle = Math.floor((rightPart[1] + rightPart[0]) / 2)

        container.innerText =
          text.value.slice(0, lefeMiddle) + ellipsis + text.value.slice(rightMiddle, end)
        if (container.offsetHeight >= maxHeight) {
          return calcMiddle([leftPart[0], lefeMiddle], [rightMiddle, rightPart[1]])
        }
        return calcMiddle([lefeMiddle, leftPart[1]], [rightPart[0], rightMiddle])
      }

      if (container.offsetHeight > maxHeight) {
        return calcMiddle([0, middle], [middle, end])
      }
    }

    const calcEllipsised = () => {
      const container = createTextDom()

      const { lineHeight, paddingTop, paddingBottom } = container.style
      const maxHeight = Math.ceil(
        (Number(1) + 0.5) * pxToNum(lineHeight) + pxToNum(paddingTop) + pxToNum(paddingBottom),
      )

      if (container.offsetHeight > maxHeight) {
        text2.value = calcEllipsisText(container, maxHeight)
      } else {
        // text2.value = text.value
      }
      document.body.removeChild(container)
    }
    // todo list =
    return () => <div class="todo-list">{text2.value}</div>
  },
})
