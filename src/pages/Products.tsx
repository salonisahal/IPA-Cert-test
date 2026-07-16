import { useEffect, useMemo, useState } from 'react'
import { Grid2x2, List, SlidersHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import type { Product } from '../types'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import Pagination from '../components/Pagination'
import SkeletonCard from '../components/SkeletonCard'
import Button from '../components/Button'

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(700)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await productService.getProducts()
      setProducts(data)
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const loadSuggestions = async () => {
      const data = await productService.searchSuggestions(search)
      setSuggestions(data)
    }
    loadSuggestions()
  }, [search])

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))), [products])
  const brands = useMemo(() => Array.from(new Set(products.map((product) => product.brand))), [products])

  const filtered = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    const matchesPrice = product.price <= maxPrice
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  const totalPages = Math.ceil(filtered.length / 6) || 1
  const pageItems = filtered.slice((page - 1) * 6, page * 6)

  const handleCategoryToggle = (category: string) => {
    setPage(1)
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    )
  }

  const handleBrandToggle = (brand: string) => {
    setPage(1)
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand]))
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <SectionHeader
        title="All products"
        description="Filter, sort, and find the perfect addition to your setup."
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('grid')}
              className={`rounded-full border px-3 py-2 ${view === 'grid' ? 'border-primary text-primary' : 'border-slate-200 text-muted'}`}
            >
              <Grid2x2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`rounded-full border px-3 py-2 ${view === 'list' ? 'border-primary text-primary' : 'border-slate-200 text-muted'}`}
            >
              <List className="h-4 w-4" />
            </button>
            <Button variant="outline" onClick={() => setShowFilters((prev) => !prev)}>
              <SlidersHorizontal className="mr-2 inline h-4 w-4" /> Filters
            </Button>
          </div>
        }
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        suggestions={suggestions}
        onSelect={(value) => setSearch(value)}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {showFilters && (
          <FilterPanel
            categories={categories}
            brands={brands}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            minPrice={0}
            maxPrice={maxPrice}
            onCategoryToggle={handleCategoryToggle}
            onBrandToggle={handleBrandToggle}
            onPriceChange={(_, max) => {
              setPage(1)
              setMaxPrice(max)
            }}
          />
        )}
        <div className="space-y-6">
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}

          {!loading && pageItems.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-muted">
              No products match your filters.
            </div>
          )}

          {!loading && pageItems.length > 0 && view === 'grid' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && pageItems.length > 0 && view === 'list' && (
            <div className="space-y-4">
              {pageItems.map((product) => (
                <div key={product.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <img src={product.images[0]} alt={product.title} className="h-28 w-28 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-primary">{product.title}</p>
                      <p className="text-xs text-muted">{product.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
                      <Button className="mt-3" onClick={() => navigate(`/products/${product.id}`)}>
                        View details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <p className="text-sm text-muted">Showing {pageItems.length} of {filtered.length} results</p>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
