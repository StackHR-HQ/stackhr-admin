import { useMemo, useState } from 'react'
import './App.css'

type NavGroup = { title: string; items: string[]; icon: string }

const navGroups: NavGroup[] = [
  { title: 'Dashboard', icon: '⌂', items: ['Overview', 'Platform Metrics'] },
  { title: 'Businesses', icon: '▦', items: ['All Businesses', 'Active Businesses', 'Trial Businesses', 'Suspended Businesses', 'Pending Verification', 'Inactive Businesses'] },
  { title: 'Employees', icon: '♙', items: ['All Employees', 'Active Employees', 'Pending Onboarding', 'Pending Invitations', 'Inactive Employees'] },
  { title: 'Payroll', icon: '▤', items: ['Payroll Overview', 'All Payroll Runs', 'Processing', 'Pending Approval', 'Completed', 'Failed', 'Payroll Exceptions'] },
  { title: 'Finance', icon: '◈', items: ['Financial Overview', 'Business Accounts', 'Transactions', 'Transfers', 'Payroll Funding', 'Payment Batches', 'Reimbursements', 'Reconciliation', 'Failed Transactions'] },
  { title: 'Subscriptions & Billing', icon: '◌', items: ['Overview', 'All Subscriptions', 'Trials', 'Active Subscriptions', 'Past Due', 'Cancelled', 'Expired'] },
  { title: 'Compliance', icon: '✓', items: ['Compliance Overview', 'Business Verification', 'KYB', 'KYC', 'Tax Compliance', 'Payroll Compliance', 'Statutory Contributions', 'Compliance Warnings'] },
  { title: 'Support', icon: '?', items: ['Support Dashboard', 'Open Issues', 'Pending Issues', 'Resolved Issues', 'Escalated Issues'] },
  { title: 'Users & Access', icon: '◎', items: ['All Admin Users', 'Business Admins', 'Managers', 'Employees', 'Suspended Users'] },
  { title: 'Platform Analytics', icon: '◒', items: ['Overview', 'Business Growth', 'User Growth', 'Employee Growth', 'Payroll Volume', 'Payroll Value', 'Transaction Volume', 'Revenue', 'Subscription Metrics', 'Retention', 'Churn'] },
  { title: 'Notifications & Communications', icon: '◍', items: ['Notification Center', 'System Notifications', 'Business Notifications', 'Employee Notifications'] },
  { title: 'Documents', icon: '▧', items: ['Business Documents', 'Verification Documents', 'Compliance Documents', 'Payroll Documents', 'Employee Documents'] },
  { title: 'System Configuration', icon: '⚙', items: ['General Configuration', 'Feature Flags', 'Environment Configuration', 'Email Configuration', 'Payment Configuration', 'Storage Configuration', 'Analytics Configuration'] },
  { title: 'Integrations', icon: '↔', items: ['Overview', 'Anchor', 'Payment Providers', 'Email Provider', 'Storage', 'Analytics', 'Future Integrations'] },
  { title: 'Audit & Security', icon: '◉', items: ['Audit Log', 'Admin Activity', 'Business Activity', 'Authentication Events', 'Permission Changes', 'Data Access Logs', 'Security Events'] },
  { title: 'System Health', icon: '⌁', items: ['System Overview', 'API Health', 'Database Health', 'Payment Provider Health', 'Email Health', 'Storage Health'] },
  { title: 'Settings', icon: '⊙', items: ['Admin Profile', 'Security', 'Notifications', 'Preferences', 'Admin Roles', 'Platform Preferences'] },
]

const metrics = [
  ['Total businesses', '1,284', '+8.2%', 'positive'], ['Active businesses', '1,106', '+5.4%', 'positive'],
  ['Total employees', '48,392', '+12.6%', 'positive'], ['Payroll volume', '₦2.84B', '+18.1%', 'positive'],
]

const activity = [
  ['Acme Technologies', 'Completed payroll run', '2 min ago', 'success'],
  ['Nexa Health', 'Business verification submitted', '18 min ago', 'pending'],
  ['Brightline Studios', 'Added 14 employees', '42 min ago', 'info'],
  ['Mara Foods', 'Payment failed · retry scheduled', '1 hr ago', 'critical'],
]

