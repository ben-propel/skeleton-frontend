import React from 'react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

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
        <Text variant="h1" className="sm:text-6xl">
          Welcome to Frontend Skeleton
        </Text>
        <Text size="lg" color="muted" className="mt-6 leading-8">
          A modern React + TypeScript + Vite + Tailwind CSS scaffold built with best practices.
        </Text>
        
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
                <Icon name="Star" size="sm" className="mr-2" aria-hidden />
                Primary Button
              </Button>
              <Button variant="secondary" onClick={handleButtonClick}>
                <Icon name="Heart" size="sm" className="mr-2" aria-hidden />
                Secondary
              </Button>
              <Button variant="outline" onClick={handleButtonClick}>
                <Icon name="Settings" size="sm" className="mr-2" aria-hidden />
                Outline
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <Text variant="h2" className="text-center">
          What&apos;s Included
        </Text>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-secondary-200 p-6">
            <Text variant="h3" size="lg" weight="semibold">React 18+</Text>
            <Text color="muted" className="mt-2">
              Latest React with TypeScript, hooks, and modern patterns
            </Text>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <Text variant="h3" size="lg" weight="semibold">Vite Build</Text>
            <Text color="muted" className="mt-2">
              Lightning-fast development with hot reload and optimized builds
            </Text>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <Text variant="h3" size="lg" weight="semibold">Tailwind CSS</Text>
            <Text color="muted" className="mt-2">
              Utility-first CSS framework with custom theme configuration
            </Text>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <Text variant="h3" size="lg" weight="semibold">TypeScript</Text>
            <Text color="muted" className="mt-2">
              Strict TypeScript configuration with comprehensive type safety
            </Text>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <Text variant="h3" size="lg" weight="semibold">Testing</Text>
            <Text color="muted" className="mt-2">
              Vitest and React Testing Library for comprehensive testing
            </Text>
          </div>
          <div className="rounded-lg border border-secondary-200 p-6">
            <Text variant="h3" size="lg" weight="semibold">Code Quality</Text>
            <Text color="muted" className="mt-2">
              ESLint, Prettier, and strict coding standards configured
            </Text>
          </div>
        </div>
      </div>

      {/* Text Component Demo Section */}
      <div className="mt-16 rounded-lg bg-gray-50 p-8">
        <Text variant="h2" className="mb-8 text-center">
          Text Component Examples
        </Text>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Typography Hierarchy */}
          <div>
            <Text variant="h4" className="mb-4">Typography Hierarchy</Text>
            <div className="space-y-3">
              <Text variant="h1" size="2xl">Heading 1</Text>
              <Text variant="h2" size="xl">Heading 2</Text>
              <Text variant="h3" size="lg">Heading 3</Text>
              <Text variant="h4">Heading 4</Text>
              <Text variant="body">Body text with normal styling</Text>
              <Text variant="caption" color="muted">Caption text for metadata</Text>
              <Text variant="code" size="sm">console.log(&apos;Code example&apos;)</Text>
            </div>
          </div>

          {/* Formatting Options */}
          <div>
            <Text variant="h4" className="mb-4">Formatting & Colors</Text>
            <div className="space-y-3">
              <Text weight="bold">Bold text example</Text>
              <Text italic>Italic text example</Text>
              <Text bold italic underline>Multiple formatting combined</Text>
              <Text color="primary">Primary themed text</Text>
              <Text color="destructive" weight="medium">Error message styling</Text>
              <Text size="xs" color="muted">Small muted text</Text>
              <div className="max-w-xs">
                <Text truncate="line-clamp-2">
                  This is a longer text that demonstrates the line clamping feature which will truncate after exactly two lines of content.
                </Text>
              </div>
            </div>
          </div>

          {/* Font Family Options */}
          <div>
            <Text variant="h4" className="mb-4">Font Families</Text>
            <div className="space-y-3">
              <Text font="sans">Sans-serif: Modern, clean Inter font</Text>
              <Text font="serif">Serif: Traditional, elegant serif typeface</Text>
              <Text font="mono">Monospace: Technical, fixed-width font</Text>
              <Text variant="h5" font="serif" className="mt-4">Serif Heading</Text>
              <Text font="mono" size="sm" color="muted">
                const greeting = &apos;Hello World&apos;
              </Text>
            </div>
          </div>
        </div>

        {/* AI Chatbot Examples */}
        <div className="mt-8">
          <Text variant="h4" className="mb-4">AI Chatbot Use Cases</Text>
          <div className="space-y-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <Text variant="h5" className="mb-2">Conversation: &quot;React Best Practices&quot;</Text>
              <Text className="mb-2">
                Here&apos;s a comprehensive response about React best practices that demonstrates how the Text component handles longer content...
              </Text>
              <Text variant="caption" color="muted">
                2 minutes ago
              </Text>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <Text variant="code" size="sm" color="primary">
                Status: Processing your request...
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

HomePage.displayName = 'HomePage'