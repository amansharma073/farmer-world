import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import SeedsPage from './pages/SeedsPage.jsx'
import FruitsPage from './pages/FruitsPage.jsx'
import VegetablesPage from './pages/VegetablesPage.jsx'
import ToolsPage from './pages/ToolsPage.jsx'
import NutsPage from './pages/NutsPage.jsx'
import './styles.css'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/seeds', element: <SeedsPage /> },
  { path: '/fruits', element: <FruitsPage /> },
  { path: '/vegetables', element: <VegetablesPage /> },
  { path: '/tools', element: <ToolsPage /> },
  { path: '/nuts', element: <NutsPage /> },
])

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


