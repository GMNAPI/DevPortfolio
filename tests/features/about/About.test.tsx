import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../messages/es.json';
import { About } from '@/features/about/About';

function renderAbout() {
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <About />
    </NextIntlClientProvider>
  );
}

describe('About Section', () => {
  describe('Rendering', () => {
    it('should render section heading', () => {
      renderAbout();
      expect(screen.getByRole('heading', { name: /sobre mí/i })).toBeInTheDocument();
    });

    it('should render personal description', () => {
      renderAbout();
      expect(screen.getByText(/desarrollador/i)).toBeInTheDocument();
    });

    it('should render GitHub stats block', () => {
      renderAbout();
      expect(screen.getByRole('heading', { name: /actividad reciente/i })).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.replace(/\D/g, '').includes('1706'))
      ).toBeInTheDocument();
    });

    it('should render tech stack heading', () => {
      renderAbout();
      expect(screen.getByRole('heading', { name: /stack tecnológico/i })).toBeInTheDocument();
    });

    it('should render multiple technologies', () => {
      renderAbout();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('should have section id for navigation', () => {
      const { container } = renderAbout();
      const section = container.querySelector('#about');
      expect(section).toBeInTheDocument();
    });

    it('should display technologies as tags/badges', () => {
      renderAbout();
      const tags = screen.getAllByRole('listitem');
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderAbout();
      const mainHeading = screen.getByRole('heading', { name: /sobre mí/i });
      expect(mainHeading.tagName).toBe('H2');
    });

    it('should have semantic list for technologies', () => {
      const { container } = renderAbout();
      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
    });
  });
});
