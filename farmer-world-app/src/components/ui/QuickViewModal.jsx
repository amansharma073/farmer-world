import React, { useEffect, useState } from 'react'
import { X, ShoppingCart, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Stars from './Stars.jsx'
import { useApp } from '../../context/AppContext.jsx'

const labelStyles = {
  'Best Seller': 'bg-amber-500 text-white',
  'New':         'bg-blue-500 text-white',
  'Organic':     'bg-green-500 text-white',
}

const placeholder = '/placeholder.svg'

export default function QuickViewModal({ item, onClose }) {
  const { addToCart } = useApp()
  const navigate = useNavigate()
  const fallback = `https://source.unsplash.com/800x600/?${encodeURIComponent(item.name)}`
  const [src, setSrc] = useState(item.image || fallback)
  const [visible, setVisible] = useState(false)

  // Animate in
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 220)
  }

  const handleAddToCart = () => {
    addToCart(item)
    toast.success(`${item.name} added to cart!`, {
      icon: '🛒',
      style: { borderRadius: '12px', background: '#fff', color: '#1a1f1c', fontSize: '14px' },
    })
    handleClose()
  }

  const handleDetails = () => {
    handleClose()
    setTimeout(() => navigate(`/product/${item.id}`), 230)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${item.name}`}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.22s ease' }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(16px)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}
        className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col sm:flex-row"
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white transition-colors cursor-pointer shadow-sm"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="sm:w-[45%] h-56 sm:h-auto bg-gray-100 dark:bg-gray-800 relative overflow-hidden shrink-0">
          <img
            src={src}
            alt={item.name}
            onError={() => { if (src !== placeholder) setSrc(placeholder) }}
            className="w-full h-full object-cover"
          />
          {item.label && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold ${labelStyles[item.label] || 'bg-gray-600 text-white'}`}>
              {item.label}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 p-6 flex-1">
          <span className="inline-block bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full px-3 py-0.5 text-xs font-semibold w-fit">
            {item.badge}
          </span>

          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight m-0">
            {item.name}
          </h2>

          <Stars rating={item.rating} reviews={item.reviews} />

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {item.description || 'Fresh, high-quality product sourced directly from local farms.'}
          </p>

          <div className="text-2xl font-extrabold text-green-600 dark:text-green-400 mt-auto">
            ₹ {item.price}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(47,160,106,0.35)]"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
            <button
              onClick={handleDetails}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold bg-transparent cursor-pointer transition-all duration-200 hover:border-green-500 hover:text-green-700 dark:hover:text-green-400 hover:-translate-y-0.5"
            >
              Details <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
