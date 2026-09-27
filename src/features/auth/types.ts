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
