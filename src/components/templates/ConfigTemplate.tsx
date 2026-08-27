import { CheckCircle } from '@phosphor-icons/react'
import type { NavItem, NavSection } from '../../lib/nav'
import { Button } from '../ui/Button'
import { PageHeading } from '../ui/PageHeading'
import { Panel, PanelHeader } from '../ui/Panel'

type Field = { label: string; value: string; hint?: string; type?: string }

function fieldsFor(item: NavItem): Field[] {
  if (/notification/i.test(item.title)) {
    return [
      { label: 'Notification sender name', value: 'StackHR Platform' },
      { label: 'Reply-to address', value: 'no-reply@stackhr.com', type: 'email' },
      { label: 'Digest frequency', value: 'Daily at 08:00 WAT' },
    ]
  }
  if (/feature flag/i.test(item.title)) {
    return [
      { label: 'Environment', value: 'Production' },
      { label: 'Default rollout', value: '10% of businesses', hint: 'Applied to newly created flags' },
    ]
  }
  return [
    { label: 'Workspace name', value: 'StackHR Operations' },
    { label: 'Primary contact email', value: 'ops@stackhr.com', type: 'email' },
    { label: 'Default timezone', value: 'Africa/Lagos (WAT)' },
  ]
}

const recentChanges = [
  { title: 'Policy updated', meta: 'Today at 09:42 by Admin Ops' },
  { title: 'Access reviewed', meta: 'Yesterday at 16:20 by T. Adeyemi' },
  { title: 'Provider rotated', meta: 'Aug 24 at 11:05 by System' },
]

export function ConfigTemplate({ section, item }: { section: NavSection; item: NavItem }) {
  const fields = fieldsFor(item)

  return (
    <>
      <PageHeading
        eyebrow={section.title}
        title={item.title}
        description={`Configure controls and policies for ${item.title.toLowerCase()}.`}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Panel>
          <PanelHeader title={`${item.title} settings`} description="Changes apply platform-wide." />
          <form className="flex flex-col gap-4 px-5 pb-5">
            {fields.map((field) => (
              <label key={field.label} className="flex flex-col gap-1.5 text-xs text-muted">
                {field.label}
                <input
                  type={field.type ?? 'text'}
                  defaultValue={field.value}
                  className="rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-150 ease-primary focus:border-accent"
                />
                {field.hint ? <span className="text-[11px] text-muted">{field.hint}</span> : null}
              </label>
            ))}
            <label className="mt-1 flex items-center gap-2.5 text-sm text-ink">
              <input type="checkbox" defaultChecked className="size-4 accent-[var(--color-accent)]" />
              Require admin approval for changes in this area
            </label>
            <div className="pt-1">
              <Button size="sm">Save changes</Button>
            </div>
          </form>
        </Panel>

        <Panel>
          <PanelHeader title="Recent changes" />
          <ul className="px-5 pb-5">
            {recentChanges.map((c) => (
              <li key={c.title} className="flex gap-3 border-t border-line/70 py-3.5 first:border-t-0">
                <CheckCircle size={16} className="mt-0.5 shrink-0 text-positive" weight="fill" />
                <span className="flex flex-col">
                  <span className="text-[13px] font-medium text-ink">{c.title}</span>
                  <span className="text-[11px] text-muted">{c.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}
