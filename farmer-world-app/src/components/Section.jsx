import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Carousel from './Carousel.jsx'

const filters = ['All', 'Organic', 'Best Seller', 'New']

const bgVariants = [
  'bg-white dark:bg-gray-900',
  'bg-gray-50 dark:bg-gray-950',
  'bg-green-50/40 dark:bg-gray-900',
  'bg-white dark:bg-gray-900',
  'bg-gray-50 dark:bg-gray-950',
]

// Map section id → route
const routeMap = {
  seeds: '/seeds',
  fruits: '/fruits',
  vegetables: '/vegetables',
  tools: '/tools',
  nuts: '/nuts',
}

export default function Section({ id, title, items, index = 0, loading = false }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return items
    return items.filter(i => i.label === activeFilter || i.badge === activeFilter)
  }, [items, activeFilter])

  const bg = bgVariants[index % bgVariants.length]

  return (
    <section id={id} className={`py-14 w-full ${bg}`}>
      <div className="w-full px-4 sm:px-6 xl:px-16">

        {/* ── Header row ── */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          {/* Title + accent bar */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white m-0 leading-tight"
            >
              {title}
            </motion.h2>
            <div className="mt-2 h-1 w-10 rounded-full bg-green-500" />
          </div>

          {/* Right side: filter chips + View All */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter chips */}
            <div className="flex flex-wrap gap-1.5">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer ${
                    activeFilter === f
                      ? 'bg-green-600 text-white border-green-600 shadow-sm'
                      : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-green-400 hover:text-green-700 dark:hover:text-green-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* View All button */}
            {routeMap[id] && (
              <Link
                to={routeMap[id]}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold
                  bg-green-600 text-white no-underline
                  hover:bg-green-700 hover:gap-2.5
                  transition-all duration-200 shadow-sm hover:shadow-md shrink-0"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* ── Carousel ── */}
        {filtered.length === 0 && !loading ? (
          <div className="py-14 text-center text-gray-400 dark:text-gray-600 text-sm">
            No products match this filter.
          </div>
        ) : (
          <div className="px-5">
            <Carousel items={filtered} loading={loading} />
          </div>
        )}
      </div>
    </section>
  )
}
