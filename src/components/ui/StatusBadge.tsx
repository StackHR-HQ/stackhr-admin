import { clsx } from 'clsx'
import { type Tone, toneFor } from '../../lib/status'

const styles: Record<Tone, string> = {
  positive: 'bg-positive-surface text-positive',
  warning: 'bg-warning-surface text-warning',
  critical: 'bg-critical-surface text-critical',
  info: 'bg-info-surface text-info',
  neutral: 'bg-surface-2 text-muted',
}

export function StatusBadge({ value, className }: { value: string; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-medium',
        styles[toneFor(value)],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {value}
    </span>
  )
}
