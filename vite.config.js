import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Prevent Vite 8 from treating code.html and other non-entry HTML files as entry points
  server: {
    fs: {
      allow: ['.'],
    },
  },
  // Exclude code.html from being processed as a Vite entry
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
