type FilterPanelProps = {
  categories: string[]
  brands: string[]
  selectedCategories: string[]
  selectedBrands: string[]
  minPrice: number
  maxPrice: number
  onCategoryToggle: (category: string) => void
  onBrandToggle: (brand: string) => void
  onPriceChange: (min: number, max: number) => void
}

const FilterPanel = ({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  onCategoryToggle,
  onBrandToggle,
  onPriceChange,
}: FilterPanelProps) => (
  <div className="space-y-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
    <div>
      <h3 className="text-sm font-semibold text-primary">Categories</h3>
      <div className="mt-3 space-y-2">
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryToggle(category)}
              className="accent-primary"
            />
            {category}
          </label>
        ))}
      </div>
    </div>
    <div>
      <h3 className="text-sm font-semibold text-primary">Brands</h3>
      <div className="mt-3 space-y-2">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => onBrandToggle(brand)}
              className="accent-primary"
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
    <div>
      <h3 className="text-sm font-semibold text-primary">Price range</h3>
      <div className="mt-3 space-y-2">
        <input
          type="range"
          min={0}
          max={700}
          value={maxPrice}
          onChange={(event) => onPriceChange(minPrice, Number(event.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex items-center justify-between text-xs text-muted">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>
    </div>
  </div>
)

export default FilterPanel
