import type { ReactElement } from 'react'
import { type RouteObject, createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { NotFound } from './components/NotFound'
import { TemplatePage } from './components/TemplatePage'
import { DetailTemplate } from './components/templates/DetailTemplate'
import { LoginPage } from './features/auth/pages/login-page'
import { WaitlistPage } from './features/waitlist/pages/waitlist-page'
import { HOME_PATH, sections } from './lib/nav'
import { ProtectedRoute, PublicOnlyRoute } from './routing/protected-route'

const customPages: Record<string, ReactElement> = {
  'waitlist/entries': <WaitlistPage />,
}

const children: RouteObject[] = [{ index: true, element: <Navigate to={HOME_PATH} replace /> }]

for (const section of sections) {
  const leaves = [...section.items, ...(section.groups?.flatMap((g) => g.items) ?? [])]
  for (const item of leaves) {
    const path = `${section.slug}/${item.slug}`
    children.push({ path, element: customPages[path] ?? <TemplatePage section={section} item={item} /> })
  }
  for (const detail of section.details ?? []) {
    children.push({ path: detail.path, element: <DetailTemplate detail={detail} /> })
  }
}

children.push({ path: '*', element: <NotFound /> })

export const router = createBrowserRouter([
  { element: <PublicOnlyRoute />, children: [{ path: '/login', element: <LoginPage /> }] },
  {
    element: <ProtectedRoute />,
    children: [{ path: '/', element: <AppLayout />, children }],
  },
])
