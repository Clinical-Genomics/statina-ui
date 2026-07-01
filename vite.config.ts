import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

const getBasePath = () => {
  const basePath = process.env.VITE_BASE_PATH?.trim() || '/'
  if (basePath === '/') {
    return '/'
  }

  const normalizedPath = basePath.startsWith('/') ? basePath : `/${basePath}`
  return normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`
}

export default defineConfig({
  base: getBasePath(),
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 9000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