function App() {
  const [active, setActive] = useState('Overview')
  const [openGroup, setOpenGroup] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 1000)
  const [search, setSearch] = useState('')

  const currentGroup = useMemo(() => navGroups.find(group => group.title === openGroup) ?? navGroups[0], [openGroup])
  const filteredGroups = navGroups.map(group => ({ ...group, items: group.items.filter(item => item.toLowerCase().includes(search.toLowerCase()) || group.title.toLowerCase().includes(search.toLowerCase())) })).filter(group => group.items.length)

  const selectPage = (item: string, group: string) => { setActive(item); setOpenGroup(group); setSearch('') }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <div className="brand"><div className="brand-mark">S</div>{sidebarOpen && <div><strong>stack<span>HR</span></strong><small>ADMIN PORTAL</small></div>}<button className="collapse-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">{sidebarOpen ? '‹' : '›'}</button></div>
        {sidebarOpen && <div className="workspace-switcher"><div className="workspace-avatar">SA</div><div><small>Workspace</small><strong>StackHR Operations</strong></div><span>⌄</span></div>}
        <nav className="nav-list">
          {(search ? filteredGroups : navGroups).map(group => <div className="nav-group" key={group.title}>
            {sidebarOpen && <button className={`nav-group-title ${openGroup === group.title ? 'is-open' : ''}`} onClick={() => setOpenGroup(openGroup === group.title ? '' : group.title)}><span className="nav-icon">{group.icon}</span><span>{group.title}</span><span className="chevron">{openGroup === group.title ? '⌄' : '›'}</span></button>}
            {(openGroup === group.title || search) && sidebarOpen && <div className="nav-items">{group.items.map(item => <button className={`nav-item ${active === item ? 'active' : ''}`} key={item} onClick={() => selectPage(item, group.title)}>{item}</button>)}</div>}
          </div>)}
        </nav>
        {sidebarOpen && <div className="sidebar-footer"><div className="status-dot" />All systems operational</div>}
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button><div className="breadcrumbs"><span>Admin Portal</span><b>/</b><strong>{currentGroup.title}</strong>{active !== 'Overview' && <><b>/</b><strong>{active}</strong></>}</div><div className="top-actions"><div className="search"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search anything" /><kbd>⌘ K</kbd></div><button className="icon-button" aria-label="Notifications">◍<i>3</i></button><div className="profile"><div className="profile-avatar">AO</div><div><strong>Admin Ops</strong><small>Super admin</small></div><span>⌄</span></div></div></header>
        <div className="page-wrap">{active === 'Overview' && currentGroup.title === 'Dashboard' ? <Dashboard /> : <SectionPage title={active} group={currentGroup.title} />}</div>
      </main>
    </div>
  )
}

