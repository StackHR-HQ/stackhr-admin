/**
 * Information architecture for the StackHR admin portal, transcribed from
 * `sidebar.md`. This is the single source of truth for the sidebar, the router
 * (`src/routes.tsx`) and breadcrumbs. Plain data only — no components — so the
 * router and the sidebar can both consume it.
 */
import {
  Bell,
  Buildings,
  ChartLineUp,
  CreditCard,
  Files,
  GearSix,
  Heartbeat,
  type Icon,
  IdentificationCard,
  Lifebuoy,
  PlugsConnected,
  Receipt,
  SealCheck,
  ShieldCheck,
  SlidersHorizontal,
  SquaresFour,
  UsersThree,
  Wallet,
} from '@phosphor-icons/react'

export type PhosphorIcon = Icon

export type Template = 'overview' | 'list' | 'config' | 'analytics'

export type NavItem = {
  title: string
  slug: string
  template?: Template
  /** Key into `datasetFor()` in `src/lib/mock.ts`; falls back to a generic table. */
  dataset?: string
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export type NavDetail = {
  /** Router path, e.g. `businesses/:id`. */
  path: string
  label: string
  /** Human label for the sample record shown when a bare id is visited. */
  sampleId: string
  tabs: NavItem[]
  actions?: string[]
}

export type NavSection = {
  title: string
  slug: string
  icon: PhosphorIcon
  items: NavItem[]
  groups?: NavGroup[]
  details?: NavDetail[]
}

/** `"All Businesses"` -> `"all-businesses"` */
export function toSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Build a list of `NavItem`s from labels. `shared` is merged into every item;
 * `overrides` is merged per-title and wins over `shared`.
 */
function items(
  labels: string[],
  overrides: Record<string, Partial<NavItem>> = {},
  shared: Partial<NavItem> = {},
): NavItem[] {
  return labels.map((title) => {
    const slug = toSlug(title)
    const inferred: Template =
      /overview|dashboard/i.test(title) ? 'overview'
      : /config|rules|preferences|settings|flags|engine|plans|pricing/i.test(title) ? 'config'
      : 'list'
    return { title, slug, template: inferred, dataset: slug, ...shared, ...overrides[title] }
  })
}

export const sections: NavSection[] = [
  {
    title: 'Dashboard',
    slug: 'dashboard',
    icon: SquaresFour,
    items: items([
      'Overview',
      'Platform Metrics',
      'Recent Activity',
      'System Alerts',
      'Pending Actions',
      'Support Alerts',
      'Compliance Alerts',
    ], {
      'Platform Metrics': { template: 'analytics', dataset: 'platform-metrics' },
      'Recent Activity': { dataset: 'activity-feed' },
      'System Alerts': { dataset: 'system-alerts' },
    }),
  },
  {
    title: 'Businesses',
    slug: 'businesses',
    icon: Buildings,
    items: items([
      'All Businesses',
      'Active Businesses',
      'Trial Businesses',
      'Suspended Businesses',
      'Pending Verification',
      'Inactive Businesses',
    ], {}, { dataset: 'businesses' }),
    details: [
      {
        path: 'businesses/:id',
        label: 'Business',
        sampleId: 'b-001',
        actions: [
          'View Business',
          'Edit Business',
          'Suspend Business',
          'Reactivate Business',
          'Impersonate Business Admin',
          'Reset Business Configuration',
          'Export Business Data',
        ],
        tabs: items([
          'Overview',
          'Business Profile',
          'Organization Structure',
          'Employees',
          'Payroll',
          'Leave',
          'Expenses',
          'Reimbursements',
          'Salary Advances',
          'Documents',
          'Approvals',
          'Financial Activity',
          'Subscription',
          'Billing',
          'Compliance',
          'Activity Log',
          'Admin Notes',
        ]),
      },
    ],
  },
  {
    title: 'Employees',
    slug: 'employees',
    icon: IdentificationCard,
    items: items([
      'All Employees',
      'Active Employees',
      'Pending Onboarding',
      'Pending Invitations',
      'Inactive Employees',
    ], {}, { dataset: 'employees' }),
    details: [
      {
        path: 'employees/:id',
        label: 'Employee',
        sampleId: 'e-001',
        tabs: items([
          'Profile',
          'Employment',
          'Compensation',
          'Payroll History',
          'Payslips',
          'Leave',
          'Expenses',
          'Reimbursements',
          'Salary Advances',
          'Documents',
          'Payment Information',
          'Statutory Information',
          'Activity',
        ]),
      },
    ],
  },
  {
    title: 'Payroll',
    slug: 'payroll',
    icon: Wallet,
    items: items([
      'Payroll Overview',
      'All Payroll Runs',
      'Processing',
      'Pending Approval',
      'Completed',
      'Failed',
      'Payroll Exceptions',
    ], { 'Payroll Overview': { dataset: 'payroll-overview' } }, { dataset: 'payroll-runs' }),
    groups: [
      {
        label: 'Payroll Operations',
        items: items([
          'Payroll Configuration',
          'Tax Rules',
          'Statutory Rules',
          'Contribution Rules',
          'Payroll Engine Versions',
          'Payroll Processing Logs',
        ]),
      },
    ],
    details: [
      {
        path: 'payroll/runs/:id',
        label: 'Payroll run',
        sampleId: 'pr-001',
        tabs: items([
          'Summary',
          'Employees',
          'Earnings',
          'Deductions',
          'Employer Contributions',
          'Tax',
          'Compliance',
          'Payslips',
          'Payment Status',
          'Audit Log',
        ]),
      },
    ],
  },
  {
    title: 'Finance',
    slug: 'finance',
    icon: CreditCard,
    items: items([
      'Financial Overview',
      'Business Accounts',
      'Transactions',
      'Transfers',
      'Payroll Funding',
      'Payment Batches',
      'Reimbursements',
      'Reconciliation',
      'Failed Transactions',
    ], { Transactions: { dataset: 'transactions' } }),
    details: [
      {
        path: 'finance/accounts/:id',
        label: 'Financial account',
        sampleId: 'fa-001',
        tabs: items([
          'Account Overview',
          'Balance',
          'Transactions',
          'Funding',
          'Transfers',
          'Account Status',
          'Provider Details',
        ]),
      },
      {
        path: 'finance/payments/:id',
        label: 'Payment',
        sampleId: 'pay-001',
        tabs: items([
          'Payment Information',
          'Provider Reference',
          'Transaction Status',
          'Failure Reason',
          'Webhook Events',
          'Reconciliation Status',
        ]),
      },
    ],
  },
  {
    title: 'Subscriptions & Billing',
    slug: 'subscriptions-billing',
    icon: Receipt,
    items: items([
      'Overview',
      'All Subscriptions',
      'Trials',
      'Active Subscriptions',
      'Past Due',
      'Cancelled',
      'Expired',
    ], { 'All Subscriptions': { dataset: 'subscriptions' } }),
    groups: [
      {
        label: 'Billing Operations',
        items: items(['Plans', 'Pricing', 'Discounts', 'Coupons', 'Payment Failures', 'Refunds']),
      },
    ],
    details: [
      {
        path: 'subscriptions-billing/:id',
        label: 'Subscription',
        sampleId: 'sub-001',
        tabs: items([
          'Current Plan',
          'Subscription Status',
          'Trial Period',
          'Payment Method',
          'Billing History',
          'Invoices',
          'Usage',
          'Plan Changes',
        ]),
      },
    ],
  },
  {
    title: 'Compliance',
    slug: 'compliance',
    icon: SealCheck,
    items: items([
      'Compliance Overview',
      'Business Verification',
      'KYB',
      'KYC',
      'Tax Compliance',
      'Payroll Compliance',
      'Statutory Contributions',
      'Compliance Warnings',
    ]),
    groups: [
      {
        label: 'Verification',
        items: items([
          'Pending Verification',
          'Approved',
          'Rejected',
          'Verification Documents',
          'Verification History',
        ]),
      },
    ],
  },
  {
    title: 'Support',
    slug: 'support',
    icon: Lifebuoy,
    items: items([
      'Support Dashboard',
      'Open Issues',
      'Pending Issues',
      'Resolved Issues',
      'Escalated Issues',
    ], { 'Open Issues': { dataset: 'tickets' } }),
    groups: [
      {
        label: 'Business Support',
        items: items([
          'Business Issues',
          'Employee Issues',
          'Payroll Issues',
          'Payment Issues',
          'Billing Issues',
          'Account Issues',
        ]),
      },
    ],
    details: [
      {
        path: 'support/tickets/:id',
        label: 'Ticket',
        sampleId: 't-001',
        tabs: items([
          'Ticket Information',
          'Business Context',
          'User Context',
          'Activity',
          'Internal Notes',
          'Resolution',
        ]),
      },
    ],
  },
  {
    title: 'Users & Access',
    slug: 'users-access',
    icon: UsersThree,
    items: items([
      'All Admin Users',
      'Business Admins',
      'Managers',
      'Employees',
      'Suspended Users',
    ]),
    groups: [
      {
        label: 'Access Management',
        items: items([
          'Roles',
          'Permissions',
          'Role Assignments',
          'Invitations',
          'Sessions',
          'Login Activity',
        ]),
      },
      {
        label: 'Internal Admins',
        items: items(['Admin Users', 'Admin Roles', 'Admin Permissions', 'Admin Activity']),
      },
    ],
  },
  {
    title: 'Platform Analytics',
    slug: 'platform-analytics',
    icon: ChartLineUp,
    items: items([
      'Overview',
      'Business Growth',
      'User Growth',
      'Employee Growth',
      'Payroll Volume',
      'Payroll Value',
      'Transaction Volume',
      'Revenue',
      'Subscription Metrics',
      'Retention',
      'Churn',
    ]).map((it) => ({ ...it, template: 'analytics' as Template })),
    groups: [
      {
        label: 'Product Analytics',
        items: items([
          'Feature Usage',
          'Onboarding Completion',
          'Payroll Usage',
          'Expense Usage',
          'Leave Usage',
          'Salary Advance Usage',
        ]).map((it) => ({ ...it, template: 'analytics' as Template })),
      },
    ],
  },
  {
    title: 'Notifications & Communications',
    slug: 'notifications-communications',
    icon: Bell,
    items: items([
      'Notification Center',
      'System Notifications',
      'Business Notifications',
      'Employee Notifications',
    ]),
    groups: [
      {
        label: 'Communications',
        items: items([
          'Email Campaigns',
          'Product Announcements',
          'Maintenance Notices',
          'Billing Notifications',
          'Compliance Notifications',
        ]),
      },
    ],
  },
  {
    title: 'Documents',
    slug: 'documents',
    icon: Files,
    items: items([
      'Business Documents',
      'Verification Documents',
      'Compliance Documents',
      'Payroll Documents',
      'Employee Documents',
    ]),
    groups: [
      {
        label: 'Document Management',
        items: items([
          'Document Requests',
          'Document Verification',
          'Document History',
          'Document Access Logs',
        ]),
      },
    ],
  },
  {
    title: 'System Configuration',
    slug: 'system-configuration',
    icon: SlidersHorizontal,
    items: items([
      'General Configuration',
      'Feature Flags',
      'Environment Configuration',
      'Email Configuration',
      'Payment Configuration',
      'Storage Configuration',
      'Analytics Configuration',
    ]),
    groups: [
      {
        label: 'Payroll Configuration',
        items: items([
          'Tax Rules',
          'Statutory Rules',
          'Payroll Engine',
          'Calculation Versions',
          'Compliance Rules',
        ]),
      },
      {
        label: 'Platform Configuration',
        items: items([
          'Countries',
          'Currencies',
          'Supported Banks',
          'Leave Types',
          'Expense Categories',
          'Notification Templates',
        ]),
      },
    ],
  },
  {
    title: 'Integrations',
    slug: 'integrations',
    icon: PlugsConnected,
    items: items([
      'Overview',
      'Anchor',
      'Payment Providers',
      'Email Provider',
      'Storage',
      'Analytics',
      'Future Integrations',
    ], { Anchor: { dataset: 'integrations' } }),
    details: [
      {
        path: 'integrations/detail/:id',
        label: 'Integration',
        sampleId: 'anchor',
        tabs: items([
          'Connection Status',
          'Configuration',
          'API Status',
          'Webhooks',
          'Webhook Logs',
          'Errors',
          'Usage',
        ]),
      },
    ],
  },
  {
    title: 'Audit & Security',
    slug: 'audit-security',
    icon: ShieldCheck,
    items: items([
      'Audit Log',
      'Admin Activity',
      'Business Activity',
      'Authentication Events',
      'Permission Changes',
      'Data Access Logs',
      'Security Events',
    ], { 'Audit Log': { dataset: 'audit-events' } }),
    details: [
      {
        path: 'audit-security/events/:id',
        label: 'Audit event',
        sampleId: 'ae-001',
        tabs: items([
          'User',
          'Business',
          'Action',
          'Resource',
          'Timestamp',
          'IP / Session',
          'Before / After',
          'Reason',
        ]),
      },
    ],
  },
  {
    title: 'System Health',
    slug: 'system-health',
    icon: Heartbeat,
    items: items([
      'System Overview',
      'API Health',
      'Database Health',
      'Payment Provider Health',
      'Email Health',
      'Storage Health',
    ]),
    groups: [
      {
        label: 'Monitoring',
        items: items([
          'Errors',
          'Failed Jobs',
          'Background Jobs',
          'Webhook Failures',
          'API Failures',
          'Performance',
          'Service Status',
        ]),
      },
    ],
  },
  {
    title: 'Settings',
    slug: 'settings',
    icon: GearSix,
    items: items([
      'Admin Profile',
      'Security',
      'Notifications',
      'Preferences',
      'Admin Roles',
      'Platform Preferences',
    ]).map((it) => ({ ...it, template: 'config' as Template })),
  },
]

export const HOME_PATH = '/dashboard/overview'

/** Every routable non-detail leaf, flattened, with its absolute path. */
export function allLeafRoutes(): { section: NavSection; group?: NavGroup; item: NavItem; path: string }[] {
  const out: { section: NavSection; group?: NavGroup; item: NavItem; path: string }[] = []
  for (const section of sections) {
    for (const item of section.items) {
      out.push({ section, item, path: `/${section.slug}/${item.slug}` })
    }
    for (const group of section.groups ?? []) {
      for (const item of group.items) {
        out.push({ section, group, item, path: `/${section.slug}/${item.slug}` })
      }
    }
  }
  return out
}

/** Detail route for a section, if it has one (used for row -> record links). */
export function primaryDetailFor(sectionSlug: string): NavDetail | undefined {
  return sections.find((s) => s.slug === sectionSlug)?.details?.[0]
}

export function sectionBySlug(slug: string | undefined): NavSection | undefined {
  return sections.find((s) => s.slug === slug)
}
