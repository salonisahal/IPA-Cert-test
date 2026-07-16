import { Minus, Plus, Trash } from 'lucide-react'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'

const CartItemRow = ({ product, quantity }: { product: Product; quantity: number }) => {
  const { updateQuantity, removeItem } = useCart()
  const price = product.price * (1 - product.discount / 100)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row md:items-center">
      <img src={product.images[0]} alt={product.title} className="h-24 w-24 rounded-xl object-cover" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-primary">{product.title}</p>
        <p className="text-xs text-muted">{product.brand}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
          <button onClick={() => updateQuantity(product.id, quantity - 1)}>
            <Minus className="h-4 w-4 text-muted" />
          </button>
          <span className="text-sm font-semibold">{quantity}</span>
          <button onClick={() => updateQuantity(product.id, quantity + 1)}>
            <Plus className="h-4 w-4 text-muted" />
          </button>
        </div>
        <p className="text-sm font-semibold text-primary">${(price * quantity).toFixed(2)}</p>
        <button onClick={() => removeItem(product.id)} className="text-danger">
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default CartItemRow
