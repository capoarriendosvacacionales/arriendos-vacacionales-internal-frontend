// src/catalogo.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Oruga from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'

import '@mdi/font/css/materialdesignicons.css'
import '@oruga-ui/theme-bulma/dist/bulma.css'

import '@/assets/main.css'

import AppTerms from './components/AppTerms.vue'

const app = createApp(AppTerms)
app.use(createPinia())

app.use(Oruga, {
  datepicker: {
    mobileModal: false,
    mobileBreakpoint: 0,
  },
  ...bulmaConfig, // Configura Oruga para usar Bulma
  iconPack: 'mdi',
})

app.mount('#terms-app')
