import text from './file_1'
import { stdout } from './file_2'

import { createApp } from 'vue'
import App from './App.vue'

stdout(text.text1)
stdout(text.text2)

createApp(App).mount('#app')
