# MessageBubble Component

Comprehensive MessageBubble molecule for chat interfaces supporting sent/received/system messages with reactions, status indicators, and rich content using atomic components.

## Usage

```tsx
import { MessageBubble } from '@/components/molecules/MessageBubble';

// Basic sent message
<MessageBubble
  content="Hello, how are you?"
  variant="sent"
  timestamp={new Date()}
  status="delivered"
  showTimestamp
/>

// Received message with author
<MessageBubble
  content="Great work on the component!"
  variant="received"
  author={{
    id: '2',
    name: 'Sarah Miller',
    avatar: 'https://example.com/avatar.jpg'
  }}
  timestamp={new Date()}
  showAuthor
  showTimestamp
/>

// System message
<MessageBubble
  content="Sarah joined the conversation"
  variant="system"
  timestamp={new Date()}
  showTimestamp
/>
```

## Message Types

### Sent Messages
- Right-aligned with primary background color
- Status indicators (sending, sent, delivered, read, failed)
- Retry functionality for failed messages
- No author information displayed

### Received Messages
- Left-aligned with muted background color
- Author avatar and name display
- Support for emoji reactions
- No status indicators

### System Messages
- Center-aligned with secondary background
- Smaller text and minimal styling
- No status indicators or author info
- Used for notifications and system events

## Variants

### Message Variants
- `sent` - User's own messages (right-aligned, primary color)
- `received` - Other users' messages (left-aligned, muted color)
- `system` - System notifications (center-aligned, minimal styling)

### Shape Variants
- `rounded` - Standard rounded corners (default)
- `speechbox` - Classic speech bubble style
- `square` - Sharp, minimal corners for modern look
- `pill` - Fully rounded ends for smooth appearance

### Status Indicators (Sent Messages Only)
- `sending` - Clock icon with pulse animation
- `sent` - Single check mark
- `delivered` - Double check marks
- `read` - Double check marks in blue
- `failed` - Alert circle in destructive color with retry button

## Key Props

### Required Props
- `content` - Message content (string or React.ReactNode)
- `variant` - Message type ('sent' | 'received' | 'system')

### Optional Props
- `timestamp` - Message timestamp (Date object)
- `author` - User information for received messages
- `status` - Message delivery status for sent messages
- `reactions` - Array of emoji reactions
- `onReact` - Callback for reaction interactions
- `onRetry` - Callback for retry button (failed messages)
- `showTimestamp` - Whether to display timestamp (default: true)
- `showAuthor` - Whether to display author info (default: true)
- `maxWidth` - Custom maximum width
- `shape` - Message bubble shape (default: 'rounded')
- `className` - Additional CSS classes

### Type Definitions
```tsx
interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface Reaction {
  emoji: string;
  count: number;
  users: User[];
  currentUserReacted: boolean;
}

type MessageVariant = 'sent' | 'received' | 'system';
type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
type MessageShape = 'rounded' | 'speechbox' | 'square' | 'pill';
```

## Shape Examples

```tsx
// Rounded shape (default)
<MessageBubble
  content="Standard rounded corners"
  variant="sent"
  shape="rounded"
  timestamp={new Date()}
  status="delivered"
/>

// Speech box style
<MessageBubble
  content="Classic speech bubble look!"
  variant="received"
  shape="speechbox"
  author={{ id: '1', name: 'John Doe' }}
  timestamp={new Date()}
  showAuthor
/>

// Square/modern shape
<MessageBubble
  content="Sharp, minimal design"
  variant="sent"
  shape="square"
  timestamp={new Date()}
  status="read"
/>

// Pill shape
<MessageBubble
  content="Smooth, fully rounded"
  variant="received"
  shape="pill"
  author={{ id: '2', name: 'Jane Smith' }}
  timestamp={new Date()}
  showAuthor
/>

// System message with shape
<MessageBubble
  content="System notification"
  variant="system"
  shape="speechbox"
  timestamp={new Date()}
/>
```


### Shape-Specific Features

#### Shape Accessibility
- All shapes maintain proper contrast ratios
- Focus indicators work consistently across shapes
- Screen readers announce content regardless of visual shape

## Common Examples

