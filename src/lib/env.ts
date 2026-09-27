const rawApiBaseUrl: string = import.meta.env.VITE_API_BASE_URL ?? '/v1/api'

// Dev goes through the Vite proxy: the backend sends no CORS headers for localhost.
export const API_BASE_URL: string =
  import.meta.env.DEV && /^https?:\/\//.test(rawApiBaseUrl)
    ? new URL(rawApiBaseUrl).pathname
    : rawApiBaseUrl
