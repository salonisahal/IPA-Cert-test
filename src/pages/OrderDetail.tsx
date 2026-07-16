import { useNavigate, useParams } from 'react-router-dom'
import { orders, products } from '../data/mockData'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = orders.find((item) => item.id === id)

  if (!order) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-muted">Order not found.</div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <SectionHeader title={`Order ${order.number}`} description={`Status: ${order.status}`} action={<Button variant="outline" onClick={() => navigate(-1)}>Back</Button>} />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <span>Placed on {order.date}</span>
          <span>{order.payment}</span>
          <span className="font-semibold text-primary">${order.total.toFixed(2)}</span>
        </div>
        <div className="mt-6 space-y-4">
          {order.items.map((item) => {
            const product = products.find((productItem) => productItem.id === item.productId)
            if (!product) return null
            return (
              <div key={item.productId} className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
                <img src={product.images[0]} alt={product.title} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary">{product.title}</p>
                  <p className="text-xs text-muted">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            )
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => navigate('/products')}>Reorder items</Button>
          <Button variant="outline">Download invoice</Button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