```tsx
// Message with reactions
<MessageBubble
  content="Check out this new feature! 🚀"
  variant="received"
  author={{ id: '1', name: 'John Doe' }}
  timestamp={new Date()}
  reactions={[
    {
      emoji: '🚀',
      count: 3,
      users: [],
      currentUserReacted: true
    },
    {
      emoji: '👍',
      count: 2,
      users: [],
      currentUserReacted: false
    }
  ]}
  onReact={(emoji) => console.log('Reacted with:', emoji)}
  showAuthor
  showTimestamp
/>

// Failed message with retry
<MessageBubble
  content="Failed to send this message"
  variant="sent"
  timestamp={new Date()}
  status="failed"
  onRetry={() => console.log('Retrying...')}
  showTimestamp
/>

// Rich content message
<MessageBubble
  content={
    <div>
      <p>Check out this code snippet:</p>
      <pre className="bg-gray-100 p-2 rounded">
        const greeting = "Hello World";
      </pre>
    </div>
  }
  variant="sent"
  timestamp={new Date()}
  status="delivered"
  showTimestamp
/>
```

## Rich Content Support

### Text Content
- Simple strings for basic messages
- HTML entities and emojis supported
- Automatic text wrapping and line breaks

### React Node Content
- JSX elements for complex layouts
- Code blocks and formatted text
- Images, files, and media embeds
- Interactive elements and buttons

### File Attachments
```tsx
<MessageBubble
  content={
    <div className="flex items-center gap-2">
      <FileIcon className="h-4 w-4" />
      <div>
        <div className="font-medium">document.pdf</div>
        <div className="text-xs text-muted-foreground">2.3 MB</div>
      </div>
    </div>
  }
  variant="received"
  author={{ id: '1', name: 'John Doe' }}
  timestamp={new Date()}
  showAuthor
  showTimestamp
/>
```

## Atomic Component Integration

### Timestamp Component
- Uses atomic Timestamp component for consistent formatting
- Automatic relative time updates (refreshes every 30 seconds)
- Supports hover tooltips with full date/time
- Configurable formats and styling

### Button Component
- Uses atomic Button component for reactions and retry functionality
- Consistent styling with application theme
- Proper focus states and accessibility
- Ghost variant for subtle interactions

### Integrations with shadcn/ui
- Card and CardContent for message container
- Avatar components for user profile pictures
- Maintains design system consistency

## Reactions System

### Reaction Display
```tsx
// Reactions with user interaction
const reactions = [
  {
    emoji: '👍',
    count: 5,
    users: [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }],
    currentUserReacted: true
  }
];

<MessageBubble
  content="Great idea!"
  variant="received"
  reactions={reactions}
  onReact={(emoji) => {
    // Handle reaction toggle
    if (currentUserReacted) {
      removeReaction(emoji);
    } else {
      addReaction(emoji);
    }
  }}
/>
```

### Reaction Features
- Visual indication of current user's reactions
- Hover states for interactive feedback
- Count display with user list (future enhancement)
- Support for multiple reactions per message

## Status Indicators

### Visual States
```tsx
// Different status examples
<MessageBubble content="Sending..." variant="sent" status="sending" />
<MessageBubble content="Message sent" variant="sent" status="sent" />
<MessageBubble content="Delivered" variant="sent" status="delivered" />
<MessageBubble content="Read by recipient" variant="sent" status="read" />
<MessageBubble content="Failed to send" variant="sent" status="failed" onRetry={handleRetry} />
```

### Status Icon Meanings
- **Sending**: Animated clock icon (pulsing)
- **Sent**: Single check mark (message left device)
- **Delivered**: Double check marks (reached recipient)
- **Read**: Blue double check marks (opened by recipient)
- **Failed**: Red alert circle with retry button

## Accessibility Features

### Keyboard Navigation
- Tab navigation through interactive elements
- Enter/Space activation for buttons
- Proper focus management and indicators

### Screen Reader Support
- Semantic HTML structure with proper roles
- ARIA labels for status indicators
- Time elements with machine-readable datetime
- Alternative text for author avatars

### WCAG 2.1 AA Compliance
- Sufficient color contrast ratios
- Scalable text and responsive design
- Focus indicator visibility
- Meaningful heading structure

```tsx
// Accessible message with proper labels
<MessageBubble
  content="Important update"
  variant="received"
  author={{ id: '1', name: 'System Admin' }}
  timestamp={new Date()}
  status="delivered"
  aria-label="Message from System Admin: Important update"
  showAuthor
  showTimestamp
/>
```

## Animation and Transitions

### Entry Animations
- Smooth slide-in from bottom on message appearance
- Configurable animation duration and easing
- Automatic stagger for multiple messages

### Status Transitions
- Smooth transitions between status states
- Pulsing animations for pending states
- Color transitions for status changes

### Hover Effects
- Subtle hover states for interactive elements
- Reaction button highlighting
- Status indicator emphasis

## Responsive Design

### Mobile Optimizations
- Touch-friendly reaction buttons
- Appropriate text sizing for mobile screens
- Swipe gesture support (future enhancement)
- Optimized spacing and padding

