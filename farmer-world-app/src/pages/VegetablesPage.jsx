import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import Section from '../components/Section.jsx'
import CatalogGrid from '../components/CatalogGrid.jsx'
import Footer from '../components/Footer.jsx'
import { sampleData } from '../data/sampleData.js'

export default function VegetablesPage() {
  const [q, setQ] = useState('')
  return (
    <>
      <Header />
      <main>
        <Section id="vegetables" title="Vegetables" onQueryChange={setQ}>
          <CatalogGrid items={sampleData.vegetables} query={q} />
        </Section>
      </main>
      <Footer />
    </>
  )
}


