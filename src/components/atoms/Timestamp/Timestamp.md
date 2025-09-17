# Timestamp Component

A flexible and accessible timestamp component for displaying dates and times with multiple formatting options, automatic refresh capabilities, and internationalization support.

## Features

- **Multiple Format Types**: Relative, absolute, and custom formatting options
- **Timezone Support**: Basic timezone display with IANA timezone identifiers
- **Auto-refresh**: Automatic updates for relative timestamps
- **Internationalization**: Locale support for date formatting
- **Accessibility**: Semantic HTML with proper `<time>` element and ARIA support
- **Tooltip Support**: Optional tooltip with full timestamp details
- **Customizable Styling**: CVA-based variants for size, weight, and appearance

## Installation

```bash
npm install date-fns
```

The component uses `date-fns` for date formatting and manipulation.

## Basic Usage

```tsx
import { Timestamp } from '@/components/atoms/Timestamp'

// Basic relative timestamp
<Timestamp date={new Date()} />

// Absolute timestamp
<Timestamp date={messageDate} format="absolute" />

// Custom format
<Timestamp
  date="2024-01-15T10:30:00Z"
  format="custom"
  customFormat="PPP 'at' p"
/>
```

## Format Types

### Relative Format (Default)
Displays time relative to now (e.g., "2 hours ago", "in 5 minutes"):

```tsx
<Timestamp
  date={pastDate}
  format="relative"
  addSuffix={true}
  includeSeconds={true}
/>
```

### Absolute Format
Smart absolute formatting that shows:
- Time only for today's dates
- "Yesterday at [time]" for yesterday
- Full date for older items

```tsx
<Timestamp date={messageDate} format="absolute" />
```

### Custom Format
Use date-fns format tokens for complete control:

```tsx
<Timestamp
  date={eventDate}
  format="custom"
  customFormat="EEEE, MMMM do, yyyy 'at' h:mm a"
/>
// Output: "Monday, January 15th, 2024 at 2:30 PM"
```

## Common Format Patterns

| Format String | Example Output |
|---------------|----------------|
| `PP` | Jan 15, 2024 |
| `PPP` | January 15th, 2024 |
| `p` | 2:30 PM |
| `pp` | 2:30:15 PM |
| `PPpp` | Jan 15, 2024, 2:30:15 PM |
| `yyyy-MM-dd` | 2024-01-15 |
| `HH:mm:ss` | 14:30:15 |

## Auto-refresh

For relative timestamps, enable automatic updates:

```tsx
<Timestamp
  date={recentMessage}
  format="relative"
  refreshInterval={30} // Update every 30 seconds
/>

// Disable auto-refresh
<Timestamp
  date={date}
  format="relative"
  refreshInterval={0}
/>
```

## Styling Variants

### Size Variants

```tsx
<Timestamp date={date} size="xs" />   {/* text-xs */}
<Timestamp date={date} size="sm" />   {/* text-sm (default) */}
<Timestamp date={date} size="md" />   {/* text-base */}
<Timestamp date={date} size="lg" />   {/* text-lg */}
```

### Weight Variants

```tsx
<Timestamp date={date} weight="normal" />    {/* font-normal (default) */}
<Timestamp date={date} weight="medium" />    {/* font-medium */}
<Timestamp date={date} weight="semibold" />  {/* font-semibold */}
```

### Color Variants

```tsx
<Timestamp date={date} variant="default" />  {/* text-foreground (default) */}
<Timestamp date={date} variant="muted" />    {/* text-muted-foreground */}
<Timestamp date={date} variant="subtle" />   {/* text-secondary-foreground */}
<Timestamp date={date} variant="accent" />   {/* text-accent-foreground */}
```

## Tooltips

Control tooltip display and formatting:

```tsx
// Default tooltip (shows full date/time)
<Timestamp date={date} showTooltip={true} />

// Custom tooltip format
<Timestamp
  date={date}
  showTooltip={true}
  tooltipFormat="EEEE, MMMM do, yyyy 'at' h:mm:ss a zzz"
/>

// Disable tooltip
<Timestamp date={date} showTooltip={false} />
```

## Use Cases

### Chat Messages
```tsx
<Timestamp
  date={message.createdAt}
  format="relative"
  variant="muted"
  size="xs"
  refreshInterval={60}
  addSuffix={true}
/>
```

