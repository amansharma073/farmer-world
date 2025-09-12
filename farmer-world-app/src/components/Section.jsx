import React from 'react'

export default function Section({ id, title, onQueryChange, children }) {
  return (
    <section id={id} className="catalog section">
      <div className="container">
        <div className="section-head">
          <h2>{title}</h2>
          <div className="filters">
            <input type="search" placeholder={`Search ${title.toLowerCase()}...`} onChange={(e) => onQueryChange?.(e.target.value)} />
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}


