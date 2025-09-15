# Link Component

Versatile Link atom for consistent navigation and external links with React Router integration, security, and accessibility.

## Usage

```tsx
import { Link } from '@/components/atoms/Link';

// Internal navigation
<Link to="/dashboard">Go to Dashboard</Link>

// External link with security
<Link href="https://example.com">External Site</Link>

// With variants and styling
<Link to="/docs" variant="subtle" underline="always">
  Documentation
</Link>

// Disabled state
<Link href="/coming-soon" disabled>Coming Soon</Link>
```

## Link Types

### Internal Navigation
- Uses React Router for SPA navigation
- Automatic route prefetching and optimization
- Preserves browser history and back button

### External Links
- Automatic security attributes (`rel="noopener noreferrer"`)
- Opens in new tab by default (`target="_blank"`)
- External link icon indicator
- Malformed URL protection

## Variants

### Visual Variants
- `default` - Primary blue link color
- `subtle` - Muted secondary color
- `contrast` - High contrast dark color

### Underline Styles
- `hover` - Underline on hover only (default)
- `always` - Always underlined
- `none` - No underline

### Size Options
- `sm` - Small text (14px)
- `md` - Medium text (16px) - default
- `lg` - Large text (18px)

## Key Props

### Required Props (Discriminated Union)
- `to` - Internal route path (React Router)
- `href` - External URL or internal path

### Optional Props
- `variant` - Visual style variant (default: `default`)
- `underline` - Underline behavior (default: `hover`)
- `size` - Text size (default: `md`)
- `disabled` - Disable link interaction
- `showExternalIcon` - Force show/hide external icon
- `className` - Additional Tailwind classes

### HTML & Router Props
- Inherits all HTML anchor attributes
- Supports all React Router Link props
- Type-safe prop validation

## Common Examples

```tsx
// Navigation links
<Link to="/dashboard" variant="default">Dashboard</Link>
<Link to="/settings" variant="subtle">Settings</Link>

// External resources
<Link href="https://docs.example.com" showExternalIcon>
  Documentation
</Link>

// Action links
<Link href="mailto:support@example.com" variant="contrast">
  Contact Support
</Link>

// Styled links
<Link
  to="/profile"
  variant="subtle"
  underline="always"
  className="font-medium"
>
  View Profile
</Link>

// Download links
<Link
  href="/api/reports/download"
  showExternalIcon={false}
  underline="none"
>
  Download Report
</Link>
```

## Security Features

### Automatic External Link Protection
```tsx
// Automatically adds security attributes
<Link href="https://external-site.com">Safe External Link</Link>
// Renders: rel="noopener noreferrer" target="_blank"
```

### Custom Security Controls
```tsx
// Override default security behavior
<Link
  href="https://trusted-site.com"
  target="_self"
  rel="nofollow"
>
  Trusted Link
</Link>
```

## Accessibility Features

### Keyboard Navigation
- Full keyboard support (Enter, Space)
- Proper focus indicators (`focus-ring`)
- Disabled state handling

### Screen Reader Support
- External icons hidden from screen readers (`aria-hidden="true"`)
- Proper role semantics
- Disabled state announcements (`aria-disabled="true"`)

### WCAG 2.1 AA Compliance
- Sufficient color contrast ratios
- Focus indicator visibility
- Semantic HTML structure

## State Management

### Disabled State
```tsx
// Prevents navigation and shows disabled styling
<Link to="/locked-feature" disabled>
  Premium Feature
</Link>

// Works with external links too
<Link href="https://maintenance.example.com" disabled>
  Under Maintenance
</Link>
```

### Loading/Pending States
```tsx
// Custom loading state with styling
<Link
  to="/dashboard"
  className={cn(isLoading && "opacity-50 pointer-events-none")}
>
  {isLoading ? "Loading..." : "Dashboard"}
</Link>
```

## Icon Integration

### External Link Icons
```tsx
// Automatic external icon for external URLs
<Link href="https://github.com">GitHub</Link>

// Force show icon for internal links
<Link href="/external-docs" showExternalIcon>
  External Docs
</Link>

// Hide icon for external links
<Link href="https://api.example.com" showExternalIcon={false}>
  API Endpoint
</Link>
```

### Custom Icons (Future Enhancement)
```tsx
// Potential future enhancement
<Link to="/github" icon={<GitHubIcon />}>
  GitHub Repository
</Link>
```

## AI Chatbot Use Cases

### Message Links
```tsx
// Links in AI responses
<Link href="https://docs.react.dev" variant="subtle">
  React Documentation
</Link>

// Internal navigation
<Link to="/chat/history" underline="hover">
  View Chat History
</Link>
```

### Reference Links
```tsx
// External resource references
<Link
  href="https://openai.com/research"
  variant="default"
  className="font-medium"
>
  OpenAI Research
</Link>

// Help documentation
<Link to="/help/commands" variant="subtle" size="sm">
  Command Reference
</Link>
```

### Action Links
```tsx
// Settings and configuration
<Link to="/settings/api" variant="contrast">
  API Configuration
</Link>

// Download/export actions
<Link
  href="/api/chat/export"
  showExternalIcon={false}
  underline="none"
>
  Export Conversation
</Link>
```

## Performance Considerations

### React Router Optimization
- Automatic code splitting support
- Route prefetching capabilities
- History state preservation

### Bundle Impact
- Tree-shakeable icon imports
- CVA for optimal variant handling
- Minimal runtime overhead

## Browser Support

### URL Validation
- Graceful handling of malformed URLs
- Cross-browser URL parsing
- Fallback for invalid hrefs

### Navigation Features
- History API support
- Hash navigation
- Query parameter preservation

## Advanced Usage

### Conditional Rendering
```tsx
// Dynamic link behavior
{isExternal ? (
  <Link href={url} variant="subtle">
    {title}
  </Link>
) : (
  <Link to={url} variant="default">
    {title}
  </Link>
)}
```

### Event Handling
```tsx
// Analytics tracking
<Link
  to="/dashboard"
  onClick={(e) => {
    trackEvent('navigation', 'dashboard-click');
    // Navigation continues normally
  }}
>
  Dashboard
</Link>

// Confirmation dialogs
<Link
  href="/api/delete-account"
  onClick={(e) => {
    if (!confirm('Are you sure?')) {
      e.preventDefault();
    }
  }}
>
  Delete Account
</Link>
```

### Custom Styling
```tsx
// Gradient text effects
<Link
  to="/premium"
  className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
>
  Upgrade to Premium
</Link>

// Custom focus states
<Link
  href="/docs"
  className="focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
>
  Documentation
</Link>
```

## Migration from HTML Links

### From Anchor Tags
```tsx
// Before
<a href="/dashboard" className="text-blue-600 hover:underline">
  Dashboard
</a>

// After
<Link to="/dashboard" variant="default">
  Dashboard
</Link>
```

### From React Router Links
```tsx
// Before
<RouterLink to="/dashboard" className="custom-link-styles">
  Dashboard
</RouterLink>

// After
<Link to="/dashboard" variant="default" className="custom-link-styles">
  Dashboard
</Link>
```

## Testing

### Test Utilities
```tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Link } from './Link';

// Wrapper for internal links
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Test external link security
test('applies security attributes to external links', () => {
  render(<Link href="https://example.com">External</Link>);
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  expect(link).toHaveAttribute('target', '_blank');
});
```