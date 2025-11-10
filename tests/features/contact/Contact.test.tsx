import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from '@/features/contact/Contact';

describe('Contact Section', () => {
  const mockFetch = vi.fn();
const originalFetch = global.fetch;

  beforeEach(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  global.fetch = originalFetch;
  });

  describe('Rendering', () => {
    it('should render section heading', () => {
      render(<Contact />);
      expect(screen.getByRole('heading', { name: /contacto/i })).toBeInTheDocument();
    });

    it('should render all form fields', () => {
      render(<Contact />);
      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    });

    it('should render submit button', () => {
      render(<Contact />);
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('should show error when name is empty', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/nombre es requerido/i)).toBeInTheDocument();
      });
    });

    it('should show error when email is invalid', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText(/nombre/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/mensaje/i);

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'invalid-email');
      await user.type(messageInput, 'This is a test message');

      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email válido es requerido/i)).toBeInTheDocument();
      });
    });

    it('should show error when message is too short', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText(/nombre/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/mensaje/i);

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Short');

      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/al menos 10 caracteres/i)).toBeInTheDocument();
      });
    });

    it('should not show errors with valid data', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText(/nombre/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/mensaje/i);

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'This is a valid message with more than 10 characters');

      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/es requerido/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should show success message after valid submission', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText(/nombre/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/mensaje/i);

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'This is a test message for the contact form');

      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/contact',
          expect.objectContaining({ method: 'POST' })
        );
        expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument();
      });
    });

    it('should clear form after successful submission', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      const nameInput = screen.getByLabelText(/nombre/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/mensaje/i) as HTMLTextAreaElement;

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'This is a test message for the contact form');

      const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(messageInput.value).toBe('');
      });
    });

    it('should show error message when API fails', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: vi.fn().mockResolvedValue({ message: 'API error' }),
      });

      render(<Contact />);

      await user.type(screen.getByLabelText(/nombre/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(
        screen.getByLabelText(/mensaje/i),
        'This is a test message for the contact form'
      );

      await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/api error/i);
      });
    });
  });

  describe('Structure', () => {
    it('should have section id for navigation', () => {
      const { container } = render(<Contact />);
      const section = container.querySelector('#contact');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Contact />);
      const heading = screen.getByRole('heading', { name: /contacto/i });
      expect(heading.tagName).toBe('H2');
    });

    it('should have proper form element', () => {
      render(<Contact />);
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });
  });
});
