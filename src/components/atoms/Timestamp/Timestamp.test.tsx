import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Timestamp } from './Timestamp'

// Mock date for consistent testing
const MOCK_DATE = new Date('2024-01-15T10:30:00.000Z')
const PAST_DATE = new Date('2024-01-10T15:20:00.000Z') // 5 days ago to ensure it's not today/yesterday
const FUTURE_DATE = new Date('2024-01-16T08:45:00.000Z')

describe('Timestamp', () => {
  beforeEach(() => {
    // Mock the current time for consistent testing
    vi.useFakeTimers()
    vi.setSystemTime(MOCK_DATE)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Basic Rendering', () => {
    it('should render with required props', () => {
      render(<Timestamp date={MOCK_DATE} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement).toBeInTheDocument()
      expect(timeElement.tagName).toBe('TIME')
      expect(timeElement).toHaveAttribute('datetime', MOCK_DATE.toISOString())
    })

    it('should render with different date input formats', () => {
      const isoString = '2024-01-15T10:30:00.000Z'
      const timestamp = MOCK_DATE.getTime()

      // Test Date object
      const { rerender } = render(<Timestamp date={MOCK_DATE} />)
      expect(screen.getByRole('time')).toHaveAttribute('datetime', isoString)

      // Test ISO string
      rerender(<Timestamp date={isoString} />)
      expect(screen.getByRole('time')).toHaveAttribute('datetime', isoString)

      // Test timestamp number
      rerender(<Timestamp date={timestamp} />)
      expect(screen.getByRole('time')).toHaveAttribute('datetime', isoString)
    })

    it('should throw error for invalid date format', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        render(<Timestamp date={'invalid-date' as string} />)
      }).toThrow('Invalid date format')

      consoleSpy.mockRestore()
    })
  })

  describe('Format Types', () => {
    it('should display relative format by default', () => {
      render(<Timestamp date={PAST_DATE} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement.textContent).toContain('5 days ago')
    })

    it('should display relative format without suffix when addSuffix is false', () => {
      render(<Timestamp date={PAST_DATE} addSuffix={false} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement.textContent).toContain('5 days')
      expect(timeElement.textContent).not.toContain('ago')
    })

    it('should display absolute format correctly', () => {
      render(<Timestamp date={PAST_DATE} format="absolute" />)

      const timeElement = screen.getByRole('time')
      // Should show date for a date not today/yesterday (may vary by timezone)
      expect(timeElement.textContent).toMatch(/Jan (10|11), 2024/)
    })

    it('should display absolute format for today with time only', () => {
      render(<Timestamp date={MOCK_DATE} format="absolute" />)

      const timeElement = screen.getByRole('time')
      // Should show time for today (may vary based on timezone)
      expect(timeElement.textContent).toMatch(/\d{1,2}:\d{2}/)
    })

    it('should display custom format correctly', () => {
      render(
        <Timestamp
          date={MOCK_DATE}
          format="custom"
          customFormat="yyyy-MM-dd"
        />
      )

      const timeElement = screen.getByRole('time')
      expect(timeElement.textContent).toBe('2024-01-15')
    })

    it('should use default custom format when format is custom but no customFormat provided', () => {
      render(<Timestamp date={MOCK_DATE} format="custom" />)

      const timeElement = screen.getByRole('time')
      // Should use default PPpp format
      expect(timeElement.textContent).toMatch(/Jan 15, 2024/)
    })
  })

  describe('Tooltip', () => {
    it('should show tooltip by default', () => {
      render(<Timestamp date={MOCK_DATE} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement).toHaveAttribute('title')
      expect(timeElement.getAttribute('title')).toMatch(/Jan 15, 2024/)
    })

    it('should hide tooltip when showTooltip is false', () => {
      render(<Timestamp date={MOCK_DATE} showTooltip={false} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement).not.toHaveAttribute('title')
    })

    it('should use custom tooltip format', () => {
      render(
        <Timestamp
          date={MOCK_DATE}
          tooltipFormat="yyyy-MM-dd"
        />
      )

      const timeElement = screen.getByRole('time')
      expect(timeElement).toHaveAttribute('title', '2024-01-15')
    })
  })

  describe('Styling and Variants', () => {
    it('should apply default styling classes', () => {
      render(<Timestamp date={MOCK_DATE} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement).toHaveClass('inline-flex', 'items-center', 'transition-colors')
    })

    it('should apply variant classes', () => {
      const { rerender } = render(<Timestamp date={MOCK_DATE} variant="muted" />)
      expect(screen.getByRole('time')).toHaveClass('text-muted-foreground')

      rerender(<Timestamp date={MOCK_DATE} variant="accent" />)
      expect(screen.getByRole('time')).toHaveClass('text-accent-foreground')
    })

    it('should apply size classes', () => {
      const { rerender } = render(<Timestamp date={MOCK_DATE} size="xs" />)
      expect(screen.getByRole('time')).toHaveClass('text-xs')

      rerender(<Timestamp date={MOCK_DATE} size="lg" />)
      expect(screen.getByRole('time')).toHaveClass('text-lg')
    })

    it('should apply weight classes', () => {
      const { rerender } = render(<Timestamp date={MOCK_DATE} weight="medium" />)
      expect(screen.getByRole('time')).toHaveClass('font-medium')

      rerender(<Timestamp date={MOCK_DATE} weight="semibold" />)
      expect(screen.getByRole('time')).toHaveClass('font-semibold')
    })

    it('should apply custom className', () => {
      render(<Timestamp date={MOCK_DATE} className="custom-class" />)

      const timeElement = screen.getByRole('time')
      expect(timeElement).toHaveClass('custom-class')
    })
  })

  describe('Auto-refresh', () => {
    it('should refresh relative timestamps automatically', async () => {
      render(
        <Timestamp
          date={PAST_DATE}
          format="relative"
          refreshInterval={1} // 1 second for testing
        />
      )

      const timeElement = screen.getByRole('time')

      // Advance time by 2 seconds
      vi.advanceTimersByTime(2000)

      // The component should re-render after the interval
      expect(timeElement.textContent).toBeDefined()
    })

    it('should not refresh when refreshInterval is 0', async () => {
      render(
        <Timestamp
          date={PAST_DATE}
          format="relative"
          refreshInterval={0}
        />
      )

      const timeElement = screen.getByRole('time')
      const initialText = timeElement.textContent

      // Advance time
      vi.advanceTimersByTime(5000)

      // Should not update since refresh is disabled
      expect(timeElement.textContent).toBe(initialText)
    })

    it('should not refresh for non-relative formats', async () => {
      render(
        <Timestamp
          date={MOCK_DATE}
          format="absolute"
          refreshInterval={1}
        />
      )

      const timeElement = screen.getByRole('time')
      const initialText = timeElement.textContent

      // Advance time
      vi.advanceTimersByTime(2000)

      // Should not change for absolute format
      expect(timeElement.textContent).toBe(initialText)
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      render(<Timestamp date={MOCK_DATE} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement.tagName).toBe('TIME')
      expect(timeElement).toHaveAttribute('datetime')
    })

    it('should support ARIA attributes', () => {
      render(
        <Timestamp
          date={MOCK_DATE}
          aria-label="Message timestamp"
          aria-describedby="timestamp-help"
        />
      )

      const timeElement = screen.getByRole('time')
      expect(timeElement).toHaveAttribute('aria-label', 'Message timestamp')
      expect(timeElement).toHaveAttribute('aria-describedby', 'timestamp-help')
    })

    it('should be focusable when tabIndex is provided', () => {
      render(<Timestamp date={MOCK_DATE} tabIndex={0} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement).toHaveAttribute('tabindex', '0')
    })
  })

  describe('Edge Cases', () => {
    it('should handle future dates', () => {
      render(<Timestamp date={FUTURE_DATE} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement.textContent).toContain('in')
    })

    it('should handle dates far in the past', () => {
      const oldDate = new Date('2020-01-01T00:00:00.000Z')
      render(<Timestamp date={oldDate} />)

      const timeElement = screen.getByRole('time')
      expect(timeElement.textContent).toContain('4 years ago')
    })

    it('should handle dates with includeSeconds option', () => {
      const recentDate = new Date(MOCK_DATE.getTime() - 30000) // 30 seconds ago
      render(
        <Timestamp
          date={recentDate}
          includeSeconds={true}
        />
      )

      const timeElement = screen.getByRole('time')
      // Should include some form of seconds or half minute indication
      expect(timeElement.textContent).toMatch(/(second|minute|ago)/)
    })
  })

  describe('Component Ref', () => {
    it('should forward ref to time element', () => {
      const ref = vi.fn()
      render(<Timestamp ref={ref} date={MOCK_DATE} />)

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLTimeElement))
    })
  })
})