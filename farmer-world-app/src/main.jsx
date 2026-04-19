import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import App from './App.jsx'
import SeedsPage from './pages/SeedsPage.jsx'
import FruitsPage from './pages/FruitsPage.jsx'
import VegetablesPage from './pages/VegetablesPage.jsx'
import ToolsPage from './pages/ToolsPage.jsx'
import NutsPage from './pages/NutsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CartPage from './pages/CartPage.jsx'
import './styles.css'

const router = createBrowserRouter([
  { path: '/',            element: <App /> },
  { path: '/seeds',       element: <SeedsPage /> },
  { path: '/fruits',      element: <FruitsPage /> },
  { path: '/vegetables',  element: <VegetablesPage /> },
  { path: '/tools',       element: <ToolsPage /> },
  { path: '/nuts',        element: <NutsPage /> },
  { path: '/product/:id', element: <ProductDetailPage /> },
  { path: '/cart',        element: <CartPage /> },
])

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
)
