import React, { useState, useEffect, useCallback, forwardRef } from 'react'
import { format, formatDistance, isToday, isYesterday, parseISO } from 'date-fns'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const timestampVariants = cva(
  'inline-flex items-center transition-colors cursor-default',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        subtle: 'text-secondary-foreground',
        accent: 'text-accent-foreground',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      weight: 'normal',
    },
  }
)

export interface TimestampProps
  extends Omit<React.TimeHTMLAttributes<HTMLTimeElement>, 'dateTime'>,
    VariantProps<typeof timestampVariants> {
  /**
   * The date to display - can be Date object, ISO string, or timestamp number
   */
  date: Date | string | number
  /**
   * Format type for displaying the timestamp
   */
  format?: 'relative' | 'absolute' | 'custom'
  /**
   * Custom format string when format is 'custom' (uses date-fns format tokens)
   * @example 'PPP' for "April 29th, 2023", 'PPpp' for "Apr 29, 2023, 2:30 PM"
   */
  customFormat?: string
  /**
   * Whether to show a tooltip with full timestamp on hover
   */
  showTooltip?: boolean
  /**
   * Custom tooltip format (defaults to full date and time)
   */
  tooltipFormat?: string
  /**
   * Auto-refresh interval for relative timestamps in seconds
   * Set to 0 to disable auto-refresh
   */
  refreshInterval?: number
  /**
   * Locale for date formatting (ISO 639-1 language code)
   * Note: Full locale support requires importing locale objects from date-fns/locale
   */
  _locale?: string
  /**
   * Timezone for date display (IANA timezone identifier)
   * Note: Basic timezone display only - for advanced timezone handling, use date-fns-tz
   */
  _timezone?: string
  /**
   * Add suffix for relative format (e.g., "ago", "in")
   */
  addSuffix?: boolean
  /**
   * Include seconds in relative format when difference is less than a minute
   */
  includeSeconds?: boolean
  /**
   * Custom className for styling
   */
  className?: string
}

/**
 * Timestamp component for consistent time and date formatting
 *
 * @component
 * @example
 * ```tsx
 * // Relative time (updates automatically)
 * <Timestamp date={new Date()} format="relative" />
 *
 * // Absolute time with custom format
 * <Timestamp
 *   date="2023-04-29T14:30:00Z"
 *   format="custom"
 *   customFormat="PPP 'at' p"
 * />
 *
 * // With tooltip and auto-refresh every 30 seconds
 * <Timestamp
 *   date={messageDate}
 *   format="relative"
 *   showTooltip
 *   refreshInterval={30}
 *   addSuffix
 * />
 * ```
 */
export const Timestamp = forwardRef<HTMLTimeElement, TimestampProps>(
  (
    {
      date,
      format: formatType = 'relative',
      customFormat = 'PPpp',
      showTooltip = true,
      tooltipFormat = 'PPpp',
      refreshInterval = 60,
      _locale,
      _timezone,
      addSuffix = true,
      includeSeconds = false,
      variant,
      size,
      weight,
      className,
      ...props
    },
    ref
  ) => {
    // Convert input to Date object
    const parsedDate = React.useMemo(() => {
      if (date instanceof Date) {
        if (isNaN(date.getTime())) throw new Error('Invalid date format')
        return date
      }
      if (typeof date === 'string') {
        const parsed = parseISO(date)
        if (isNaN(parsed.getTime())) throw new Error('Invalid date format')
        return parsed
      }
      if (typeof date === 'number') {
        const parsed = new Date(date)
        if (isNaN(parsed.getTime())) throw new Error('Invalid date format')
        return parsed
      }
      throw new Error('Invalid date format')
    }, [date])

    // State for auto-refreshing relative timestamps
    const [, forceUpdate] = useState({})

    // Force re-render for relative timestamps
    const refresh = useCallback((): void => {
      forceUpdate({})
    }, [])

    // Auto-refresh effect for relative timestamps
    useEffect((): (() => void) | undefined => {
      if (formatType === 'relative' && refreshInterval > 0) {
        const interval = setInterval(refresh, refreshInterval * 1000)
        return () => clearInterval(interval)
      }
      return undefined
    }, [formatType, refreshInterval, refresh])

    // Format the display text based on format type
    const displayText = React.useMemo((): string => {
      const now = new Date()

      switch (formatType) {
        case 'relative':
          // Use formatDistance for relative time
          return formatDistance(parsedDate, now, {
            addSuffix,
            includeSeconds,
            // Note: Full locale support requires importing specific locale objects
          })

        case 'absolute':
          // Use smart absolute formatting
          if (isToday(parsedDate)) {
            return format(parsedDate, 'p') // Time only for today
          } else if (isYesterday(parsedDate)) {
            return `Yesterday at ${format(parsedDate, 'p')}`
          } else {
            return format(parsedDate, 'PP') // Date for older items
          }

        case 'custom':
          return format(parsedDate, customFormat)

        default:
          return format(parsedDate, customFormat)
      }
    }, [parsedDate, formatType, customFormat, addSuffix, includeSeconds])

    // ISO datetime string for the datetime attribute
    const isoDateTime = parsedDate.toISOString()

    // Tooltip text
    const tooltipText = React.useMemo(() => {
      if (!showTooltip) return undefined
      return format(parsedDate, tooltipFormat)
    }, [parsedDate, showTooltip, tooltipFormat])

    return (
      <time
        ref={ref}
        dateTime={isoDateTime}
        title={tooltipText}
        className={cn(timestampVariants({ variant, size, weight }), className)}
        {...props}
      >
        {displayText}
      </time>
    )
  }
)

Timestamp.displayName = 'Timestamp'