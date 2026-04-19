import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext(null)

// ── helpers ──────────────────────────────────────────────────────────────────
const CART_KEY = 'fw-cart'
const DARK_KEY = 'fw-dark'

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || [] }
  catch { return [] }
}

// ── provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [cart,        setCart]        = useState(loadCart)
  const [cartOpen,    setCartOpen]    = useState(false)
  const [darkMode,    setDarkMode]    = useState(() => localStorage.getItem(DARK_KEY) === 'true')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen,  setSearchOpen]  = useState(false)

  // persist cart
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  // dark mode
  useEffect(() => {
    localStorage.setItem(DARK_KEY, darkMode)
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // ── cart actions ────────────────────────────────────────────────────────────
  const addToCart = useCallback((item) => {
    setCart(prev => {
      const key = item.id + item.name
      const exists = prev.find(c => c.id + c.name === key)
      if (exists) return prev.map(c => c.id + c.name === key ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...item, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id, name) => {
    setCart(prev => prev.filter(c => !(c.id === id && c.name === name)))
  }, [])

  const increaseQty = useCallback((id, name) => {
    setCart(prev => prev.map(c => c.id === id && c.name === name ? { ...c, qty: c.qty + 1 } : c))
  }, [])

  const decreaseQty = useCallback((id, name) => {
    setCart(prev =>
      prev
        .map(c => c.id === id && c.name === name ? { ...c, qty: c.qty - 1 } : c)
        .filter(c => c.qty > 0)
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  // ── derived ─────────────────────────────────────────────────────────────────
  const cartCount   = cart.reduce((s, c) => s + c.qty, 0)
  const cartTotal   = cart.reduce((s, c) => s + c.price * c.qty, 0)

  return (
    <AppContext.Provider value={{
      cart, cartCount, cartTotal, cartOpen, setCartOpen,
      addToCart, removeFromCart, increaseQty, decreaseQty, clearCart,
      darkMode, setDarkMode,
      searchQuery, setSearchQuery,
      searchOpen,  setSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
