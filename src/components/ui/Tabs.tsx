import { clsx } from 'clsx'

export function Tabs({
  tabs,
  active,
  onSelect,
}: {
  tabs: { title: string; slug: string }[]
  active: string
  onSelect: (slug: string) => void
}) {
  return (
    <div className="overflow-x-auto border-b border-line">
      <div className="flex min-w-max gap-1">
        {tabs.map((tab) => {
          const isActive = tab.slug === active
          return (
            <button
              key={tab.slug}
              onClick={() => onSelect(tab.slug)}
              className={clsx(
                'relative whitespace-nowrap px-3 py-2.5 text-[13px] font-medium transition-colors duration-150 ease-primary',
                isActive ? 'text-ink' : 'text-muted hover:text-ink',
              )}
            >
              {tab.title}
              {isActive ? (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent" />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
