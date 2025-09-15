import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main layout template component providing overall page structure
 * 
 * @component
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-secondary-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link
                  to="/"
                  className="text-xl font-bold text-primary-600 hover:text-primary-700"
                >
                  Frontend Skeleton
                </Link>
              </div>
              <nav className="ml-6 flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary-900 hover:text-primary-600"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-secondary-500 hover:text-primary-600"
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn('flex-1', className)}>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-secondary-200 bg-secondary-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-secondary-500">
            © 2024 Propel Ventures. Frontend Skeleton built with React, Vite & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}

MainLayout.displayName = 'MainLayout'