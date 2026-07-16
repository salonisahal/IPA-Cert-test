import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/mockData'
import SectionHeader from '../components/SectionHeader'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const Wishlist = () => {
  const { items, remove } = useWishlist()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const wishlistProducts = useMemo(() => {
    const ids = items.map((item) => item.productId)
    return products.filter((product) => ids.includes(product.id))
  }, [items])

  const filtered = wishlistProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <SectionHeader title="Wishlist" description="Keep your favorites ready for later." />
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search wishlist"
        className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
      />
      {filtered.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Save the items you love and keep them all in one place."
          action={<Button onClick={() => navigate('/products')}>Browse products</Button>}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <div key={product.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
              <img src={product.images[0]} alt={product.title} className="h-40 w-full rounded-xl object-cover" />
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-primary">{product.title}</p>
                <p className="text-xs text-muted">{product.brand}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-primary">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="text-xs font-semibold text-accent"
                  >
                    View
                  </button>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => addItem(product.id, 1)}>
                    Move to cart
                  </Button>
                  <Button variant="outline" onClick={() => remove(product.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
