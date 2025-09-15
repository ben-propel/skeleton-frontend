import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Icon, type LucideIconName } from './Icon';
import { Star, Settings, ChevronRight } from 'lucide-react';

describe('Icon', () => {
  describe('Rendering', () => {
    it('should render with icon name', () => {
      render(<Icon name="Star" aria-label="Favorite" />);
      const icon = screen.getByRole('img', { name: 'Favorite' });
      expect(icon).toBeInTheDocument();
    });

    it('should render with custom icon component', () => {
      render(<Icon icon={Star} aria-label="Star icon" />);
      const icon = screen.getByRole('img', { name: 'Star icon' });
      expect(icon).toBeInTheDocument();
    });

    it('should render decorative icon with aria-hidden', () => {
      render(<Icon name="ChevronRight" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should return null for invalid icon name', () => {
      const { container } = render(<Icon name={'InvalidIcon' as LucideIconName} />);
      expect(container.firstChild).toBeNull();
    });

    it('should return null when no icon or name provided', () => {
      const { container } = render(<Icon />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Size Variants', () => {
    it('should apply xs size classes (12px)', () => {
      render(<Icon name="Star" size="xs" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toHaveClass('h-3', 'w-3');
    });

    it('should apply sm size classes (16px)', () => {
      render(<Icon name="Star" size="sm" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toHaveClass('h-4', 'w-4');
    });

    it('should apply md size classes (20px) as default', () => {
      render(<Icon name="Star" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toHaveClass('h-5', 'w-5');
    });

    it('should apply lg size classes (24px)', () => {
      render(<Icon name="Star" size="lg" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toHaveClass('h-6', 'w-6');
    });

    it('should apply xl size classes (32px)', () => {
      render(<Icon name="Star" size="xl" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toHaveClass('h-8', 'w-8');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label when provided', () => {
      render(<Icon name="Settings" aria-label="Open settings" />);
      const icon = screen.getByRole('img', { name: 'Open settings' });
      expect(icon).toHaveAttribute('aria-label', 'Open settings');
    });

    it('should be hidden from screen readers when aria-hidden is true', () => {
      render(<Icon name="ChevronRight" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).not.toHaveAttribute('aria-label');
      expect(icon).not.toHaveAttribute('role', 'img');
    });

    it('should not have role="img" when aria-hidden', () => {
      render(<Icon name="Star" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).not.toHaveAttribute('role', 'img');
    });

    it('should have role="img" when aria-label is provided', () => {
      render(<Icon name="Star" aria-label="Rating" />);
      const icon = screen.getByRole('img', { name: 'Rating' });
      expect(icon).toHaveAttribute('role', 'img');
    });
  });

  describe('Styling', () => {
    it('should merge custom className with size variants', () => {
      render(<Icon name="Star" className="text-yellow-500" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toHaveClass('text-yellow-500', 'h-5', 'w-5', 'flex-shrink-0');
    });

    it('should apply base classes', () => {
      render(<Icon name="Star" aria-hidden />);
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toHaveClass('flex-shrink-0');
    });

    it('should accept custom SVG props', () => {
      render(
        <Icon
          name="Star"
          fill="currentColor"
          strokeWidth={1.5}
          data-testid="custom-icon"
          aria-hidden
        />
      );
      const icon = screen.getByTestId('custom-icon');
      expect(icon).toHaveAttribute('fill', 'currentColor');
      expect(icon).toHaveAttribute('stroke-width', '1.5');
    });
  });

  describe('Icon Components', () => {
    it('should work with various Lucide icon names', () => {
      const iconNames = ['Star', 'Settings', 'ChevronRight', 'User', 'Heart'] as const;

      iconNames.forEach((iconName) => {
        const { rerender } = render(<Icon name={iconName} aria-label={iconName} />);
        const icon = screen.getByRole('img', { name: iconName });
        expect(icon).toBeInTheDocument();
        rerender(<div />); // Clear for next iteration
      });
    });

    it('should work with direct Lucide icon components', () => {
      const IconComponents = [
        { component: Star, name: 'Star' },
        { component: Settings, name: 'Settings' },
        { component: ChevronRight, name: 'ChevronRight' },
      ];

      IconComponents.forEach(({ component, name }) => {
        const { rerender } = render(<Icon icon={component} aria-label={name} />);
        const icon = screen.getByRole('img', { name });
        expect(icon).toBeInTheDocument();
        rerender(<div />); // Clear for next iteration
      });
    });
  });

  describe('Error Handling', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    afterEach(() => {
      consoleSpy.mockClear();
    });

    it('should return null for invalid icon name', () => {
      const { container } = render(<Icon name={'NonExistentIcon' as LucideIconName} />);
      expect(container.firstChild).toBeNull();
    });

    it('should handle invalid icon gracefully', () => {
      // Test that component doesn't crash with invalid icon
      expect(() => {
        render(<Icon name={'InvalidIconName' as LucideIconName} />);
      }).not.toThrow();
    });
  });

  describe('ForwardRef', () => {
    it('should forward ref to SVG element', () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<Icon name="Star" ref={ref} aria-hidden />);

      expect(ref.current).toBeInstanceOf(SVGSVGElement);
    });
  });
});