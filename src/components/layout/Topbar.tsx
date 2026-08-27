import { List as ListIcon, Bell, MagnifyingGlass } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'
import { sectionBySlug } from '../../lib/nav'

function useCrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)
  const [sectionSlug] = segments
  const section = sectionBySlug(sectionSlug)
  const crumbs: { label: string; to?: string }[] = [{ label: 'Admin Portal', to: '/' }]
  if (!section) return crumbs
  crumbs.push({ label: section.title })

  const detail = section.details?.find((d) => {
    const base = d.path.split('/:')[0].split('/')
    return base.every((seg, i) => segments[i] === seg)
  })
  if (detail) {
    crumbs.push({ label: detail.label })
    crumbs.push({ label: segments[segments.length - 1] })
    return crumbs
  }

  const itemSlug = segments[1]
  if (itemSlug) {
    const item =
      section.items.find((i) => i.slug === itemSlug) ??
      section.groups?.flatMap((g) => g.items).find((i) => i.slug === itemSlug)
    crumbs.push({ label: item?.title ?? decodeURIComponent(itemSlug) })
  }
  return crumbs
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const crumbs = useCrumbs()

  return (
    <header className="flex h-17 shrink-0 items-center gap-4 border-b border-line bg-surface px-4 sm:px-7">
      <button
        onClick={onMenu}
        className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-2 lg:hidden"
        aria-label="Open navigation"
      >
        <ListIcon size={18} />
      </button>

      <nav className="flex min-w-0 items-center gap-2 text-[13px] text-muted">
        {crumbs.map((crumb, i) => (
          <span key={crumb.label} className="flex min-w-0 items-center gap-2">
            {i > 0 ? <span className="text-line">/</span> : null}
            {crumb.to ? (
              <Link to={crumb.to} className="hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              <span className={i === crumbs.length - 1 ? 'truncate font-medium text-ink' : ''}>
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <label className="hidden h-9 items-center gap-2 rounded-pill border border-line bg-canvas px-3 text-muted md:flex">
          <MagnifyingGlass size={15} />
          <input
            className="w-40 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
            placeholder="Search anything"
          />
          <kbd className="rounded border border-line px-1.5 text-[10px] text-muted">⌘K</kbd>
        </label>

        <button className="relative grid size-9 place-items-center rounded-lg text-muted hover:bg-surface-2" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-critical" />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-accent-surface text-xs font-semibold text-accent">
            AO
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-[13px] font-semibold text-ink">Admin Ops</span>
            <span className="text-[11px] text-muted">Super admin</span>
          </span>
        </div>
      </div>
    </header>
  )
}
