# Text Component

Comprehensive Text atom for consistent typography with semantic variants, theming support, and accessibility.

## Usage

```tsx
import { Text } from '@/components/atoms/Text';

// Basic usage
<Text>Default body text</Text>

// Semantic headings
<Text variant="h1">Main Heading</Text>
<Text variant="h2">Section Title</Text>

// With size and color
<Text size="lg" color="primary">Large primary text</Text>

// Truncation and formatting
<Text truncate="line-clamp-2" italic>
  Long text that will be clamped to two lines...
</Text>
```

## Semantic Variants
- `h1` | `h2` | `h3` | `h4` | `h5` | `h6` - Heading levels with proper HTML mapping
- `body` - Default paragraph text
- `caption` - Small muted text for captions/metadata
- `code` - Monospace code formatting

## Size Options
- `xs` | `sm` | `md` | `lg` | `xl` | `2xl` | `3xl`

## Weight Variants
- `light` | `normal` | `medium` | `semibold` | `bold`

## Font Family
- `sans` - Sans-serif fonts (default: Inter)
- `serif` - Serif fonts (system serif stack)
- `mono` - Monospace fonts (system monospace stack)

## Color Theming
- `default` | `muted` | `primary` | `secondary` | `destructive` | `accent`

## Truncation
- `truncate` - Single line with ellipsis
- `line-clamp-1` | `line-clamp-2` | `line-clamp-3` | `line-clamp-4` - Multi-line clamping

## Key Props
- `variant` - Semantic variant (default: `body`)
- `size` - Text size (default: `md`)
- `weight` - Font weight (default: `normal`)
- `font` - Font family (default: `sans`)
- `color` - Theme color (default: `default`)
- `truncate` - Truncation behavior
- `as` - Override HTML element
- `bold` | `italic` | `underline` | `strikethrough` - Markdown-style formatting

## Quote and Apostrophe Handling
When using quotes or apostrophes in text content, use HTML entities to ensure proper JSX parsing and ESLint compatibility:
- Use `&quot;` for quotation marks
- Use `&apos;` for apostrophes
- Example: `<Text>It&apos;s a &quot;great&quot; component!</Text>`

## Common Examples

```tsx
// Page titles
<Text variant="h1">Dashboard</Text>

// Section headings
<Text variant="h2" className="mb-4">Recent Activity</Text>

// Body content
<Text>Welcome to our application. Here&apos;s some helpful information.</Text>

// Metadata/timestamps
<Text variant="caption" color="muted">Last updated 5 minutes ago</Text>

// Code snippets
<Text variant="code">npm install @types/react</Text>
<Text variant="code">console.log(&apos;Hello World&apos;)</Text>

// Status messages
<Text color="destructive" weight="medium">Error: Invalid credentials</Text>

// Text with quotes and apostrophes
<Text>It&apos;s a &quot;comprehensive&quot; text component</Text>

// Font family variations
<Text font="serif">Elegant serif text</Text>
<Text font="mono">Technical monospace text</Text>
<Text variant="h1" font="serif">Serif Heading</Text>

// Truncated content
<Text truncate="line-clamp-3" className="max-w-md">
  Very long description that needs to be limited to three lines...
</Text>

// Formatted text
<Text bold italic>Important highlighted text</Text>
```

## AI Chatbot Use Cases

```tsx
// Message content
<Text className="prose">
  Here&apos;s the response from the AI assistant...
</Text>

// Conversation titles
<Text variant="h3" truncate="truncate" className="max-w-xs">
  Long conversation title that may overflow
</Text>

// Timestamps
<Text variant="caption" color="muted">
  2 minutes ago
</Text>

// Status indicators
<Text variant="code" size="sm" color="primary">
  Processing...
</Text>

// Mixed font usage
<Text font="serif">Classical serif for readability</Text>
<Text font="mono">Code: npm install react</Text>
```