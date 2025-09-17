import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva(
  'inline-block border-solid rounded-full animate-spin',
  {
    variants: {
      size: {
        xs: 'h-3 w-3 border-[1px]', // 12px
        sm: 'h-4 w-4 border-[1.5px]', // 16px
        md: 'h-5 w-5 border-2', // 20px
        lg: 'h-6 w-6 border-2', // 24px
        xl: 'h-8 w-8 border-[3px]', // 32px
      },
      variant: {
        spin: 'border-t-transparent',
        pulse: 'animate-pulse border-2 border-current',
        dots: 'border-none bg-current',
      },
      color: {
        primary: 'border-primary',
        secondary: 'border-secondary',
        muted: 'border-muted-foreground',
        destructive: 'border-destructive',
        success: 'border-green-500',
        warning: 'border-yellow-500',
        current: 'border-current',
      },
      speed: {
        slow: 'animate-spin [animation-duration:2s]',
        normal: 'animate-spin [animation-duration:1s]',
        fast: 'animate-spin [animation-duration:0.5s]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'spin',
      color: 'primary',
      speed: 'normal',
    },
    compoundVariants: [
      {
        variant: 'spin',
        color: 'primary',
        className: 'border-primary border-t-transparent',
      },
      {
        variant: 'spin',
        color: 'secondary',
        className: 'border-secondary border-t-transparent',
      },
      {
        variant: 'spin',
        color: 'muted',
        className: 'border-muted-foreground border-t-transparent',
      },
      {
        variant: 'spin',
        color: 'destructive',
        className: 'border-destructive border-t-transparent',
      },
      {
        variant: 'spin',
        color: 'success',
        className: 'border-green-500 border-t-transparent',
      },
      {
        variant: 'spin',
        color: 'warning',
        className: 'border-yellow-500 border-t-transparent',
      },
      {
        variant: 'spin',
        color: 'current',
        className: 'border-current border-t-transparent',
      },
      {
        variant: 'pulse',
        className: 'animate-pulse border-2 border-current rounded-full',
      },
      {
        variant: 'dots',
        className: 'animate-bounce border-none bg-current rounded-full',
      },
    ],
  }
);

const overlayVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center',
  {
    variants: {
      backdrop: {
        transparent: 'bg-transparent',
        blur: 'bg-background/80 backdrop-blur-sm',
        solid: 'bg-background/90',
      },
    },
    defaultVariants: {
      backdrop: 'blur',
    },
  }
);

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Whether to show as full-screen overlay
   */
  overlay?: boolean;
  /**
   * Backdrop style for overlay variant
   */
  backdrop?: VariantProps<typeof overlayVariants>['backdrop'];
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
  /**
   * Custom animation duration in seconds (overrides speed variant)
   */
  duration?: number;
}

/**
 * Spinner component for indicating loading states and processing operations
 *
 * @component
 * @example
 * ```tsx
 * // Basic spinner
 * <Spinner size="md" color="primary" />
 *
 * // Pulse animation with custom color
 * <Spinner variant="pulse" color="success" size="lg" />
 *
 * // Dots animation with fast speed
 * <Spinner variant="dots" speed="fast" />
 *
 * // Full-screen overlay spinner
 * <Spinner overlay backdrop="blur" size="xl" aria-label="Loading content" />
 *
 * // Custom duration
 * <Spinner duration={0.8} />
 * ```
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size,
      variant,
      color,
      speed,
      overlay = false,
      backdrop,
      className,
      style,
      'aria-label': ariaLabel = 'Loading',
      duration,
      ...props
    },
    ref
  ) => {
    // Create custom style for duration override
    const customStyle = duration
      ? { ...style, animationDuration: `${duration}s` }
      : style;

    const spinnerElement = (
      <div
        ref={ref}
        className={cn(
          spinnerVariants({ size, variant, color, speed }),
          // Override speed classes if custom duration provided
          duration && variant !== 'pulse' && 'animate-spin',
          className
        )}
        style={customStyle}
        role="status"
        aria-label={ariaLabel}
        {...props}
      >
        <span className="sr-only">{ariaLabel}</span>
      </div>
    );

    // Handle dots variant with special styling
    if (variant === 'dots') {
      return overlay ? (
        <div className={cn(overlayVariants({ backdrop }))}>
          <div ref={ref} className="flex space-x-1" role="status" aria-label={ariaLabel} {...props}>
            <div
              className={cn(
                spinnerVariants({ size, color }),
                'animate-bounce border-none bg-current rounded-full [animation-delay:-0.3s]'
              )}
              style={customStyle}
            />
            <div
              className={cn(
                spinnerVariants({ size, color }),
                'animate-bounce border-none bg-current rounded-full [animation-delay:-0.15s]'
              )}
              style={customStyle}
            />
            <div
              className={cn(
                spinnerVariants({ size, color }),
                'animate-bounce border-none bg-current rounded-full'
              )}
              style={customStyle}
            />
            <span className="sr-only">{ariaLabel}</span>
          </div>
        </div>
      ) : (
        <div ref={ref} className="flex space-x-1" role="status" aria-label={ariaLabel} {...props}>
          <div
            className={cn(
              spinnerVariants({ size, color }),
              'animate-bounce border-none bg-current rounded-full [animation-delay:-0.3s]'
            )}
            style={customStyle}
          />
          <div
            className={cn(
              spinnerVariants({ size, color }),
              'animate-bounce border-none bg-current rounded-full [animation-delay:-0.15s]'
            )}
            style={customStyle}
          />
          <div
            className={cn(
              spinnerVariants({ size, color }),
              'animate-bounce border-none bg-current rounded-full'
            )}
            style={customStyle}
          />
          <span className="sr-only">{ariaLabel}</span>
        </div>
      );
    }

    // Return overlay or inline spinner
    return overlay ? (
      <div className={cn(overlayVariants({ backdrop }))}>{spinnerElement}</div>
    ) : (
      spinnerElement
    );
  }
);

Spinner.displayName = 'Spinner';