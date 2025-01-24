import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index.js'
import i18n from './components/Translations.js'

createApp(App)
.use (router) 
.use (i18n)
.mount('#app')
