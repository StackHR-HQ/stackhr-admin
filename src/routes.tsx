import { type RouteObject, createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { NotFound } from './components/NotFound'
import { TemplatePage } from './components/TemplatePage'
import { DetailTemplate } from './components/templates/DetailTemplate'
import { HOME_PATH, sections } from './lib/nav'

const children: RouteObject[] = [{ index: true, element: <Navigate to={HOME_PATH} replace /> }]

for (const section of sections) {
  const leaves = [...section.items, ...(section.groups?.flatMap((g) => g.items) ?? [])]
  for (const item of leaves) {
    children.push({
      path: `${section.slug}/${item.slug}`,
      element: <TemplatePage section={section} item={item} />,
    })
  }
  for (const detail of section.details ?? []) {
    children.push({ path: detail.path, element: <DetailTemplate detail={detail} /> })
  }
}

children.push({ path: '*', element: <NotFound /> })

export const router = createBrowserRouter([{ path: '/', element: <AppLayout />, children }])
