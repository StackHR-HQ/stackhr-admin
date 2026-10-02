import type { NavItem, NavSection } from '@/lib/nav'
import { ConfigTemplate } from '@/components/templates/ConfigTemplate'
import { ListTemplate } from '@/components/templates/ListTemplate'
import { OverviewTemplate } from '@/components/templates/OverviewTemplate'

/** Renders the page template declared on a nav item. Route elements in
 *  `src/routes.tsx` pass the resolved section + item. */
export function TemplatePage({ section, item }: { section: NavSection; item: NavItem }) {
  switch (item.template) {
    case 'overview':
      return <OverviewTemplate section={section} item={item} />
    case 'analytics':
      return <OverviewTemplate section={section} item={item} variant="analytics" />
    case 'config':
      return <ConfigTemplate section={section} item={item} />
    default:
      return <ListTemplate section={section} item={item} />
  }
}
