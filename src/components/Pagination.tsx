type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: totalPages }).map((_, index) => {
      const current = index + 1
      return (
        <button
          key={current}
          onClick={() => onChange(current)}
          className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
            current === page
              ? 'bg-primary text-white'
              : 'border border-slate-200 text-muted hover:border-primary hover:text-primary'
          }`}
        >
          {current}
        </button>
      )
    })}
  </div>
)

export default Pagination
