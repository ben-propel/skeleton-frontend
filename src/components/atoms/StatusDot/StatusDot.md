# StatusDot Component

Visual status indicator atom for showing online/offline states, system status, and other binary or categorical states with flexible styling and positioning.

## Usage

```tsx
import { StatusDot } from '@/components/atoms/StatusDot';

// Basic status indicator
<StatusDot status="online" />

// With custom size and animation
<StatusDot status="busy" size="lg" pulse />

// Absolute positioned on profile picture
<div className="relative">
  <img src="/avatar.jpg" className="rounded-full" />
  <StatusDot
    status="online"
    position="absolute"
    placement="bottom-right"
  />
</div>

// Custom color
<StatusDot customColor="#8b5cf6" size="md" />
```

## Status Types

### Standard Status States
- `online` - Green indicator for active/online status
- `offline` - Gray indicator for inactive/offline status
- `busy` - Red indicator for busy/do not disturb status
- `away` - Yellow indicator for away/idle status
- `error` - Destructive color for error/failure states

### Custom Status
- Use `customColor` prop to override with any hex/rgb color
- Maintains all other functionality while allowing brand colors
- Perfect for custom status types beyond the standard set

## Variants

### Size Options
- `sm` - Small 8px diameter (h-2 w-2)
- `md` - Medium 12px diameter (h-3 w-3) - default
- `lg` - Large 16px diameter (h-4 w-4)

### Position Types
- `relative` - Normal document flow positioning (default)
- `absolute` - Absolute positioning for overlays

### Placement Options (Absolute Position Only)
- `top-right` - Top right corner with transform offset
- `top-left` - Top left corner with transform offset
- `bottom-right` - Bottom right corner with transform offset
- `bottom-left` - Bottom left corner with transform offset

### Animation
- `pulse={false}` - Static indicator (default)
- `pulse={true}` - Pulsing animation for attention

## Key Props

### Required Props
None - component works with all defaults

### Optional Props
- `status` - Status type variant (default: `offline`)
- `size` - Size variant (default: `md`)
- `position` - Positioning type (default: `relative`)
- `placement` - Corner placement for absolute positioning
- `pulse` - Enable pulsing animation (default: `false`)
- `customColor` - Custom background color override
- `aria-label` - Custom accessibility label
- `className` - Additional Tailwind classes

### HTML Attributes
- Inherits all HTML div attributes
- Supports ref forwarding for DOM access
- Spreads additional props to root element

## Common Examples

```tsx
// User presence indicators
<StatusDot status="online" pulse aria-label="User is online" />
<StatusDot status="busy" size="lg" aria-label="User is busy" />
<StatusDot status="away" aria-label="User is away" />

// System status monitoring
<StatusDot status="online" aria-label="API server operational" />
<StatusDot status="error" pulse aria-label="Database connection failed" />

// Profile picture overlays
<div className="relative">
  <div className="h-12 w-12 rounded-full bg-blue-500" />
  <StatusDot
    status="online"
    position="absolute"
    placement="bottom-right"
    size="sm"
  />
</div>

// Custom branded status
<StatusDot
  customColor="#8b5cf6"
  size="md"
  pulse
  aria-label="Premium member"
/>

// Connection status with real-time updates
<StatusDot
  status="online"
  pulse
  aria-label="Connected to server"
  className="mr-2"
/>
```

## Accessibility Features

### Screen Reader Support
- Semantic `role="status"` for status announcements
- Automatic ARIA labels based on status type
- Custom `aria-label` support for specific contexts
- Hidden decorative text with `sr-only` class

### Keyboard Navigation
- Not focusable by default (status indicator only)
- Participates in sequential focus when needed
- Proper semantic markup for assistive technology

### WCAG 2.1 AA Compliance
- Sufficient color contrast for all status variants
- Non-color-dependent status communication via ARIA
- Meaningful status labels for screen readers

## Animation System

### Pulse Animation
- Uses Tailwind's `animate-pulse` for subtle attention
- Compound variants provide `animate-ping` for active states
- Only active states (online, busy, error) support ping animation
- Performance optimized with CSS transforms

