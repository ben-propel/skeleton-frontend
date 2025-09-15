import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

const iconVariants = cva(
  'flex-shrink-0',
  {
    variants: {
      size: {
        xs: 'h-3 w-3', // 12px
        sm: 'h-4 w-4', // 16px
        md: 'h-5 w-5', // 20px
        lg: 'h-6 w-6', // 24px
        xl: 'h-8 w-8', // 32px
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Extract icon names for TypeScript autocomplete
export type LucideIconName = keyof typeof LucideIcons;

// Type for Lucide icon components
type LucideIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'ref'>,
    VariantProps<typeof iconVariants> {
  /**
   * Icon name from Lucide React library or a custom Lucide icon component
   */
  name?: LucideIconName;
  /**
   * Custom Lucide icon component (alternative to name prop)
   */
  icon?: LucideIcon;
  /**
   * Accessible label for screen readers. Required for meaningful icons.
   */
  'aria-label'?: string;
  /**
   * Whether the icon is decorative (hidden from screen readers)
   */
  'aria-hidden'?: boolean;
}

/**
 * Icon component for displaying Lucide React icons with consistent sizing and theming
 *
 * @component
 * @example
 * ```tsx
 * // Using icon name with autocomplete
 * <Icon name="Star" size="lg" className="text-yellow-500" aria-label="Favorite" />
 *
 * // Using custom icon component
 * <Icon icon={CustomIcon} size="sm" aria-hidden />
 *
 * // Decorative icon
 * <Icon name="ChevronRight" size="xs" aria-hidden />
 * ```
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      icon: CustomIcon,
      size,
      className,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden = false,
      ...props
    },
    ref
  ) => {
    // Determine which icon to render
    const IconComponent = CustomIcon || (name ? (LucideIcons[name] as LucideIcon) : null);

    if (!IconComponent) {
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.warn(
          `Icon: No icon found for name "${name}". Please provide a valid Lucide icon name or custom icon component.`
        );
      }
      return null;
    }

    // Accessibility: Icons should either be decorative (aria-hidden) or have an accessible label
    const accessibilityProps = ariaHidden
      ? { 'aria-hidden': true }
      : { 'aria-label': ariaLabel, role: ariaLabel ? 'img' : undefined };

    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size }), className)}
        {...accessibilityProps}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';