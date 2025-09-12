import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [year, setYear] = useState('')
  useEffect(() => setYear(String(new Date().getFullYear())), [])
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="brand">
          <img src="/leaf.svg" alt="Leaf" className="logo-mark" />
          <span>Farmer World</span>
        </div>
        <p className="copyright">© {year} Farmer World. Grown with care.</p>
      </div>
    </footer>
  )
}


