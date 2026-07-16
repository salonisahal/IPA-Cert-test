export type Category = {
  id: string
  name: string
  image: string
  description: string
}

export type Product = {
  id: string
  title: string
  description: string
  price: number
  discount: number
  rating: number
  reviewsCount: number
  brand: string
  category: string
  images: string[]
  colors: string[]
  sizes: string[]
  inStock: boolean
  inventory: number
  tags: string[]
}

export type Review = {
  id: string
  productId: string
  name: string
  rating: number
  date: string
  title: string
  comment: string
}

export type CartItem = {
  productId: string
  quantity: number
}

export type WishlistItem = {
  productId: string
  addedAt: string
}

export type Address = {
  id: string
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export type OrderItem = {
  productId: string
  quantity: number
  price: number
}

export type Order = {
  id: string
  number: string
  date: string
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  payment: string
  total: number
  items: OrderItem[]
}

export type UserProfile = {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  addresses: Address[]
  preferences: {
    notifications: boolean
    darkMode: boolean
  }
}
