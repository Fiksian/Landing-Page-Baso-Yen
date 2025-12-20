import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    hmr: {
      clientPort: 443, // Memaksa HMR menggunakan port HTTPS ngrok
    },
  },
})