import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.less'
import print from 'vue3-print-nb'
import component from '@/components/index'
const app = createApp(App)
app.use(router)
app.use(print)
app.use(component)
app.mount('#app')
