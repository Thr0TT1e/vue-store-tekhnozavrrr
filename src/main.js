import { createApp } from 'vue';
import router from './router'
import store from '@/store';
import App from './App.vue';
import { API_BASE_URL } from '@/config.js'

const app = createApp(App)

app.config.globalProperties.API_BASE_URL = API_BASE_URL

app
  .use(router)
  .use(store)
  .mount('#app')
