import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/** Serve built demo HTML as static files so Vite does not inject the main app. */
function serveDemosPlugin(): Plugin {
  const demosRoot = path.join(rootDir, 'public', 'demos')

  const handle = (
    req: { url?: string; method?: string },
    res: {
      statusCode: number
      setHeader: (name: string, value: string) => void
      end: (body?: string | Buffer) => void
    },
    next: () => void,
  ) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      next()
      return
    }
    const pathname = req.url?.split('?')[0] ?? ''
    const match = pathname.match(/^\/demos\/([^/]+)\/?$/)
    if (!match) {
      next()
      return
    }
    const file = path.join(demosRoot, match[1], 'index.html')
    if (!existsSync(file)) {
      next()
      return
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(readFileSync(file))
  }

  return {
    name: 'serve-demos',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
}

function localApiPlugin(): Plugin {
  const dataPath = path.join(rootDir, 'api/local-data.json')

  const readRoutes = (): Record<string, unknown> => {
    const data = JSON.parse(readFileSync(dataPath, 'utf8')) as {
      projects: unknown[]
      editorial: unknown[]
    }
    return {
      '/api/projects': data.projects,
      '/api/editorial': data.editorial,
    }
  }

  const handle = (
    req: { url?: string; method?: string },
    res: {
      statusCode: number
      setHeader: (name: string, value: string) => void
      end: (body?: string) => void
    },
    next: () => void,
  ) => {
    const pathname = req.url?.split('?')[0] ?? ''
    const routes = readRoutes()
    if (!(pathname in routes)) {
      next()
      return
    }
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
      res.end()
      return
    }
    if (req.method !== 'GET') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(JSON.stringify(routes[pathname]))
  }

  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react(), tailwindcss(), serveDemosPlugin(), localApiPlugin()];
  try {
    // @ts-expect-error The preview environment supplies this JavaScript-only plugin.
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch { /* Source tagging is optional outside the preview environment. */ }

  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  return {
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
    },
  };
})
