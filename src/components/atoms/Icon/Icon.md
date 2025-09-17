# Icon Component

Flexible Icon atom using Lucide React with consistent sizing and accessibility.

## Usage

```tsx
import { Icon } from '@/components/atoms/Icon';

// Basic usage
<Icon name="Star" />

// With size and styling
<Icon name="Heart" size="lg" className="text-red-500" />

// Accessible (meaningful icons)
<Icon name="Settings" aria-label="Open settings" />

// Decorative (visual only)
<Icon name="ChevronRight" aria-hidden />
```

## Size Variants
- `xs` (12px) | `sm` (16px) | `md` (20px) | `lg` (24px) | `xl` (32px)

## Key Props
- `name` - Lucide icon name (with TypeScript autocomplete)
- `size` - Icon size variant (default: `md`)
- `aria-label` - Required for meaningful icons
- `aria-hidden` - Use for decorative icons
- `className` - Tailwind classes for colors/styling

## Common Examples

```tsx
// Actions
<Icon name="Edit" aria-label="Edit" />
<Icon name="Trash2" aria-label="Delete" />

// Navigation
<Icon name="ChevronLeft" aria-hidden />

// Status
<Icon name="CheckCircle" className="text-green-500" aria-label="Success" />
```