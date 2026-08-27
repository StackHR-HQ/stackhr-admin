import { clsx } from 'clsx'
import { TrendDown, TrendUp } from '@phosphor-icons/react'
import type { Metric } from '../../lib/mock'
import { seeded } from '../../lib/format'

function Sparkline({ seed }: { seed: string }) {
  const bars = Array.from({ length: 9 }, (_, i) => 28 + Math.round(seeded(seed + i) * 64))
  return (
    <div className="mt-4 flex h-8 items-end gap-1" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className={clsx('flex-1 rounded-t-[3px]', i >= bars.length - 2 ? 'bg-accent/55' : 'bg-accent/20')}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

export function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.trend === 'up' ? TrendUp : TrendDown
  return (
    <div className="overflow-hidden rounded-panel border border-line bg-surface p-5 shadow-panel">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{metric.label}</span>
      </div>
      <strong className="mt-3 block text-[26px] font-semibold tracking-[-0.02em] text-ink">
        {metric.value}
      </strong>
      <div className="mt-1.5 flex items-center gap-2 text-xs">
        <span
          className={clsx(
            'inline-flex items-center gap-1 font-medium',
            metric.trend === 'up' ? 'text-positive' : 'text-critical',
          )}
        >
          <Icon size={13} weight="bold" />
          {metric.delta}
        </span>
        <span className="text-muted">vs. last month</span>
      </div>
      <Sparkline seed={metric.label} />
    </div>
  )
}
