import type { Review } from '../types'
import Rating from './Rating'

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-primary">{review.name}</p>
        <p className="text-xs text-muted">{review.date}</p>
      </div>
      <Rating value={review.rating} />
    </div>
    <p className="mt-3 text-sm font-semibold text-primary">{review.title}</p>
    <p className="mt-2 text-sm text-muted">{review.comment}</p>
  </div>
)

export default ReviewCard
