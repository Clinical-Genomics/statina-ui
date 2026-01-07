import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      'buffer/': 'buffer',
      'plotly.js': path.resolve(__dirname, 'node_modules/plotly.js/dist/plotly.min.js'),
      'plotly.js/dist/plotly': path.resolve(__dirname, 'node_modules/plotly.js/dist/plotly.min.js'),
      services: path.resolve(__dirname, 'src/services'),
      components: path.resolve(__dirname, 'src/components'),
      pages: path.resolve(__dirname, 'src/pages'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
  },
})
