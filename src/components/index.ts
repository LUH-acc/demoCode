import { App } from 'vue'
import NavBar from './navBar/index'

export default function install(app: App) {
  app.use(NavBar)
}
