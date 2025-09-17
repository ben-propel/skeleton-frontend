import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check, CheckCheck, Clock, AlertCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/atoms/Button'
import { Timestamp } from '@/components/atoms/Timestamp'

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: User[];
  currentUserReacted: boolean;
}

export type MessageVariant = 'sent' | 'received' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
export type MessageShape = 'rounded' | 'speechbox' | 'square' | 'pill';

const messageBubbleVariants = cva(
  'max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl break-words',
  {
    variants: {
      variant: {
        sent: 'ml-auto bg-primary text-primary-foreground',
        received: 'mr-auto bg-muted text-muted-foreground',
        system: 'mx-auto bg-secondary/50 text-secondary-foreground text-center text-sm',
      },
      shape: {
        rounded: 'rounded-xl',
        speechbox: 'rounded-xl',
        square: 'rounded-sm',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'sent',
      shape: 'rounded',
    },
  }
)

export interface MessageBubbleProps extends VariantProps<typeof messageBubbleVariants> {
  /** Message content - can be string or React node for rich content */
  content: string | React.ReactNode;
  /** Message bubble variant - determines styling and positioning */
  variant: MessageVariant;
  /** Message timestamp */
  timestamp?: Date;
  /** Message author information */
  author?: User;
  /** Message delivery/read status */
  status?: MessageStatus;
  /** Array of emoji reactions */
  reactions?: Reaction[];
  /** Callback fired when user reacts with emoji */
  onReact?: (emoji: string) => void;
  /** Callback fired when retry button is clicked (for failed messages) */
  onRetry?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show timestamp */
  showTimestamp?: boolean;
  /** Whether to show author info (for received messages) */
  showAuthor?: boolean;
  /** Maximum width of the bubble (responsive) */
  maxWidth?: string;
  /** Shape variant for the message bubble */
  shape?: MessageShape;
}

const getStatusIcon = (status: MessageStatus): React.ReactNode => {
  switch (status) {
    case 'sending':
      return <Clock className="h-3 w-3 animate-pulse" />
    case 'sent':
      return <Check className="h-3 w-3" />
    case 'delivered':
      return <CheckCheck className="h-3 w-3" />
    case 'read':
      return <CheckCheck className="h-3 w-3 text-blue-500" />
    case 'failed':
      return <AlertCircle className="h-3 w-3 text-destructive" />
    default:
      return null
  }
}

const getAuthorInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
}


/**
 * MessageBubble component for chat interfaces
 *
 * @component
 * @example
 * ```tsx
 * <MessageBubble
 *   content="Hello, how are you?"
 *   variant="sent"
 *   shape="speechbox"
 *   timestamp={new Date()}
 *   status="delivered"
 *   showTimestamp
 * />
 * ```
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  variant,
  timestamp,
  author,
  status,
  reactions = [],
  onReact,
  onRetry,
  className,
  showTimestamp = true,
  showAuthor = true,
  maxWidth,
  shape = 'rounded',
  ...props
}) => {
  const isSystemMessage = variant === 'system'
  const isSentMessage = variant === 'sent'
  const isReceivedMessage = variant === 'received'

  return (
    <div
      className={cn(
        'flex flex-col gap-1 animate-in slide-in-from-bottom-2 duration-200',
        isSentMessage && 'items-end',
        isReceivedMessage && 'items-start',
        isSystemMessage && 'items-center',
        className
      )}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {/* Author info for received messages */}
      {isReceivedMessage && showAuthor && author && (
        <div className="flex items-center gap-2 px-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="text-xs">
              {getAuthorInitials(author.name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground font-medium">
            {author.name}
          </span>
        </div>
      )}

      {/* Message bubble */}
      <Card
        className={cn(
          messageBubbleVariants({ variant, shape }),
          isSystemMessage && 'border-none shadow-none',
          className
        )}
        {...props}
      >
        <CardContent
          className={cn(
            'p-3',
            isSystemMessage && 'p-2'
          )}
        >
          <div className="flex flex-col gap-1">
            {/* Message content */}
            <div className={cn(
              'text-sm leading-relaxed',
              isSystemMessage && 'text-xs'
            )}>
              {content}
            </div>

            {/* Reactions */}
            {reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {reactions.map((reaction) => (
                  <Button
                    key={reaction.emoji}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'h-6 px-2 text-xs gap-1',
                      reaction.currentUserReacted && (
                        variant === 'sent'
                          ? 'bg-primary-foreground/20 border border-primary-foreground/30'
                          : 'bg-primary/10 border border-primary/20'
                      ),
                      // Variant-specific hover and text styles
                      variant === 'sent'
                        ? 'hover:bg-primary-foreground/30 text-primary-foreground hover:text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                    onClick={() => onReact?.(reaction.emoji)}
                  >
                    <span>{reaction.emoji}</span>
                    <span>{reaction.count}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timestamp and status */}
      <div className={cn(
        'flex items-center gap-2 px-2',
        isSentMessage && 'flex-row-reverse'
      )}>
        {/* Retry button for failed messages */}
        {status === 'failed' && onRetry && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 text-destructive hover:text-destructive"
            onClick={onRetry}
            aria-label="Retry sending message"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        )}

        {/* Status indicator for sent messages */}
        {isSentMessage && status && (
          <div className="flex items-center" aria-label={`Message ${status}`}>
            {getStatusIcon(status)}
          </div>
        )}

        {/* Timestamp */}
        {showTimestamp && timestamp && (
          <Timestamp
            date={timestamp}
            format="relative"
            variant="muted"
            size="xs"
            refreshInterval={30}
          />
        )}
      </div>
    </div>
  )
}

MessageBubble.displayName = 'MessageBubble'