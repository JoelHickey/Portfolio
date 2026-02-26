import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

const outDir = 'dist-ai-preso'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: join(__dirname, 'index-ai-preso.html'),
    },
  },
  plugins: [
    react(),
    {
      name: 'copy-html',
      closeBundle() {
        const src = join(__dirname, outDir, 'index-ai-preso.html')
        copyFileSync(src, join(__dirname, outDir, 'index.html'))
        copyFileSync(src, join(__dirname, outDir, '404.html'))
      },
    },
  ],
})
