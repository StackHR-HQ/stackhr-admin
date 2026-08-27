import type { ReactNode } from 'react'
import { Sparkle } from '@phosphor-icons/react'

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="grid size-11 place-items-center rounded-full bg-surface-2 text-muted">
        <Sparkle size={18} />
      </span>
      <div>
        <p className="text-sm font-medium text-ink">{title}</p>
        {description ? <p className="mt-1 text-xs text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}
