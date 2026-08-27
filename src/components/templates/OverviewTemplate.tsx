import { ArrowRight, CheckCircle, Info, Warning, WarningOctagon } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import type { NavItem, NavSection } from '../../lib/nav'
import { primaryDetailFor } from '../../lib/nav'
import {
  activityFeed,
  attentionItems,
  datasetFor,
  metricsFor,
  type ActivityEntry,
} from '../../lib/mock'
import { longDate } from '../../lib/format'
import { Button } from '../ui/Button'
import { DataTable } from '../ui/DataTable'
import { MetricCard } from '../ui/MetricCard'
import { PageHeading } from '../ui/PageHeading'
import { Panel, PanelHeader } from '../ui/Panel'
import { useNavigate } from 'react-router-dom'

const activityIcon: Record<ActivityEntry['type'], typeof CheckCircle> = {
  success: CheckCircle,
  pending: Warning,
  info: Info,
  critical: WarningOctagon,
}

const activityTone: Record<ActivityEntry['type'], string> = {
  success: 'bg-positive-surface text-positive',
  pending: 'bg-warning-surface text-warning',
  info: 'bg-info-surface text-info',
  critical: 'bg-critical-surface text-critical',
}

const attentionTone: Record<'critical' | 'warning' | 'info', string> = {
  critical: 'bg-critical-surface text-critical',
  warning: 'bg-warning-surface text-warning',
  info: 'bg-info-surface text-info',
}

export function OverviewTemplate({
  section,
  item,
  variant = 'dashboard',
}: {
  section: NavSection
  item: NavItem
  variant?: 'dashboard' | 'analytics'
}) {
  const navigate = useNavigate()
  const metrics = metricsFor(section.slug)
  const isDashboardHome = section.slug === 'dashboard' && item.slug === 'overview'
  const summary = datasetFor(section.slug === 'dashboard' ? 'payroll-runs' : section.items[1]?.dataset)
  const detail = primaryDetailFor(section.slug)

  return (
    <>
      <PageHeading
        eyebrow={isDashboardHome ? longDate() : section.title}
        title={isDashboardHome ? 'Good morning, Admin Ops' : item.title}
        description={
          isDashboardHome
            ? 'Here is what is happening across your platform today.'
            : `A ${variant === 'analytics' ? 'trend' : 'health'} summary for ${item.title.toLowerCase()}.`
        }
        action={<Button size="sm">Create report</Button>}
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      {variant === 'analytics' ? (
        <Panel className="mb-5">
          <PanelHeader title={`${item.title} over time`} description="Rolling 12 months · sample data" />
          <TrendChart seed={item.slug} />
        </Panel>
      ) : null}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <PanelHeader
            title="Recent activity"
            description="Live updates from across StackHR"
            action={
              <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
                View all
              </Button>
            }
          />
          <ul className="px-5 pb-3">
            {activityFeed.map((entry) => {
              const Icon = activityIcon[entry.type]
              return (
                <li
                  key={entry.name + entry.event}
                  className="flex items-center gap-3 border-t border-line/70 py-3 first:border-t-0"
                >
                  <span className={clsx('grid size-7 shrink-0 place-items-center rounded-lg', activityTone[entry.type])}>
                    <Icon size={14} weight="fill" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[13px] font-medium text-ink">{entry.name}</span>
                    <span className="truncate text-xs text-muted">{entry.event}</span>
                  </span>
                  <time className="shrink-0 text-xs text-muted">{entry.time}</time>
                </li>
              )
            })}
          </ul>
        </Panel>

        <Panel>
          <PanelHeader title="Needs attention" description="Items that may need your review" />
          <ul className="px-5 pb-4">
            {attentionItems.map((a) => (
              <li key={a.title} className="flex items-center gap-3 border-t border-line/70 py-3 first:border-t-0">
                <span className={clsx('grid size-7 shrink-0 place-items-center rounded-lg', attentionTone[a.severity])}>
                  <Warning size={14} weight="fill" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[13px] font-medium text-ink">{a.title}</span>
                  <span className="text-xs text-muted">{a.detail}</span>
                </span>
                <Button variant="ghost" size="sm">
                  Review
                </Button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel className="mt-5 overflow-hidden">
        <PanelHeader
          title={section.slug === 'dashboard' ? 'Payroll overview' : `${section.title} records`}
          description="Most recent activity"
          action={
            <Button variant="ghost" size="sm" icon={<ArrowRight size={14} />}>
              See all
            </Button>
          }
        />
        <DataTable
          columns={summary.columns}
          rows={summary.rows.slice(0, 5)}
          onRowClick={detail ? (row) => navigate(`/${detail.path.split('/:')[0]}/${row.id}`) : undefined}
        />
      </Panel>
    </>
  )
}

function TrendChart({ seed }: { seed: string }) {
  const bars = Array.from({ length: 12 }, (_, i) => {
    let h = 2166136261
    const s = seed + i
    for (let k = 0; k < s.length; k++) {
      h ^= s.charCodeAt(k)
      h = Math.imul(h, 16777619)
    }
    return 24 + ((h >>> 0) % 70)
  })
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  return (
    <div className="px-5 pb-6 pt-1">
      <div className="flex h-48 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={clsx('w-full rounded-t-md', i >= bars.length - 1 ? 'bg-accent' : 'bg-accent/25')}
              style={{ height: `${h}%` }}
            />
            <span className="text-[10px] text-muted">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
