import { Moon, Sun, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

const TopBar = () => {
  const { darkMode, toggle } = useTheme()
  const { items } = useCart()
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-100 bg-white px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Modern e-commerce</p>
        <h1 className="text-xl font-semibold text-primary">Discover your next essential</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/cart')}
          className="relative flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-primary"
        >
          <ShoppingCart className="h-4 w-4" />
          Cart
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
              {items.length}
            </span>
          )}
        </button>
        <button
          onClick={toggle}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200"
        >
          {darkMode ? <Sun className="h-4 w-4 text-accent" /> : <Moon className="h-4 w-4 text-primary" />}
        </button>
      </div>
    </header>
  )
}

export default TopBar
