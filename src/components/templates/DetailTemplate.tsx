import { useParams, useSearchParams } from 'react-router-dom'
import { CaretDown } from '@phosphor-icons/react'
import type { NavDetail } from '../../lib/nav'
import { datasetFor, findRecord } from '../../lib/mock'
import { initials } from '../../lib/format'
import { Button } from '../ui/Button'
import { DataTable } from '../ui/DataTable'
import { PageHeading } from '../ui/PageHeading'
import { Panel, PanelHeader } from '../ui/Panel'
import { StatusBadge } from '../ui/StatusBadge'
import { Tabs } from '../ui/Tabs'

export function DetailTemplate({ detail }: { detail: NavDetail }) {
  const [params, setParams] = useSearchParams()
  const routeParams = useParams()
  const id = routeParams.id ?? detail.sampleId
  const record = findRecord(id)
  const activeTab = params.get('tab') ?? detail.tabs[0].slug
  const activeTabMeta = detail.tabs.find((t) => t.slug === activeTab) ?? detail.tabs[0]

  const title =
    (record?.name as string) ??
    (record?.subject as string) ??
    (record?.actor as string) ??
    `${detail.label} ${id}`

  const facts = record
    ? Object.entries(record).filter(([k]) => !['id', 'name', 'subject', 'actor', 'status'].includes(k))
    : [
        ['Reference', id],
        ['Created', 'Aug 12, 2026'],
        ['Owner', 'Admin Ops'],
      ]

  const selectTab = (slug: string) => {
    const next = new URLSearchParams(params)
    next.set('tab', slug)
    setParams(next, { replace: true })
  }

  const related = datasetFor(detail.path.startsWith('employees') ? 'payroll-runs' : 'transactions')

  return (
    <>
      <PageHeading
        eyebrow={`${detail.label} · ${id}`}
        title={title}
        action={
          detail.actions ? (
            <div className="flex flex-wrap gap-2">
              <Button size="sm">{detail.actions[0]}</Button>
              {detail.actions.length > 1 ? (
                <Button variant="secondary" size="sm" icon={<CaretDown size={13} />}>
                  Actions
                </Button>
              ) : null}
            </div>
          ) : (
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          )
        }
      />

      <Panel className="mb-5">
        <div className="flex flex-wrap items-center gap-4 p-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-surface text-sm font-semibold text-accent">
            {initials(title)}
          </span>
          <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-1">
            {record?.status ? <StatusBadge value={String(record.status)} /> : null}
            {facts.slice(0, 4).map(([k, v]) => (
              <span key={String(k)} className="flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.06em] text-muted">{String(k)}</span>
                <span className="text-[13px] font-medium text-ink">{String(v)}</span>
              </span>
            ))}
          </div>
        </div>
      </Panel>

      <Tabs tabs={detail.tabs} active={activeTab} onSelect={selectTab} />

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Panel>
          <PanelHeader title={activeTabMeta.title} description={`${activeTabMeta.title} for this ${detail.label.toLowerCase()}.`} />
          <dl className="flex flex-col px-5 pb-5">
            {facts.map(([k, v]) => (
              <div key={String(k)} className="flex justify-between gap-4 border-t border-line/70 py-3 text-sm first:border-t-0">
                <dt className="text-muted">{String(k)}</dt>
                <dd className="text-right font-medium text-ink">{String(v)}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel className="overflow-hidden">
          <PanelHeader title="Related activity" description="Sample data" />
          <DataTable columns={related.columns} rows={related.rows.slice(0, 6)} />
        </Panel>
      </div>
    </>
  )
}
