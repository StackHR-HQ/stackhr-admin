import axios from 'axios'
import { getStoredAuthToken, useAuthStore } from '../features/auth/store/auth-store'
import { API_BASE_URL } from './env'

export type ApiEnvelope<T> = { success: boolean; message: string; data: T }

export const http = axios.create({ baseURL: API_BASE_URL })

http.interceptors.request.use((config) => {
  const token = getStoredAuthToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && getStoredAuthToken()) {
      useAuthStore.getState().clearSession()
    }
    return Promise.reject(error)
  },
)

export function errorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (axios.isAxiosError<{ message?: string | string[] }>(error)) {
    const message = error.response?.data?.message
    if (Array.isArray(message)) return message.join(', ')
    if (message) return message
    if (!error.response) return 'Cannot reach the server. Check your connection.'
  }
  if (error instanceof Error && error.message) return error.message
  return fallback
}
