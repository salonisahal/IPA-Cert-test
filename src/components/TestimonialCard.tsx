const TestimonialCard = ({ name, role, quote, avatar }: { name: string; role: string; quote: string; avatar: string }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
    <p className="text-sm text-muted">“{quote}”</p>
    <div className="mt-4 flex items-center gap-3">
      <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <p className="text-sm font-semibold text-primary">{name}</p>
        <p className="text-xs text-muted">{role}</p>
      </div>
    </div>
  </div>
)

export default TestimonialCard
