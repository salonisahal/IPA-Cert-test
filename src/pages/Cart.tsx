import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartItemRow from '../components/CartItemRow'
import OrderSummary from '../components/OrderSummary'
import SectionHeader from '../components/SectionHeader'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, getProduct } = useCart()
  const navigate = useNavigate()
  const [coupon, setCoupon] = useState('')

  const detailedItems = useMemo(
    () => items.map((item) => ({ product: getProduct(item.productId), quantity: item.quantity })),
    [items, getProduct],
  )

  const subtotal = detailedItems.reduce((sum, item) => {
    if (!item.product) return sum
    const price = item.product.price * (1 - item.product.discount / 100)
    return sum + price * item.quantity
  }, 0)

  const shipping = subtotal > 300 ? 0 : 18
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <SectionHeader title="Shopping cart" description="Review and update your selections." />
      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Start adding items to build your perfect setup."
          action={<Button onClick={() => navigate('/products')}>Browse products</Button>}
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {detailedItems.map((item) =>
              item.product ? (
                <CartItemRow key={item.product.id} product={item.product} quantity={item.quantity} />
              ) : null,
            )}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-primary">Promo code</p>
              <div className="mt-3 flex gap-2">
                <input
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  placeholder="Enter code"
                  className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm"
                />
                <Button variant="outline">Apply</Button>
              </div>
              {coupon && <p className="mt-2 text-xs text-success">Code applied: {coupon}</p>}
            </div>
          </div>
          <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} onCheckout={() => navigate('/checkout')} />
        </div>
      )}
    </div>
  )
}

export default Cart
