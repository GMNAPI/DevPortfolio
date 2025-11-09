import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/shared/components/ui/Input';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render input field', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render with label when provided', () => {
      render(<Input label="Name" />);
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('should render error message when provided', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should apply error styles when error is present', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });
  });

  describe('Types', () => {
    it('should render as text input by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should render as email input', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should render as textarea when multiline is true', () => {
      render(<Input multiline />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.tagName).toBe('TEXTAREA');
    });
  });

  describe('Interactions', () => {
    it('should call onChange when typing', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello');

      expect(handleChange).toHaveBeenCalled();
    });

    it('should update value when controlled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input value="Initial" onChange={handleChange} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('Initial');

      await user.clear(input);
      await user.type(input, 'Updated');

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should be required when required prop is true', () => {
      render(<Input required />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      render(<Input label="Email address" id="email" />);
      const input = screen.getByLabelText('Email address');
      expect(input).toHaveAttribute('id', 'email');
    });

    it('should have aria-invalid when error is present', () => {
      render(<Input error="Error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
