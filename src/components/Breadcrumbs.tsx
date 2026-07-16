import { Link } from 'react-router-dom'

const Breadcrumbs = ({ items }: { items: { label: string; to?: string }[] }) => (
  <nav className="flex items-center gap-2 text-xs text-muted">
    {items.map((item, index) => (
      <span key={item.label} className="flex items-center gap-2">
        {item.to ? (
          <Link to={item.to} className="hover:text-primary">
            {item.label}
          </Link>
        ) : (
          <span className="text-primary">{item.label}</span>
        )}
        {index < items.length - 1 && <span>/</span>}
      </span>
    ))}
  </nav>
)

export default Breadcrumbs
