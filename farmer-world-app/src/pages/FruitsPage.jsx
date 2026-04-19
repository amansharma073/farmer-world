import React from 'react'
import { Toaster } from 'react-hot-toast'
import Header from '../components/Header.jsx'
import CatalogPage from '../components/CatalogPage.jsx'
import Footer from '../components/Footer.jsx'
import { sampleData } from '../data/sampleData.js'

export default function FruitsPage() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <CatalogPage title="Fruits" items={sampleData.fruits} />
      </main>
      <Footer />
    </>
  )
}
