import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Proxy API requests to the local Express server during development.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://manipur-events-xobs.vercel.app/',
        changeOrigin: true,
      },
    },
  },
})
