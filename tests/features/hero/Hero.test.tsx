import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../messages/es.json';
import { Hero } from '@/features/hero/Hero';

function renderHero() {
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <Hero />
    </NextIntlClientProvider>
  );
}

describe('Hero Section', () => {
  describe('Rendering', () => {
    it('should render main heading with full name', () => {
      renderHero();
      expect(screen.getByRole('heading', { name: /ángel hidalgo barreiro/i })).toBeInTheDocument();
    });

    it('should render tagline', () => {
      renderHero();
      expect(
        screen.getByRole('heading', {
          name: /desarrollador de cosas.*saas.*node\.js.*react.*php\/symfony/i,
        })
      ).toBeInTheDocument();
    });

    it('should render bio description', () => {
      renderHero();
      expect(
        screen.getByText(/desarrollador full-stack con amplia experiencia/i)
      ).toBeInTheDocument();
    });

    it('should render all CTA buttons', () => {
      renderHero();
      expect(screen.getByRole('button', { name: /ver proyectos/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /descargar cv/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /contactar/i })).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      renderHero();
      const heading = screen.getByRole('heading', {
        name: /ángel hidalgo barreiro/i,
      });
      expect(heading.tagName).toBe('H1');
    });
  });

  describe('Styles', () => {
    it('should have fade-in animation class', () => {
      const { container } = renderHero();
      const section = container.firstChild as HTMLElement;
      expect(section).toHaveClass('animate-fade-in');
    });

    it('should be centered on screen', () => {
      const { container } = renderHero();
      const section = container.firstChild as HTMLElement;
      expect(section).toHaveClass('min-h-screen');
    });
  });

  describe('Interactions', () => {
    it('should have CTA button that scrolls to projects', () => {
      renderHero();
      const button = screen.getByRole('button', { name: /ver proyectos/i });
      expect(button).toHaveAttribute('data-scroll-to', 'projects');
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      renderHero();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should have proper section landmark', () => {
      const { container } = renderHero();
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });
});
