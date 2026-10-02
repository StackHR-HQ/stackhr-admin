import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { errorMessage } from '@/lib/http'
import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password'
import { type ForgotPasswordValues, forgotPasswordSchema } from '@/features/auth/schemas/forgot-password-schema'

const inputClass =
  'h-10 w-full rounded-lg border border-line bg-canvas px-3 text-sm text-ink outline-none ' +
  'placeholder:text-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25'

export function ForgotPasswordPage() {
  const forgotPassword = useForgotPassword()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) })

  const onSubmit = (values: ForgotPasswordValues) => forgotPassword.mutate(values)

  return (
    <div className="grid min-h-svh place-items-center bg-canvas px-4 text-ink">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            StackHR Admin
          </p>
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em]">Forgot password</h1>
          <p className="mt-1.5 text-sm text-muted">
            {forgotPassword.isSuccess
              ? "If an account exists for that address, we've sent a link to reset your password."
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        {forgotPassword.isSuccess ? (
          <Link to="/login" className="text-sm font-medium text-accent hover:underline">
            Back to sign in
          </Link>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={inputClass}
                aria-invalid={!!errors.email}
                {...register('email')}
              />
              {errors.email ? <p className="mt-1 text-xs text-critical">{errors.email.message}</p> : null}
            </div>

            {forgotPassword.isError ? (
              <p role="alert" className="rounded-lg bg-critical-surface px-3 py-2 text-[13px] text-critical">
                {errorMessage(forgotPassword.error, 'Could not send reset link. Try again.')}
              </p>
            ) : null}

            <Button type="submit" disabled={forgotPassword.isPending} className="mt-1 w-full">
              {forgotPassword.isPending ? 'Sending…' : 'Send reset link'}
            </Button>

            <Link to="/login" className="text-center text-sm font-medium text-muted hover:text-ink">
              Back to sign in
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
