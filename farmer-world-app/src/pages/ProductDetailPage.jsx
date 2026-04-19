import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw, Leaf } from 'lucide-react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Stars from '../components/ui/Stars.jsx'
import { findProduct } from '../data/sampleData.js'
import { useApp } from '../context/AppContext.jsx'

const labelStyles = {
  'Best Seller': 'bg-amber-500 text-white',
  'New':         'bg-blue-500 text-white',
  'Organic':     'bg-green-500 text-white',
}

const placeholder = '/placeholder.svg'

const perks = [
  { icon: Truck,       text: 'Free delivery on orders above ₹499' },
  { icon: ShieldCheck, text: '100% quality guaranteed' },
  { icon: RefreshCw,   text: 'Easy 7-day returns' },
  { icon: Leaf,        text: 'Sourced from local farms' },
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useApp()
  const item = findProduct(id)

  const fallback = item ? `https://source.unsplash.com/800x600/?${encodeURIComponent(item.name)}` : placeholder
  const [src, setSrc] = useState(item?.image || fallback)
  const [qty, setQty] = useState(1)

  if (!item) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Product not found.</p>
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold border-0 cursor-pointer hover:bg-green-700 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </main>
        <Footer />
      </>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(item)
    toast.success(`${qty}× ${item.name} added to cart!`, {
      icon: '🛒',
      style: { borderRadius: '12px', background: '#fff', color: '#1a1f1c', fontSize: '14px' },
    })
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="w-full px-4 sm:px-6 xl:px-16 py-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-6 flex-wrap">
            <Link to="/" className="hover:text-green-600 no-underline transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-600 dark:text-gray-300 font-medium">{item.name}</span>
          </nav>

          {/* Main card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Image */}
              <div className="relative bg-gray-100 dark:bg-gray-800 min-h-[320px] md:min-h-[480px]">
                <img
                  src={src}
                  alt={item.name}
                  onError={() => { if (src !== placeholder) setSrc(placeholder) }}
                  className="w-full h-full object-cover absolute inset-0"
                />
                {item.label && (
                  <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-xs font-bold ${labelStyles[item.label] || 'bg-gray-600 text-white'}`}>
                    {item.label}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-7 sm:p-10 flex flex-col gap-4">
                <span className="inline-block bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full px-3 py-1 text-xs font-semibold w-fit">
                  {item.badge}
                </span>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight m-0">
                  {item.name}
                </h1>

                <Stars rating={item.rating} reviews={item.reviews} />

                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description || 'Fresh, high-quality product sourced directly from local farms.'}
                </p>

                <div className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                  ₹ {item.price}
                </div>

                {/* Qty + Add to cart */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border-0 bg-transparent cursor-pointer text-lg font-bold transition-colors"
                    >−</button>
                    <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">{qty}</span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border-0 bg-transparent cursor-pointer text-lg font-bold transition-colors"
                    >+</button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(47,160,106,0.35)] text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                </div>

                {/* Perks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                  {perks.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      </div>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mt-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer bg-transparent border-0"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </main>
      <Footer />
    </>
  )
}
