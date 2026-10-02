import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useState } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeading } from '@/components/ui/PageHeading'
import { Panel } from '@/components/ui/Panel'
import { Tabs } from '@/components/ui/Tabs'
import { useChangePassword } from '@/features/auth/hooks/use-change-password'
import { errorMessage } from '@/lib/http'
import { toast } from '@/lib/toast'
import { type ChangePasswordValues, changePasswordSchema } from '@/features/auth/schemas/change-password-schema'

const tabs = [
  { title: 'Authentication', slug: 'authentication' },
  { title: 'Sessions', slug: 'sessions' },
  { title: 'Password', slug: 'password' },
  { title: 'Security Activity', slug: 'security-activity' },
  { title: 'API/Integration Access', slug: 'api-integration-access' },
]

const placeholders: Record<string, { title: string; description: string }> = {
  authentication: {
    title: 'Authentication',
    description: 'Two-factor authentication and sign-in method settings are coming soon.',
  },
  sessions: {
    title: 'Sessions',
    description: "A list of this account's active sessions is coming soon.",
  },
  'security-activity': {
    title: 'Security Activity',
    description: 'A timeline of security-relevant account activity is coming soon.',
  },
  'api-integration-access': {
    title: 'API/Integration Access',
    description: 'API keys and integration access management are coming soon.',
  },
}

function PasswordField({
  id,
  label,
  autoComplete,
  register,
  error,
}: {
  id: keyof ChangePasswordValues
  label: string
  autoComplete: string
  register: UseFormRegister<ChangePasswordValues>
  error?: string
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          className="h-10 w-full rounded-lg border border-line bg-canvas px-3 pr-10 text-sm text-ink outline-none placeholder:text-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
          aria-invalid={!!error}
          {...register(id)}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted hover:text-ink"
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
        >
          {visible ? <EyeSlash size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error ? <p className="mt-1 text-xs text-critical">{error}</p> : null}
    </div>
  )
}

function PasswordTab() {
  const changePassword = useChangePassword()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordValues>({ resolver: zodResolver(changePasswordSchema) })

  const onSubmit = (values: ChangePasswordValues) =>
    changePassword.mutate(values, {
      onSuccess: () => {
        reset()
        toast.success('Password changed successfully.')
      },
    })

  return (
    <Panel className="max-w-xl p-6">
      <h2 className="text-[15px] font-semibold text-ink">Password</h2>
      <p className="mt-0.5 text-xs text-muted">Change the password used to sign in to your account.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 flex flex-col gap-4">
        <PasswordField
          id="currentPassword"
          label="Current password"
          autoComplete="current-password"
          register={register}
          error={errors.currentPassword?.message}
        />
        <PasswordField
          id="newPassword"
          label="New password"
          autoComplete="new-password"
          register={register}
          error={errors.newPassword?.message}
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm new password"
          autoComplete="new-password"
          register={register}
          error={errors.confirmPassword?.message}
        />

        {changePassword.isError ? (
          <p role="alert" className="rounded-lg bg-critical-surface px-3 py-2 text-[13px] text-critical">
            {errorMessage(changePassword.error, 'Could not change your password. Try again.')}
          </p>
        ) : null}

        <Button type="submit" disabled={changePassword.isPending} className="mt-1 w-fit">
          {changePassword.isPending ? 'Saving…' : 'Save changes'}
        </Button>
      </form>
    </Panel>
  )
}

export function SecurityPage() {
  const [params, setParams] = useSearchParams()
  const activeTab = params.get('tab') ?? 'password'

  const selectTab = (slug: string) => {
    const next = new URLSearchParams(params)
    next.set('tab', slug)
    setParams(next, { replace: true })
  }

  const placeholder = placeholders[activeTab]

  return (
    <>
      <PageHeading title="Security" description="Sign-in methods, active sessions, and account activity." />
      <Tabs tabs={tabs} active={activeTab} onSelect={selectTab} />

      <div className="mt-5">
        {activeTab === 'password' ? (
          <PasswordTab />
        ) : (
          <Panel className="max-w-xl">
            <EmptyState title={placeholder?.title ?? 'Coming soon'} description={placeholder?.description} />
          </Panel>
        )}
      </div>
    </>
  )
}
