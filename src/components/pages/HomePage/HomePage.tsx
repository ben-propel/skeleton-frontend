import React from 'react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'

/**
 * Home page component demonstrating basic components and layout
 */
export const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const handleButtonClick = (): void => {
    alert(`Hello from the input: ${inputValue}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
          Welcome to Frontend Skeleton
        </h1>
        <p className="mt-6 text-lg leading-8 text-secondary-600">
          A modern React + TypeScript + Vite + Tailwind CSS scaffold built with best practices.
        </p>
        
        {/* Demo Section */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="w-full max-w-sm space-y-4">
            <Input
              label="Try the input component"
              type="text"
              placeholder="Enter some text..."
              value={inputValue}
              onChange={handleInputChange}
              helperText="This is a reusable input component"
            />
            
            <div className="flex justify-center gap-4">
              <Button variant="primary" onClick={handleButtonClick}>
                Primary Button
              </Button>
              <Button variant="secondary" onClick={handleButtonClick}>
                Secondary
              </Button>
              <Button variant="outline" onClick={handleButtonClick}>
                Outline
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <h2 className="text-center text-3xl font-bold tracking-tight text-secondary-900">
          What&apos;s Included
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900">React 18+</h3>
            <p className="mt-2 text-secondary-600">
              Latest React with TypeScript, hooks, and modern patterns
            </p>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900">Vite Build</h3>
            <p className="mt-2 text-secondary-600">
              Lightning-fast development with hot reload and optimized builds
            </p>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900">Tailwind CSS</h3>
            <p className="mt-2 text-secondary-600">
              Utility-first CSS framework with custom theme configuration
            </p>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900">TypeScript</h3>
            <p className="mt-2 text-secondary-600">
              Strict TypeScript configuration with comprehensive type safety
            </p>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900">Testing</h3>
            <p className="mt-2 text-secondary-600">
              Vitest and React Testing Library for comprehensive testing
            </p>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900">Code Quality</h3>
            <p className="mt-2 text-secondary-600">
              ESLint, Prettier, and strict coding standards configured
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

HomePage.displayName = 'HomePage'