import { Export, FunnelSimple, MagnifyingGlass } from '@phosphor-icons/react'
import { Button } from './Button'

export function FilterBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2.5">
      <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-pill border border-line bg-surface px-3 text-muted sm:max-w-xs">
        <MagnifyingGlass size={15} />
        <input
          className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
          placeholder={placeholder}
        />
      </label>
      <Button variant="secondary" size="sm" icon={<FunnelSimple size={15} />}>
        Filter
      </Button>
      <Button variant="secondary" size="sm" icon={<Export size={15} />}>
        Export
      </Button>
    </div>
  )
}
