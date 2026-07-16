import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Heart, Truck } from 'lucide-react'
import { productService } from '../services/productService'
import { products } from '../data/mockData'
import type { Product, Review } from '../types'
import Gallery from '../components/Gallery'
import Rating from '../components/Rating'
import ReviewCard from '../components/ReviewCard'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import Breadcrumbs from '../components/Breadcrumbs'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { readStorage, writeStorage } from '../utils/storage'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { toggle, isSaved } = useWishlist()
  const [product, setProduct] = useState<Product | undefined>()
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    if (!id) return
    const load = async () => {
      const data = await productService.getProductById(id)
      setProduct(data)
      const reviewData = await productService.getReviews(id)
      setReviews(reviewData)
    }
    load()
  }, [id])

  useEffect(() => {
    if (!product) return
    const current = readStorage<string[]>('recently-viewed', [])
    const updated = [product.id, ...current.filter((item) => item !== product.id)].slice(0, 6)
    writeStorage('recently-viewed', updated)
  }, [product])

  const related = useMemo(() => {
    if (!product) return []
    return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
  }, [product])

  const colorMap: Record<string, string> = {
    '#0F172A': 'bg-slate-900',
    '#F97316': 'bg-orange-500',
    '#94A3B8': 'bg-slate-400',
    '#F8FAFC': 'bg-slate-50',
    '#22C55E': 'bg-green-500',
    '#F59E0B': 'bg-amber-500',
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted">Loading product details...</div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-10">
      <Breadcrumbs items={[{ label: 'Home', to: '/home' }, { label: 'Products', to: '/products' }, { label: product.title }]} />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Gallery images={product.images} />
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{product.brand}</p>
            <h2 className="text-3xl font-semibold text-primary">{product.title}</h2>
            <Rating value={product.rating} />
          </div>
          <p className="text-sm text-muted">{product.description}</p>
          <div className="flex items-center gap-4">
            <p className="text-2xl font-semibold text-primary">
              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
            </p>
            {product.discount > 0 && (
              <span className="text-sm text-muted line-through">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary">Colors</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className={`h-6 w-6 rounded-full border ${colorMap[color] ?? 'bg-slate-200'}`}
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-primary">Sizes</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span key={size} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-muted">
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => addItem(product.id, 1)}>Add to cart</Button>
            <Button variant="outline" onClick={() => navigate('/checkout')}>Buy now</Button>
            <button
              onClick={() => toggle(product.id)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                isSaved(product.id) ? 'border-accent text-accent' : 'border-slate-200 text-muted'
              }`}
            >
              <Heart className={`h-4 w-4 ${isSaved(product.id) ? 'fill-accent' : ''}`} />
              Wishlist
            </button>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 text-sm text-muted">
              <Truck className="h-4 w-4 text-primary" />
              Free delivery by Aug 12 · Ships in 24 hours
            </div>
          </div>
          <div className="grid gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-sm text-muted shadow-sm">
            <div className="flex items-center justify-between">
              <span>Availability</span>
              <span className="text-primary">{product.inStock ? 'In stock' : 'Back order'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Inventory</span>
              <span className="text-primary">{product.inventory} units</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Estimated delivery</span>
              <span className="text-primary">2-4 business days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <SectionHeader title="Customer reviews" description="What people love about this product." />
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <SectionHeader title="Related products" description="Complete your setup with these picks." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
