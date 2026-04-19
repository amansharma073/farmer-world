import React, { useState } from 'react'
import { ShoppingCart, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Stars from './ui/Stars.jsx'
import QuickViewModal from './ui/QuickViewModal.jsx'
import { useApp } from '../context/AppContext.jsx'

const placeholder = '/placeholder.svg'

const labelStyles = {
  'Best Seller': 'bg-amber-500 text-white',
  'New':         'bg-blue-500 text-white',
  'Organic':     'bg-green-500 text-white',
}

export default function ProductCard({ item }) {
  const { addToCart } = useApp()
  const navigate = useNavigate()
  const fallback = `https://source.unsplash.com/800x600/?${encodeURIComponent(item.name)}`
  const [src,       setSrc]       = useState(item.image || fallback)
  const [quickView, setQuickView] = useState(false)
  const [adding,    setAdding]    = useState(false)

  const onImgError = () => {
    if (src !== fallback) { setSrc(fallback); return }
    if (src !== placeholder) setSrc(placeholder)
  }

  const handleAddToCart = () => {
    if (adding) return
    setAdding(true)
    addToCart(item)
    toast.success(`${item.name} added to cart!`, {
      icon: '🛒',
      style: { borderRadius: '12px', background: '#fff', color: '#1a1f1c', fontSize: '14px' },
    })
    setTimeout(() => setAdding(false), 1000)
  }

  return (
    <>
      {/*
        Card: flex-col, h-full so all cards in a row stretch to the same height.
        The body is split into 3 fixed zones via flex so buttons always sit at the bottom.
      */}
      <article className="
        w-full h-full flex flex-col
        bg-white dark:bg-gray-800
        border border-gray-100 dark:border-gray-700
        rounded-2xl overflow-hidden
        shadow-sm
        group
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]
      ">

        {/* ── Image (fixed 190px) ── */}
        <div className="relative shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-700" style={{ height: 190 }}>
          <img
            src={src}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={onImgError}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Label */}
          {item.label && (
            <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide ${labelStyles[item.label] || 'bg-gray-600 text-white'}`}>
              {item.label}
            </span>
          )}

          {/* Quick View overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/22 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={() => setQuickView(true)}
              className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-gray-800 text-xs font-semibold shadow-lg border-0 cursor-pointer hover:bg-gray-50 active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        </div>

        {/* ── Body: 3 zones ── */}
        <div className="flex flex-col flex-1 p-4 gap-0">

          {/* Zone 1 — badge + name + stars (fixed top) */}
          <div className="flex flex-col gap-1.5">
            <span className="inline-block bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full px-2.5 py-0.5 text-[11px] font-semibold w-fit leading-tight">
              {item.badge}
            </span>
            {/* Clamp to 2 lines so all names take the same vertical space */}
            <h3 className="text-[13px] font-bold text-gray-900 dark:text-gray-100 leading-snug m-0 line-clamp-2 min-h-[2.5rem]">
              {item.name}
            </h3>
            <Stars rating={item.rating} reviews={item.reviews} />
          </div>

          {/* Zone 2 — price (pushed to bottom of available space) */}
          <div className="mt-auto pt-3">
            <span className="text-[17px] font-extrabold text-green-700 dark:text-green-400 leading-none">
              ₹ {item.price.toLocaleString()}
            </span>
          </div>

          {/* Zone 3 — buttons (always at bottom, fixed height) */}
          <div className="flex gap-2 pt-3">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`
                flex-1 flex items-center justify-center gap-1.5
                h-9 rounded-xl text-white text-[12px] font-bold
                border-0 cursor-pointer
                transition-all duration-200
                shadow-[0_3px_10px_rgba(47,160,106,0.28)]
                active:scale-95
                ${adding
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:-translate-y-0.5'}
              `}
            >
              <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
              {adding ? 'Added!' : 'Add to Cart'}
            </button>

            <button
              onClick={() => navigate(`/product/${item.id}`)}
              className="
                h-9 px-3.5 rounded-xl
                border-2 border-gray-200 dark:border-gray-600
                text-gray-600 dark:text-gray-400
                text-[12px] font-bold
                bg-transparent cursor-pointer
                transition-all duration-200
                hover:border-green-500 hover:text-green-700
                dark:hover:border-green-500 dark:hover:text-green-400
                hover:-translate-y-0.5 active:scale-95
                shrink-0
              "
            >
              Details
            </button>
          </div>
        </div>
      </article>

      {quickView && <QuickViewModal item={item} onClose={() => setQuickView(false)} />}
    </>
  )
}
