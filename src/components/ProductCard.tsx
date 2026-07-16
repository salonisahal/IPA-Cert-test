import { Heart, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import Rating from './Rating'
import Badge from './Badge'

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { toggle, isSaved } = useWishlist()
  const price = product.price * (1 - product.discount / 100)

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-surface p-4 shadow-soft transition hover:-translate-y-1">
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-44 w-full rounded-xl object-cover"
        />
        {product.discount > 0 && (
          <div className="absolute left-3 top-3">
            <Badge label={`${product.discount}% off`} />
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-primary">{product.title}</h3>
          <p className="text-xs text-muted">{product.brand} · {product.category}</p>
        </div>
        <Rating value={product.rating} />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-primary">${price.toFixed(2)}</p>
            {product.discount > 0 && (
              <p className="text-xs text-muted line-through">${product.price.toFixed(2)}</p>
            )}
          </div>
          <span className={`text-xs ${product.inStock ? 'text-success' : 'text-danger'}`}>
            {product.inStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => addItem(product.id, 1)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </button>
          <button
            onClick={() => toggle(product.id)}
            className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
              isSaved(product.id)
                ? 'border-accent text-accent'
                : 'border-slate-200 text-muted hover:border-primary hover:text-primary'
            }`}
          >
            <Heart className={`h-4 w-4 ${isSaved(product.id) ? 'fill-accent' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
