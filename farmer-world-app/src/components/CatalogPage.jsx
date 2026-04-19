import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard.jsx'
import SkeletonCard from './ui/SkeletonCard.jsx'

const filters = ['All', 'Organic', 'Best Seller', 'New']

export default function CatalogPage({ title, items, loading = false }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = items
    if (activeFilter !== 'All') list = list.filter(i => i.label === activeFilter || i.badge === activeFilter)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.badge.toLowerCase().includes(q))
    }
    return list
  }, [items, activeFilter, query])

  return (
    <div className="w-full px-4 sm:px-6 xl:px-16 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-gray-900 dark:text-white m-0"
          >
            {title}
          </motion.h1>
          <div className="mt-2 h-1 w-10 rounded-full bg-green-500" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{filtered.length} products</p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 dark:text-gray-200 transition-all w-52"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer ${
                  activeFilter === f
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-green-400 hover:text-green-700'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400 dark:text-gray-600 text-sm">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {filtered.map(item => <ProductCard key={item.id + item.name} item={item} />)}
        </div>
      )}
    </div>
  )
}
