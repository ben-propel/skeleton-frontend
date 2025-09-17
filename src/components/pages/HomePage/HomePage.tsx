import React from 'react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { Link } from '@/components/atoms/Link'
import { Spinner } from '@/components/atoms/Spinner'
import { Timestamp } from '@/components/atoms/Timestamp'
import { StatusDot } from '@/components/atoms/StatusDot'
import { MessageBubble } from '@/components/molecules/MessageBubble'

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

      {/* StatusDot Component Demo Section */}
      <div className="mt-16 rounded-lg bg-orange-50 p-8">
        <Text variant="h2" className="mb-8 text-center">
          Status Dot Component Examples
        </Text>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Status Types & Sizes */}
          <div>
            <Text variant="h4" className="mb-4">Status Types & Sizes</Text>
            <div className="space-y-4">
              {/* Status Types */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Status Types</Text>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <StatusDot status="online" aria-label="User is online" />
                    <Text size="sm">Online</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status="offline" aria-label="User is offline" />
                    <Text size="sm">Offline</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status="busy" aria-label="User is busy" />
                    <Text size="sm">Busy</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status="away" aria-label="User is away" />
                    <Text size="sm">Away</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status="error" aria-label="Error status" />
                    <Text size="sm">Error</Text>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Size Variants</Text>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <StatusDot status="online" size="sm" aria-label="Small online indicator" />
                    <Text size="sm">Small</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status="online" size="md" aria-label="Medium online indicator" />
                    <Text size="sm">Medium</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status="online" size="lg" aria-label="Large online indicator" />
                    <Text size="sm">Large</Text>
                  </div>
                </div>
              </div>

              {/* Pulsing Animation */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Pulsing Animation</Text>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <StatusDot status="online" pulse aria-label="Pulsing online indicator" />
                    <Text size="sm">Online (pulsing)</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status="busy" pulse aria-label="Pulsing busy indicator" />
                    <Text size="sm">Busy (pulsing)</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status="error" pulse size="lg" aria-label="Pulsing error indicator" />
                    <Text size="sm">Error (pulsing)</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Colors & Positioning */}
          <div>
            <Text variant="h4" className="mb-4">Custom Colors & Positioning</Text>
            <div className="space-y-4">
              {/* Custom Colors */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Custom Colors</Text>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <StatusDot customColor="#8b5cf6" size="md" aria-label="Purple custom status" />
                    <Text size="sm">Purple</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot customColor="#f59e0b" size="md" aria-label="Orange custom status" />
                    <Text size="sm">Orange</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot customColor="#06b6d4" size="md" aria-label="Cyan custom status" />
                    <Text size="sm">Cyan</Text>
                  </div>
                </div>
              </div>

              {/* Positioning Examples */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Absolute Positioning</Text>
                <div className="grid grid-cols-2 gap-4">
                  {/* Profile with status - top right */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <Text size="sm" weight="bold" className="text-white">JD</Text>
                    </div>
                    <StatusDot
                      status="online"
                      position="absolute"
                      placement="top-right"
                      aria-label="John Doe is online"
                    />
                  </div>

                  {/* Profile with status - bottom right */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                      <Text size="sm" weight="bold" className="text-white">SM</Text>
                    </div>
                    <StatusDot
                      status="busy"
                      position="absolute"
                      placement="bottom-right"
                      aria-label="Sarah Miller is busy"
                    />
                  </div>

                  {/* Profile with status - top left */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
                      <Text size="sm" weight="bold" className="text-white">AK</Text>
                    </div>
                    <StatusDot
                      status="away"
                      position="absolute"
                      placement="top-left"
                      aria-label="Alex Kim is away"
                    />
                  </div>

                  {/* Profile with status - bottom left */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center">
                      <Text size="sm" weight="bold" className="text-white">LJ</Text>
                    </div>
                    <StatusDot
                      status="offline"
                      position="absolute"
                      placement="bottom-left"
                      aria-label="Lisa Johnson is offline"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div>
            <Text variant="h4" className="mb-4">Real-world Use Cases</Text>
            <div className="space-y-4">
              {/* User List */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">User List</Text>
                <div className="space-y-2">
                  {[
                    { name: 'John Doe', status: 'online', time: '2 min ago' },
                    { name: 'Sarah Miller', status: 'busy', time: '5 min ago' },
                    { name: 'Alex Kim', status: 'away', time: '1 hour ago' },
                    { name: 'Lisa Johnson', status: 'offline', time: '2 hours ago' }
                  ].map((user) => (
                    <div key={user.name} className="flex items-center gap-3 rounded border border-orange-200 bg-white p-2">
                      <div className="relative">
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <Text size="xs" weight="bold">{user.name.split(' ').map(n => n[0]).join('')}</Text>
                        </div>
                        <StatusDot
                          status={user.status as 'online' | 'busy' | 'away' | 'offline'}
                          position="absolute"
                          placement="bottom-right"
                          size="sm"
                          aria-label={`${user.name} is ${user.status}`}
                        />
                      </div>
                      <div className="flex-1">
                        <Text size="sm" weight="medium">{user.name}</Text>
                        <Text size="xs" color="muted">Last seen {user.time}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">System Status</Text>
                <div className="space-y-2">
                  {[
                    { service: 'API Server', status: 'online', uptime: '99.9%' },
                    { service: 'Database', status: 'online', uptime: '99.8%' },
                    { service: 'File Storage', status: 'error', uptime: '97.1%' },
                    { service: 'CDN', status: 'away', uptime: '98.5%' }
                  ].map((service) => (
                    <div key={service.service} className="flex items-center justify-between rounded border border-orange-200 bg-white p-2">
                      <div className="flex items-center gap-2">
                        <StatusDot
                          status={service.status as 'online' | 'error' | 'away'}
                          pulse={service.status === 'error'}
                          aria-label={`${service.service} status: ${service.status}`}
                        />
                        <Text size="sm" weight="medium">{service.service}</Text>
                      </div>
                      <Text size="xs" color="muted">{service.uptime}</Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection Status */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Connection Status</Text>
                <div className="rounded border border-orange-200 bg-white p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusDot status="online" pulse aria-label="Connection is active" />
                    <Text size="sm" weight="medium">Connected to server</Text>
                  </div>
                  <Text size="xs" color="muted">
                    Last heartbeat: 2 seconds ago
                  </Text>
                  <Text size="xs" color="muted">
                    Latency: 45ms
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Notice */}
        <div className="mt-8 rounded-lg bg-orange-100 p-4">
          <Text variant="h5" className="mb-2">✨ StatusDot Features</Text>
          <Text size="sm" color="muted">
            • <strong>Multiple status types:</strong> Online, offline, busy, away, error states
            • <strong>Flexible sizing:</strong> Small, medium, and large size options
            • <strong>Pulsing animation:</strong> Eye-catching animations for active states
            • <strong>Custom colors:</strong> Override with any color for custom status types
            • <strong>Absolute positioning:</strong> Perfect for profile pictures and icons
            • <strong>Accessibility:</strong> ARIA labels and semantic HTML structure
            • <strong>CVA variants:</strong> Type-safe styling with class-variance-authority
            • <strong>Compound variants:</strong> Smart animation combinations
          </Text>
        </div>
      </div>

      {/* Message Bubble Component Demo Section */}
      <div className="mt-16 rounded-lg bg-blue-50 p-8">
        <Text variant="h2" className="mb-8 text-center">
          Message Bubble Component Examples
        </Text>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Message Shapes */}
          <div>
            <Text variant="h4" className="mb-4">Message Shapes</Text>
            <div className="space-y-4">
              {/* Shape Examples */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Rounded (Default)</Text>
                <div className="space-y-2">
                  <MessageBubble
                    content="Rounded corners"
                    variant="sent"
                    shape="rounded"
                    showTimestamp={false}
                  />
                  <MessageBubble
                    content="Classic style"
                    variant="received"
                    shape="rounded"
                    author={{ id: '1', name: 'User' }}
                    showAuthor={false}
                    showTimestamp={false}
                  />
                </div>
              </div>


              <div>
                <Text variant="h5" size="sm" className="mb-2">Square</Text>
                <div className="space-y-2">
                  <MessageBubble
                    content="Sharp corners"
                    variant="sent"
                    shape="square"
                    showTimestamp={false}
                  />
                  <MessageBubble
                    content="Modern look"
                    variant="received"
                    shape="square"
                    author={{ id: '1', name: 'User' }}
                    showAuthor={false}
                    showTimestamp={false}
                  />
                </div>
              </div>

              <div>
                <Text variant="h5" size="sm" className="mb-2">Pill</Text>
                <div className="space-y-2">
                  <MessageBubble
                    content="Fully rounded"
                    variant="sent"
                    shape="pill"
                    showTimestamp={false}
                  />
                  <MessageBubble
                    content="Smooth style"
                    variant="received"
                    shape="pill"
                    author={{ id: '1', name: 'User' }}
                    showAuthor={false}
                    showTimestamp={false}
                  />
                </div>
              </div>

              <div>
                <Text variant="h5" size="sm" className="mb-2">System Shape</Text>
                <MessageBubble
                  content="System messages work with all shapes"
                  variant="system"
                  shape="rounded"
                  showTimestamp={false}
                />
              </div>
            </div>
          </div>

          {/* Message Variants */}
          <div>
            <Text variant="h4" className="mb-4">Message Variants</Text>
            <div className="space-y-4">
              {/* Sent Messages */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Sent Messages</Text>
                <div className="space-y-3">
                  <MessageBubble
                    content="Hey! How are you doing?"
                    variant="sent"
                    timestamp={new Date(Date.now() - 2 * 60 * 1000)}
                    status="delivered"
                    showTimestamp
                  />
                  <MessageBubble
                    content="Just finished working on the new MessageBubble component 🎉"
                    variant="sent"
                    timestamp={new Date(Date.now() - 5 * 60 * 1000)}
                    status="read"
                    reactions={[
                      {
                        emoji: '🎉',
                        count: 2,
                        users: [],
                        currentUserReacted: false
                      },
                      {
                        emoji: '👍',
                        count: 1,
                        users: [],
                        currentUserReacted: true
                      }
                    ]}
                    onReact={(emoji) => console.log('Reacted with:', emoji)}
                  />
                </div>
              </div>

              {/* Received Messages */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Received Messages</Text>
                <div className="space-y-3">
                  <MessageBubble
                    content="That looks amazing! Great work on the component design."
                    variant="received"
                    author={{
                      id: '2',
                      name: 'Sarah Miller',
                      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
                    }}
                    timestamp={new Date(Date.now() - 3 * 60 * 1000)}
                    showAuthor
                    showTimestamp
                  />
                  <MessageBubble
                    content="Can't wait to use this in our chat interface!"
                    variant="received"
                    author={{
                      id: '3',
                      name: 'Alex Kim',
                      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
                    }}
                    timestamp={new Date(Date.now() - 1 * 60 * 1000)}
                    showAuthor
                    showTimestamp
                    reactions={[
                      {
                        emoji: '🚀',
                        count: 3,
                        users: [],
                        currentUserReacted: true
                      }
                    ]}
                    onReact={(emoji) => console.log('Reacted with:', emoji)}
                  />
                </div>
              </div>

              {/* System Messages */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">System Messages</Text>
                <div className="space-y-3">
                  <MessageBubble
                    content="Sarah Miller joined the conversation"
                    variant="system"
                    timestamp={new Date(Date.now() - 10 * 60 * 1000)}
                    showTimestamp
                  />
                  <MessageBubble
                    content="Channel topic updated: 'MessageBubble Component Development'"
                    variant="system"
                    timestamp={new Date(Date.now() - 8 * 60 * 1000)}
                    showTimestamp
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Message States */}
          <div>
            <Text variant="h4" className="mb-4">Message States & Features</Text>
            <div className="space-y-4">
              {/* Status Indicators */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Status Indicators</Text>
                <div className="space-y-3">
                  <MessageBubble
                    content="Sending message..."
                    variant="sent"
                    status="sending"
                    timestamp={new Date()}
                    showTimestamp
                  />
                  <MessageBubble
                    content="Message sent"
                    variant="sent"
                    status="sent"
                    timestamp={new Date(Date.now() - 1 * 60 * 1000)}
                    showTimestamp
                  />
                  <MessageBubble
                    content="Message delivered"
                    variant="sent"
                    status="delivered"
                    timestamp={new Date(Date.now() - 3 * 60 * 1000)}
                    showTimestamp
                  />
                  <MessageBubble
                    content="Message read"
                    variant="sent"
                    status="read"
                    timestamp={new Date(Date.now() - 5 * 60 * 1000)}
                    showTimestamp
                  />
                  <MessageBubble
                    content="Failed to send"
                    variant="sent"
                    status="failed"
                    timestamp={new Date(Date.now() - 2 * 60 * 1000)}
                    showTimestamp
                    onRetry={() => console.log('Retrying message...')}
                  />
                </div>
              </div>

              {/* Rich Content */}
              <div>
                <Text variant="h5" size="sm" className="mb-2">Rich Content</Text>
                <div className="space-y-3">
                  <MessageBubble
                    content={
                      <div>
                        <Text size="sm" className="mb-2">Check out this cool feature!</Text>
                        <div className="rounded bg-gray-100 p-2">
                          <Text size="xs" color="muted" font="mono">
                            const message = &quot;Hello World&quot;
                          </Text>
                        </div>
                      </div>
                    }
                    variant="sent"
                    timestamp={new Date(Date.now() - 4 * 60 * 1000)}
                    status="delivered"
                    showTimestamp
                  />
                  <MessageBubble
                    content={
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="FileText" size="sm" />
                          <Text size="sm" weight="medium">Design_Mockup_v2.pdf</Text>
                        </div>
                        <Text size="xs" color="muted">2.3 MB • PDF Document</Text>
                      </div>
                    }
                    variant="received"
                    author={{
                      id: '4',
                      name: 'Design Team',
                      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=32&h=32&fit=crop&crop=face'
                    }}
                    timestamp={new Date(Date.now() - 6 * 60 * 1000)}
                    showAuthor
                    showTimestamp
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Real-world Chat Interface */}
          <div>
            <Text variant="h4" className="mb-4">Chat Interface Demo</Text>
            <div className="rounded-lg border border-blue-200 bg-white p-4 max-h-80 overflow-y-auto">
              <div className="space-y-4">
                <MessageBubble
                  content="Team standup starts in 10 minutes!"
                  variant="system"
                  timestamp={new Date(Date.now() - 30 * 60 * 1000)}
                  showTimestamp
                />

                <MessageBubble
                  content="Good morning everyone! 👋"
                  variant="received"
                  author={{
                    id: '5',
                    name: 'Team Lead',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
                  }}
                  timestamp={new Date(Date.now() - 25 * 60 * 1000)}
                  showAuthor
                  showTimestamp
                  reactions={[
                    {
                      emoji: '👋',
                      count: 4,
                      users: [],
                      currentUserReacted: true
                    }
                  ]}
                  onReact={(emoji) => console.log('Reacted with:', emoji)}
                />

                <MessageBubble
                  content="Ready for the demo!"
                  variant="sent"
                  timestamp={new Date(Date.now() - 22 * 60 * 1000)}
                  status="read"
                  showTimestamp
                />

                <MessageBubble
                  content="The MessageBubble component is looking great. Love the accessibility features and the clean API design."
                  variant="received"
                  author={{
                    id: '6',
                    name: 'Frontend Dev',
                    avatar: 'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=32&h=32&fit=crop&crop=face'
                  }}
                  timestamp={new Date(Date.now() - 20 * 60 * 1000)}
                  showAuthor
                  showTimestamp
                  reactions={[
                    {
                      emoji: '💯',
                      count: 2,
                      users: [],
                      currentUserReacted: false
                    },
                    {
                      emoji: '🎨',
                      count: 1,
                      users: [],
                      currentUserReacted: true
                    }
                  ]}
                  onReact={(emoji) => console.log('Reacted with:', emoji)}
                />

                <MessageBubble
                  content="Thanks! The shadcn/ui integration makes it really flexible and the TypeScript types ensure type safety throughout."
                  variant="sent"
                  timestamp={new Date(Date.now() - 18 * 60 * 1000)}
                  status="delivered"
                  showTimestamp
                />

                <MessageBubble
                  content="Should we add support for message threading in v2?"
                  variant="received"
                  author={{
                    id: '7',
                    name: 'Product Manager',
                    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
                  }}
                  timestamp={new Date(Date.now() - 15 * 60 * 1000)}
                  showAuthor
                  showTimestamp
                />

                <MessageBubble
                  content="Great idea! We can extend the component with thread support while maintaining backward compatibility."
                  variant="sent"
                  timestamp={new Date(Date.now() - 12 * 60 * 1000)}
                  status="read"
                  showTimestamp
                />

                <MessageBubble
                  content="Perfect! I'll add that to the roadmap. 📋"
                  variant="received"
                  author={{
                    id: '7',
                    name: 'Product Manager',
                    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
                  }}
                  timestamp={new Date(Date.now() - 10 * 60 * 1000)}
                  showAuthor={false}
                  showTimestamp
                />

                <MessageBubble
                  content="Alex Kim is typing..."
                  variant="system"
                  timestamp={new Date(Date.now() - 5 * 1000)}
                  showTimestamp
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Notice */}
        <div className="mt-8 rounded-lg bg-blue-100 p-4">
          <Text variant="h5" className="mb-2">✨ MessageBubble Features</Text>
          <Text size="sm" color="muted">
            • <strong>Message variants:</strong> Sent, received, and system message types
            • <strong>Shape variants:</strong> Rounded, square, and pill shapes
            • <strong>Status indicators:</strong> Sending, sent, delivered, read, and failed states
            • <strong>Rich content support:</strong> Text, React nodes, images, files, and custom content
            • <strong>Emoji reactions:</strong> Interactive reactions with user tracking
            • <strong>Author information:</strong> User avatars, names, and metadata
            • <strong>Timestamp formatting:</strong> Relative time with auto-refresh using date-fns
            • <strong>Retry functionality:</strong> Built-in retry for failed messages
            • <strong>Responsive design:</strong> Mobile-first with adaptive layouts
            • <strong>Accessibility:</strong> ARIA labels, semantic HTML, and screen reader support
            • <strong>shadcn/ui integration:</strong> Built with Card, Avatar, Badge, and Button primitives
            • <strong>TypeScript support:</strong> Full type safety with comprehensive interfaces
            • <strong>Animation:</strong> Smooth enter animations and status transitions
          </Text>
        </div>
      </div>

    </div>
  )
}

HomePage.displayName = 'HomePage'