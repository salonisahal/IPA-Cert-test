import { Star } from 'lucide-react'

const Rating = ({ value }: { value: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, index) => {
      const filled = index + 1 <= Math.round(value)
      return (
        <Star
          key={index}
          className={`h-4 w-4 ${filled ? 'fill-warning text-warning' : 'text-slate-300'}`}
        />
      )
    })}
    <span className="text-xs text-muted">{value.toFixed(1)}</span>
  </div>
)

export default Rating