function Dashboard() {
  return <>
    <section className="page-heading"><div><p className="eyebrow">Wednesday, August 27, 2026</p><h1>Good morning, Admin Ops</h1><p className="subheading">Here is what is happening across your platform today.</p></div><button className="primary-btn">＋ Create report</button></section>
    <section className="metric-grid">{metrics.map(([label, value, delta]) => <div className="metric-card" key={label}><div className="metric-top"><span>{label}</span><span className="metric-menu">···</span></div><strong>{value}</strong><div className="metric-delta"><span className="trend">↗ {delta}</span><span>vs. last month</span></div><div className="sparkline"><span style={{height:'38%'}}/><span style={{height:'55%'}}/><span style={{height:'46%'}}/><span style={{height:'68%'}}/><span style={{height:'61%'}}/><span style={{height:'82%'}}/><span style={{height:'76%'}}/></div></div>)}</section>
    <section className="dashboard-grid"><div className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Live updates from across StackHR</p></div><button className="text-btn">View all <span>→</span></button></div><div className="activity-list">{activity.map(([name, event, time, type]) => <div className="activity-row" key={name}><div className={`activity-badge ${type}`}>{type === 'success' ? '✓' : type === 'critical' ? '!' : '•'}</div><div className="activity-copy"><strong>{name}</strong><span>{event}</span></div><time>{time}</time></div>)}</div></div><div className="panel alerts-panel"><div className="panel-heading"><div><h2>Needs attention</h2><p>Items that may need your review</p></div><span className="alert-count">4</span></div><div className="attention-list"><div><span className="alert-icon critical">!</span><div><strong>Payment failures</strong><small>12 transactions require action</small></div><button>Review →</button></div><div><span className="alert-icon warning">△</span><div><strong>Pending verifications</strong><small>8 businesses awaiting KYB review</small></div><button>Review →</button></div><div><span className="alert-icon info">i</span><div><strong>Payroll approvals</strong><small>5 payroll runs ready to approve</small></div><button>Review →</button></div></div></div></section>
    <section className="panel table-panel"><div className="panel-heading"><div><h2>Payroll overview</h2><p>Current processing status across businesses</p></div><button className="text-btn">See payroll <span>→</span></button></div><div className="table-wrap"><table><thead><tr><th>Business</th><th>Pay period</th><th>Employees</th><th>Amount</th><th>Status</th></tr></thead><tbody>{[['Acme Technologies','Aug 01 – Aug 31','142','₦18,420,000','Completed'],['Nexa Health','Aug 01 – Aug 31','86','₦9,840,500','Processing'],['Brightline Studios','Aug 01 – Aug 31','34','₦3,212,800','Pending approval'],['Mara Foods','Aug 01 – Aug 31','67','₦7,531,200','Exception']].map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={cell}>{i === 4 ? <span className={`status ${cell.toLowerCase().replace(' ', '-')}`}>{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div></section>
  </>
}

function SectionPage({ title, group }: { title: string; group: string }) {
  const isList = !['Overview', 'Configuration', 'Security', 'Preferences'].some(word => title.includes(word))
  const rows = title.includes('Employee') ? [['Amaka Okafor','Acme Technologies','Product Designer','Active'],['Daniel Mensah','Nexa Health','Finance Manager','Active'],['Ifeoma Eze','Brightline Studios','Operations Lead','Pending']] : [['Acme Technologies','Lagos, Nigeria','142','Active'],['Nexa Health','Accra, Ghana','86','Active'],['Brightline Studios','Lagos, Nigeria','34','Trial'],['Mara Foods','Ibadan, Nigeria','67','Pending']]
  return <><section className="page-heading"><div><p className="eyebrow">{group}</p><h1>{title}</h1><p className="subheading">Manage and monitor {title.toLowerCase()} across the StackHR platform.</p></div><button className="primary-btn">＋ Add {title.includes('Business') ? 'business' : 'new item'}</button></section><div className="filter-bar"><div className="inline-search">⌕ <input placeholder={`Search ${title.toLowerCase()}`} /></div><button className="filter-btn">Filter <span>≡</span></button><button className="filter-btn">Export <span>↓</span></button></div>{isList ? <section className="panel table-panel"><div className="table-meta"><span>{rows.length * 321} total records</span><span>Updated just now</span></div><div className="table-wrap"><table><thead><tr>{(title.includes('Employee') ? ['Employee','Business','Role','Status'] : ['Business','Location','Employees','Status']).map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={cell}>{i === row.length - 1 ? <span className={`status ${cell.toLowerCase()}`}>{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div><div className="pagination"><span>Showing 1–{rows.length} of 1,284</span><div><button>←</button><button className="current">1</button><button>2</button><button>3</button><button>→</button></div></div></section> : <section className="settings-grid"><div className="panel setting-card"><h2>{title} settings</h2><p>Configure controls and policies for your platform.</p><label>Workspace name<input defaultValue="StackHR Operations" /></label><label>Default notification email<input defaultValue="ops@stackhr.com" /></label><button className="primary-btn">Save changes</button></div><div className="panel setting-card"><h2>Recent changes</h2><div className="change-row"><span className="status-dot" /><div><strong>Policy updated</strong><small>Today at 09:42 by Admin Ops</small></div></div><div className="change-row"><span className="status-dot" /><div><strong>Access reviewed</strong><small>Yesterday at 16:20 by T. Adeyemi</small></div></div></div></section>}</>
}

export default App
