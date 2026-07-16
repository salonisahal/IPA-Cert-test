import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <h2 className="text-3xl font-semibold text-primary">Page not found</h2>
    <p className="text-sm text-muted">The page you are looking for does not exist.</p>
    <Link to="/" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white">
      Go Home
    </Link>
  </div>
)

export default NotFound
