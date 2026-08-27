/**
 * Mock data for the scaffolded admin portal. Everything here is illustrative
 * sample data, not real figures — replace with API-backed data per section.
 */
import { compactNaira, count, naira, seeded } from './format'

export type ColumnKind = 'text' | 'num' | 'status' | 'money'
export type Column = { key: string; label: string; kind?: ColumnKind; align?: 'right' }
export type Row = Record<string, string | number>
export type TableData = { columns: Column[]; rows: Row[] }

// ---------------------------------------------------------------------------
// Core record sets
// ---------------------------------------------------------------------------

const businessNames = [
  'Acme Technologies', 'Nexa Health', 'Brightline Studios', 'Mara Foods', 'Kola & Sons',
  'Terra Logistics', 'Vantage Legal', 'Orchid Financial', 'Pathway Education', 'Summit Retail',
  'Blue Harbour', 'Lumen Media', 'Greenfield Agro', 'Northwind Energy', 'Cascade Interiors',
]
const cities = ['Lagos, Nigeria', 'Accra, Ghana', 'Abuja, Nigeria', 'Nairobi, Kenya', 'Ibadan, Nigeria']
const plans = ['Starter', 'Growth', 'Scale', 'Enterprise']
const bizStatus = ['Active', 'Active', 'Active', 'Trial', 'Suspended', 'Pending']

export const businesses: Row[] = businessNames.map((name, i) => {
  const r = seeded(name)
  return {
    id: `b-${String(i + 1).padStart(3, '0')}`,
    name,
    location: cities[Math.floor(r * cities.length)],
    employees: 12 + Math.floor(r * 480),
    plan: plans[Math.floor(seeded(name + 'p') * plans.length)],
    status: bizStatus[i % bizStatus.length],
  }
})

const people = [
  'Amaka Okafor', 'Daniel Mensah', 'Ifeoma Eze', 'Tunde Bello', 'Grace Adeyemi',
  'Kwame Boateng', 'Zainab Yusuf', 'Chidi Nwosu', 'Halima Sani', 'Emeka Obi',
  'Ada Lovelace', 'Femi Coker', 'Rita Owusu', 'Sola Martins', 'Ngozi Umeh',
]
const roles = ['Product Designer', 'Finance Manager', 'Operations Lead', 'Software Engineer', 'People Partner', 'Account Executive']
const empStatus = ['Active', 'Active', 'Active', 'Onboarding', 'Invited', 'Inactive']

export const employees: Row[] = people.map((name, i) => {
  const r = seeded(name)
  return {
    id: `e-${String(i + 1).padStart(3, '0')}`,
    name,
    business: businessNames[Math.floor(r * businessNames.length)],
    role: roles[Math.floor(r * roles.length)],
    status: empStatus[i % empStatus.length],
  }
})

const runStatus = ['Completed', 'Processing', 'Pending Approval', 'Failed', 'Exception']

export const payrollRuns: Row[] = businessNames.slice(0, 12).map((business, i) => {
  const r = seeded(business + 'run')
  const emps = 20 + Math.floor(r * 300)
  return {
    id: `pr-${String(i + 1).padStart(3, '0')}`,
    business,
    period: 'Aug 01 – Aug 31, 2026',
    employees: emps,
    amount: naira(emps * (180000 + Math.floor(r * 220000))),
    status: runStatus[i % runStatus.length],
  }
})

const txnTypes = ['Payroll', 'Funding', 'Transfer', 'Refund', 'Reimbursement']
const txnStatus = ['Settled', 'Settled', 'Pending', 'Failed']

export const transactions: Row[] = Array.from({ length: 14 }, (_, i) => {
  const r = seeded('txn' + i)
  return {
    id: `pay-${String(i + 1).padStart(3, '0')}`,
    reference: `ANC-${String(480217 + i * 137)}`,
    business: businessNames[Math.floor(r * businessNames.length)],
    amount: naira(Math.floor(50000 + r * 9_500_000)),
    type: txnTypes[i % txnTypes.length],
    status: txnStatus[i % txnStatus.length],
  }
})

const subStatus = ['Active', 'Active', 'Trial', 'Past Due', 'Cancelled', 'Expired']

