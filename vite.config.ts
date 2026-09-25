import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiBaseUrl = env.VITE_API_BASE_URL

  let proxy: Record<string, object> | undefined
  if (apiBaseUrl && /^https?:\/\//.test(apiBaseUrl)) {
    const { origin, pathname } = new URL(apiBaseUrl)
    proxy = {
      [pathname]: { target: origin, changeOrigin: true, secure: true },
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
  }
})
