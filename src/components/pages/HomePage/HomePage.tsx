import React from 'react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { Link } from '@/components/atoms/Link'

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

      {/* Link Component Demo Section */}
      <div className="mt-16 rounded-lg bg-blue-50 p-8">
        <Text variant="h2" className="mb-8 text-center">
          Link Component Examples
        </Text>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Internal Navigation */}
          <div>
            <Text variant="h4" className="mb-4">Internal Navigation</Text>
            <div className="space-y-3">
              <div>
                <Link to="/">Home Page</Link>
              </div>
              <div>
                <Link to="/dashboard" variant="subtle">Dashboard (Subtle)</Link>
              </div>
              <div>
                <Link to="/settings" variant="contrast" underline="always">
                  Settings (Always Underlined)
                </Link>
              </div>
              <div>
                <Link to="/profile" size="sm">Small Profile Link</Link>
              </div>
              <div>
                <Link to="/coming-soon" disabled>
                  Coming Soon (Disabled)
                </Link>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div>
            <Text variant="h4" className="mb-4">External Links</Text>
            <div className="space-y-3">
              <div>
                <Link href="https://react.dev">React Documentation</Link>
              </div>
              <div>
                <Link href="https://vitejs.dev" variant="subtle">
                  Vite Build Tool
                </Link>
              </div>
              <div>
                <Link href="https://tailwindcss.com" underline="none">
                  Tailwind CSS (No Underline)
                </Link>
              </div>
              <div>
                <Link href="https://github.com" showExternalIcon={false}>
                  GitHub (No Icon)
                </Link>
              </div>
              <div>
                <Link href="/internal-docs" showExternalIcon>
                  Internal Docs (Forced Icon)
                </Link>
              </div>
            </div>
          </div>

          {/* Styled & Special Links */}
          <div>
            <Text variant="h4" className="mb-4">Styled & Special Links</Text>
            <div className="space-y-3">
              <div>
                <Link
                  href="mailto:support@example.com"
                  variant="contrast"
                  className="font-medium"
                >
                  Email Support
                </Link>
              </div>
              <div>
                <Link
                  href="tel:+1234567890"
                  variant="subtle"
                  underline="always"
                  size="lg"
                >
                  Call Us: (123) 456-7890
                </Link>
              </div>
              <div>
                <Link
                  href="/api/download"
                  showExternalIcon={false}
                  className="inline-flex items-center gap-2 rounded bg-primary-600 px-3 py-2 text-sm text-white hover:bg-primary-700"
                >
                  <Icon name="Download" size="sm" aria-hidden />
                  Download Report
                </Link>
              </div>
              <div>
                <Link
                  to="/premium"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold"
                  underline="none"
                >
                  Upgrade to Premium
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* AI Chatbot Link Examples */}
        <div className="mt-8">
          <Text variant="h4" className="mb-4">AI Chatbot Link Use Cases</Text>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <Text variant="h5" className="mb-3">Chat Message with Links</Text>
              <Text className="mb-4">
                Based on your question about React, I recommend checking out the{' '}
                <Link href="https://react.dev/learn" variant="subtle">
                  official React tutorial
                </Link>{' '}
                and the{' '}
                <Link href="https://react.dev/reference" variant="subtle">
                  API reference
                </Link>
                . You can also explore our{' '}
                <Link to="/examples" underline="always">
                  internal examples
                </Link>{' '}
                for more practical demonstrations.
              </Text>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/chat/history" variant="subtle" size="sm">
                  View Chat History
                </Link>
                <Link href="/api/export" showExternalIcon={false} size="sm">
                  Export Conversation
                </Link>
                <Link to="/help/commands" variant="subtle" size="sm">
                  Command Reference
                </Link>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <Text variant="h5" className="mb-3">Resource References</Text>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="ExternalLink" size="sm" className="text-muted" aria-hidden />
                  <Link href="https://openai.com/research" variant="default">
                    OpenAI Research Papers
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size="sm" className="text-muted" aria-hidden />
                  <Link to="/docs/api" variant="subtle">
                    API Documentation
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Settings" size="sm" className="text-muted" aria-hidden />
                  <Link to="/settings/api" variant="contrast">
                    API Configuration
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="HelpCircle" size="sm" className="text-muted" aria-hidden />
                  <Link href="https://help.example.com" size="sm">
                    Get Help & Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

HomePage.displayName = 'HomePage'