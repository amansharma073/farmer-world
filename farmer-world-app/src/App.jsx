import React, { useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { sampleData } from './data/sampleData.js'
import { useApp } from './context/AppContext.jsx'

const sections = [
  { id: 'seeds', title: 'Seeds' },
  { id: 'fruits', title: 'Fruits' },
  { id: 'vegetables', title: 'Vegetables' },
  { id: 'tools', title: 'Farming Tools' },
  { id: 'nuts', title: 'Nuts' },
]

export default function App() {
  const { searchQuery } = useApp()

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return sampleData
    const q = searchQuery.toLowerCase()
    const result = {}
    for (const [key, items] of Object.entries(sampleData)) {
      result[key] = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.badge.toLowerCase().includes(q) ||
        (i.label || '').toLowerCase().includes(q)
      )
    }
    return result
  }, [searchQuery])

  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <main>
        {!searchQuery && <Hero />}
        {sections.map((sec, i) => (
          <Section
            key={sec.id}
            id={sec.id}
            title={sec.title}
            items={filteredData[sec.id] || []}
            index={i}
          />
        ))}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
