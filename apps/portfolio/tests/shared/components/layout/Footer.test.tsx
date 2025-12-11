import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../../messages/es.json';
import { Footer } from '@/shared/components/layout/Footer';

function renderFooter() {
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <Footer />
    </NextIntlClientProvider>
  );
}

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('should render footer element', () => {
      renderFooter();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render brand name', () => {
      renderFooter();
      const brandElements = screen.getAllByText(/Dev Portfolio/i);
      expect(brandElements.length).toBeGreaterThan(0);
      expect(brandElements[0]).toBeInTheDocument();
    });

    it('should render social links section heading', () => {
      renderFooter();
      expect(screen.getByText(/Encuéntrame/i)).toBeInTheDocument();
    });

    it('should render all social links', () => {
      renderFooter();
      expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    });

    it('should render copyright notice', () => {
      renderFooter();
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('should include copyright symbol', () => {
      renderFooter();
      expect(screen.getByText(/©/)).toBeInTheDocument();
    });
  });

  describe('Social Links', () => {
    it('should have correct href for GitHub link', () => {
      renderFooter();
      const githubLink = screen.getByRole('link', { name: /github/i });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/usuario');
    });

    it('should have correct href for LinkedIn link', () => {
      renderFooter();
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/usuario');
    });

    it('should open social links in new tab', () => {
      renderFooter();
      const githubLink = screen.getByRole('link', { name: /github/i });
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Styles', () => {
    it('should have background color', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-background-secondary');
    });

    it('should have border-top', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('border-t');
    });

    it('should have proper padding', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('py-12');
    });
  });

  describe('Accessibility', () => {
    it('should have proper contentinfo landmark role', () => {
      renderFooter();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should have aria-label for social links', () => {
      renderFooter();
      const githubLink = screen.getByRole('link', { name: /visita mi perfil de github/i });
      expect(githubLink).toBeInTheDocument();

      const linkedinLink = screen.getByRole('link', { name: /visita mi perfil de linkedin/i });
      expect(linkedinLink).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should have responsive grid layout', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      const gridContainer = footer.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('grid');
    });

    it('should center content horizontally', () => {
      renderFooter();
      const footer = screen.getByRole('contentinfo');
      const content = footer.querySelector('.max-w-7xl');
      expect(content).toBeInTheDocument();
    });
  });
});
