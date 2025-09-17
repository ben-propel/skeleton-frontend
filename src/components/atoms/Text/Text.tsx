import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Variant metadata: defines what styling each variant provides
// This makes the component self-documenting and easily extensible
const VARIANT_METADATA = {
  h1: { hasSize: true, hasWeight: true, hasColor: false, hasFont: false },
  h2: { hasSize: true, hasWeight: true, hasColor: false, hasFont: false },
  h3: { hasSize: true, hasWeight: true, hasColor: false, hasFont: false },
  h4: { hasSize: true, hasWeight: true, hasColor: false, hasFont: false },
  h5: { hasSize: true, hasWeight: true, hasColor: false, hasFont: false },
  h6: { hasSize: true, hasWeight: true, hasColor: false, hasFont: false },
  body: { hasSize: false, hasWeight: false, hasColor: false, hasFont: false },
  caption: { hasSize: true, hasWeight: false, hasColor: true, hasFont: false },
  code: { hasSize: true, hasWeight: true, hasColor: false, hasFont: true }
} as const

type VariantKey = keyof typeof VARIANT_METADATA

const textVariants = cva(
  'leading-normal',
  {
    variants: {
      variant: {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
        h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
        h5: 'text-lg font-semibold',
        h6: 'text-base font-semibold',
        body: '',
        caption: 'text-sm text-muted-foreground',
        code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl'
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold'
      },
      color: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        destructive: 'text-destructive',
        accent: 'text-accent-foreground'
      },
      truncate: {
        none: '',
        truncate: 'truncate',
        'line-clamp-1': 'line-clamp-1',
        'line-clamp-2': 'line-clamp-2',
        'line-clamp-3': 'line-clamp-3',
        'line-clamp-4': 'line-clamp-4'
      },
      font: {
        sans: 'font-sans',
        serif: 'font-serif',
        mono: 'font-mono'
      }
    },
    compoundVariants: [
      {
        variant: 'body',
        size: undefined,
        class: 'text-base'
      }
    ],
    defaultVariants: {
      variant: 'body',
      truncate: 'none'
    }
  }
)

// Define semantic HTML element mapping
const getSemanticElement = (variant?: string | null): keyof JSX.IntrinsicElements => {
  switch (variant) {
    case 'h1': return 'h1'
    case 'h2': return 'h2'
    case 'h3': return 'h3'
    case 'h4': return 'h4'
    case 'h5': return 'h5'
    case 'h6': return 'h6'
    case 'code': return 'code'
    case 'caption': return 'figcaption'
    case 'body':
    default: return 'p'
  }
}

export interface TextProps extends VariantProps<typeof textVariants> {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
}

/**
 * Text component for consistent typography across the application
 *
 * @component
 * @example
 * ```tsx
 * <Text variant="h1" size="3xl" weight="bold">
 *   Main Heading
 * </Text>
 *
 * <Text variant="body" color="muted" truncate="line-clamp-2">
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * </Text>
 *
 * <Text variant="code" size="sm">
 *   console.log(&apos;Hello World&apos;)
 * </Text>
 *
 * <Text bold italic>
 *   Formatted text with markdown-style props
 * </Text>
 * ```
 */

export const Text: React.FC<TextProps> = ({
  children,
  className,
  variant,
  size,
  weight,
  color,
  truncate,
  font,
  as,
  bold,
  italic,
  underline,
  strikethrough,
  ...props
}) => {
  // Determine the HTML element to render
  const Component = as || getSemanticElement(variant)

  // Handle markdown-style formatting classes
  const formattingClasses = cn(
    bold && 'font-bold',
    italic && 'italic',
    underline && 'underline',
    strikethrough && 'line-through'
  )

  // Get variant metadata for intelligent prop application
  const variantMeta = variant ? VARIANT_METADATA[variant as VariantKey] : null

  // Apply styling props only when variant doesn't already provide them
  const shouldApplySize = !variantMeta?.hasSize
  const shouldApplyWeight = !variantMeta?.hasWeight && !bold // bold always overrides
  const shouldApplyColor = !variantMeta?.hasColor
  const shouldApplyFont = !variantMeta?.hasFont

  // Determine final props to pass to textVariants
  const finalSize = shouldApplySize ? (size || 'md') : undefined
  const finalWeight = bold ? 'bold' : (shouldApplyWeight ? (weight || 'normal') : undefined)
  const finalColor = shouldApplyColor ? (color || 'default') : undefined

  const variantProps = {
    variant,
    size: finalSize,
    weight: finalWeight,
    color: finalColor,
    truncate,
    ...(shouldApplyFont && { font: font || 'sans' })
  }

  return (
    <Component
      className={cn(
        textVariants(variantProps),
        formattingClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

Text.displayName = 'Text'