### Activity Indicators
```tsx
<Timestamp
  date={user.lastSeen}
  format="relative"
  variant="subtle"
  size="sm"
  showTooltip={true}
  tooltipFormat="'Last seen:' PPpp"
/>
```

### Event Scheduling
```tsx
<Timestamp
  date={event.startTime}
  format="custom"
  customFormat="EEEE, MMM do 'at' h:mm a"
  variant="default"
  weight="medium"
/>
```

### Session Duration
```tsx
<Timestamp
  date={session.startTime}
  format="relative"
  addSuffix={false}
  includeSeconds={true}
  refreshInterval={1}
/>
```

## Accessibility

The component uses semantic HTML and supports accessibility features:

```tsx
<Timestamp
  date={date}
  aria-label="Message sent time"
  aria-describedby="timestamp-help"
  tabIndex={0}
/>
```

- Uses proper `<time>` element with `datetime` attribute
- Supports all standard ARIA attributes
- Keyboard focusable when needed
- Screen reader friendly with meaningful content

## Advanced Features

### Date Input Formats
The component accepts multiple date input formats:

```tsx
// Date object
<Timestamp date={new Date()} />

// ISO string
<Timestamp date="2024-01-15T10:30:00.000Z" />

// Unix timestamp
<Timestamp date={1705316200000} />
```

### Timezone Display
Basic timezone support for display purposes:

```tsx
<Timestamp
  date={date}
  timezone="America/New_York"
  format="custom"
  customFormat="PPpp zzz"
/>
```

**Note**: For advanced timezone handling, consider using `date-fns-tz` library.

### Internationalization
Locale support for formatting:

```tsx
<Timestamp
  date={date}
  locale="es" // Spanish locale
  format="relative"
/>
```

**Note**: Full locale support requires importing specific locale objects from `date-fns/locale`.

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `Date \| string \| number` | Required | The date to display |
| `format` | `'relative' \| 'absolute' \| 'custom'` | `'relative'` | Format type |
| `customFormat` | `string` | `'PPpp'` | Custom format string (date-fns tokens) |
| `showTooltip` | `boolean` | `true` | Show tooltip on hover |
| `tooltipFormat` | `string` | `'PPpp'` | Tooltip format string |
| `refreshInterval` | `number` | `60` | Auto-refresh interval in seconds (0 to disable) |
| `locale` | `string` | `undefined` | Locale code for formatting |
| `timezone` | `string` | `undefined` | IANA timezone identifier |
| `addSuffix` | `boolean` | `true` | Add suffix for relative format |
| `includeSeconds` | `boolean` | `false` | Include seconds in relative format |
| `variant` | `'default' \| 'muted' \| 'subtle' \| 'accent'` | `'default'` | Color variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Text size |
| `weight` | `'normal' \| 'medium' \| 'semibold'` | `'normal'` | Font weight |
| `className` | `string` | `undefined` | Additional CSS classes |

### Styling Classes

The component uses CVA (Class Variance Authority) for styling. Base classes:

```css
.timestamp-base {
  @apply inline-flex items-center transition-colors cursor-default;
}
```

## Examples

### Complete Chat Interface Example

```tsx
function ChatMessage({ message }) {
  return (
    <div className="flex items-start gap-3 p-4">
      <Avatar user={message.author} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{message.author.name}</span>
          <Timestamp
            date={message.createdAt}
            format="relative"
            variant="muted"
            size="xs"
            refreshInterval={60}
            showTooltip={true}
            tooltipFormat="'Sent on' EEEE, MMMM do, yyyy 'at' h:mm:ss a"
          />
        </div>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
}
```

### Activity Dashboard Example

```tsx
function ActivityList({ activities }) {
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{activity.title}</h3>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
          </div>
          <Timestamp
            date={activity.timestamp}
            format="absolute"
            variant="subtle"
            size="sm"
            showTooltip={true}
          />
        </div>
      ))}
    </div>
  )
}
```

## Best Practices

1. **Choose the Right Format**: Use relative for recent activity, absolute for historical data
2. **Consistent Refresh Intervals**: Use appropriate intervals based on content freshness needs
3. **Accessibility**: Always provide meaningful tooltip text for screen readers
4. **Performance**: Disable auto-refresh when components are not visible
5. **Timezone Awareness**: Consider user timezone preferences for better UX

## Browser Support

- Modern browsers with ES6+ support
- Requires `Intl` API for advanced formatting (widely supported)
- Graceful degradation for older browsers