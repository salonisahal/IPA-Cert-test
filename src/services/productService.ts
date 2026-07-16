import { categories, products, reviews } from '../data/mockData'
import type { Product, Review } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const productService = {
  async getProducts(latency = 450): Promise<Product[]> {
    await delay(latency)
    return products
  },
  async getProductById(id: string, latency = 450): Promise<Product | undefined> {
    await delay(latency)
    return products.find((product) => product.id === id)
  },
  async getCategories(latency = 300) {
    await delay(latency)
    return categories
  },
  async getReviews(productId: string, latency = 300): Promise<Review[]> {
    await delay(latency)
    return reviews.filter((review) => review.productId === productId)
  },
  async searchSuggestions(query: string, latency = 200): Promise<string[]> {
    await delay(latency)
    if (!query) return []
    const lowered = query.toLowerCase()
    return products
      .map((product) => product.title)
      .filter((title) => title.toLowerCase().includes(lowered))
      .slice(0, 5)
  },
}
