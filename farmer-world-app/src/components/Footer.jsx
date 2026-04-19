import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, ArrowRight } from 'lucide-react'
import { toast } from 'react-hot-toast'

const links = {
  Shop: [['Seeds', '/seeds'], ['Fruits', '/fruits'], ['Vegetables', '/vegetables'], ['Tools', '/tools'], ['Nuts', '/nuts']],
  Company: [['About Us', '#'], ['Blog', '#'], ['Careers', '#'], ['Press', '#']],
  Legal: [['Privacy Policy', '#'], ['Terms of Service', '#'], ['Refund Policy', '#'], ['Cookie Policy', '#']],
}

// Inline SVG social icons (lucide-react v1 doesn't include brand icons)
const SvgInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)
const SvgTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const SvgFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)
const SvgYoutube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const socials = [
  { Icon: SvgInstagram, href: '#', label: 'Instagram' },
  { Icon: SvgTwitter, href: '#', label: 'Twitter' },
  { Icon: SvgFacebook, href: '#', label: 'Facebook' },
  { Icon: SvgYoutube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const year = new Date().getFullYear()

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setEmail('')
    toast.success('Subscribed! Welcome to Farmer World.', {
      icon: '🌿',
      style: { borderRadius: '12px', fontSize: '14px' },
    })
  }

  return (
    <footer className="bg-gray-950 text-gray-400 w-full">
      <div className="w-full px-4 sm:px-6 xl:px-16 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 text-white font-extrabold text-xl no-underline mb-4">
              <Leaf className="w-7 h-7 text-green-500" />
              Farmer World
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Connecting local farmers with conscious consumers. Fresh, organic, and sustainable produce delivered to your door.
            </p>
            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-900 transition-all"
              />
              <button type="submit"
                className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white border-0 cursor-pointer transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-gray-600 mt-2">Subscribe for fresh deals & farm updates.</p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href}
                      className="text-sm text-gray-400 hover:text-green-400 no-underline transition-colors duration-150">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 m-0">© {year} Farmer World. All rights reserved. Grown with care 🌿</p>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-green-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 no-underline">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
