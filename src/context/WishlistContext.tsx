import { createContext, useContext } from 'react'
import type { WishlistItem } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'

type WishlistContextValue = {
  items: WishlistItem[]
  toggle: (productId: string) => void
  remove: (productId: string) => void
  isSaved: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined)

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useLocalStorage<WishlistItem[]>('wishlist-items', [])

  const toggle = (productId: string) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.productId === productId)
      if (exists) {
        return prev.filter((item) => item.productId !== productId)
      }
      return [...prev, { productId, addedAt: new Date().toISOString() }]
    })
  }

  const remove = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const isSaved = (productId: string) => items.some((item) => item.productId === productId)

  return (
    <WishlistContext.Provider value={{ items, toggle, remove, isSaved }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
