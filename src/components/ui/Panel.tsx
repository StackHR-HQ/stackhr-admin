import type { ReactNode } from 'react'
import { clsx } from 'clsx'

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={clsx('rounded-panel border border-line bg-surface shadow-panel', className)}>
      {children}
    </section>
  )
}

export function PanelHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 pb-4 pt-5">
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
        {description ? <p className="mt-0.5 text-xs text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
