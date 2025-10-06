import React, { useMemo, useState } from 'react'

export default function Hero() {
  const gallery = useMemo(() => ([
    { src: '/Farm2.jpg', alt: 'Community harvest', caption: 'Stories from the farm community.' },
    { src: '/farm%20image.jpg', alt: 'Fields at sunrise', caption: 'Fresh morning over green rows.' },
    { src: '/Social-1.jpg', alt: 'Sharing experience', caption: 'Farmers sharing techniques and results.' },
  ]), [])
  const [idx, setIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const current = gallery[idx % gallery.length]
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1>Organic goodness from farm to table</h1>
          <p>Discover seeds, fruits, vegetables, tools, and nuts grown and crafted by local farmers. Pure, sustainable, and fresh.</p>
          <div className="hero-actions">
            <a href="#seeds" className="btn btn-primary">Shop Categories</a>
            <a href="#contact" className="btn btn-ghost">Contact</a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <button className="gallery-nav left" onClick={() => setIdx((i) => (i - 1 + gallery.length) % gallery.length)} aria-label="Previous">‹</button>
          <img
            className="hero-img"
            src={current.src}
            alt={current.alt}
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = '/placeholder.svg' }}
            onClick={() => setOpen(true)}
          />
          <button className="gallery-nav right" onClick={() => setIdx((i) => (i + 1) % gallery.length)} aria-label="Next">›</button>
          <div className="gallery-dots">
            {gallery.map((_, i) => (
              <button key={i} className={`dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} aria-label={`Go to slide ${i+1}`}></button>
            ))}
          </div>
          <button className="gallery-details" onClick={() => setOpen(true)}>View details</button>
        </div>

        {open && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-backdrop" onClick={() => setOpen(false)}></div>
            <div className="modal-content">
              <img src={current.src} alt={current.alt} referrerPolicy="no-referrer" />
              <p className="modal-caption">{current.caption}</p>
              <div className="modal-actions">
                <button className="btn" onClick={() => setOpen(false)}>Close</button>
                <a className="btn btn-primary" href={current.src} target="_blank" rel="noreferrer">Open image</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


