# Spinner Component

Versatile Spinner atom for indicating loading states and processing operations with multiple animation styles and overlay support.

## Usage

```tsx
import { Spinner } from '@/components/atoms/Spinner';

// Basic usage
<Spinner />

// With size and color
<Spinner size="lg" color="success" />

// Different animation styles
<Spinner variant="pulse" />
<Spinner variant="dots" />

// Full-screen overlay
<Spinner overlay backdrop="blur" />

// Custom speed and duration
<Spinner speed="fast" />
<Spinner duration={1.5} />
```

## Size Variants
- `xs` (12px) | `sm` (16px) | `md` (20px) | `lg` (24px) | `xl` (32px)

## Animation Variants
- `spin` - Rotating border (default)
- `pulse` - Pulsing animation
- `dots` - Three bouncing dots

## Color Variants
- `primary` | `secondary` | `muted` | `destructive` | `success` | `warning` | `current`

## Speed Variants
- `slow` (2s) | `normal` (1s) | `fast` (0.5s)

## Key Props
- `size` - Spinner size variant (default: `md`)
- `variant` - Animation style (default: `spin`)
- `color` - Color theme (default: `primary`)
- `speed` - Animation speed (default: `normal`)
- `duration` - Custom animation duration in seconds
- `overlay` - Show as full-screen overlay
- `backdrop` - Overlay backdrop style (`transparent`, `blur`, `solid`)
- `aria-label` - Accessible label (default: "Loading")

## Use Cases for AI Chatbot

### Message Sending
```tsx
// While sending message
<Spinner size="sm" color="current" />
```

### AI Processing States
```tsx
// AI thinking indicator
<Spinner variant="dots" color="primary" size="md" aria-label="AI processing" />
```

### File Upload Feedback
```tsx
// Upload progress
<Spinner overlay backdrop="blur" aria-label="Uploading file" />
```

### Search Loading States
```tsx
// Search results loading
<Spinner size="xs" speed="fast" className="ml-2" />
```

## Common Examples

```tsx
// Inline loading
<Spinner size="sm" color="current" />

// Button loading state
<button disabled>
  <Spinner size="xs" className="mr-2" />
  Processing...
</button>

// Full screen loading
<Spinner
  overlay
  backdrop="blur"
  size="xl"
  aria-label="Loading application"
/>

// Card loading state
<div className="flex items-center justify-center p-8">
  <Spinner variant="pulse" color="muted" />
</div>

// Dots for AI responses
<Spinner
  variant="dots"
  size="sm"
  aria-label="AI is typing"
/>

// Custom speed for emphasis
<Spinner
  variant="spin"
  duration={0.8}
  color="success"
  size="lg"
/>
```

## Accessibility

- Uses `role="status"` for screen reader announcements
- Includes visually hidden text with `aria-label` content
- Default accessible label is "Loading"
- Always provide meaningful `aria-label` for context-specific loading states

## Overlay Behavior

When `overlay={true}`:
- Creates fixed full-screen overlay with z-index 50
- Centers spinner in viewport
- Backdrop options: `transparent`, `blur` (default), `solid`
- Prevents interaction with underlying content