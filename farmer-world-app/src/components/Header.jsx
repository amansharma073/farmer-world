import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Search, Sun, Moon, Menu, X, Leaf } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import CartDrawer from './cart/CartDrawer.jsx'

const navLinks = [
  ['Seeds', '/seeds'],
  ['Fruits', '/fruits'],
  ['Vegetables', '/vegetables'],
  ['Tools', '/tools'],
  ['Nuts', '/nuts'],
]

export default function Header() {
  const { cartCount, darkMode, setDarkMode, searchQuery, setSearchQuery, searchOpen, setSearchOpen, setCartOpen } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchOpen(false)
      navigate('/')
    }
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'}`}>
      <div className="w-full px-4 sm:px-6 xl:px-12 flex items-center gap-4 h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-green-700 dark:text-green-400 font-extrabold text-xl no-underline shrink-0 hover:opacity-80 transition-opacity">
          <Leaf className="w-7 h-7" />
          <span className="hidden sm:block">Farmer World</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {navLinks.map(([label, path]) => (
            <Link key={label} to={path}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 no-underline transition-all duration-150">
              {label}
            </Link>
          ))}
        </nav>

        {/* Search bar — desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 transition-all"
          />
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Mobile search toggle */}
          <button onClick={() => setSearchOpen(v => !v)}
            className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-0 bg-transparent cursor-pointer">
            <Search className="w-5 h-5" />
          </button>

          {/* Dark mode */}
          <button onClick={() => setDarkMode(v => !v)}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-0 bg-transparent cursor-pointer">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User */}
          <button className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-0 bg-transparent cursor-pointer">
            <User className="w-5 h-5" />
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-0 bg-transparent cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </motion.span>
            )}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-0 bg-transparent cursor-pointer">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-100 dark:border-gray-800">
            <form onSubmit={handleSearch} className="px-4 py-3 relative">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input ref={searchRef} type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:text-gray-200 transition-all" />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-1">
            {navLinks.map(([label, path]) => (
              <Link key={label} to={path} onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 no-underline transition-colors">
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer — lives here so it's always mounted */}
      <CartDrawer />
    </header>
  )
}
