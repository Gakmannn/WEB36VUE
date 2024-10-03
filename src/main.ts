import { createApp } from 'vue'
import './style.css'
import App from '#root/App.vue'
import { createPinia } from 'pinia'
import HeaderComp from '#root/components/HeaderComponent.vue'
import {router} from '#root/routes'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.component('HeaderComp', HeaderComp)
app.mount('#myApp')
