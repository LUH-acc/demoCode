import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import './index.less'
const NavBarProps = {
  title: String,
  back: Function,
}

export default defineComponent({
  name: 'NavBar',
  props: NavBarProps,
  setup(props, { slots }) {
    const router = useRouter()
    const route = useRoute()
    const handBack = () => {
      if (props.back) {
        props.back()
      } else {
        router.back()
      }
    }
    const renderIcon = () => {
      return (
        <div class="icon" onClick={handBack}>
          返回
        </div>
      )
    }
    const renderTitle = () => {
      const title = slots.default?.() || props.title || route.meta.title
      return <div>{title}</div>
    }
    const renderRight = () => {
      if (slots.right) {
        return <div class="right">{slots.right()}</div>
      }
    }
    return () => {
      return (
        <div>
          {renderIcon()}
          {renderTitle()}
          {renderRight()}
        </div>
      )
    }
  },
})
