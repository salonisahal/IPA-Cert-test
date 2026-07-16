import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Stepper from '../components/Stepper'
import OrderSummary from '../components/OrderSummary'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import Modal from '../components/Modal'
import { useCart } from '../context/CartContext'

const steps = ['Address', 'Shipping', 'Payment', 'Review']

const Checkout = () => {
  const navigate = useNavigate()
  const { subtotal, clear } = useCart()
  const [step, setStep] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const shipping = subtotal > 300 ? 0 : 18
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1)
    } else {
      clear()
      setShowSuccess(true)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <SectionHeader title="Checkout" description="Complete your purchase in just a few steps." />
      <Stepper steps={steps} active={step} />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Delivery address</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <input placeholder="Full name" className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
                <input placeholder="Phone number" className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
                <input placeholder="Street address" className="md:col-span-2 rounded-xl border border-slate-200 px-4 py-2 text-sm" />
                <input placeholder="City" className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
                <input placeholder="Postal code" className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Shipping options</h3>
              <label className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm">
                <span>Express delivery (2-3 days)</span>
                <span className="font-semibold text-primary">$18.00</span>
              </label>
              <label className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm">
                <span>Standard delivery (4-6 days)</span>
                <span className="font-semibold text-primary">$9.00</span>
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Payment method</h3>
              <div className="grid gap-4">
                <input placeholder="Card holder name" className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
                <input placeholder="Card number" className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
                <div className="grid gap-4 md:grid-cols-2">
                  <input placeholder="Expiry" className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
                  <input placeholder="CVV" className="rounded-xl border border-slate-200 px-4 py-2 text-sm" />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Review order</h3>
              <p className="text-sm text-muted">Please confirm your order details before placing the order.</p>
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-muted">
                Estimated delivery: 2-4 business days · Payment method: Visa ending 3481
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
            <Button onClick={handleNext}>{step === steps.length - 1 ? 'Place order' : 'Continue'}</Button>
          </div>
        </div>
        <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
      </div>
      <Modal open={showSuccess} title="Order confirmed" onClose={() => setShowSuccess(false)}>
        <p className="text-sm text-muted">Your payment was processed successfully. We are preparing your shipment.</p>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => navigate('/orders')}>View orders</Button>
          <Button variant="outline" onClick={() => navigate('/home')}>Continue shopping</Button>
        </div>
      </Modal>
    </div>
  )
}

export default Checkout
