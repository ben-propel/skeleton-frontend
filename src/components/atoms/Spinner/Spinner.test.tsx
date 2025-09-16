import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status', { name: 'Loading' });
      expect(spinner).toBeInTheDocument();
    });

    it('should render with custom aria-label', () => {
      render(<Spinner aria-label="Processing data" />);
      const spinner = screen.getByRole('status', { name: 'Processing data' });
      expect(spinner).toBeInTheDocument();
    });

    it('should include screen reader text', () => {
      render(<Spinner aria-label="Custom loading" />);
      expect(screen.getByText('Custom loading')).toHaveClass('sr-only');
    });
  });

  describe('Size Variants', () => {
    it('should apply xs size classes (12px)', () => {
      render(<Spinner size="xs" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('h-3', 'w-3', 'border-[1px]');
    });

    it('should apply sm size classes (16px)', () => {
      render(<Spinner size="sm" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('h-4', 'w-4', 'border-[1.5px]');
    });

    it('should apply md size classes (20px) as default', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('h-5', 'w-5', 'border-2');
    });

    it('should apply lg size classes (24px)', () => {
      render(<Spinner size="lg" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('h-6', 'w-6', 'border-2');
    });

    it('should apply xl size classes (32px)', () => {
      render(<Spinner size="xl" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('h-8', 'w-8', 'border-[3px]');
    });
  });

  describe('Animation Variants', () => {
    it('should apply spin variant as default', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('animate-spin', 'border-t-transparent');
    });

    it('should apply pulse variant', () => {
      render(<Spinner variant="pulse" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('animate-pulse', 'border-2', 'border-current');
    });

    it('should render dots variant with multiple elements', () => {
      render(<Spinner variant="dots" aria-label="Loading dots" />);
      const dotsContainer = screen.getByRole('status', { name: 'Loading dots' });
      expect(dotsContainer).toBeInTheDocument();
      expect(dotsContainer).toHaveClass('flex', 'space-x-1');

      // Should have 3 dot elements
      const dots = dotsContainer.querySelectorAll('div');
      expect(dots).toHaveLength(3);

      // Each dot should have bounce animation
      dots.forEach((dot) => {
        expect(dot).toHaveClass('animate-bounce', 'border-none', 'bg-current', 'rounded-full');
      });
    });
  });

  describe('Color Variants', () => {
    it('should apply primary color as default', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('border-primary', 'border-t-transparent');
    });

    it('should apply secondary color', () => {
      render(<Spinner color="secondary" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('border-secondary', 'border-t-transparent');
    });

    it('should apply success color', () => {
      render(<Spinner color="success" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('border-green-500', 'border-t-transparent');
    });

    it('should apply destructive color', () => {
      render(<Spinner color="destructive" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('border-destructive', 'border-t-transparent');
    });

    it('should apply current color', () => {
      render(<Spinner color="current" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('border-current', 'border-t-transparent');
    });
  });

  describe('Speed Variants', () => {
    it('should apply normal speed as default', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('[animation-duration:1s]');
    });

    it('should apply slow speed', () => {
      render(<Spinner speed="slow" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('[animation-duration:2s]');
    });

    it('should apply fast speed', () => {
      render(<Spinner speed="fast" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('[animation-duration:0.5s]');
    });
  });

  describe('Custom Duration', () => {
    it('should apply custom duration via style', () => {
      render(<Spinner duration={1.5} data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveStyle({ animationDuration: '1.5s' });
    });

    it('should override speed variant when custom duration is provided', () => {
      render(<Spinner speed="fast" duration={3} data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveStyle({ animationDuration: '3s' });
    });

    it('should apply custom duration to dots variant', () => {
      render(<Spinner variant="dots" duration={0.8} aria-label="Custom dots" />);
      const dotsContainer = screen.getByRole('status', { name: 'Custom dots' });
      const dots = dotsContainer.querySelectorAll('div');

      dots.forEach((dot) => {
        expect(dot).toHaveStyle({ animationDuration: '0.8s' });
      });
    });
  });

  describe('Overlay Variant', () => {
    it('should render overlay with default backdrop blur', () => {
      render(<Spinner overlay data-testid="overlay-spinner" />);
      const overlay = document.querySelector('.fixed.inset-0.z-50');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass('bg-background/80', 'backdrop-blur-sm');

      const spinner = screen.getByTestId('overlay-spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('should render overlay with transparent backdrop', () => {
      render(<Spinner overlay backdrop="transparent" />);
      const overlay = document.querySelector('.fixed.inset-0.z-50');
      expect(overlay).toHaveClass('bg-transparent');
    });

    it('should render overlay with solid backdrop', () => {
      render(<Spinner overlay backdrop="solid" />);
      const overlay = document.querySelector('.fixed.inset-0.z-50');
      expect(overlay).toHaveClass('bg-background/90');
    });

    it('should render dots variant in overlay', () => {
      render(<Spinner variant="dots" overlay aria-label="Overlay dots" />);
      const overlay = document.querySelector('.fixed.inset-0.z-50');
      expect(overlay).toBeInTheDocument();

      // Should have dots container within overlay
      const dotsContainer = overlay?.querySelector('.flex.space-x-1');
      expect(dotsContainer).toBeInTheDocument();

      // Should have 3 dots
      const dots = dotsContainer?.querySelectorAll('div');
      expect(dots).toHaveLength(3);
    });
  });

  describe('Accessibility', () => {
    it('should have proper role="status"', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('should have aria-label attribute', () => {
      render(<Spinner aria-label="Processing request" />);
      const spinner = screen.getByRole('status', { name: 'Processing request' });
      expect(spinner).toHaveAttribute('aria-label', 'Processing request');
    });

    it('should have default aria-label', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });

    it('should include visually hidden text for screen readers', () => {
      render(<Spinner aria-label="Custom loading text" />);
      const hiddenText = screen.getByText('Custom loading text');
      expect(hiddenText).toHaveClass('sr-only');
    });
  });

  describe('Styling', () => {
    it('should merge custom className with variant classes', () => {
      render(<Spinner className="text-blue-500" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('text-blue-500', 'animate-spin', 'border-primary');
    });

    it('should apply base classes', () => {
      render(<Spinner data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('inline-block', 'border-solid', 'rounded-full');
    });

    it('should accept custom HTML props', () => {
      render(
        <Spinner
          id="custom-spinner"
          data-custom="test"
          data-testid="spinner"
        />
      );
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveAttribute('id', 'custom-spinner');
      expect(spinner).toHaveAttribute('data-custom', 'test');
    });

    it('should merge custom style with duration style', () => {
      render(
        <Spinner
          duration={2}
          style={{ fontSize: '16px' }}
          data-testid="spinner"
        />
      );
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveStyle({
        animationDuration: '2s',
        fontSize: '16px',
      });
    });
  });

  describe('ForwardRef', () => {
    it('should forward ref to spinner element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Spinner ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('inline-block', 'border-solid', 'rounded-full');
    });

    it('should forward ref correctly for dots variant', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Spinner variant="dots" ref={ref} />);

      // For dots variant, ref is forwarded to the container
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Compound Variants', () => {
    it('should combine size and color variants correctly', () => {
      render(<Spinner size="lg" color="success" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('h-6', 'w-6', 'border-green-500');
    });

    it('should combine variant and speed correctly', () => {
      render(<Spinner variant="spin" speed="fast" data-testid="spinner" />);
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass('animate-spin', '[animation-duration:0.5s]');
    });

    it('should work with all variants combined', () => {
      render(
        <Spinner
          size="xl"
          variant="spin"
          color="destructive"
          speed="slow"
          data-testid="spinner"
        />
      );
      const spinner = screen.getByTestId('spinner');
      expect(spinner).toHaveClass(
        'h-8',
        'w-8',
        'border-[3px]',
        'animate-spin',
        'border-destructive',
        'border-t-transparent',
        '[animation-duration:2s]'
      );
    });
  });
});