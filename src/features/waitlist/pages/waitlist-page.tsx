import { useMemo, useState } from 'react'
import { ArrowsClockwise, MagnifyingGlass } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeading } from '@/components/ui/PageHeading'
import { Panel } from '@/components/ui/Panel'
import { errorMessage } from '@/lib/http'
import type { Column, Row } from '@/lib/mock'
import { useWaitlistEntries } from '@/features/waitlist/hooks/use-waitlist-entries'

const columns: Column[] = [
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },
  { key: 'businessName', label: 'Business' },
  { key: 'businessEmail', label: 'Email' },
  { key: 'joined', label: 'Joined' },
]

const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' })

export function WaitlistPage() {
  const { data, isPending, isError, error, refetch, isFetching } = useWaitlistEntries()
  const [query, setQuery] = useState('')

  const rows = useMemo<Row[]>(() => {
    const q = query.trim().toLowerCase()
    return (data ?? [])
      .filter(
        (e) =>
          !q ||
          [e.name, e.position, e.businessName, e.businessEmail].some((v) => v.toLowerCase().includes(q)),
      )
      .map((e) => ({
        id: e.id,
        name: e.name,
        position: e.position,
        businessName: e.businessName,
        businessEmail: e.businessEmail,
        joined: dateFormat.format(new Date(e.createdAt)),
      }))
  }, [data, query])

  return (
    <>
      <PageHeading
        eyebrow="Waitlist"
        title="Waitlist entries"
        description="Businesses that have requested early access to StackHR."
        action={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => void refetch()}
            disabled={isFetching}
            icon={<ArrowsClockwise size={15} className={isFetching ? 'animate-spin' : undefined} />}
          >
            Refresh
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-pill border border-line bg-surface px-3 text-muted sm:max-w-xs">
          <MagnifyingGlass size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
            placeholder="Search waitlist"
            aria-label="Search waitlist"
          />
        </label>
      </div>

      <Panel className="overflow-hidden">
        {isPending ? (
          <p className="px-5 py-16 text-center text-sm text-muted" role="status">
            Loading waitlist…
          </p>
        ) : isError ? (
          <EmptyState
            title="Could not load the waitlist"
            description={errorMessage(error)}
            action={
              <Button variant="secondary" size="sm" onClick={() => void refetch()}>
                Try again
              </Button>
            }
          />
        ) : rows.length === 0 ? (
          <EmptyState
            title={query ? 'No matching entries' : 'No waitlist entries yet'}
            description={
              query ? 'Try a different search term.' : 'Sign-ups from the marketing site will appear here.'
            }
          />
        ) : (
          <>
            <div className="px-5 py-3.5 text-xs text-muted">
              {rows.length.toLocaleString()} {rows.length === 1 ? 'entry' : 'entries'}
              {query && data ? ` of ${data.length.toLocaleString()}` : ''}
            </div>
            <DataTable columns={columns} rows={rows} />
          </>
        )}
      </Panel>
    </>
  )
}