export const subscriptions: Row[] = businessNames.slice(0, 12).map((business, i) => {
  const r = seeded(business + 'sub')
  return {
    id: `sub-${String(i + 1).padStart(3, '0')}`,
    business,
    plan: plans[Math.floor(r * plans.length)],
    mrr: naira(45000 + Math.floor(r * 900000)),
    renews: 'Sep 01, 2026',
    status: subStatus[i % subStatus.length],
  }
})

const ticketSubjects = [
  'Payroll run stuck in processing', 'Employee cannot access payslip', 'Failed bank transfer',
  'Duplicate invoice generated', 'KYB documents rejected', 'Cannot add new employee',
  'Salary advance not disbursed', 'Wrong tax calculation', 'Login loop after password reset',
  'Subscription downgrade not applied',
]
const priorities = ['Low', 'Medium', 'High', 'Urgent']
const ticketStatus = ['Open', 'Pending', 'Resolved', 'Escalated']

export const tickets: Row[] = ticketSubjects.map((subject, i) => {
  const r = seeded(subject)
  return {
    id: `t-${String(i + 1).padStart(3, '0')}`,
    subject,
    business: businessNames[Math.floor(r * businessNames.length)],
    priority: priorities[i % priorities.length],
    status: ticketStatus[i % ticketStatus.length],
    updated: `${1 + Math.floor(r * 20)}h ago`,
  }
})

const integrationRows = [
  ['anchor', 'Anchor', 'Banking & Payments', 'Connected', '2 min ago'],
  ['paystack', 'Paystack', 'Payment Provider', 'Connected', '11 min ago'],
  ['flutterwave', 'Flutterwave', 'Payment Provider', 'Degraded', '1 hr ago'],
  ['resend', 'Resend', 'Email Provider', 'Connected', '4 min ago'],
  ['cloudflare-r2', 'Cloudflare R2', 'Storage', 'Connected', '9 min ago'],
  ['posthog', 'PostHog', 'Analytics', 'Connected', '20 min ago'],
  ['sentry', 'Sentry', 'Observability', 'Not connected', '—'],
]
export const integrations: Row[] = integrationRows.map(([id, name, category, status, lastSync]) => ({
  id, name, category, status, lastSync,
}))

const auditActions = ['business.suspended', 'payroll.approved', 'user.role_changed', 'config.updated', 'business.exported', 'login.succeeded']
export const auditEvents: Row[] = Array.from({ length: 14 }, (_, i) => {
  const r = seeded('audit' + i)
  return {
    id: `ae-${String(i + 1).padStart(3, '0')}`,
    actor: people[Math.floor(r * people.length)],
    action: auditActions[i % auditActions.length],
    resource: businessNames[Math.floor(r * businessNames.length)],
    timestamp: `Aug ${27 - (i % 20)}, 2026 · 1${i % 6}:0${i % 6}`,
    ip: `102.89.${20 + i}.${100 + i}`,
  }
})

// ---------------------------------------------------------------------------
// Dashboard / overview support data
// ---------------------------------------------------------------------------

export type Metric = { label: string; value: string; delta: string; trend: 'up' | 'down' }
export type ActivityEntry = { name: string; event: string; time: string; type: 'success' | 'pending' | 'info' | 'critical' }
export type Attention = { title: string; detail: string; severity: 'critical' | 'warning' | 'info' }

export const activityFeed: ActivityEntry[] = [
  { name: 'Acme Technologies', event: 'Completed payroll run', time: '2 min ago', type: 'success' },
  { name: 'Nexa Health', event: 'Business verification submitted', time: '18 min ago', type: 'pending' },
  { name: 'Brightline Studios', event: 'Added 14 employees', time: '42 min ago', type: 'info' },
  { name: 'Mara Foods', event: 'Payment failed · retry scheduled', time: '1 hr ago', type: 'critical' },
  { name: 'Terra Logistics', event: 'Upgraded to Scale plan', time: '3 hr ago', type: 'success' },
  { name: 'Orchid Financial', event: 'Raised a support ticket', time: '5 hr ago', type: 'info' },
]

export const attentionItems: Attention[] = [
  { title: 'Payment failures', detail: '12 transactions require action', severity: 'critical' },
  { title: 'Pending verifications', detail: '8 businesses awaiting KYB review', severity: 'warning' },
  { title: 'Payroll approvals', detail: '5 payroll runs ready to approve', severity: 'info' },
]

