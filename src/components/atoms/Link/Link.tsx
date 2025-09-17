import React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const linkVariants = cva(
  'inline-flex items-center gap-1 transition-colors focus-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'text-primary-600 hover:text-primary-700',
        subtle: 'text-secondary-600 hover:text-secondary-700',
        contrast: 'text-secondary-900 hover:text-secondary-800',
      },
      underline: {
        none: '',
        always: 'underline',
        hover: 'hover:underline',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      underline: 'hover',
      size: 'md',
    },
  }
)

// Helper function to determine if a URL is external
const isExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url, window.location.origin)
    return urlObj.origin !== window.location.origin
  } catch {
    // If URL parsing fails, assume it's internal
    return false
  }
}

interface BaseLinkProps extends VariantProps<typeof linkVariants> {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  showExternalIcon?: boolean
}

interface InternalLinkProps extends BaseLinkProps {
  to: string
  href?: never
  target?: never
  rel?: never
}

interface ExternalLinkProps extends BaseLinkProps {
  href: string
  to?: never
  target?: string
  rel?: string
}

export type LinkProps = (InternalLinkProps | ExternalLinkProps) &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  Omit<RouterLinkProps, 'to'>

/**
 * Link component for consistent navigation and external links
 *
 * @component
 * @example
 * ```tsx
 * // Internal navigation
 * <Link to="/dashboard" variant="default">
 *   Go to Dashboard
 * </Link>
 *
 * // External link
 * <Link href="https://example.com" variant="subtle" showExternalIcon>
 *   External Site
 * </Link>
 * ```
 */
export const Link: React.FC<LinkProps> = ({
  children,
  className,
  variant,
  underline,
  size,
  disabled = false,
  showExternalIcon,
  ...props
}) => {
  const commonProps = {
    className: cn(linkVariants({ variant, underline, size }), className),
    'aria-disabled': disabled,
  }

  // Handle internal navigation
  if ('to' in props && props.to) {
    const { to, ...restProps } = props
    return (
      <RouterLink
        to={disabled ? '#' : to}
        {...commonProps}
        {...(restProps as Omit<RouterLinkProps, 'to'>)}
        onClick={disabled ? (e: React.MouseEvent): void => e.preventDefault() : restProps.onClick}
      >
        {children}
      </RouterLink>
    )
  }

  // Handle external links
  if ('href' in props && props.href) {
    const { href, target, rel, ...restProps } = props
    const isExternal = isExternalUrl(href)
    const shouldShowIcon = showExternalIcon ?? isExternal

    return (
      <a
        href={disabled ? undefined : href}
        target={isExternal ? target || '_blank' : target}
        rel={isExternal ? rel || 'noopener noreferrer' : rel}
        {...commonProps}
        {...restProps}
        onClick={disabled ? (e: React.MouseEvent): void => e.preventDefault() : restProps.onClick}
      >
        {children}
        {shouldShowIcon && !disabled && (
          <ExternalLink
            className="h-3 w-3 ml-0.5"
            aria-hidden="true"
          />
        )}
      </a>
    )
  }

  // Fallback for invalid props
  return (
    <span {...commonProps}>
      {children}
    </span>
  )
}

Link.displayName = 'Link'