### Breakpoint Behavior
```tsx
// Responsive width constraints
<MessageBubble
  content="This message adapts to screen size"
  variant="sent"
  className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
/>
```

### Container Adaptations
- Flexible width based on content and screen size
- Proper text wrapping and overflow handling
- Avatar size adjustments for smaller screens

## Chat Interface Integration

### Message Threading
```tsx
// Basic message thread structure
<div className="space-y-3">
  <MessageBubble
    content="Start of conversation"
    variant="sent"
    timestamp={new Date(Date.now() - 10 * 60 * 1000)}
    status="read"
  />
  <MessageBubble
    content="Response message"
    variant="received"
    author={{ id: '2', name: 'Alice' }}
    timestamp={new Date(Date.now() - 5 * 60 * 1000)}
    showAuthor
  />
  <MessageBubble
    content="Follow-up message"
    variant="received"
    author={{ id: '2', name: 'Alice' }}
    timestamp={new Date()}
    showAuthor={false} // Don't repeat author for consecutive messages
  />
</div>
```

### Message Grouping
- Consecutive messages from same author
- Automatic author info suppression
- Timestamp optimization for message groups
- Spacing adjustments for visual grouping

### Real-time Updates
```tsx
// Live message updates
const [messages, setMessages] = useState([]);

// Add new message
const addMessage = (content, variant = 'sent') => {
  const newMessage = {
    id: generateId(),
    content,
    variant,
    timestamp: new Date(),
    status: variant === 'sent' ? 'sending' : undefined
  };
  setMessages(prev => [...prev, newMessage]);

  // Simulate status updates for sent messages
  if (variant === 'sent') {
    setTimeout(() => updateMessageStatus(newMessage.id, 'sent'), 1000);
    setTimeout(() => updateMessageStatus(newMessage.id, 'delivered'), 2000);
  }
};
```

## Performance Considerations

### Virtualization Support
- Compatible with react-window for large chat histories
- Optimized rendering for thousands of messages
- Lazy loading of message content and media

### Memory Management
- Efficient React.memo usage for pure rendering
- Callback optimization with useCallback
- Minimal re-renders on prop changes

### Bundle Impact
- Tree-shakeable imports for optimal bundle size
- CVA for efficient variant class generation
- Shared dependencies with atomic components

## Testing Strategies

### Unit Tests
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MessageBubble } from './MessageBubble';

// Test message variants
test('renders sent message with correct styling', () => {
  render(<MessageBubble content="Test" variant="sent" />);
  const message = screen.getByText('Test');
  expect(message.closest('.ml-auto')).toBeInTheDocument();
});

// Test interactions
test('handles reaction clicks', () => {
  const onReact = jest.fn();
  const reactions = [{ emoji: '👍', count: 1, users: [], currentUserReacted: false }];

  render(
    <MessageBubble
      content="Test"
      variant="sent"
      reactions={reactions}
      onReact={onReact}
    />
  );

  fireEvent.click(screen.getByText('👍'));
  expect(onReact).toHaveBeenCalledWith('👍');
});
```

### Integration Tests
- Message threading scenarios
- Real-time status updates
- Accessibility compliance
- Cross-browser compatibility

### Visual Regression Tests
- Message appearance across themes
- Animation states and transitions
- Responsive behavior
- Status indicator accuracy

## Migration Guide

### From Basic Chat Components
```tsx
// Before - basic chat message
<div className="flex justify-end">
  <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
    {message.content}
  </div>
</div>

// After - MessageBubble component
<MessageBubble
  content={message.content}
  variant="sent"
  timestamp={message.timestamp}
  status={message.status}
  showTimestamp
/>
```

### From Other Chat Libraries
- Map existing message schemas to MessageBubble props
- Integrate with existing state management
- Migrate reaction systems and status indicators
- Preserve accessibility and performance features

## Future Enhancements

### Planned Features
- Message threading and replies
- Voice message support
- File drag-and-drop integration
- Advanced reaction picker
- Message search and highlighting
- Translation and language support

### API Extensions
- Custom status indicators
- Configurable animation preferences
- Enhanced accessibility options
- Integration with notification systems

### Performance Improvements
- Advanced virtualization
- Optimistic UI updates
- Background message loading
- Smart caching strategies

## Browser Support

### Modern Browsers
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Full feature support with animations
- Optimal performance and accessibility

### Legacy Support
- Graceful degradation for older browsers
- Fallback styling without advanced animations
- Core functionality maintained

### Mobile Browsers
- iOS Safari 14+, Chrome Mobile 90+
- Touch optimization and gesture support
- Responsive design across device sizes