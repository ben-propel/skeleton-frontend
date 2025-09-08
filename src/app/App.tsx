import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/templates/MainLayout'
import { HomePage } from '@/components/pages/HomePage'

/**
 * Main App component with routing configuration
 */
const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<div>About Page</div>} />
        <Route path='*' element={<div>404 - Page Not Found</div>} />
      </Routes>
    </MainLayout>
  )
}

export default App