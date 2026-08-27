import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from '@phosphor-icons/react'
import type { NavItem, NavSection } from '../../lib/nav'
import { primaryDetailFor } from '../../lib/nav'
import { datasetFor } from '../../lib/mock'
import { Button } from '../ui/Button'
import { DataTable } from '../ui/DataTable'
import { EmptyState } from '../ui/EmptyState'
import { FilterBar } from '../ui/FilterBar'
import { PageHeading } from '../ui/PageHeading'
import { Pagination } from '../ui/Pagination'
import { Panel } from '../ui/Panel'

export function ListTemplate({ section, item }: { section: NavSection; item: NavItem }) {
  const navigate = useNavigate()
  const data = useMemo(() => datasetFor(item.dataset), [item.dataset])
  const detail = primaryDetailFor(section.slug)
  const [empty] = useState(false)

  const noun = item.title.replace(/^(All|Active|Trial|Suspended|Pending|Inactive|Failed|Open|Resolved)\s+/i, '')

  return (
    <>
      <PageHeading
        eyebrow={section.title}
        title={item.title}
        description={`Manage and monitor ${item.title.toLowerCase()} across the StackHR platform.`}
        action={
          <Button size="sm" icon={<Plus size={15} weight="bold" />}>
            Add {noun.toLowerCase()}
          </Button>
        }
      />

      <FilterBar placeholder={`Search ${item.title.toLowerCase()}`} />

      <Panel className="overflow-hidden">
        {empty ? (
          <EmptyState
            title={`No ${item.title.toLowerCase()} yet`}
            description="Records will appear here once businesses start using this area."
          />
        ) : (
          <>
            <div className="flex items-center justify-between px-5 py-3.5 text-xs text-muted">
              <span>{(data.rows.length * 89).toLocaleString()} total records</span>
              <span>Updated just now</span>
            </div>
            <DataTable
              columns={data.columns}
              rows={data.rows}
              onRowClick={
                detail ? (row) => navigate(`/${detail.path.split('/:')[0]}/${row.id}`) : undefined
              }
            />
            <Pagination shown={data.rows.length} total={data.rows.length * 89} />
          </>
        )}
      </Panel>
    </>
  )
}
