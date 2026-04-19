import React from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ShoppingCart, Trash2, ArrowLeft, ShieldCheck, Truck, Tag } from 'lucide-react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import CartItem from '../components/cart/CartItem.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function CartPage() {
  const { cart, cartCount, cartTotal, clearCart } = useApp()
  const isEmpty = cart.length === 0
  const delivery = cartTotal >= 499 ? 0 : 49
  const grandTotal = cartTotal + delivery

  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="w-full px-4 sm:px-6 xl:px-16 py-8">

          {/* Page title */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white m-0">
                Shopping Cart
              </h1>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 m-0">
                {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
              </p>
            </div>
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 no-underline transition-colors">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {isEmpty ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <ShoppingCart className="w-11 h-11 text-gray-300 dark:text-gray-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700 dark:text-gray-300 m-0">Your cart is empty</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 m-0">Looks like you haven't added anything yet.</p>
              </div>
              <Link to="/"
                className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm no-underline transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(47,160,106,0.35)]">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

              {/* ── Cart items ── */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                {/* Header row */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                  <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 m-0 uppercase tracking-wide">
                    Items
                  </h2>
                  <button
                    onClick={clearCart}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg border-0 bg-transparent cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove All
                  </button>
                </div>

                <div className="px-6">
                  {cart.map(item => (
                    <CartItem key={item.id + item.name} item={item} />
                  ))}
                </div>
              </div>

              {/* ── Order summary ── */}
              <div className="flex flex-col gap-4">
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                  <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 m-0 uppercase tracking-wide mb-5">
                    Order Summary
                  </h2>

                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal ({cartCount} items)</span>
                      <span className="font-semibold text-gray-900 dark:text-white">₹ {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Delivery</span>
                      <span className={`font-semibold ${delivery === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                        {delivery === 0 ? 'FREE' : `₹ ${delivery}`}
                      </span>
                    </div>
                    {delivery > 0 && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 bg-green-50 dark:bg-green-900/20 rounded-xl px-3 py-2">
                        Add ₹ {(499 - cartTotal).toLocaleString()} more for free delivery
                      </p>
                    )}
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between">
                      <span className="font-bold text-gray-900 dark:text-white">Total</span>
                      <span className="font-extrabold text-lg text-green-600 dark:text-green-400">
                        ₹ {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button className="mt-5 w-full py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(47,160,106,0.4)]">
                    Proceed to Checkout
                  </button>
                </div>

                {/* Trust badges */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 flex flex-col gap-3">
                  {[
                    { icon: ShieldCheck, text: '100% Secure Checkout' },
                    { icon: Truck,       text: 'Free delivery above ₹499' },
                    { icon: Tag,         text: 'Best prices guaranteed' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      </div>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
