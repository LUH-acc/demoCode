import { App } from 'vue'
import NavBar from './navBar/index'
import IconFont from './iconfont/index'

export default function install(app: App) {
  app.use(NavBar)
  app.use(IconFont)
}
