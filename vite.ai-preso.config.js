import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

const outDir = 'ai-preso/dist'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
  base: '/',
  server: {
    open: '/',
    port: 4174,
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''),
  },
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
      name: 'ai-preso-root',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            req.url = '/index-ai-preso.html'
          }
          next()
        })
      },
    },
    {
      name: 'copy-html',
      closeBundle() {
        const src = join(__dirname, outDir, 'index-ai-preso.html')
        copyFileSync(src, join(__dirname, outDir, 'index.html'))
        copyFileSync(src, join(__dirname, outDir, '404.html'))
      },
    },
  ],
  }
})
