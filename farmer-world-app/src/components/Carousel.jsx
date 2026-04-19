import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard.jsx'
import SkeletonCard from './ui/SkeletonCard.jsx'

const GAP = 20 // px between cards

// How many cards to show at each breakpoint
function visibleCount(containerW) {
  if (containerW >= 1280) return 5
  if (containerW >= 1024) return 4
  if (containerW >= 768)  return 3
  if (containerW >= 480)  return 2
  return 1
}

export default function Carousel({ items, loading = false }) {
  const wrapRef  = useRef(null)   // the outer clip wrapper
  const trackRef = useRef(null)   // the scrollable flex row

  const [cardW,    setCardW]    = useState(260)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(false)

  // Recalculate card width so N cards fill the container exactly
  const measure = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const containerW = wrap.clientWidth
    const cols = visibleCount(containerW)
    const w = Math.floor((containerW - GAP * (cols - 1)) / cols)
    setCardW(w)
  }, [])

  const syncArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 2)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const wrap  = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const t = setTimeout(() => { measure(); syncArrows() }, 60)

    const ro = new ResizeObserver(() => { measure(); syncArrows() })
    ro.observe(wrap)
    track.addEventListener('scroll', syncArrows, { passive: true })

    return () => {
      clearTimeout(t)
      ro.disconnect()
      track.removeEventListener('scroll', syncArrows)
    }
  }, [measure, syncArrows, items])

  const scroll = (dir) =>
    trackRef.current?.scrollBy({ left: dir * (cardW + GAP) * 2, behavior: 'smooth' })

  const list = loading ? Array.from({ length: 5 }) : items.slice(0, 5)

  return (
    <div style={{ position: 'relative', paddingLeft: 0, paddingRight: 0 }}>

      {/* Left arrow */}
      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        style={{
          position: 'absolute', left: -18, top: '45%',
          transform: 'translateY(-50%)', zIndex: 10,
          opacity: canLeft ? 1 : 0,
          pointerEvents: canLeft ? 'auto' : 'none',
          transition: 'opacity 0.2s',
        }}
        className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600 cursor-pointer transition-colors duration-150"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Clip wrapper — measured for card width calculation */}
      <div ref={wrapRef} style={{ overflow: 'hidden', width: '100%' }}>
        <div
          ref={trackRef}
          className="carousel-track"
          style={{
            display: 'flex',
            gap: GAP,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            paddingBottom: 14,
            paddingTop: 6,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {list.map((item, i) => (
            <div
              key={loading ? i : item.id + item.name}
              style={{
                minWidth: cardW,
                maxWidth: cardW,
                flexShrink: 0,
                scrollSnapAlign: 'start',
              }}
            >
              {loading ? <SkeletonCard /> : <ProductCard item={item} />}
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        style={{
          position: 'absolute', right: -18, top: '45%',
          transform: 'translateY(-50%)', zIndex: 10,
          opacity: canRight ? 1 : 0,
          pointerEvents: canRight ? 'auto' : 'none',
          transition: 'opacity 0.2s',
        }}
        className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600 cursor-pointer transition-colors duration-150"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
