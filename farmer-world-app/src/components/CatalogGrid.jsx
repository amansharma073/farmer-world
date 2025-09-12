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
    <article className="card">
      <img src={src} alt={item.name} loading="lazy" referrerPolicy="no-referrer" onError={onImgError} />
      <div className="card-body">
        <span className="badge">{item.badge}</span>
        <h3 style={{ margin: '4px 0' }}>{item.name}</h3>
        <div className="price">₹ {item.price}</div>
        <div className="card-actions">
          <button className="btn btn-small btn-primary">Add to cart</button>
          <button className="btn btn-small btn-ghost">Details</button>
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
      <div className="grid-controls">
        {totalPages > 1 && (
          <>
            <button className="gallery-nav left" aria-label="Previous" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>‹</button>
            <div className="pager-dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} className={`dot ${i === page ? 'active' : ''}`} onClick={() => setPage(i)} aria-label={`Go to page ${i+1}`}></button>
              ))}
            </div>
            <button className="gallery-nav right" aria-label="Next" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}>›</button>
          </>
        )}
      </div>
      <div className="grid">
        {visible.map(item => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}


