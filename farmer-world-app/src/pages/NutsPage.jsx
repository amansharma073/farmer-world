import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import Section from '../components/Section.jsx'
import CatalogGrid from '../components/CatalogGrid.jsx'
import Footer from '../components/Footer.jsx'
import { sampleData } from '../data/sampleData.js'

export default function NutsPage() {
  const [q, setQ] = useState('')
  return (
    <>
      <Header />
      <main>
        <Section id="nuts" title="Nuts" onQueryChange={setQ}>
          <CatalogGrid items={sampleData.nuts} query={q} />
        </Section>
      </main>
      <Footer />
    </>
  )
}


