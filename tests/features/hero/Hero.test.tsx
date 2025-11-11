import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    beforeEach(() => {
      // Reset DOM
      document.body.innerHTML = '';
    });

    it('should have CTA button that scrolls to projects', () => {
      renderHero();
      const button = screen.getByRole('button', { name: /ver proyectos/i });
      expect(button).toHaveAttribute('data-scroll-to', 'projects');
    });

    it('should scroll to projects section when button is clicked', async () => {
      const user = userEvent.setup();
      const projectsSection = document.createElement('section');
      projectsSection.id = 'projects';
      projectsSection.scrollIntoView = vi.fn();
      document.body.appendChild(projectsSection);

      renderHero();

      const projectsButton = screen.getByRole('button', { name: /ver proyectos/i });
      await user.click(projectsButton);

      expect(projectsSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(projectsSection);
    });

    it('should scroll to contact section when button is clicked', async () => {
      const user = userEvent.setup();
      const contactSection = document.createElement('section');
      contactSection.id = 'contact';
      contactSection.scrollIntoView = vi.fn();
      document.body.appendChild(contactSection);

      renderHero();

      const contactButton = screen.getByRole('button', { name: /contactar/i });
      await user.click(contactButton);

      expect(contactSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(contactSection);
    });

    it('should open CV in new tab when download CV button is clicked', async () => {
      const user = userEvent.setup();
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

      renderHero();

      const cvButton = screen.getByRole('button', { name: /descargar cv/i });
      await user.click(cvButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining('.pdf'),
        '_blank',
        'noopener,noreferrer'
      );

      windowOpenSpy.mockRestore();
    });

    it('should handle missing projects section gracefully', async () => {
      const user = userEvent.setup();

      renderHero();

      const projectsButton = screen.getByRole('button', { name: /ver proyectos/i });

      // Should not throw error when section doesn't exist
      await expect(user.click(projectsButton)).resolves.not.toThrow();
    });

    it('should handle missing contact section gracefully', async () => {
      const user = userEvent.setup();

      renderHero();

      const contactButton = screen.getByRole('button', { name: /contactar/i });

      // Should not throw error when section doesn't exist
      await expect(user.click(contactButton)).resolves.not.toThrow();
    });
  });

  describe('Social Links', () => {
    it('should render GitHub link with correct href and attributes', () => {
      renderHero();
      const githubLink = screen.getByLabelText(/github/i);
      expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'));
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render LinkedIn link with correct href and attributes', () => {
      renderHero();
      const linkedinLink = screen.getByLabelText(/linkedin/i);
      expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render email link with correct mailto href', () => {
      renderHero();
      const emailLink = screen.getByLabelText(/email/i);
      expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:'));
    });
  });

  describe('Content', () => {
    it('should render greeting text', () => {
      renderHero();
      expect(screen.getByText(/hola/i)).toBeInTheDocument();
    });

    it('should render location information', () => {
      renderHero();
      expect(screen.getByText(/barcelona/i)).toBeInTheDocument();
    });

    it('should render ASCII terminal with aria-label', () => {
      renderHero();
      const terminal = screen.getByRole('img');
      expect(terminal).toHaveAccessibleName(/ángel hidalgo barreiro/i);
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

    it('should have section id for navigation', () => {
      const { container } = renderHero();
      const section = container.querySelector('#hero');
      expect(section).toBeInTheDocument();
    });
  });
});
