import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '@/features/about/About';

describe('About Section', () => {
  describe('Rendering', () => {
    it('should render section heading', () => {
      render(<About />);
      expect(screen.getByRole('heading', { name: /sobre mí/i })).toBeInTheDocument();
    });

    it('should render personal description', () => {
      render(<About />);
      expect(screen.getByText(/desarrollador/i)).toBeInTheDocument();
    });

    it('should render GitHub stats block', () => {
      render(<About />);
      expect(screen.getByRole('heading', { name: /actividad reciente/i })).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.replace(/\D/g, '').includes('1706'))
      ).toBeInTheDocument();
    });

    it('should render tech stack heading', () => {
      render(<About />);
      expect(screen.getByRole('heading', { name: /stack tecnológico/i })).toBeInTheDocument();
    });

    it('should render multiple technologies', () => {
      render(<About />);
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('should have section id for navigation', () => {
      const { container } = render(<About />);
      const section = container.querySelector('#about');
      expect(section).toBeInTheDocument();
    });

    it('should display technologies as tags/badges', () => {
      render(<About />);
      const tags = screen.getAllByRole('listitem');
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<About />);
      const mainHeading = screen.getByRole('heading', { name: /sobre mí/i });
      expect(mainHeading.tagName).toBe('H2');
    });

    it('should have semantic list for technologies', () => {
      const { container } = render(<About />);
      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
    });
  });
});
