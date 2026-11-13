import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

/**
 * Serves api/ask.ts during `npm run dev`, the way Vercel serves it in production, so the AI search works locally.
 * Uses .env.local (server-only values; nothing here reaches the browser bundle).
 */
function devApi(): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/ask', async (req, res) => {
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const headers = new Headers()
          for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v)
          headers.set('x-forwarded-for', req.socket.remoteAddress ?? '127.0.0.1')
          const request = new Request(`http://${req.headers.host}/api/ask`, {
            method: req.method,
            headers,
            body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
          })
          const mod = await server.ssrLoadModule('/api/ask.ts')
          const response: Response = await mod.handle(request)
          res.statusCode = response.status
          response.headers.forEach((v, k) => res.setHeader(k, v))
          res.end(await response.text())
        } catch (err) {
          server.config.logger.error(String(err))
          res.statusCode = 500
          res.end(JSON.stringify({ fallback: true }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Server-only env for the dev API (GEMINI_API_KEY etc.). Never exposed to client code: only VITE_* is.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
  plugins: [
    devApi(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
}
})
