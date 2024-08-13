import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import HeaderComp from './components/HeaderComponent.vue'

const app = createApp(App)
app.component('HeaderComp', HeaderComp)
app.mount('#myApp')
