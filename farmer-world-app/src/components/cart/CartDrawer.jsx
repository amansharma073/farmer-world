import React, { useEffect, useRef } from 'react'
import { X, ShoppingBag, Trash2, ArrowRight, ShoppingCart, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import CartItem from './CartItem.jsx'

const FREE_DELIVERY_THRESHOLD = 499

export default function CartDrawer() {
  const { cart, cartCount, cartTotal, cartOpen, setCartOpen, clearCart } = useApp()
  const drawerRef = useRef(null)
  const isEmpty   = cart.length === 0
  const delivery  = cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : FREE_DELIVERY_THRESHOLD - cartTotal
  const progress  = Math.min((cartTotal / FREE_DELIVERY_THRESHOLD) * 100, 100)
  const grandTotal = cartTotal + (delivery > 0 ? 49 : 0)

  // Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setCartOpen(false) }
    if (cartOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [cartOpen, setCartOpen])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  // Auto-focus drawer
  useEffect(() => {
    if (cartOpen) setTimeout(() => drawerRef.current?.focus(), 50)
  }, [cartOpen])

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
        style={{
          opacity:       cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? 'auto' : 'none',
          transition:    'opacity 0.28s ease',
        }}
        className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-[2px]"
      />

      {/* ── Drawer ── */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        style={{
          transform:  cartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
          width: 'min(400px, 100vw)',
        }}
        className="fixed top-0 right-0 bottom-0 z-[100] bg-white dark:bg-gray-900 shadow-[−8px_0_40px_rgba(0,0,0,0.15)] flex flex-col outline-none"
      >

        {/* ── Header ── */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-gray-900 dark:text-white m-0 leading-none">
                Your Cart
              </h2>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 m-0 mt-0.5">
                {cartCount === 0 ? 'Empty' : `${cartCount} item${cartCount > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {!isEmpty && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-0 bg-transparent cursor-pointer transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            )}
            <button
              onClick={() => setCartOpen(false)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border-0 bg-transparent cursor-pointer transition-colors"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Delivery progress bar (only when cart has items) ── */}
        {!isEmpty && (
          <div className="shrink-0 px-5 py-3 bg-green-50/60 dark:bg-green-900/10 border-b border-gray-100 dark:border-gray-800">
            {delivery > 0 ? (
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1.5 m-0">
                Add <span className="font-bold text-green-600 dark:text-green-400">₹{delivery.toLocaleString()}</span> more for free delivery
              </p>
            ) : (
              <p className="text-[11px] font-semibold text-green-600 dark:text-green-400 mb-1.5 m-0 flex items-center gap-1">
                <Truck className="w-3 h-3" /> You've unlocked free delivery! 🎉
              </p>
            )}
            <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* ── Items (scrollable) ── */}
        <div className="flex-1 overflow-y-auto px-5">
          {isEmpty ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <ShoppingCart className="w-9 h-9 text-gray-300 dark:text-gray-600" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-700 dark:text-gray-300 m-0">
                  Your cart is empty
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 m-0">
                  Add some fresh products!
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold border-0 cursor-pointer transition-colors shadow-[0_4px_12px_rgba(47,160,106,0.3)]"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div>
              {cart.map(item => (
                <CartItem key={item.id + item.name} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer (sticky) ── */}
        {!isEmpty && (
          <div className="shrink-0 border-t border-gray-100 dark:border-gray-800 px-5 pt-4 pb-5 flex flex-col gap-3 bg-white dark:bg-gray-900">

            {/* Price breakdown */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  ₹ {cartTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Delivery</span>
                <span className={`font-semibold ${delivery === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
                  {delivery === 0 ? 'FREE' : '₹ 49'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-lg font-extrabold text-green-600 dark:text-green-400">
                  ₹ {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm no-underline transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(47,160,106,0.4)]"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="flex items-center justify-center w-full py-2.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold text-sm no-underline hover:border-green-400 hover:text-green-700 dark:hover:text-green-400 transition-all duration-200"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
