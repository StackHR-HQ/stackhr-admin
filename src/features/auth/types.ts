export type AdminUser = {
  id: string
  name: string
  email: string
  userType?: string
  role?: string
}

export type AuthSession = {
  token: string
  user: AdminUser
}

export type LoginPayload = {
  email: string
  password: string
}

export type ForgotPasswordPayload = {
  email: string
}

export type ResetPasswordTokenCheck = {
  valid: boolean
  email: string
}

export type ResetPasswordPayload = {
  token: string
  password: string
  confirmPassword: string
}

export type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
