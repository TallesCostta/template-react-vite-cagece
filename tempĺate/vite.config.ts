import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-sa2': 'react-sa2/dist/index.d.js'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.int.cagece.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})