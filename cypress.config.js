import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080', // cámbialo al puerto de tu app
    setupNodeEvents(on, config) {
      // Puedes borrar estas variables si no usas eventos
      return config
    },
  },
})
