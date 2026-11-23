import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(async ({ mode }) => {
  const plugins = [react(), tailwindcss()]
  try {
    // @ts-expect-error Optional preview plugin.
    const m = await import('./.vite-source-tags.js')
    plugins.push(m.sourceTags())
  } catch { /* optional */ }

  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_'])
  const processEnvDefines: Record<string, string> = {}
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value)
  }

  return {
    base: '/demos/abbaspour/',
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
    build: {
      outDir: path.resolve(rootDir, '../../public/demos/abbaspour'),
      emptyOutDir: true,
    },
  }
})
