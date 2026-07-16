import { createContext, useContext, useMemo } from 'react'
import type { CartItem, Product } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { products } from '../data/mockData'

type CartContextValue = {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clear: () => void
  subtotal: number
  getProduct: (productId: string) => Product | undefined
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart-items', [])

  const addItem = (productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...prev, { productId, quantity }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    )
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const clear = () => setItems([])

  const getProduct = (productId: string) => products.find((product) => product.id === productId)

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = getProduct(item.productId)
      if (!product) return sum
      const price = product.price * (1 - product.discount / 100)
      return sum + price * item.quantity
    }, 0)
  }, [items])

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clear, subtotal, getProduct }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
