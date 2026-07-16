import Button from './Button'

type OrderSummaryProps = {
  subtotal: number
  shipping: number
  tax: number
  total: number
  onCheckout?: () => void
}

const OrderSummary = ({ subtotal, shipping, tax, total, onCheckout }: OrderSummaryProps) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
    <h3 className="text-lg font-semibold text-primary">Order summary</h3>
    <div className="mt-4 space-y-2 text-sm text-muted">
      <div className="flex items-center justify-between">
        <span>Subtotal</span>
        <span className="text-primary">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Shipping</span>
        <span className="text-primary">${shipping.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Taxes</span>
        <span className="text-primary">${tax.toFixed(2)}</span>
      </div>
    </div>
    <div className="mt-4 flex items-center justify-between text-base font-semibold text-primary">
      <span>Total</span>
      <span>${total.toFixed(2)}</span>
    </div>
    {onCheckout && (
      <Button className="mt-5 w-full" onClick={onCheckout}>
        Proceed to checkout
      </Button>
    )}
  </div>
)

export default OrderSummary
