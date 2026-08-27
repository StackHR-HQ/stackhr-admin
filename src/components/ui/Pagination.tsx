import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { clsx } from 'clsx'

export function Pagination({ shown, total }: { shown: number; total: number }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-4 text-xs text-muted">
      <span>
        Showing 1–{shown} of {total.toLocaleString()}
      </span>
      <div className="flex items-center gap-1">
        <PageButton aria-label="Previous page">
          <CaretLeft size={13} />
        </PageButton>
        {[1, 2, 3].map((n) => (
          <PageButton key={n} current={n === 1}>
            {n}
          </PageButton>
        ))}
        <PageButton aria-label="Next page">
          <CaretRight size={13} />
        </PageButton>
      </div>
    </div>
  )
}

function PageButton({
  current,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { current?: boolean }) {
  return (
    <button
      className={clsx(
        'inline-flex h-7 min-w-7 items-center justify-center rounded-md border px-1.5 text-xs transition-colors duration-150 ease-primary',
        current
          ? 'border-accent/30 bg-accent-surface text-accent'
          : 'border-line bg-surface text-muted hover:bg-surface-2',
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
