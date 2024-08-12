import _aboutComp from './aboutComp'
import { withInstall } from '@/utils/index'

const AboutComp = withInstall(_aboutComp)
export default AboutComp

declare module 'vue' {
  export interface GlobalComponents {
    AboutComp: typeof AboutComp
  }
}
