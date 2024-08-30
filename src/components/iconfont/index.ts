import { App } from 'vue'
import iconfont from './index.vue'

export default function install(app: App) {
  app.component('IconFont', iconfont)
}
