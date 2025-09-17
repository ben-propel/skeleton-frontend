import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusDot } from './StatusDot';

describe('StatusDot', () => {
  it('should render with default props', () => {
    render(<StatusDot />);
    const statusDot = screen.getByRole('status');

    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveClass('bg-gray-400'); // default offline status
    expect(statusDot).toHaveClass('h-3', 'w-3'); // default md size
    expect(statusDot).toHaveClass('relative'); // default relative position
  });

  it('should apply status variants correctly', () => {
    const { rerender } = render(<StatusDot status="online" />);
    let statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('bg-green-500');

    rerender(<StatusDot status="offline" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('bg-gray-400');

    rerender(<StatusDot status="busy" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('bg-red-500');

    rerender(<StatusDot status="away" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('bg-yellow-500');

    rerender(<StatusDot status="error" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('bg-destructive');
  });

  it('should apply size variants correctly', () => {
    const { rerender } = render(<StatusDot size="sm" />);
    let statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('h-2', 'w-2');

    rerender(<StatusDot size="md" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('h-3', 'w-3');

    rerender(<StatusDot size="lg" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('h-4', 'w-4');
  });

  it('should apply position variants correctly', () => {
    const { rerender } = render(<StatusDot position="relative" />);
    let statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('relative');

    rerender(<StatusDot position="absolute" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('absolute');
  });

  it('should apply pulse animation correctly', () => {
    render(<StatusDot pulse />);
    const statusDot = screen.getByRole('status');

    expect(statusDot).toHaveClass('animate-pulse');
  });

  it('should apply ping animation for active status with pulse', () => {
    const { rerender } = render(<StatusDot status="online" pulse />);
    let statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('animate-ping');

    rerender(<StatusDot status="busy" pulse />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('animate-ping');

    rerender(<StatusDot status="error" pulse />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('animate-ping');
  });

  it('should apply placement classes for absolute positioning', () => {
    const { rerender } = render(
      <StatusDot position="absolute" placement="top-right" />
    );
    let statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('top-0', 'right-0', 'transform');

    rerender(<StatusDot position="absolute" placement="top-left" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('top-0', 'left-0');

    rerender(<StatusDot position="absolute" placement="bottom-right" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('bottom-0', 'right-0');

    rerender(<StatusDot position="absolute" placement="bottom-left" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveClass('bottom-0', 'left-0');
  });

  it('should not apply placement classes for relative positioning', () => {
    render(<StatusDot position="relative" placement="top-right" />);
    const statusDot = screen.getByRole('status');

    expect(statusDot).toHaveClass('relative');
    expect(statusDot).not.toHaveClass('top-0', 'right-0');
  });

  it('should apply custom color with style prop', () => {
    render(<StatusDot customColor="#8b5cf6" />);
    const statusDot = screen.getByRole('status');

    expect(statusDot).toHaveStyle('background-color: #8b5cf6');
  });

  it('should generate correct aria-label based on status', () => {
    const { rerender } = render(<StatusDot status="online" />);
    let statusDot = screen.getByRole('status');
    expect(statusDot).toHaveAttribute('aria-label', 'Online');

    rerender(<StatusDot status="offline" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveAttribute('aria-label', 'Offline');

    rerender(<StatusDot status="busy" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveAttribute('aria-label', 'Busy');

    rerender(<StatusDot status="away" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveAttribute('aria-label', 'Away');

    rerender(<StatusDot status="error" />);
    statusDot = screen.getByRole('status');
    expect(statusDot).toHaveAttribute('aria-label', 'Error');
  });

  it('should use custom aria-label when provided', () => {
    render(<StatusDot status="online" aria-label="User is currently online" />);
    const statusDot = screen.getByRole('status');

    expect(statusDot).toHaveAttribute('aria-label', 'User is currently online');
  });

  it('should have title attribute for tooltip', () => {
    render(<StatusDot status="busy" />);
    const statusDot = screen.getByRole('status');

    expect(statusDot).toHaveAttribute('title', 'Busy');
  });

  it('should include screen reader only text', () => {
    render(<StatusDot status="online" />);
    const screenReaderText = screen.getByText('Online');

    expect(screenReaderText).toBeInTheDocument();
    expect(screenReaderText).toHaveClass('sr-only');
  });

  it('should merge custom className', () => {
    render(<StatusDot className="custom-class" />);
    const statusDot = screen.getByRole('status');

    expect(statusDot).toHaveClass('custom-class');
    expect(statusDot).toHaveClass('bg-gray-400'); // should still have default classes
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<StatusDot ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should spread additional props', () => {
    render(<StatusDot data-testid="status-indicator" tabIndex={0} />);
    const statusDot = screen.getByTestId('status-indicator');

    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveAttribute('tabIndex', '0');
  });

  it('should handle style prop correctly with custom color', () => {
    render(
      <StatusDot
        customColor="#ff0000"
        style={{ border: '1px solid black' }}
      />
    );
    const statusDot = screen.getByRole('status');

    expect(statusDot).toHaveStyle('background-color: #ff0000');
    expect(statusDot).toHaveStyle('border: 1px solid black');
  });

  describe('accessibility', () => {
    it('should have correct role', () => {
      render(<StatusDot />);
      const statusDot = screen.getByRole('status');

      expect(statusDot).toBeInTheDocument();
    });

    it('should be accessible via aria-label', () => {
      render(<StatusDot status="online" />);
      const statusDot = screen.getByLabelText('Online');

      expect(statusDot).toBeInTheDocument();
    });

    it('should work with custom aria-label', () => {
      render(<StatusDot aria-label="Connection status indicator" />);
      const statusDot = screen.getByLabelText('Connection status indicator');

      expect(statusDot).toBeInTheDocument();
    });
  });
});