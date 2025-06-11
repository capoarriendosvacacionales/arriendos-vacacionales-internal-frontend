import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [vue(), vueDevTools()],
  server:
    command === 'serve'
      ? {
          host: '0.0.0.0',
          port: 8080,
          allowedHosts: ['internal.arriendosvacacionales.local', 'internal-frontend'],
          hmr: {
            protocol: 'ws',
            host: 'internal.arriendosvacacionales.local',
            clientPort: 80,
          },
        }
      : undefined,
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