### Smart Animation Rules
```tsx
// Basic pulse (all status types)
<StatusDot status="offline" pulse /> // animate-pulse

// Enhanced ping animation (active states only)
<StatusDot status="online" pulse />  // animate-ping
<StatusDot status="busy" pulse />    // animate-ping
<StatusDot status="error" pulse />   // animate-ping
<StatusDot status="away" pulse />    // animate-pulse
<StatusDot status="offline" pulse /> // animate-pulse
```

## Positioning System

### Relative Positioning
```tsx
// Normal document flow
<StatusDot status="online" position="relative" />

// Inline with text or other elements
<span className="flex items-center gap-2">
  <StatusDot status="online" size="sm" />
  <span>John Doe is online</span>
</span>
```

### Absolute Positioning
```tsx
// Requires relative parent container
<div className="relative">
  <img src="/avatar.jpg" className="rounded-full" />

  {/* Each placement generates specific transform classes */}
  <StatusDot position="absolute" placement="top-right" />
  <StatusDot position="absolute" placement="top-left" />
  <StatusDot position="absolute" placement="bottom-right" />
  <StatusDot position="absolute" placement="bottom-left" />
</div>
```

### Transform Classes
- `top-right`: `top-0 right-0 transform translate-x-1/2 -translate-y-1/2`
- `top-left`: `top-0 left-0 transform -translate-x-1/2 -translate-y-1/2`
- `bottom-right`: `bottom-0 right-0 transform translate-x-1/2 translate-y-1/2`
- `bottom-left`: `bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2`

## Real-world Use Cases

### User Presence Systems
```tsx
// Chat applications
<div className="flex items-center gap-2">
  <div className="relative">
    <Avatar user={user} />
    <StatusDot
      status={user.presence}
      position="absolute"
      placement="bottom-right"
      size="sm"
    />
  </div>
  <span>{user.name}</span>
</div>

// User lists
{users.map(user => (
  <div key={user.id} className="flex items-center gap-3">
    <StatusDot status={user.status} size="sm" />
    <span>{user.name}</span>
    <span className="text-sm text-muted">
      Last seen {user.lastSeen}
    </span>
  </div>
))}
```

### System Monitoring
```tsx
// Service status dashboard
{services.map(service => (
  <div key={service.name} className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <StatusDot
        status={service.status}
        pulse={service.status === 'error'}
      />
      <span>{service.name}</span>
    </div>
    <span>{service.uptime}</span>
  </div>
))}

// Connection indicators
<div className="flex items-center gap-2">
  <StatusDot
    status={isConnected ? 'online' : 'error'}
    pulse={!isConnected}
  />
  <span>
    {isConnected ? 'Connected' : 'Connection Lost'}
  </span>
</div>
```

### Notification Systems
```tsx
// Email/message status
<div className="flex items-center gap-2">
  <StatusDot
    status={message.isRead ? 'offline' : 'online'}
    size="sm"
  />
  <span>{message.subject}</span>
</div>

// Task/todo status
<div className="flex items-center gap-2">
  <StatusDot
    status={task.isCompleted ? 'online' : 'away'}
    customColor={task.isCompleted ? '#10b981' : '#f59e0b'}
  />
  <span>{task.title}</span>
</div>
```

## Color System

### Built-in Status Colors
- `online`: `bg-green-500` - Success/active green
- `offline`: `bg-gray-400` - Neutral/inactive gray
- `busy`: `bg-red-500` - Warning/busy red
- `away`: `bg-yellow-500` - Caution/idle yellow
- `error`: `bg-destructive` - Theme destructive color

### Custom Color Override
```tsx
// Brand colors
<StatusDot customColor="#8b5cf6" /> // Purple
<StatusDot customColor="#f59e0b" /> // Orange
<StatusDot customColor="#06b6d4" /> // Cyan

// Dynamic colors
<StatusDot
  customColor={user.role === 'admin' ? '#dc2626' : '#059669'}
  aria-label={`${user.name} (${user.role})`}
/>

// Status-specific overrides
<StatusDot
  customColor={getStatusColor(item.priority)}
  size="lg"
  pulse={item.priority === 'urgent'}
/>
```

