import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Oruga from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'

import '@mdi/font/css/materialdesignicons.css'
import '@oruga-ui/theme-bulma/dist/bulma.css'

import App from './App.vue'
import router from './router'

const customConfig = {
  ...bulmaConfig,
  // Sobrescribe la paleta de "variant"
  color: {
    ...bulmaConfig.color,
    primary: '#ff3860',
  },
  status: {
    ...bulmaConfig.status,
    primary: '#ff3860',
  },
  variant: {
    ...bulmaConfig.variant,
    primary: '#ff3860', // Tu color para la variante "primary"
    info: '#23d160', // Cambia "info" si deseas
  },
  iconPack: 'mdi',
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Oruga, {
  ...customConfig, // Configura Oruga para usar Bulma
})

app.mount('#app')
