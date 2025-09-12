import React, { useMemo, useState } from 'react'

import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import CatalogGrid from './components/CatalogGrid.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

import { sampleData } from './data/sampleData.js'

export default function App() {
  const [queryBySection, setQueryBySection] = useState({})

  const sections = useMemo(() => ([
    { id: 'seeds', title: 'Seeds' },
    { id: 'fruits', title: 'Fruits' },
    { id: 'vegetables', title: 'Vegetables' },
    { id: 'tools', title: 'Farming Tools' },
    { id: 'nuts', title: 'Nuts' },
  ]), [])

  return (
    <>
      <Header />
      <main id="home">
        <Hero />

        {sections.map(sec => (
          <Section key={sec.id} id={sec.id} title={sec.title} 
            onQueryChange={(q) => setQueryBySection(s => ({ ...s, [sec.id]: q }))}
          >
            <CatalogGrid items={sampleData[sec.id]} query={queryBySection[sec.id] || ''} pageSize={sec.id === 'fruits' ? 3 : 0} />
          </Section>
        ))}

        <Contact />
      </main>
      <Footer />
    </>
  )
}


