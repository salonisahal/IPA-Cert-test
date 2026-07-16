import { useNavigate } from 'react-router-dom'
import { orders } from '../data/mockData'
import SectionHeader from '../components/SectionHeader'

const Orders = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <SectionHeader title="Order history" description="Track your purchases and reorder anytime." />
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => navigate(`/orders/${order.id}`)}
            className="cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary">Order {order.number}</p>
                <p className="text-xs text-muted">Placed on {order.date}</p>
              </div>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-primary">
                {order.status}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
              <span>{order.items.length} items</span>
              <span>{order.payment}</span>
              <span className="font-semibold text-primary">${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
