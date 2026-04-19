import React from 'react'

const variants = {
  primary: 'bg-green-600 text-white hover:bg-green-700 shadow-[0_4px_14px_rgba(47,160,106,0.4)] hover:shadow-[0_6px_20px_rgba(47,160,106,0.5)]',
  ghost: 'border-2 border-green-300 text-green-800 dark:text-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/30',
  outline: 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
}

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-0 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