export const systemAlerts: Row[] = [
  { id: 'al-1', alert: 'Elevated webhook failure rate (Flutterwave)', severity: 'Warning', since: '22 min ago' },
  { id: 'al-2', alert: 'Database replica lag above 200ms', severity: 'Warning', since: '1 hr ago' },
  { id: 'al-3', alert: 'Scheduled maintenance window Sep 2, 01:00 WAT', severity: 'Info', since: '6 hr ago' },
  { id: 'al-4', alert: 'API p99 latency within target', severity: 'Healthy', since: '—' },
]

const metricsBySection: Record<string, Metric[]> = {
  dashboard: [
    { label: 'Total businesses', value: count(1284), delta: '+8.2%', trend: 'up' },
    { label: 'Active businesses', value: count(1106), delta: '+5.4%', trend: 'up' },
    { label: 'Total employees', value: count(48392), delta: '+12.6%', trend: 'up' },
    { label: 'Payroll volume', value: compactNaira(2_840_000_000), delta: '+18.1%', trend: 'up' },
  ],
  payroll: [
    { label: 'Runs this month', value: count(842), delta: '+6.1%', trend: 'up' },
    { label: 'Processing now', value: count(37), delta: '−4', trend: 'down' },
    { label: 'Pending approval', value: count(19), delta: '+3', trend: 'up' },
    { label: 'Exceptions', value: count(6), delta: '−2', trend: 'down' },
  ],
  finance: [
    { label: 'Transaction volume', value: compactNaira(4_120_000_000), delta: '+14.7%', trend: 'up' },
    { label: 'Payroll funded', value: compactNaira(2_610_000_000), delta: '+9.3%', trend: 'up' },
    { label: 'Failed transactions', value: count(23), delta: '+5', trend: 'up' },
    { label: 'Unreconciled', value: count(11), delta: '−8', trend: 'down' },
  ],
  'subscriptions-billing': [
    { label: 'MRR', value: compactNaira(41_800_000), delta: '+7.4%', trend: 'up' },
    { label: 'Active subscriptions', value: count(1106), delta: '+5.4%', trend: 'up' },
    { label: 'Trials', value: count(148), delta: '+22', trend: 'up' },
    { label: 'Past due', value: count(27), delta: '+4', trend: 'up' },
  ],
  compliance: [
    { label: 'Verified businesses', value: count(1043), delta: '+11', trend: 'up' },
    { label: 'Pending KYB', value: count(38), delta: '+6', trend: 'up' },
    { label: 'KYC flags', value: count(14), delta: '−3', trend: 'down' },
    { label: 'Compliance warnings', value: count(9), delta: '−1', trend: 'down' },
  ],
  support: [
    { label: 'Open issues', value: count(64), delta: '+12', trend: 'up' },
    { label: 'Escalated', value: count(7), delta: '+2', trend: 'up' },
    { label: 'Median first response', value: '38m', delta: '−6m', trend: 'down' },
    { label: 'Resolved this week', value: count(211), delta: '+18%', trend: 'up' },
  ],
  'platform-analytics': [
    { label: 'Business growth (MoM)', value: '+8.2%', delta: '+1.1pp', trend: 'up' },
    { label: 'Net revenue retention', value: '112%', delta: '+3pp', trend: 'up' },
    { label: 'Logo churn', value: '1.8%', delta: '−0.4pp', trend: 'down' },
    { label: 'Activation rate', value: '73%', delta: '+5pp', trend: 'up' },
  ],
  'system-health': [
    { label: 'API uptime (30d)', value: '99.98%', delta: '+0.02pp', trend: 'up' },
    { label: 'p99 latency', value: '284ms', delta: '−31ms', trend: 'down' },
    { label: 'Failed jobs (24h)', value: count(12), delta: '+4', trend: 'up' },
    { label: 'Webhook success', value: '99.1%', delta: '−0.3pp', trend: 'down' },
  ],
  integrations: [
    { label: 'Connected', value: count(6), delta: '+1', trend: 'up' },
    { label: 'Degraded', value: count(1), delta: '+1', trend: 'up' },
    { label: 'Webhook events (24h)', value: count(18402), delta: '+6.2%', trend: 'up' },
    { label: 'Delivery failures', value: count(41), delta: '+9', trend: 'up' },
  ],
}

export function metricsFor(sectionSlug: string): Metric[] {
  return metricsBySection[sectionSlug] ?? metricsBySection.dashboard
}

// ---------------------------------------------------------------------------
// Table resolution
// ---------------------------------------------------------------------------

