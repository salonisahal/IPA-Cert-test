const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
    <div className="h-44 rounded-xl bg-slate-100" />
    <div className="mt-4 space-y-3">
      <div className="h-3 w-3/4 rounded bg-slate-100" />
      <div className="h-3 w-1/2 rounded bg-slate-100" />
      <div className="h-8 w-full rounded bg-slate-100" />
    </div>
  </div>
)

export default SkeletonCard
