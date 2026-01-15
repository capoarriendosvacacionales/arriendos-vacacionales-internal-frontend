import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // Puedes borrar estas variables si no usas eventos
      return config
    },
  },
})
