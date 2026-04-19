import React, { useMemo, useState } from 'react'

const placeholder = '/placeholder.svg'

function Card({ item }) {
  const keywordUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(item.name.replace(/\s+/g, ','))}`
  const [src, setSrc] = useState(item.image || keywordUrl)

  const onImgError = () => {
    if (src !== keywordUrl && item.image) { setSrc(keywordUrl); return }
    if (src !== placeholder) { setSrc(placeholder); return }
  }

  return (
    <article className="bg-white border border-[#e7efe9] rounded-2xl overflow-hidden shadow-card flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover hover:border-green-200 group">
      <div className="overflow-hidden h-52">
        <img
          src={src}
          alt={item.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={onImgError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs w-fit font-semibold tracking-wide">
          {item.badge}
        </span>
        <h3 className="text-base font-bold text-gray-900 m-0 leading-snug">{item.name}</h3>
        <div className="text-green-800 font-extrabold text-lg">₹ {item.price}</div>
        <div className="flex gap-2 mt-auto pt-2">
          <button className="flex-1 px-3 py-2.5 text-sm rounded-xl bg-green-600 text-white font-semibold border-0 cursor-pointer transition-all duration-200 hover:bg-green-700 hover:-translate-y-0.5 active:translate-y-0">
            Add to cart
          </button>
          <button className="flex-1 px-3 py-2.5 text-sm rounded-xl border-2 border-green-200 text-green-800 font-semibold bg-transparent cursor-pointer transition-all duration-200 hover:bg-green-50 hover:border-green-400 hover:-translate-y-0.5 active:translate-y-0">
            Details
          </button>
        </div>
      </div>
    </article>
  )
}

export default function CatalogGrid({ items, query, pageSize }) {
  const filtered = useMemo(() => {
    if (!query) return items
    const q = query.toLowerCase()
    return items.filter(i => (i.name + ' ' + i.badge).toLowerCase().includes(q))
  }, [items, query])

  const [page, setPage] = useState(0)

  const totalPages = useMemo(() => {
    if (!pageSize || pageSize <= 0) return 1
    return Math.max(1, Math.ceil(filtered.length / pageSize))
  }, [filtered.length, pageSize])

  const visible = useMemo(() => {
    if (!pageSize || pageSize <= 0) return filtered
    const start = page * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  return (
    <>
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3 mb-4">
          <button
            className="w-9 h-9 rounded-full bg-white border border-[#d7e5dd] cursor-pointer text-xl flex items-center justify-center hover:bg-green-50 hover:border-green-400 transition-colors disabled:opacity-30"
            aria-label="Previous"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
          >‹</button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`rounded-full border-0 cursor-pointer transition-all duration-300 ${i === page ? 'w-6 h-2.5 bg-green-600' : 'w-2.5 h-2.5 bg-[#d7e5dd] hover:bg-green-300'}`}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="w-9 h-9 rounded-full bg-white border border-[#d7e5dd] cursor-pointer text-xl flex items-center justify-center hover:bg-green-50 hover:border-green-400 transition-colors disabled:opacity-30"
            aria-label="Next"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >›</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {visible.map(item => (
          <Card key={item.id + item.name} item={item} />
        ))}
      </div>
    </>
  )
}
