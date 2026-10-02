import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/features/auth/api/auth-api'

export function useVerifyResetToken(token: string | null) {
  return useQuery({
    queryKey: ['auth', 'reset-password', 'verify', token],
    queryFn: () => authApi.verifyResetToken(token as string),
    enabled: !!token,
    retry: false,
  })
}
