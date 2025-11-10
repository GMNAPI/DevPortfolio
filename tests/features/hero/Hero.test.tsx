import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/features/hero/Hero';

describe('Hero Section', () => {
  describe('Rendering', () => {
    it('should render main heading with full name', () => {
      render(<Hero />);
      expect(
        screen.getByRole('heading', { name: /ángel hidalgo barreiro/i }),
      ).toBeInTheDocument();
    });

    it('should render tagline', () => {
      render(<Hero />);
      expect(
        screen.getByRole('heading', {
          name: /desarrollador de cosas.*saas.*node\.js.*react.*php\/symfony/i,
        }),
      ).toBeInTheDocument();
    });

    it('should render bio description', () => {
      render(<Hero />);
      expect(
        screen.getByText(/desarrollador full-stack con amplia experiencia/i),
      ).toBeInTheDocument();
    });

    it('should render all CTA buttons', () => {
      render(<Hero />);
      expect(
        screen.getByRole('button', { name: /ver proyectos/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /descargar cv/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /contactar/i }),
      ).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(<Hero />);
      const heading = screen.getByRole('heading', {
        name: /ángel hidalgo barreiro/i,
      });
      expect(heading.tagName).toBe('H1');
    });
  });

  describe('Styles', () => {
    it('should have fade-in animation class', () => {
      const { container } = render(<Hero />);
      const section = container.firstChild as HTMLElement;
      expect(section).toHaveClass('animate-fade-in');
    });

    it('should be centered on screen', () => {
      const { container } = render(<Hero />);
      const section = container.firstChild as HTMLElement;
      expect(section).toHaveClass('min-h-screen');
    });
  });

  describe('Interactions', () => {
    it('should have CTA button that scrolls to projects', () => {
      render(<Hero />);
      const button = screen.getByRole('button', { name: /ver proyectos/i });
      expect(button).toHaveAttribute('data-scroll-to', 'projects');
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      render(<Hero />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should have proper section landmark', () => {
      const { container } = render(<Hero />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });
});
