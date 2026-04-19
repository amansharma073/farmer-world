import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
      {/* Image placeholder — matches 190px */}
      <div className="shrink-0 bg-gray-200 dark:bg-gray-700" style={{ height: 190 }} />

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-0">
        {/* Zone 1 */}
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded min-h-[2.5rem]" />
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        {/* Zone 2 */}
        <div className="mt-auto pt-3">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        {/* Zone 3 */}
        <div className="flex gap-2 pt-3">
          <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="w-16 h-9 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
