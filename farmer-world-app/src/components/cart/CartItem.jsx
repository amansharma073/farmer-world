import React, { useState } from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const placeholder = '/placeholder.svg'

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useApp()
  const fallback = `https://source.unsplash.com/200x200/?${encodeURIComponent(item.name)}`
  const [src, setSrc] = useState(item.image || fallback)

  return (
    <div className="flex gap-3.5 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 group/item">

      {/* Thumbnail */}
      <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0">
        <img
          src={src}
          alt={item.name}
          onError={() => { if (src !== placeholder) setSrc(placeholder) }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info + controls */}
      <div className="flex flex-col flex-1 min-w-0 gap-1.5">

        {/* Row 1: name + remove */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-semibold text-gray-900 dark:text-white leading-snug m-0 line-clamp-2">
            {item.name}
          </p>
          <button
            onClick={() => removeFromCart(item.id, item.name)}
            className="shrink-0 p-1 rounded-lg text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-0 bg-transparent cursor-pointer opacity-0 group-hover/item:opacity-100"
            aria-label="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Row 2: badge */}
        <p className="text-[11px] text-gray-400 dark:text-gray-500 m-0">
          {item.badge} · ₹{item.price.toLocaleString()} each
        </p>

        {/* Row 3: qty stepper + line total */}
        <div className="flex items-center justify-between mt-0.5">
          {/* Stepper */}
          <div className="flex items-center gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => decreaseQty(item.id, item.name)}
              className="w-7 h-7 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border-0 bg-transparent cursor-pointer transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center text-xs font-bold text-gray-900 dark:text-white select-none">
              {item.qty}
            </span>
            <button
              onClick={() => increaseQty(item.id, item.name)}
              className="w-7 h-7 flex items-center justify-center text-gray-500 dark:text-gray:400 hover:bg-gray-100 dark:hover:bg-gray-700 border-0 bg-transparent cursor-pointer transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Line total */}
          <span className="text-[13px] font-extrabold text-gray-900 dark:text-white">
            ₹ {(item.price * item.qty).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
