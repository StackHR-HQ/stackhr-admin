import { type ApiEnvelope, http } from '@/lib/http'
import type {
  AdminUser,
  AuthSession,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  ResetPasswordTokenCheck,
} from '@/features/auth/types'

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

  async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    await http.post<ApiEnvelope<null>>('/auth/forgot-password', payload)
  },

  async verifyResetToken(token: string): Promise<ResetPasswordTokenCheck> {
    const response = await http.get<ApiEnvelope<ResetPasswordTokenCheck>>('/auth/reset-password/verify', {
      params: { token },
    })
    return response.data.data
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await http.post<ApiEnvelope<null>>('/auth/reset-password', payload)
  },

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await http.post<ApiEnvelope<null>>('/auth/change-password', payload)
  },
}
