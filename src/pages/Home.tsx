import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, products } from '../data/mockData'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import TestimonialCard from '../components/TestimonialCard'
import Button from '../components/Button'
import { readStorage } from '../utils/storage'

const testimonials = [
  {
    name: 'Maya Collins',
    role: 'Creative Director',
    quote: 'Every product feels intentional. The details are gorgeous and the delivery was lightning fast.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Jordan Kim',
    role: 'Product Designer',
    quote: 'I built my entire workspace from NovaMarket and the quality is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Liam Ortega',
    role: 'Fitness Coach',
    quote: 'Love the curated wellness gear. The new drops are always on point.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
]

const Home = () => {
  const navigate = useNavigate()
  const featured = products.slice(0, 4)
  const trending = products.slice(4, 8)
  const recentlyViewed = useMemo(() => {
    const ids = readStorage<string[]>('recently-viewed', [])
    return products.filter((product) => ids.includes(product.id)).slice(0, 4)
  }, [])

  return (
    <div className="bg-background pb-10">
      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-12 pt-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <span className="rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
            New summer drop · up to 25% off
          </span>
          <h2 className="text-4xl font-semibold text-primary md:text-5xl">
            Upgrade your home, health, and workflow with premium essentials.
          </h2>
          <p className="text-base text-muted">
            Discover curated tech, wellness, and workspace gear. Every item is designed for modern living and fast delivery.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('/products')}>Shop collection</Button>
            <Button variant="outline" onClick={() => navigate('/wishlist')}>Browse wishlist</Button>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted">
            <div>
              <p className="text-lg font-semibold text-primary">2K+</p>
              <p>Premium products</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary">48h</p>
              <p>Average delivery</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary">98%</p>
              <p>Satisfaction rate</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-orange-50 p-6 shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"
            alt="Hero"
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <SectionHeader title="Popular categories" description="Explore the spaces we outfit with intentional design." />
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <SectionHeader
          title="Featured products"
          description="Handpicked by our team for the perfect balance of form and function."
          action={<Button variant="outline" onClick={() => navigate('/products')}>View all</Button>}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <SectionHeader title="Trending now" description="What the NovaMarket community is adding to cart." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <SectionHeader title="Customer stories" description="Real people, real spaces, real reviews." />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section className="mx-auto max-w-6xl space-y-6 px-6 py-10">
          <SectionHeader title="Recently viewed" description="Pick up right where you left off." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl bg-primary px-8 py-10 text-white shadow-soft">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Join the NovaMarket newsletter</h3>
              <p className="mt-2 text-sm text-slate-200">Get early access to launches and exclusive perks.</p>
            </div>
            <div className="flex w-full max-w-md items-center gap-2 rounded-full bg-white/10 p-2">
              <input
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-slate-200 focus:outline-none"
              />
              <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
