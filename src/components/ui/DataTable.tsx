import { clsx } from 'clsx'
import type { Column, Row } from '../../lib/mock'
import { StatusBadge } from './StatusBadge'

export function DataTable({
  columns,
  rows,
  onRowClick,
}: {
  columns: Column[]
  rows: Row[]
  onRowClick?: (row: Row) => void
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  'border-y border-line bg-surface-2/60 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.04em] text-muted',
                  col.align === 'right' ? 'text-right' : 'text-left',
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={String(row.id ?? i)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={clsx(
                'border-b border-line/70 transition-colors duration-150 ease-primary',
                onRowClick && 'cursor-pointer hover:bg-surface-2/50',
              )}
            >
              {columns.map((col, ci) => {
                const value = row[col.key]
                return (
                  <td
                    key={col.key}
                    className={clsx(
                      'px-5 py-3.5 align-middle',
                      col.align === 'right' ? 'text-right tabular-nums' : 'text-left',
                      ci === 0 ? 'font-medium text-ink' : 'text-muted',
                    )}
                  >
                    {col.kind === 'status' && typeof value === 'string' ? (
                      <StatusBadge value={value} />
                    ) : (
                      value
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
