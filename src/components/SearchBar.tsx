import { Search } from 'lucide-react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  onSelect: (value: string) => void
}

const SearchBar = ({ value, onChange, suggestions, onSelect }: SearchBarProps) => (
  <div className="relative w-full">
    <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted" />
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search products, brands, or categories"
      className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
    />
    {suggestions.length > 0 && (
      <div className="absolute z-20 mt-2 w-full rounded-2xl border border-slate-100 bg-white p-2 shadow-soft">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="flex w-full rounded-xl px-3 py-2 text-left text-sm text-muted hover:bg-slate-50"
          >
            {item}
          </button>
        ))}
      </div>
    )}
  </div>
)

export default SearchBar
