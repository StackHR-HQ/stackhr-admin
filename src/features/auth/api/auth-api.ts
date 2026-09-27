import { type ApiEnvelope, http } from '../../../lib/http'
import type { AdminUser, AuthSession, LoginPayload } from '../types'

type LoginData = { user: AdminUser; token?: string; accessToken?: string }

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    const response = await http.post<ApiEnvelope<LoginData>>('/auth/admin/login', payload)
    const data = response.data?.data
    if (!data) throw new Error('Login failed: unexpected response from the server.')
    const headerToken = String(response.headers.authorization ?? '').replace(/^Bearer\s+/i, '')
    const token = data.token ?? data.accessToken ?? headerToken
    if (!token) throw new Error('Login succeeded but the server returned no access token.')
    return { token, user: data.user }
  },
}
