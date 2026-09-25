import { type ApiEnvelope, http } from '../../../lib/http'
import type { AdminUser, AuthSession, LoginPayload } from '../types'

// Login response is undocumented; token is read from the body or the Authorization header.
type LoginData = { user: AdminUser; accessToken?: string; token?: string }

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    const response = await http.post<ApiEnvelope<LoginData>>('/auth/admin/login', payload)
    const { data } = response.data
    const headerToken = String(response.headers.authorization ?? '').replace(/^Bearer\s+/i, '')
    const token = data.accessToken ?? data.token ?? headerToken
    if (!token) throw new Error('Login succeeded but the server returned no access token.')
    return { token, user: data.user }
  },
}
