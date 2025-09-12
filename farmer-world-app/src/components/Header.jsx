import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onHashClick = (e) => {
      if (e.target.matches('a[href^="#"]')) setOpen(false)
    }
    const nav = navRef.current
    if (nav) nav.addEventListener('click', onHashClick)
    return () => nav && nav.removeEventListener('click', onHashClick)
  }, [])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="logo" to="/">
          <img src="/leaf.svg" alt="Leaf" className="logo-mark" />
          <span>Farmer World</span>
        </Link>

        <nav className={`nav ${open ? 'open' : ''}`} ref={navRef} aria-label="Primary">
          <button className="nav-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
          <Link to="/seeds" className="nav-link">Seeds</Link>
          <Link to="/fruits" className="nav-link">Fruits</Link>
          <Link to="/vegetables" className="nav-link">Vegetables</Link>
          <Link to="/tools" className="nav-link">Farming Tools</Link>
          <Link to="/nuts" className="nav-link">Nuts</Link>
          <a href="#contact" className="nav-link cta">Contact</a>
        </nav>
        <button className="hamburger" aria-label="Open menu" aria-controls="primaryNav" aria-expanded={open}
          onClick={() => setOpen(v => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}


