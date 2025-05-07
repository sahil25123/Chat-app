import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No need for tailwindcss() here — Tailwind is configured via postcss.config.js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // output directory (default is "dist", just to be safe)
    emptyOutDir: true
  },
  base: '/', // Important for routing to work correctly
})
