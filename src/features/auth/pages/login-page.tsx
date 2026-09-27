import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { errorMessage } from '../../../lib/http'
import { useLogin } from '../hooks/use-login'
import { type LoginValues, loginSchema } from '../schemas/login-schema'

const inputClass =
  'h-10 w-full rounded-lg border border-line bg-canvas px-3 text-sm text-ink outline-none ' +
  'placeholder:text-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const login = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (values: LoginValues) =>
    login.mutate(values, { onSuccess: () => navigate(from, { replace: true }) })

  return (
    <div className="grid min-h-svh place-items-center bg-canvas px-4 text-ink">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            StackHR Admin
          </p>
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em]">Sign in</h1>
          <p className="mt-1.5 text-sm text-muted">Use your platform administrator account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              className={inputClass}
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email ? <p className="mt-1 text-xs text-critical">{errors.email.message}</p> : null}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className={inputClass}
              aria-invalid={!!errors.password}
              {...register('password')}
            />
            {errors.password ? (
              <p className="mt-1 text-xs text-critical">{errors.password.message}</p>
            ) : null}
          </div>

          {login.isError ? (
            <p role="alert" className="rounded-lg bg-critical-surface px-3 py-2 text-[13px] text-critical">
              {errorMessage(login.error, 'Could not sign in. Check your credentials.')}
            </p>
          ) : null}

          <Button type="submit" disabled={login.isPending} className="mt-1 w-full">
            {login.isPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}
