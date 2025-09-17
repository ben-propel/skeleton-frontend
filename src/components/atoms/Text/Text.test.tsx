import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Text } from './Text'

describe('Text Component', () => {
  it('renders with default variant and properties', () => {
    render(<Text>Default text</Text>)
    const textElement = screen.getByText('Default text')
    expect(textElement).toBeInTheDocument()
    expect(textElement.tagName).toBe('P')
  })

  describe('Semantic HTML mapping', () => {
    it('renders h1 element for h1 variant', () => {
      render(<Text variant="h1">Heading 1</Text>)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H1')
    })

    it('renders h2 element for h2 variant', () => {
      render(<Text variant="h2">Heading 2</Text>)
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H2')
    })

    it('renders h3 element for h3 variant', () => {
      render(<Text variant="h3">Heading 3</Text>)
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H3')
    })

    it('renders h4 element for h4 variant', () => {
      render(<Text variant="h4">Heading 4</Text>)
      const heading = screen.getByRole('heading', { level: 4 })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H4')
    })

    it('renders h5 element for h5 variant', () => {
      render(<Text variant="h5">Heading 5</Text>)
      const heading = screen.getByRole('heading', { level: 5 })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H5')
    })

    it('renders h6 element for h6 variant', () => {
      render(<Text variant="h6">Heading 6</Text>)
      const heading = screen.getByRole('heading', { level: 6 })
      expect(heading).toBeInTheDocument()
      expect(heading.tagName).toBe('H6')
    })

    it('renders code element for code variant', () => {
      render(<Text variant="code">const x = 1</Text>)
      const codeElement = screen.getByText('const x = 1')
      expect(codeElement).toBeInTheDocument()
      expect(codeElement.tagName).toBe('CODE')
    })

    it('renders figcaption element for caption variant', () => {
      render(<Text variant="caption">Image caption</Text>)
      const captionElement = screen.getByText('Image caption')
      expect(captionElement).toBeInTheDocument()
      expect(captionElement.tagName).toBe('FIGCAPTION')
    })

    it('renders p element for body variant', () => {
      render(<Text variant="body">Body text</Text>)
      const bodyElement = screen.getByText('Body text')
      expect(bodyElement).toBeInTheDocument()
      expect(bodyElement.tagName).toBe('P')
    })
  })

  describe('Custom element override', () => {
    it('renders custom element when as prop is provided', () => {
      render(<Text as="span">Span text</Text>)
      const spanElement = screen.getByText('Span text')
      expect(spanElement).toBeInTheDocument()
      expect(spanElement.tagName).toBe('SPAN')
    })

    it('prioritizes as prop over variant semantic mapping', () => {
      render(
        <Text variant="h1" as="div">
          Div with h1 styling
        </Text>
      )
      const divElement = screen.getByText('Div with h1 styling')
      expect(divElement).toBeInTheDocument()
      expect(divElement.tagName).toBe('DIV')
    })
  })

  describe('Size variants', () => {
    it('applies correct size classes', () => {
      render(<Text size="xs">Extra small</Text>)
      const textElement = screen.getByText('Extra small')
      expect(textElement).toHaveClass('text-xs')
    })

    it('applies 2xl size class correctly', () => {
      render(<Text size="2xl">2XL text</Text>)
      const textElement = screen.getByText('2XL text')
      expect(textElement).toHaveClass('text-2xl')
    })

    it('applies 3xl size class correctly', () => {
      render(<Text size="3xl">3XL text</Text>)
      const textElement = screen.getByText('3XL text')
      expect(textElement).toHaveClass('text-3xl')
    })
  })

  describe('Weight variants', () => {
    it('applies light weight class', () => {
      render(<Text weight="light">Light text</Text>)
      const textElement = screen.getByText('Light text')
      expect(textElement).toHaveClass('font-light')
    })

    it('applies bold weight class', () => {
      render(<Text weight="bold">Bold text</Text>)
      const textElement = screen.getByText('Bold text')
      expect(textElement).toHaveClass('font-bold')
    })
  })

  describe('Font family variants', () => {
    it('applies default sans font class', () => {
      render(<Text>Default sans text</Text>)
      const textElement = screen.getByText('Default sans text')
      expect(textElement).toHaveClass('font-sans')
    })

    it('applies sans font class explicitly', () => {
      render(<Text font="sans">Sans font text</Text>)
      const textElement = screen.getByText('Sans font text')
      expect(textElement).toHaveClass('font-sans')
    })

    it('applies serif font class', () => {
      render(<Text font="serif">Serif font text</Text>)
      const textElement = screen.getByText('Serif font text')
      expect(textElement).toHaveClass('font-serif')
    })

    it('applies mono font class', () => {
      render(<Text font="mono">Mono font text</Text>)
      const textElement = screen.getByText('Mono font text')
      expect(textElement).toHaveClass('font-mono')
    })

    it('code variant automatically uses mono font regardless of font prop', () => {
      render(<Text variant="code" font="serif">Code text</Text>)
      const textElement = screen.getByText('Code text')
      expect(textElement).toHaveClass('font-mono')
      expect(textElement).not.toHaveClass('font-serif')
    })

    it('allows font override for non-code variants', () => {
      render(<Text variant="h1" font="serif">Serif heading</Text>)
      const textElement = screen.getByText('Serif heading')
      expect(textElement).toHaveClass('font-serif')
      expect(textElement).toHaveClass('text-4xl')
    })
  })

  describe('Color variants', () => {
    it('applies default color class', () => {
      render(<Text color="default">Default color</Text>)
      const textElement = screen.getByText('Default color')
      expect(textElement).toHaveClass('text-foreground')
    })

    it('applies muted color class', () => {
      render(<Text color="muted">Muted color</Text>)
      const textElement = screen.getByText('Muted color')
      expect(textElement).toHaveClass('text-muted-foreground')
    })

    it('applies primary color class', () => {
      render(<Text color="primary">Primary color</Text>)
      const textElement = screen.getByText('Primary color')
      expect(textElement).toHaveClass('text-primary')
    })

    it('applies destructive color class', () => {
      render(<Text color="destructive">Destructive color</Text>)
      const textElement = screen.getByText('Destructive color')
      expect(textElement).toHaveClass('text-destructive')
    })
  })

  describe('Truncation options', () => {
    it('applies truncate class', () => {
      render(<Text truncate="truncate">Truncated text</Text>)
      const textElement = screen.getByText('Truncated text')
      expect(textElement).toHaveClass('truncate')
    })

    it('applies line-clamp classes', () => {
      render(<Text truncate="line-clamp-2">Line clamped text</Text>)
      const textElement = screen.getByText('Line clamped text')
      expect(textElement).toHaveClass('line-clamp-2')
    })

    it('applies line-clamp-4 class', () => {
      render(<Text truncate="line-clamp-4">Line clamped text</Text>)
      const textElement = screen.getByText('Line clamped text')
      expect(textElement).toHaveClass('line-clamp-4')
    })
  })

  describe('Markdown-style formatting', () => {
    it('applies bold formatting when bold prop is true', () => {
      render(<Text bold>Bold text</Text>)
      const textElement = screen.getByText('Bold text')
      expect(textElement).toHaveClass('font-bold')
    })

    it('applies italic formatting when italic prop is true', () => {
      render(<Text italic>Italic text</Text>)
      const textElement = screen.getByText('Italic text')
      expect(textElement).toHaveClass('italic')
    })

    it('applies underline formatting when underline prop is true', () => {
      render(<Text underline>Underlined text</Text>)
      const textElement = screen.getByText('Underlined text')
      expect(textElement).toHaveClass('underline')
    })

    it('applies strikethrough formatting when strikethrough prop is true', () => {
      render(<Text strikethrough>Strikethrough text</Text>)
      const textElement = screen.getByText('Strikethrough text')
      expect(textElement).toHaveClass('line-through')
    })

    it('applies multiple formatting props together', () => {
      render(
        <Text bold italic underline>
          Multi-formatted text
        </Text>
      )
      const textElement = screen.getByText('Multi-formatted text')
      expect(textElement).toHaveClass('font-bold')
      expect(textElement).toHaveClass('italic')
      expect(textElement).toHaveClass('underline')
    })

    it('bold prop overrides weight prop', () => {
      render(
        <Text weight="light" bold>
          Bold overrides light
        </Text>
      )
      const textElement = screen.getByText('Bold overrides light')
      expect(textElement).toHaveClass('font-bold')
      expect(textElement).not.toHaveClass('font-light')
    })
  })

  describe('Custom className', () => {
    it('applies custom className along with variant classes', () => {
      render(
        <Text className="custom-class" variant="h1">
          Custom styled text
        </Text>
      )
      const textElement = screen.getByText('Custom styled text')
      expect(textElement).toHaveClass('custom-class')
      expect(textElement).toHaveClass('text-4xl')
    })
  })

  describe('Variant-specific styling', () => {
    it('applies h1 variant styles correctly', () => {
      render(<Text variant="h1">H1 text</Text>)
      const textElement = screen.getByText('H1 text')
      expect(textElement).toHaveClass('text-4xl')
      expect(textElement).toHaveClass('font-extrabold')
      expect(textElement).toHaveClass('tracking-tight')
    })

    it('applies h2 variant styles correctly', () => {
      render(<Text variant="h2">H2 text</Text>)
      const textElement = screen.getByText('H2 text')
      expect(textElement).toHaveClass('text-3xl')
      expect(textElement).toHaveClass('font-semibold')
      expect(textElement).toHaveClass('border-b')
    })

    it('applies code variant styles correctly', () => {
      render(<Text variant="code">Code text</Text>)
      const textElement = screen.getByText('Code text')
      expect(textElement).toHaveClass('bg-muted')
      expect(textElement).toHaveClass('font-mono')
      expect(textElement).toHaveClass('rounded')
    })

    it('applies caption variant styles correctly', () => {
      render(<Text variant="caption">Caption text</Text>)
      const textElement = screen.getByText('Caption text')
      expect(textElement).toHaveClass('text-sm')
      expect(textElement).toHaveClass('text-muted-foreground')
    })
  })

  describe('Accessibility', () => {
    it('maintains accessibility with proper heading structure', () => {
      render(
        <div>
          <Text variant="h1">Main Title</Text>
          <Text variant="h2">Subtitle</Text>
          <Text variant="h3">Section Title</Text>
        </div>
      )

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title')
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Subtitle')
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Section Title')
    })
  })

  describe('Complex combinations', () => {
    it('handles complex prop combinations correctly', () => {
      render(
        <Text
          variant="body"
          size="lg"
          weight="medium"
          color="primary"
          truncate="line-clamp-3"
          font="serif"
          bold
          italic
          className="custom-spacing"
        >
          Complex text example
        </Text>
      )

      const textElement = screen.getByText('Complex text example')
      expect(textElement).toHaveClass('text-lg') // size
      expect(textElement).toHaveClass('font-bold') // bold overrides weight
      expect(textElement).toHaveClass('text-primary') // color
      expect(textElement).toHaveClass('line-clamp-3') // truncate
      expect(textElement).toHaveClass('font-serif') // font family
      expect(textElement).toHaveClass('italic') // italic formatting
      expect(textElement).toHaveClass('custom-spacing') // custom class
    })

    it('handles font family with different variants', () => {
      render(
        <div>
          <Text variant="h1" font="serif">Serif Heading</Text>
          <Text variant="body" font="mono">Mono Body</Text>
          <Text variant="code">Auto Mono Code</Text>
        </div>
      )

      expect(screen.getByText('Serif Heading')).toHaveClass('font-serif')
      expect(screen.getByText('Mono Body')).toHaveClass('font-mono')
      expect(screen.getByText('Auto Mono Code')).toHaveClass('font-mono')
    })
  })

  describe('Content handling', () => {
    it('renders string content correctly', () => {
      render(<Text>This is &quot;quoted text&quot; example</Text>)
      const textElement = screen.getByText(/This is.*quoted text.*example/)
      expect(textElement).toBeInTheDocument()
    })

    it('renders apostrophes correctly', () => {
      render(<Text>It&apos;s a beautiful day, isn&apos;t it?</Text>)
      const textElement = screen.getByText(/It.*s a beautiful day/)
      expect(textElement).toBeInTheDocument()
    })

    it('preserves React elements within children', () => {
      render(
        <Text>
          This is <strong>bold</strong> and &quot;quoted&quot;
        </Text>
      )
      const boldElement = screen.getByText('bold')
      expect(boldElement.tagName).toBe('STRONG')
    })

    it('handles empty and non-string content gracefully', () => {
      const { container } = render(<Text data-testid="empty-text">{null}</Text>)
      const textElement = container.querySelector('[data-testid="empty-text"]')
      expect(textElement).toBeInTheDocument()
    })

    it('preserves numeric and boolean children', () => {
      render(<Text>{42}</Text>)
      const textElement = screen.getByText('42')
      expect(textElement).toBeInTheDocument()
    })

    it('works with code variant containing quotes', () => {
      render(<Text variant="code">console.log(&apos;Hello &quot;World&quot;&apos;)</Text>)
      const codeElement = screen.getByText(/console\.log/)
      expect(codeElement.tagName).toBe('CODE')
    })
  })
})