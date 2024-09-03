import { defineComponent } from 'vue'
import { Icon } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import './index.less'
const NavBarProps = {
  title: String,
  back: Function,
  showBack: {
    type: Boolean,
    default: true,
  },
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
      return props.showBack ? (
        <div class="back-icon" onClick={handBack}>
          <Icon name="arrow-left" />
        </div>
      ) : (
        <div></div>
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
        <div class="nav-bar">
          {renderIcon()}
          {renderTitle()}
          {renderRight()}
        </div>
      )
    }
  },
})
