import type { Category } from '../types'

const CategoryCard = ({ category }: { category: Category }) => (
  <div className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1">
    <img src={category.image} alt={category.name} className="h-32 w-full rounded-xl object-cover" />
    <h3 className="mt-4 text-sm font-semibold text-primary">{category.name}</h3>
    <p className="mt-1 text-xs text-muted">{category.description}</p>
  </div>
)

export default CategoryCard
