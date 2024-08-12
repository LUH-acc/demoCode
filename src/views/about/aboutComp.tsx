import { defineComponent, ref } from 'vue'
import './about.less'

export default defineComponent({
  name: 'AboutComp',
  props: {
    like: String,
  },
  // emits: ['changeLike'],
  setup(props, { slots, emit }) {
    const onClick = () => {}

    const dataVal = ref('data')

    const renderTitle = () => {
      return (
        <div class="title">
          <h1>About Component</h1>
        </div>
      )
    }
    return () => {
      return (
        <div>
          <NavBar title="like title" />
          {renderTitle()}
          <p>{slots.default && slots.default()}</p>
          <p>{slots.likeText && slots.likeText()}</p>
          <p>{slots.likeContent && slots.likeContent({ like: dataVal })}</p>
          <p onClick={onClick}>About Component</p>
        </div>
      )
    }
  },
})
