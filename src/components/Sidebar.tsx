import { NavLink } from 'react-router-dom'
import { Home, ShoppingBag, Heart, ShoppingCart, User, Package } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/home', icon: Home },
  { label: 'Products', to: '/products', icon: ShoppingBag },
  { label: 'Wishlist', to: '/wishlist', icon: Heart },
  { label: 'Cart', to: '/cart', icon: ShoppingCart },
  { label: 'Orders', to: '/orders', icon: Package },
  { label: 'Profile', to: '/profile', icon: User },
]

const Sidebar = () => (
  <aside className="hidden h-screen w-64 flex-col border-r border-slate-100 bg-white p-6 lg:flex">
    <div className="text-xl font-bold text-primary">NovaMarket</div>
    <nav className="mt-8 flex flex-1 flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                isActive ? 'bg-primary text-white' : 'text-muted hover:bg-slate-50'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        )
      })}
    </nav>
    <div className="rounded-2xl bg-slate-50 p-4 text-xs text-muted">
      Premium support 24/7 · hello@novamarket.com
    </div>
  </aside>
)

export default Sidebar
