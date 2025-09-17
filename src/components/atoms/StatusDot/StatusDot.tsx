import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusDotVariants = cva(
  'inline-block rounded-full border-2 border-white shadow-sm',
  {
    variants: {
      status: {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        busy: 'bg-red-500',
        away: 'bg-yellow-500',
        error: 'bg-destructive',
      },
      size: {
        sm: 'h-2 w-2', // 8px
        md: 'h-3 w-3', // 12px
        lg: 'h-4 w-4', // 16px
      },
      position: {
        relative: 'relative',
        absolute: 'absolute',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      status: 'offline',
      size: 'md',
      position: 'relative',
      pulse: false,
    },
    compoundVariants: [
      // Pulsing variants for active states
      {
        status: 'online',
        pulse: true,
        className: 'animate-ping',
      },
      {
        status: 'busy',
        pulse: true,
        className: 'animate-ping',
      },
      {
        status: 'error',
        pulse: true,
        className: 'animate-ping',
      },
    ],
  }
);

export interface StatusDotProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof statusDotVariants> {
  /**
   * Custom background color to override status variants
   */
  customColor?: string;
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
  /**
   * Position relative to parent when using absolute positioning
   */
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * StatusDot component for indicating online/offline states and other binary statuses
 *
 * @component
 * @example
 * ```tsx
 * // Basic status dot
 * <StatusDot status="online" size="md" />
 *
 * // Pulsing online indicator
 * <StatusDot status="online" pulse size="lg" aria-label="User is online" />
 *
 * // Busy status with custom positioning
 * <StatusDot status="busy" position="absolute" placement="top-right" />
 *
 * // Custom color
 * <StatusDot customColor="#8b5cf6" size="lg" />
 *
 * // Error state with pulsing animation
 * <StatusDot status="error" pulse aria-label="Connection error" />
 * ```
 */
export const StatusDot = forwardRef<HTMLDivElement, StatusDotProps>(
  (
    {
      status,
      size,
      position,
      pulse,
      customColor,
      placement,
      className,
      style,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Generate placement classes for absolute positioning
    const getPlacementClasses = (placement?: string): string => {
      if (position !== 'absolute' || !placement) return '';

      switch (placement) {
        case 'top-right':
          return 'top-0 right-0 transform translate-x-1/2 -translate-y-1/2';
        case 'top-left':
          return 'top-0 left-0 transform -translate-x-1/2 -translate-y-1/2';
        case 'bottom-right':
          return 'bottom-0 right-0 transform translate-x-1/2 translate-y-1/2';
        case 'bottom-left':
          return 'bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2';
        default:
          return '';
      }
    };

    // Generate status label for accessibility
    const getStatusLabel = (status?: string | null): string => {
      if (ariaLabel) return ariaLabel;

      switch (status) {
        case 'online':
          return 'Online';
        case 'offline':
          return 'Offline';
        case 'busy':
          return 'Busy';
        case 'away':
          return 'Away';
        case 'error':
          return 'Error';
        default:
          return 'Status';
      }
    };

    // Create custom style with custom color override
    const customStyle = customColor
      ? { ...style, backgroundColor: customColor }
      : style;

    const placementClasses = getPlacementClasses(placement);
    const statusLabel = getStatusLabel(status);

    return (
      <div
        ref={ref}
        className={cn(
          statusDotVariants({ status, size, position, pulse }),
          placementClasses,
          className
        )}
        style={customStyle}
        role="status"
        aria-label={statusLabel}
        title={statusLabel}
        {...props}
      >
        <span className="sr-only">{statusLabel}</span>
      </div>
    );
  }
);

StatusDot.displayName = 'StatusDot';