import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://societyproblem-server.onrender.com/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    hmr: {
      clientPort: 443, 
    },
  },
  build: {
    chunkSizeWarningLimit: 500, 
  },
  plugins: [react()],
})
