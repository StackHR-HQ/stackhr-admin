import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/features/auth/api/auth-api'
import { useAuthStore } from '@/features/auth/store/auth-store'

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession)
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: setSession,
  })
}