## Advanced Usage

### Dynamic Status Updates
```tsx
const [connectionStatus, setConnectionStatus] = useState('online');

useEffect(() => {
  const interval = setInterval(() => {
    // Check connection and update status
    setConnectionStatus(isConnected ? 'online' : 'error');
  }, 5000);

  return () => clearInterval(interval);
}, []);

return (
  <StatusDot
    status={connectionStatus}
    pulse={connectionStatus === 'error'}
    aria-label={`Connection ${connectionStatus}`}
  />
);
```

### Conditional Rendering
```tsx
// Show status only when relevant
{user.showPresence && (
  <StatusDot
    status={user.presence}
    position="absolute"
    placement="bottom-right"
  />
)}

// Different status for different contexts
<StatusDot
  status={
    user.isOnline ? 'online' :
    user.isIdle ? 'away' :
    user.isBusy ? 'busy' : 'offline'
  }
  pulse={user.hasNotifications}
/>
```

### Event Handling
```tsx
// Interactive status (rare use case)
<StatusDot
  status={status}
  onClick={() => toggleUserStatus()}
  className="cursor-pointer hover:scale-110 transition-transform"
  tabIndex={0}
  role="button"
  aria-label="Click to change status"
/>
```

## Performance Considerations

### CVA Optimization
- Class-variance-authority provides optimal bundle size
- Only included variants are included in final CSS
- Tree-shakeable animation and positioning utilities

### Animation Performance
- CSS-based animations for optimal performance
- No JavaScript animation loops
- Leverages GPU acceleration via transforms
- Minimal reflow impact with absolute positioning

### Memory Usage
- Lightweight component with minimal props
- No internal state management
- Efficient re-rendering with React.memo potential

## Testing

### Test Utilities
```tsx
import { render, screen } from '@testing-library/react';
import { StatusDot } from './StatusDot';

// Basic status testing
test('displays correct status', () => {
  render(<StatusDot status="online" />);
  const statusDot = screen.getByRole('status');

  expect(statusDot).toHaveClass('bg-green-500');
  expect(statusDot).toHaveAttribute('aria-label', 'Online');
});

// Animation testing
test('applies pulse animation', () => {
  render(<StatusDot status="error" pulse />);
  const statusDot = screen.getByRole('status');

  expect(statusDot).toHaveClass('animate-ping');
});

// Custom color testing
test('applies custom color', () => {
  render(<StatusDot customColor="#8b5cf6" />);
  const statusDot = screen.getByRole('status');

  expect(statusDot).toHaveStyle('background-color: #8b5cf6');
});
```

### Accessibility Testing
```tsx
// Screen reader testing
test('provides accessible status information', () => {
  render(<StatusDot status="busy" aria-label="User is busy" />);

  expect(screen.getByLabelText('User is busy')).toBeInTheDocument();
  expect(screen.getByRole('status')).toBeInTheDocument();
});

// Positioning testing
test('applies correct placement classes', () => {
  render(<StatusDot position="absolute" placement="top-right" />);
  const statusDot = screen.getByRole('status');

  expect(statusDot).toHaveClass('top-0', 'right-0', 'transform');
});
```

## Browser Support

### CSS Features
- CSS Grid and Flexbox for layout
- CSS Transforms for positioning
- CSS Animations for pulse effects
- Modern selector support

### Graceful Degradation
- Fallback colors for older browsers
- Animation fallbacks via Tailwind CSS
- Accessible without JavaScript
- Semantic HTML structure

## Migration Guide

### From Custom Status Indicators
```tsx
// Before
<div className="w-3 h-3 bg-green-500 rounded-full" />

// After
<StatusDot status="online" size="md" />
```

### From Icon-based Status
```tsx
// Before
<div className="text-green-500">
  <CircleIcon className="w-3 h-3 fill-current" />
</div>

// After
<StatusDot status="online" size="md" />
```

### Adding to Existing Components
```tsx
// Enhance existing user components
<UserCard user={user}>
  <StatusDot
    status={user.presence}
    position="absolute"
    placement="top-right"
    size="sm"
  />
</UserCard>
```