import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { MessageBubble } from './MessageBubble'
import type { User, Reaction} from './MessageBubble'

describe('MessageBubble', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg'
  }

  const mockReactions: Reaction[] = [
    {
      emoji: '👍',
      count: 2,
      users: [mockUser],
      currentUserReacted: true
    },
    {
      emoji: '❤️',
      count: 1,
      users: [mockUser],
      currentUserReacted: false
    }
  ]

  it('should render with basic content', () => {
    render(<MessageBubble content="Hello world" variant="sent" />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('should render React node content', () => {
    const content = <div data-testid="rich-content">Rich content</div>
    render(<MessageBubble content={content} variant="sent" />)
    expect(screen.getByTestId('rich-content')).toBeInTheDocument()
  })

  it('should apply correct variant styles', () => {
    const { rerender } = render(<MessageBubble content="Test" variant="sent" />)
    let container = screen.getByText('Test').closest('.max-w-xs')
    expect(container).toHaveClass('ml-auto', 'bg-primary')

    rerender(<MessageBubble content="Test" variant="received" />)
    container = screen.getByText('Test').closest('.max-w-xs')
    expect(container).toHaveClass('mr-auto', 'bg-muted')

    rerender(<MessageBubble content="Test" variant="system" />)
    container = screen.getByText('Test').closest('.max-w-xs')
    expect(container).toHaveClass('mx-auto', 'bg-secondary/50')
  })

  it('should display timestamp when provided', () => {
    const timestamp = new Date('2024-01-01T12:00:00Z')
    render(
      <MessageBubble
        content="Test message"
        variant="sent"
        timestamp={timestamp}
        showTimestamp
      />
    )

    expect(screen.getByText(/ago/)).toBeInTheDocument()
  })

  it('should hide timestamp when showTimestamp is false', () => {
    const timestamp = new Date('2024-01-01T12:00:00Z')
    render(
      <MessageBubble
        content="Test message"
        variant="sent"
        timestamp={timestamp}
        showTimestamp={false}
      />
    )

    expect(screen.queryByText(/ago/)).not.toBeInTheDocument()
  })

  it('should display author info for received messages', () => {
    render(
      <MessageBubble
        content="Test message"
        variant="received"
        author={mockUser}
        showAuthor
      />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('JD')).toBeInTheDocument() // initials
  })

  it('should hide author info when showAuthor is false', () => {
    render(
      <MessageBubble
        content="Test message"
        variant="received"
        author={mockUser}
        showAuthor={false}
      />
    )

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })

  it('should not show author info for sent messages', () => {
    render(
      <MessageBubble
        content="Test message"
        variant="sent"
        author={mockUser}
        showAuthor
      />
    )

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })

  it('should display status icons correctly', () => {
    const { rerender } = render(
      <MessageBubble content="Test" variant="sent" status="sending" />
    )
    expect(screen.getByLabelText('Message sending')).toBeInTheDocument()

    rerender(<MessageBubble content="Test" variant="sent" status="sent" />)
    expect(screen.getByLabelText('Message sent')).toBeInTheDocument()

    rerender(<MessageBubble content="Test" variant="sent" status="delivered" />)
    expect(screen.getByLabelText('Message delivered')).toBeInTheDocument()

    rerender(<MessageBubble content="Test" variant="sent" status="read" />)
    expect(screen.getByLabelText('Message read')).toBeInTheDocument()

    rerender(<MessageBubble content="Test" variant="sent" status="failed" />)
    expect(screen.getByLabelText('Message failed')).toBeInTheDocument()
  })

  it('should display retry button for failed messages', () => {
    const onRetry = vi.fn()
    render(
      <MessageBubble
        content="Test message"
        variant="sent"
        status="failed"
        onRetry={onRetry}
      />
    )

    const retryButton = screen.getByRole('button', { name: 'Retry sending message' })
    expect(retryButton).toBeInTheDocument()

    fireEvent.click(retryButton)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('should display reactions', () => {
    render(
      <MessageBubble
        content="Test message"
        variant="sent"
        reactions={mockReactions}
      />
    )

    expect(screen.getByText('👍')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('❤️')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should handle reaction clicks', () => {
    const onReact = vi.fn()
    render(
      <MessageBubble
        content="Test message"
        variant="sent"
        reactions={mockReactions}
        onReact={onReact}
      />
    )

    const likeButton = screen.getByRole('button', { name: /👍/ })
    fireEvent.click(likeButton)

    expect(onReact).toHaveBeenCalledWith('👍')
  })

  it('should highlight current user reactions with variant-specific styling', () => {
    // Test sent message reactions
    const { rerender } = render(
      <MessageBubble
        content="Test message"
        variant="sent"
        reactions={mockReactions}
      />
    )

    const likeButton = screen.getByRole('button', { name: /👍/ })
    expect(likeButton).toHaveClass('bg-primary-foreground/20', 'border-primary-foreground/30')
    expect(likeButton).toHaveClass('text-primary-foreground')

    // Test received message reactions
    rerender(
      <MessageBubble
        content="Test message"
        variant="received"
        reactions={mockReactions}
        author={mockUser}
      />
    )

    const likeButtonReceived = screen.getByRole('button', { name: /👍/ })
    expect(likeButtonReceived).toHaveClass('bg-primary/10', 'border-primary/20')
  })

  it('should apply variant-specific hover states for proper contrast', () => {
    // Test sent message hover styles
    const { rerender } = render(
      <MessageBubble
        content="Test message"
        variant="sent"
        reactions={[{
          emoji: '👍',
          count: 1,
          users: [],
          currentUserReacted: false
        }]}
      />
    )

    const sentReactionButton = screen.getByRole('button', { name: /👍/ })
    expect(sentReactionButton).toHaveClass('hover:bg-primary-foreground/30')
    expect(sentReactionButton).toHaveClass('text-primary-foreground')

    // Test received message hover styles
    rerender(
      <MessageBubble
        content="Test message"
        variant="received"
        reactions={[{
          emoji: '👍',
          count: 1,
          users: [],
          currentUserReacted: false
        }]}
        author={mockUser}
      />
    )

    const receivedReactionButton = screen.getByRole('button', { name: /👍/ })
    expect(receivedReactionButton).toHaveClass('hover:bg-accent')
    expect(receivedReactionButton).toHaveClass('hover:text-accent-foreground')
  })

  it('should merge custom className', () => {
    render(
      <MessageBubble
        content="Test message"
        variant="sent"
        className="custom-class"
      />
    )

    const container = screen.getByText('Test message').closest('.custom-class')
    expect(container).toBeInTheDocument()
  })

  it('should apply custom maxWidth style', () => {
    const { container } = render(
      <MessageBubble
        content="Test message"
        variant="sent"
        maxWidth="500px"
      />
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({ maxWidth: '500px' })
  })

  it('should handle system messages correctly', () => {
    render(
      <MessageBubble
        content="System notification"
        variant="system"
      />
    )

    const message = screen.getByText('System notification')
    expect(message).toHaveClass('text-xs')

    const card = message.closest('div[class*="rounded-xl"]')
    expect(card).toHaveClass('border-none', 'shadow-none')
  })

  it('should not display status icons for received messages', () => {
    render(
      <MessageBubble
        content="Test message"
        variant="received"
        status="delivered"
      />
    )

    expect(screen.queryByLabelText('Message delivered')).not.toBeInTheDocument()
  })

  it('should handle empty reactions array', () => {
    render(
      <MessageBubble
        content="Test message"
        variant="sent"
        reactions={[]}
      />
    )

    expect(screen.queryByRole('button', { name: /👍/ })).not.toBeInTheDocument()
  })

  it('should render without timestamp', () => {
    render(
      <MessageBubble
        content="Test message"
        variant="sent"
      />
    )

    expect(screen.queryByText(/ago/)).not.toBeInTheDocument()
  })

  it('should apply shape variants correctly', () => {
    const { rerender } = render(<MessageBubble content="Test" variant="sent" shape="rounded" />)
    let card = screen.getByText('Test').closest('div[class*="rounded-xl"]')
    expect(card).toBeInTheDocument()

    rerender(<MessageBubble content="Test" variant="sent" shape="square" />)
    card = screen.getByText('Test').closest('div[class*="rounded-sm"]')
    expect(card).toBeInTheDocument()

    rerender(<MessageBubble content="Test" variant="sent" shape="pill" />)
    card = screen.getByText('Test').closest('div[class*="rounded-full"]')
    expect(card).toBeInTheDocument()

    rerender(<MessageBubble content="Test" variant="sent" shape="speechbox" />)
    card = screen.getByText('Test').closest('div[class*="rounded-xl"]')
    expect(card).toBeInTheDocument()
  })


  it('should default to rounded shape when shape prop is not provided', () => {
    render(<MessageBubble content="Test" variant="sent" />)
    const card = screen.getByText('Test').closest('div[class*="rounded-xl"]')
    expect(card).toBeInTheDocument()
  })
})