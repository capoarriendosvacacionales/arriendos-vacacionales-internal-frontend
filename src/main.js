import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Oruga from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'

import '@mdi/font/css/materialdesignicons.css'
import '@oruga-ui/theme-bulma/dist/bulma.css'

import '@/assets/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Oruga, {
  ...bulmaConfig, // Configura Oruga para usar Bulma
  iconPack: 'mdi',
})

app.mount('#app')
