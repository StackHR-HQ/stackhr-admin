import { Link } from 'react-router-dom'
import { HOME_PATH } from '../lib/nav'
import { Button } from './ui/Button'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-muted">404</p>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-muted">
        The page you are looking for doesn’t exist or may have been moved.
      </p>
      <Link to={HOME_PATH}>
        <Button size="sm">Back to dashboard</Button>
      </Link>
    </div>
  )
}
