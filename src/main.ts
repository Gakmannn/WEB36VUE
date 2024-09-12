import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import HeaderComp from './components/HeaderComponent.vue'
import {router} from './routes'

const app = createApp(App)
app.use(router)
app.component('HeaderComp', HeaderComp)
app.mount('#myApp')
