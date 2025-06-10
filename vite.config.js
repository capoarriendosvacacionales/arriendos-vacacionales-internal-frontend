import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue(), vueDevTools()],
  server: {
    host: mode === 'development', // Solo establece host en desarrollo
    port: mode === 'development' ? 8080 : 8081, // Usa un puerto específico solo en desarrollo
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist', // Directorio de salida para producción
    sourcemap: mode === 'production' ? false : true, // Evita sourcemaps en producción
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
}))