const tables: Record<string, TableData> = {
  businesses: {
    columns: [
      { key: 'name', label: 'Business' },
      { key: 'location', label: 'Location' },
      { key: 'employees', label: 'Employees', kind: 'num', align: 'right' },
      { key: 'plan', label: 'Plan' },
      { key: 'status', label: 'Status', kind: 'status' },
    ],
    rows: businesses,
  },
  employees: {
    columns: [
      { key: 'name', label: 'Employee' },
      { key: 'business', label: 'Business' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status', kind: 'status' },
    ],
    rows: employees,
  },
  'payroll-runs': {
    columns: [
      { key: 'business', label: 'Business' },
      { key: 'period', label: 'Pay period' },
      { key: 'employees', label: 'Employees', kind: 'num', align: 'right' },
      { key: 'amount', label: 'Amount', align: 'right' },
      { key: 'status', label: 'Status', kind: 'status' },
    ],
    rows: payrollRuns,
  },
  transactions: {
    columns: [
      { key: 'reference', label: 'Reference' },
      { key: 'business', label: 'Business' },
      { key: 'amount', label: 'Amount', align: 'right' },
      { key: 'type', label: 'Type' },
      { key: 'status', label: 'Status', kind: 'status' },
    ],
    rows: transactions,
  },
  subscriptions: {
    columns: [
      { key: 'business', label: 'Business' },
      { key: 'plan', label: 'Plan' },
      { key: 'mrr', label: 'MRR', align: 'right' },
      { key: 'renews', label: 'Renews' },
      { key: 'status', label: 'Status', kind: 'status' },
    ],
    rows: subscriptions,
  },
  tickets: {
    columns: [
      { key: 'subject', label: 'Subject' },
      { key: 'business', label: 'Business' },
      { key: 'priority', label: 'Priority', kind: 'status' },
      { key: 'status', label: 'Status', kind: 'status' },
      { key: 'updated', label: 'Updated' },
    ],
    rows: tickets,
  },
  integrations: {
    columns: [
      { key: 'name', label: 'Integration' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status', kind: 'status' },
      { key: 'lastSync', label: 'Last sync' },
    ],
    rows: integrations,
  },
  'audit-events': {
    columns: [
      { key: 'actor', label: 'Actor' },
      { key: 'action', label: 'Action' },
      { key: 'resource', label: 'Resource' },
      { key: 'timestamp', label: 'Timestamp' },
      { key: 'ip', label: 'IP address' },
    ],
    rows: auditEvents,
  },
  'activity-feed': {
    columns: [
      { key: 'name', label: 'Business' },
      { key: 'event', label: 'Event' },
      { key: 'time', label: 'When' },
    ],
    rows: activityFeed.map((a) => ({ ...a })),
  },
  'system-alerts': {
    columns: [
      { key: 'alert', label: 'Alert' },
      { key: 'severity', label: 'Severity', kind: 'status' },
      { key: 'since', label: 'Since' },
    ],
    rows: systemAlerts,
  },
}

/** A generic 6-row placeholder table for datasets that don't have bespoke mock data yet. */
function placeholderTable(key: string): TableData {
  return {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'reference', label: 'Reference' },
      { key: 'owner', label: 'Owner' },
      { key: 'updated', label: 'Updated' },
      { key: 'status', label: 'Status', kind: 'status' },
    ],
    rows: Array.from({ length: 6 }, (_, i) => {
      const r = seeded(key + i)
      return {
        id: `${key}-${i + 1}`,
        name: `${businessNames[Math.floor(r * businessNames.length)]}`,
        reference: `REF-${String(1000 + Math.floor(r * 9000))}`,
        owner: people[Math.floor(r * people.length)],
        updated: `${1 + Math.floor(r * 27)}d ago`,
        status: ['Active', 'Pending', 'Review', 'Archived'][i % 4],
      }
    }),
  }
}

export function datasetFor(key: string | undefined): TableData {
  if (key && tables[key]) return tables[key]
  return placeholderTable(key ?? 'record')
}

/** Look up a record by id across the known datasets (for detail pages). */
export function findRecord(id: string): Row | undefined {
  const pools = [businesses, employees, payrollRuns, transactions, subscriptions, tickets, integrations, auditEvents]
  for (const pool of pools) {
    const hit = pool.find((r) => r.id === id)
    if (hit) return hit
  }
  return undefined
}
