import React from 'react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { Link } from '@/components/atoms/Link'
import { Spinner } from '@/components/atoms/Spinner'
import { Timestamp } from '@/components/atoms/Timestamp'

/**
 * Home page component demonstrating basic components and layout
 */
export const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('')
  const [loadingStates, setLoadingStates] = React.useState({
    message: false,
    upload: false,
    search: false,
    overlay: false,
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const handleButtonClick = (): void => {
    alert(`Hello from the input: ${inputValue}`)
  }

  const toggleLoading = (key: keyof typeof loadingStates): void => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
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
      </div>

      {/* Timestamp Component Demo Section */}
      <div className="mt-16 rounded-lg bg-purple-50 p-8">
        <Text variant="h2" className="mb-8 text-center">
          Timestamp Component Examples
        </Text>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Format Types */}
          <div>
            <Text variant="h4" className="mb-4">Format Types</Text>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <Text size="sm" weight="medium">Relative (default):</Text>
                <Timestamp date={new Date(Date.now() - 2 * 60 * 60 * 1000)} />
              </div>
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <Text size="sm" weight="medium">Yesterday:</Text>
                <Timestamp date={new Date(Date.now() - 24 * 60 * 60 * 1000)} format="absolute" />
              </div>
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <Text size="sm" weight="medium">Custom format:</Text>
                <Timestamp
                  date={new Date()}
                  format="custom"
                  customFormat="MMM do, h:mm a"
                />
              </div>
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <Text size="sm" weight="medium">ISO format:</Text>
                <Timestamp
                  date={new Date()}
                  format="custom"
                  customFormat="yyyy-MM-dd"
                />
              </div>
              <div className="flex items-center justify-between pb-2">
                <Text size="sm" weight="medium">With seconds:</Text>
                <Timestamp
                  date={new Date(Date.now() - 30000)}
                  includeSeconds
                  refreshInterval={5}
                />
              </div>
            </div>
          </div>

          {/* Styling Variants */}
          <div>
            <Text variant="h4" className="mb-4">Styling & Variants</Text>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <Text size="sm" weight="medium">Default:</Text>
                <Timestamp date={new Date(Date.now() - 5 * 60 * 1000)} />
              </div>
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <Text size="sm" weight="medium">Muted:</Text>
                <Timestamp
                  date={new Date(Date.now() - 15 * 60 * 1000)}
                  variant="muted"
                />
              </div>
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <Text size="sm" weight="medium">Accent:</Text>
                <Timestamp
                  date={new Date(Date.now() - 30 * 60 * 1000)}
                  variant="accent"
                  weight="medium"
                />
              </div>
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <Text size="sm" weight="medium">Large:</Text>
                <Timestamp
                  date={new Date(Date.now() - 60 * 60 * 1000)}
                  size="lg"
                  weight="semibold"
                />
              </div>
              <div className="flex items-center justify-between pb-2">
                <Text size="sm" weight="medium">Small:</Text>
                <Timestamp
                  date={new Date(Date.now() - 2 * 60 * 60 * 1000)}
                  size="xs"
                  variant="subtle"
                />
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <Text variant="h4" className="mb-4">Real-world Use Cases</Text>
            <div className="space-y-4">
              {/* Chat Message */}
              <div className="rounded border border-purple-200 bg-white p-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Text size="sm" weight="bold" className="text-white">JD</Text>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Text weight="medium" size="sm">John Doe</Text>
                      <Timestamp
                        date={new Date(Date.now() - 10 * 60 * 1000)}
                        variant="muted"
                        size="xs"
                        refreshInterval={30}
                      />
                    </div>
                    <Text size="sm" className="mt-1">
                      This is how timestamps work in chat messages!
                    </Text>
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="rounded border border-purple-200 bg-white p-3">
                <div className="flex items-center gap-2">
                  <Icon name="Star" size="sm" className="text-yellow-500" />
                  <Text size="sm">Document starred</Text>
                </div>
                <Timestamp
                  date={new Date(Date.now() - 2 * 60 * 60 * 1000)}
                  format="absolute"
                  variant="muted"
                  size="xs"
                  className="mt-1 block"
                />
              </div>

              {/* Event Scheduling */}
              <div className="rounded border border-purple-200 bg-white p-3">
                <Text weight="medium" size="sm">Team Meeting</Text>
                <Timestamp
                  date={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                  format="custom"
                  customFormat="EEEE 'at' h:mm a"
                  variant="accent"
                  size="sm"
                  className="mt-1 block"
                />
              </div>

              {/* Auto-refresh Demo */}
              <div className="rounded border border-purple-200 bg-white p-3">
                <Text weight="medium" size="sm">Live Updates</Text>
                <Text size="xs" color="muted" className="mt-1">
                  Updates every 5 seconds:
                </Text>
                <Timestamp
                  date={new Date(Date.now() - 45000)}
                  refreshInterval={5}
                  includeSeconds
                  variant="accent"
                  size="sm"
                  className="mt-1 block"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Notice */}
        <div className="mt-8 rounded-lg bg-purple-100 p-4">
          <Text variant="h5" className="mb-2">✨ Timestamp Features</Text>
          <Text size="sm" color="muted">
            • <strong>Auto-refresh:</strong> Relative timestamps update automatically
            • <strong>Tooltips:</strong> Hover for full date/time details
            • <strong>Accessibility:</strong> Semantic HTML with proper time element
            • <strong>Internationalization:</strong> Ready for multiple locales
            • <strong>Timezone support:</strong> Basic timezone display capabilities
            • <strong>Flexible formatting:</strong> Relative, absolute, or custom formats
          </Text>
        </div>
      </div>

      {/* Spinner Component Demo Section */}
      <div className="mt-16 rounded-lg bg-green-50 p-8">
        <Text variant="h2" className="mb-8 text-center">
          Spinner Component Examples
        </Text>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Size & Animation Variants */}
          <div>
            <Text variant="h4" className="mb-4">Size & Animation Variants</Text>
            <div className="space-y-4">
              {/* Sizes */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Sizes</Text>
                <div className="flex items-center gap-4">
                  <Spinner size="xs" aria-label="Extra small spinner" />
                  <Spinner size="sm" aria-label="Small spinner" />
                  <Spinner size="md" aria-label="Medium spinner" />
                  <Spinner size="lg" aria-label="Large spinner" />
                  <Spinner size="xl" aria-label="Extra large spinner" />
                </div>
                <Text size="xs" color="muted" className="mt-1">xs, sm, md, lg, xl</Text>
              </div>

              {/* Animation Styles */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Animation Styles</Text>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <Spinner variant="spin" size="lg" aria-label="Spinning animation" />
                    <Text size="xs" color="muted" className="mt-1">Spin</Text>
                  </div>
                  <div className="text-center">
                    <Spinner variant="pulse" size="lg" aria-label="Pulsing animation" />
                    <Text size="xs" color="muted" className="mt-1">Pulse</Text>
                  </div>
                  <div className="text-center">
                    <Spinner variant="dots" size="lg" aria-label="Dots animation" />
                    <Text size="xs" color="muted" className="mt-1">Dots</Text>
                  </div>
                </div>
              </div>

              {/* Speed Controls */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Speed Controls</Text>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <Spinner speed="slow" size="md" aria-label="Slow spinner" />
                    <Text size="xs" color="muted" className="mt-1">Slow</Text>
                  </div>
                  <div className="text-center">
                    <Spinner speed="normal" size="md" aria-label="Normal spinner" />
                    <Text size="xs" color="muted" className="mt-1">Normal</Text>
                  </div>
                  <div className="text-center">
                    <Spinner speed="fast" size="md" aria-label="Fast spinner" />
                    <Text size="xs" color="muted" className="mt-1">Fast</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Variants */}
          <div>
            <Text variant="h4" className="mb-4">Color Variants</Text>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Spinner color="primary" size="sm" aria-label="Primary color spinner" />
                <Text size="sm">Primary</Text>
              </div>
              <div className="flex items-center gap-2">
                <Spinner color="secondary" size="sm" aria-label="Secondary color spinner" />
                <Text size="sm">Secondary</Text>
              </div>
              <div className="flex items-center gap-2">
                <Spinner color="success" size="sm" aria-label="Success color spinner" />
                <Text size="sm">Success</Text>
              </div>
              <div className="flex items-center gap-2">
                <Spinner color="warning" size="sm" aria-label="Warning color spinner" />
                <Text size="sm">Warning</Text>
              </div>
              <div className="flex items-center gap-2">
                <Spinner color="destructive" size="sm" aria-label="Destructive color spinner" />
                <Text size="sm">Destructive</Text>
              </div>
              <div className="flex items-center gap-2">
                <Spinner color="muted" size="sm" aria-label="Muted color spinner" />
                <Text size="sm">Muted</Text>
              </div>
            </div>
          </div>

          {/* Interactive Examples */}
          <div>
            <Text variant="h4" className="mb-4">Interactive Examples</Text>
            <div className="space-y-4">
              {/* Message Sending */}
              <div>
                <Button
                  variant={loadingStates.message ? "secondary" : "primary"}
                  onClick={() => toggleLoading('message')}
                  className="w-full"
                >
                  {loadingStates.message ? (
                    <>
                      <Spinner size="xs" color="current" className="mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size="sm" className="mr-2" aria-hidden />
                      Send Message
                    </>
                  )}
                </Button>
              </div>

              {/* File Upload */}
              <div>
                <Button
                  variant={loadingStates.upload ? "secondary" : "outline"}
                  onClick={() => toggleLoading('upload')}
                  className="w-full"
                >
                  {loadingStates.upload ? (
                    <>
                      <Spinner variant="dots" size="sm" color="current" className="mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Icon name="Upload" size="sm" className="mr-2" aria-hidden />
                      Upload File
                    </>
                  )}
                </Button>
              </div>

              {/* Search */}
              <div>
                <Button
                  variant={loadingStates.search ? "secondary" : "outline"}
                  onClick={() => toggleLoading('search')}
                  className="w-full"
                >
                  {loadingStates.search ? (
                    <>
                      <Spinner variant="pulse" size="sm" color="current" className="mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Icon name="Search" size="sm" className="mr-2" aria-hidden />
                      Search AI
                    </>
                  )}
                </Button>
              </div>

              {/* Overlay Example */}
              <div>
                <Button
                  variant="secondary"
                  onClick={() => toggleLoading('overlay')}
                  className="w-full"
                >
                  <Icon name="Loader" size="sm" className="mr-2" aria-hidden />
                  Show Overlay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Spinner (conditionally rendered) */}
      {loadingStates.overlay && (
        <div onClick={() => toggleLoading('overlay')} className="cursor-pointer">
          <Spinner
            overlay
            backdrop="blur"
            size="xl"
            aria-label="Loading application data - click to close"
          />
        </div>
      )}

    </div>
  )
}

HomePage.displayName = 'HomePage'