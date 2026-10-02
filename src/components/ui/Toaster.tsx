import { CheckCircle, WarningCircle, X } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useToastStore } from '@/lib/toast'

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)
  const dismiss = useToastStore((state) => state.dismiss)

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:left-auto sm:right-6 sm:bottom-6"
    >
      {toasts.map((t) => {
        const Icon = t.variant === 'success' ? CheckCircle : WarningCircle
        return (
          <div
            key={t.id}
            role={t.variant === 'error' ? 'alert' : 'status'}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-lg border border-line bg-canvas px-3.5 py-3 text-[13px] text-ink shadow-lg"
          >
            <Icon
              size={18}
              weight="fill"
              className={clsx('mt-px shrink-0', t.variant === 'success' ? 'text-positive' : 'text-critical')}
            />
            <p className="flex-1">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="shrink-0 text-muted hover:text-ink"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
