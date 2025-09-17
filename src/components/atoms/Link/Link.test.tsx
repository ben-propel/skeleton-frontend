import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { Link } from './Link'

// Mock window.location for external URL detection
const mockLocation = {
  origin: 'http://localhost:3000',
}

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

// Helper to render Link with Router context
const renderWithRouter = (ui: React.ReactElement): ReturnType<typeof render> => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Link', () => {
  describe('Internal Navigation', () => {
    it('should render internal link with React Router', () => {
      renderWithRouter(<Link to="/dashboard">Dashboard</Link>)
      const link = screen.getByRole('link', { name: 'Dashboard' })

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/dashboard')
    })

    it('should handle click events for internal links', () => {
      const handleClick = vi.fn()
      renderWithRouter(<Link to="/dashboard" onClick={handleClick}>Dashboard</Link>)

      const link = screen.getByRole('link')
      fireEvent.click(link)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should prevent navigation when disabled', () => {
      const handleClick = vi.fn()
      renderWithRouter(<Link to="/dashboard" disabled onClick={handleClick}>Dashboard</Link>)

      const link = screen.getByRole('link')
      fireEvent.click(link)

      expect(handleClick).not.toHaveBeenCalled()
      expect(link).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('External Links', () => {
    it('should render external link with proper attributes', () => {
      render(<Link href="https://example.com">External Site</Link>)
      const link = screen.getByRole('link', { name: 'External Site' })

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should show external icon for external URLs by default', () => {
      render(<Link href="https://example.com">External Site</Link>)

      // Look for the external link icon (svg element)
      const icon = screen.getByRole('link').querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should hide external icon when showExternalIcon is false', () => {
      render(<Link href="https://example.com" showExternalIcon={false}>External Site</Link>)

      const icon = screen.getByRole('link').querySelector('svg')
      expect(icon).not.toBeInTheDocument()
    })

    it('should force show external icon for internal URLs when showExternalIcon is true', () => {
      render(<Link href="/internal" showExternalIcon>Internal with Icon</Link>)

      const icon = screen.getByRole('link').querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should handle custom target and rel attributes', () => {
      render(
        <Link href="https://example.com" target="_self" rel="nofollow">
          Custom Attributes
        </Link>
      )
      const link = screen.getByRole('link')

      expect(link).toHaveAttribute('target', '_self')
      expect(link).toHaveAttribute('rel', 'nofollow')
    })

    it('should prevent navigation when disabled', () => {
      render(<Link href="https://example.com" disabled>Disabled External</Link>)
      const link = screen.getByText('Disabled External')

      expect(link).not.toHaveAttribute('href')
      expect(link).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Variants', () => {
    it('should apply default variant classes', () => {
      render(<Link href="/test">Default Link</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('text-primary-600')
    })

    it('should apply subtle variant classes', () => {
      render(<Link href="/test" variant="subtle">Subtle Link</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('text-secondary-600')
    })

    it('should apply contrast variant classes', () => {
      render(<Link href="/test" variant="contrast">Contrast Link</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('text-secondary-900')
    })
  })

  describe('Underline Variants', () => {
    it('should apply hover underline by default', () => {
      render(<Link href="/test">Default Underline</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('hover:underline')
      expect(link).not.toHaveClass('underline')
    })

    it('should apply always underline', () => {
      render(<Link href="/test" underline="always">Always Underline</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('underline')
    })

    it('should apply no underline', () => {
      render(<Link href="/test" underline="none">No Underline</Link>)
      const link = screen.getByRole('link')

      expect(link).not.toHaveClass('underline')
      expect(link).not.toHaveClass('hover:underline')
    })
  })

  describe('Sizes', () => {
    it('should apply medium size by default', () => {
      render(<Link href="/test">Medium Link</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('text-base')
    })

    it('should apply small size', () => {
      render(<Link href="/test" size="sm">Small Link</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('text-sm')
    })

    it('should apply large size', () => {
      render(<Link href="/test" size="lg">Large Link</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('text-lg')
    })
  })

  describe('Disabled State', () => {
    it('should apply disabled classes', () => {
      render(<Link href="/test" disabled>Disabled Link</Link>)
      const link = screen.getByText('Disabled Link')

      expect(link).toHaveClass('disabled:opacity-50', 'disabled:pointer-events-none')
      expect(link).toHaveAttribute('aria-disabled', 'true')
    })

    it('should not show external icon when disabled', () => {
      render(<Link href="https://example.com" disabled>Disabled External</Link>)

      const link = screen.getByText('Disabled External')
      const icon = link.querySelector('svg')
      expect(icon).not.toBeInTheDocument()
    })
  })

  describe('Custom Styling', () => {
    it('should merge custom className', () => {
      render(<Link href="/test" className="custom-class">Custom Link</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('custom-class')
      expect(link).toHaveClass('text-primary-600') // Should keep default classes
    })
  })

  describe('Accessibility', () => {
    it('should have proper focus ring', () => {
      render(<Link href="/test">Accessible Link</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveClass('focus-ring')
    })

    it('should hide external icon from screen readers', () => {
      render(<Link href="https://example.com">External Link</Link>)

      const icon = screen.getByRole('link').querySelector('svg')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('URL Detection', () => {
    it('should detect external URLs correctly', () => {
      render(<Link href="https://google.com">Google</Link>)
      const link = screen.getByRole('link')

      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should treat relative URLs as internal', () => {
      render(<Link href="/internal-path">Internal</Link>)
      const link = screen.getByRole('link')

      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    })

    it('should handle malformed URLs gracefully', () => {
      render(<Link href="not-a-valid-url">Invalid URL</Link>)
      const link = screen.getByRole('link')

      // Should treat as internal link (no target/rel)
      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    })
  })

  describe('Fallback Behavior', () => {
    it('should render as span when no valid props provided', () => {
      // This tests the fallback case, though in practice this shouldn't happen due to TypeScript
      const { container } = render(<Link href="">Invalid Link</Link>)
      const span = container.querySelector('span')

      expect(span).toBeInTheDocument()
      expect(span).toHaveTextContent('Invalid Link')
    })
  })
})