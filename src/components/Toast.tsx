import { CheckCircle2 } from 'lucide-react'

const Toast = ({ message }: { message: string }) => (
  <div className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-soft">
    <CheckCircle2 className="h-4 w-4" />
    {message}
  </div>
)

export default Toast
