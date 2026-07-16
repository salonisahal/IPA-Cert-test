import { CheckCircle2, XCircle } from 'lucide-react'

type ToastVariant = 'success' | 'error'

interface ToastProps {
  message: string
  variant?: ToastVariant
}

const variants: Record<ToastVariant, { bg: string; Icon: typeof CheckCircle2 }> = {
  success: { bg: 'bg-emerald-500', Icon: CheckCircle2 },
  error: { bg: 'bg-rose-500', Icon: XCircle },
}

const Toast = ({ message, variant = 'success' }: ToastProps) => {
  const { bg, Icon } = variants[variant]

  return (
    <div
      className={`fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full ${bg} px-4 py-3 text-sm font-semibold text-white shadow-soft`}
    >
      <Icon className="h-4 w-4" />
      {message}
    </div>
  )
}

export default Toast
