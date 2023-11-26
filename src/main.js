import '@/styles/common.scss' // global css
import 'element-plus/theme-chalk/el-message.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import { LazyLoaddPlugin, componentPlugin } from '@/directives'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(LazyLoaddPlugin)
app.use(componentPlugin)

app.mount('#app')
