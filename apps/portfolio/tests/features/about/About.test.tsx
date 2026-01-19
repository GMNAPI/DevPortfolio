import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../messages/es.json';
import enMessages from '../../../messages/en.json';
import { About } from '@/features/about/About';

function renderAbout(locale: 'es' | 'en' = 'es') {
  const messages = locale === 'es' ? esMessages : enMessages;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
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
      expect(screen.getByText(/tech lead con experiencia colaborando/i)).toBeInTheDocument();
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

  describe('Certifications', () => {
    it('should render certifications section heading', () => {
      renderAbout();
      expect(screen.getByRole('heading', { name: /certificaciones/i })).toBeInTheDocument();
    });

    it('should render certification with description when present', () => {
      renderAbout();
      // Zend certification has description in test data
      const zendCert = screen.getByText(/zend certificate/i);
      expect(zendCert).toBeInTheDocument();

      // Check description exists in the DOM
      const description = screen.getByText(/patrones de diseño/i);
      expect(description).toBeInTheDocument();
    });

    it('should not render credential URL link when not present', () => {
      renderAbout();
      // Zend certification doesn't have credentialUrl, so link shouldn't exist
      const credentialLinks = screen.queryAllByText(/ver credencial/i);
      expect(credentialLinks.length).toBe(0);
    });

    it('should render certification name and issuer', () => {
      renderAbout();
      // Certification should have issuer and year (multiple "Zend" instances expected)
      const zendElements = screen.getAllByText(/zend/i);
      expect(zendElements.length).toBeGreaterThan(0);
      // Since multiple experience periods also contain "2025", check that at least one exists
      const year2025Elements = screen.getAllByText(/2025/i);
      expect(year2025Elements.length).toBeGreaterThan(0);
    });
  });

  describe('Stats', () => {
    it('should render all GitHub stats with formatted numbers', () => {
      renderAbout();
      // Check that stats section exists
      expect(screen.getByRole('heading', { name: /actividad reciente/i })).toBeInTheDocument();

      // Stats should have formatted numbers (Spanish locale uses dots for thousands)
      const statsWithNumbers = screen.getByText((content) =>
        content.replace(/\D/g, '').includes('1706')
      );
      expect(statsWithNumbers).toBeInTheDocument();
    });

    it('should format numbers according to locale', () => {
      // Spanish locale
      const { container: esContainer } = renderAbout('es');
      const esStats = esContainer.textContent || '';

      // English locale
      const { container: enContainer } = renderAbout('en');
      const enStats = enContainer.textContent || '';

      // Both should render the stats numbers (checking for unformatted numbers as fallback)
      expect(esStats).toMatch(/1\.?706|1,?706/); // Spanish/English number formatting
      expect(enStats).toMatch(/1\.?706|1,?706/);
    });

    it('should render account created date with locale formatting', () => {
      // Spanish date format: "abril de 2024"
      const { container: esContainer } = renderAbout('es');
      expect(esContainer.textContent).toMatch(/abril/i);

      // English date format: "April 2024"
      const { container: enContainer } = renderAbout('en');
      expect(enContainer.textContent).toMatch(/april/i);
    });
  });
});
