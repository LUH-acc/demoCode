import _navBar from './index.tsx'

import { withInstall } from '@/utils/index'

const NavBar = withInstall(_navBar)
console.log('nav', NavBar)

export default NavBar

declare module 'vue' {
  export interface GlobalComponents {
    NavBar: typeof NavBar
  }
}
