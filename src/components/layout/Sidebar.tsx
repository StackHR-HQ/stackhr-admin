import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CaretRight, MagnifyingGlass } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { type NavItem, sections } from '../../lib/nav'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    'block rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-150 ease-primary',
    isActive
      ? 'bg-accent/18 font-medium text-white'
      : 'text-sidebar-muted hover:text-white',
  )

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const activeSection = pathname.split('/')[1] ?? ''
  const [open, setOpen] = useState<string>(activeSection)
  const [prevSection, setPrevSection] = useState(activeSection)
  const [query, setQuery] = useState('')

  // Follow the route: expand whichever section the current page belongs to.
  if (activeSection && activeSection !== prevSection) {
    setPrevSection(activeSection)
    setOpen(activeSection)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    return sections
      .map((s) => {
        const items = [...s.items, ...(s.groups?.flatMap((g) => g.items) ?? [])].filter(
          (i) => i.title.toLowerCase().includes(q) || s.title.toLowerCase().includes(q),
        )
        return { section: s, items }
      })
      .filter((r) => r.items.length)
  }, [query])

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-ink">
      <div className="flex h-[68px] shrink-0 items-center gap-2.5 border-b border-sidebar-border px-5">
        <img src="/logo-white.svg" alt="StackHR" className="h-5 w-auto" />
        <span className="rounded bg-sidebar-surface px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-sidebar-muted">
          Admin
        </span>
      </div>

      <div className="px-3 pb-1 pt-3">
        <label className="flex h-9 items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-surface px-2.5 text-sidebar-muted">
          <MagnifyingGlass size={14} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search navigation"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-sidebar-ink outline-none placeholder:text-sidebar-muted"
          />
        </label>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {filtered
          ? filtered.map(({ section, items }) => (
              <div key={section.slug} className="mb-3">
                <p className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-sidebar-muted">
                  {section.title}
                </p>
                {items.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={`/${section.slug}/${item.slug}`}
                    className={linkClass}
                    onClick={onNavigate}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>
            ))
          : sections.map((section) => {
              const isOpen = open === section.slug
              const Icon = section.icon
              return (
                <div key={section.slug} className="mb-0.5">
                  <button
                    onClick={() => setOpen(isOpen ? '' : section.slug)}
                    className={clsx(
                      'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors duration-150 ease-primary',
                      isOpen ? 'text-white' : 'text-sidebar-muted hover:bg-sidebar-surface hover:text-white',
                    )}
                  >
                    <Icon size={17} weight={isOpen ? 'fill' : 'regular'} className="shrink-0" />
                    <span className="flex-1 text-left">{section.title}</span>
                    <CaretRight
                      size={13}
                      className={clsx('transition-transform duration-150 ease-primary', isOpen && 'rotate-90')}
                    />
                  </button>
                  {isOpen ? (
                    <div className="mb-1 ml-[15px] border-l border-sidebar-border pb-1 pl-3 pt-1">
                      {section.items.map((item) => (
                        <SidebarLink key={item.slug} section={section.slug} item={item} onNavigate={onNavigate} />
                      ))}
                      {section.groups?.map((group) => (
                        <div key={group.label} className="mt-2">
                          <p className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-sidebar-muted/70">
                            {group.label}
                          </p>
                          {group.items.map((item) => (
                            <SidebarLink key={item.slug} section={section.slug} item={item} onNavigate={onNavigate} />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
      </nav>

      <div className="flex shrink-0 items-center gap-2 border-t border-sidebar-border px-5 py-4 text-xs text-sidebar-muted">
        <span className="size-1.5 rounded-full bg-positive" />
        All systems operational
      </div>
    </div>
  )
}

function SidebarLink({
  section,
  item,
  onNavigate,
}: {
  section: string
  item: NavItem
  onNavigate?: () => void
}) {
  return (
    <NavLink to={`/${section}/${item.slug}`} className={linkClass} onClick={onNavigate}>
      {item.title}
    </NavLink>
  )
}
