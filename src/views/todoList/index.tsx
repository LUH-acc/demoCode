import { defineComponent, onMounted, ref } from 'vue'
import './index.less'
export default defineComponent({
  name: 'TodoList',
  setup() {
    // 当前采用中间省略方式
    const text = ref('asdasdftgsadfa我人哦无人机为人极为')
    const text2 = ref('')
    const ellipsis = '...'
    onMounted(() => {
      calcEllipsised()
    })
    /**
     * 像素字符串转数字
     * @param value 像素字符串
     * @returns 数值
     */
    const pxToNum = (value: string | null) => {
      if (!value) {
        return 0
      }
      const match = value.match(/\d+(\.\d+)?/)
      return match ? Number(match[0]) : 0
    }
    /**
     * 创建一个新元素节点，并设置样式
     * 该新节点的目的：用于测量计算，获取元素的高度，长度等信息
     * @returns 新元素节点
     */
    const createTextDom = () => {
      const todoListDom = document.querySelector('.todo-list')
      const originStyle = window.getComputedStyle(todoListDom)
      const container = document.createElement('div')
      const styleList: string[] = Array.prototype.slice.apply(originStyle)
      // 复制所有的属性
      styleList.forEach((style) => {
        container.style.setProperty(style, originStyle.getPropertyValue(style))
      })
      container.style.position = 'fixed'
      container.style.zIndex = '-9999'
      container.style.top = '-9999px'
      container.style.height = 'auto'
      container.style.minHeight = 'auto'
      container.style.maxHeight = 'auto'
      // 文字赋值
      container.innerText = text.value
      // 插入页面
      document.body.appendChild(container)
      return container
    }
    // 计算文章的长度，高度并添加省略号
    const calcEllipsisText = (container, maxHeight): string => {
      const end = text.value.length
      const middle = end >> 1
      console.log(text.value, middle, end)

      // 递归裁剪字符串
      const calcMiddle = (leftPart: [number, number], rightPart: [number, number]): string => {
        // 递归出口
        if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
          return text.value.slice(0, leftPart[0]) + ellipsis + text.value.slice(rightPart[1], end)
        }
        // 获取中值
        const lefeMiddle = Math.floor((leftPart[1] + leftPart[0]) / 2)
        const rightMiddle = Math.floor((rightPart[1] + rightPart[0]) / 2)

        container.innerText =
          text.value.slice(0, lefeMiddle) + ellipsis + text.value.slice(rightMiddle, end)

        // 递归
        if (container.offsetHeight >= maxHeight) {
          return calcMiddle([leftPart[0], lefeMiddle], [rightMiddle, rightPart[1]])
        }
        return calcMiddle([lefeMiddle, leftPart[1]], [rightPart[0], rightMiddle])
      }
      // 初始裁剪

      return calcMiddle([0, middle], [middle, end])
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
        text2.value = text.value
      }
      document.body.removeChild(container)
    }
    // todo list =
    return () => <div class="todo-list">{text2.value}</div>
  },
})
