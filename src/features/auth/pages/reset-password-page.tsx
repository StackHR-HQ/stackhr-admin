import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { errorMessage } from '@/lib/http'
import { useResetPassword } from '@/features/auth/hooks/use-reset-password'
import { useVerifyResetToken } from '@/features/auth/hooks/use-verify-reset-token'
import { type ResetPasswordValues, resetPasswordSchema } from '@/features/auth/schemas/reset-password-schema'

const inputClass =
  'h-10 w-full rounded-lg border border-line bg-canvas px-3 text-sm text-ink outline-none ' +
  'placeholder:text-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25'

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh place-items-center bg-canvas px-4 text-ink">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            StackHR Admin
          </p>
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em]">Reset password</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const verify = useVerifyResetToken(token)
  const resetPassword = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({ resolver: zodResolver(resetPasswordSchema) })

  const onSubmit = (values: ResetPasswordValues) => {
    if (!token) return
    resetPassword.mutate(
      { token, ...values },
      { onSuccess: () => navigate('/login', { replace: true, state: { resetSuccess: true } }) },
    )
  }

  if (!token) {
    return (
      <Shell>
        <p className="text-sm text-muted">This reset link is missing its token.</p>
        <Link to="/forgot-password" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
          Request a new link
        </Link>
      </Shell>
    )
  }

  if (verify.isLoading) {
    return (
      <Shell>
        <p className="text-sm text-muted">Checking your reset link…</p>
      </Shell>
    )
  }

  if (verify.isError || verify.data?.valid === false) {
    return (
      <Shell>
        <p className="text-sm text-muted">
          This reset link is invalid or has expired. Request a new one to continue.
        </p>
        <Link to="/forgot-password" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
          Request a new link
        </Link>
      </Shell>
    )
  }

  return (
    <Shell>
      <p className="mb-6 -mt-4 text-sm text-muted">
        {verify.data?.email ? `Set a new password for ${verify.data.email}.` : 'Set a new password below.'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium">
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className={inputClass}
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          {errors.password ? <p className="mt-1 text-xs text-critical">{errors.password.message}</p> : null}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-[13px] font-medium">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={inputClass}
            aria-invalid={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword ? (
            <p className="mt-1 text-xs text-critical">{errors.confirmPassword.message}</p>
          ) : null}
        </div>

        {resetPassword.isError ? (
          <p role="alert" className="rounded-lg bg-critical-surface px-3 py-2 text-[13px] text-critical">
            {errorMessage(resetPassword.error, 'Could not reset your password. Try again.')}
          </p>
        ) : null}

        <Button type="submit" disabled={resetPassword.isPending} className="mt-1 w-full">
          {resetPassword.isPending ? 'Resetting…' : 'Reset password'}
        </Button>
      </form>
    </Shell>
  )
}
