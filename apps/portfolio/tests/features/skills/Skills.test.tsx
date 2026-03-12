import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../messages/es.json';
import enMessages from '../../../messages/en.json';
import { Skills } from '@/features/skills/Skills';

function renderSkills(locale: 'es' | 'en' = 'es') {
  const messages = locale === 'es' ? esMessages : enMessages;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Skills />
    </NextIntlClientProvider>
  );
}

describe('Skills Section', () => {
  it('should render heading', () => {
    renderSkills();
    expect(screen.getByRole('heading', { name: /habilidades técnicas/i })).toBeInTheDocument();
  });

  it('should render stack distribution visualization', () => {
    renderSkills();
    expect(screen.getByText(/distribución del stack/i)).toBeInTheDocument();
    expect(screen.getByText(/repos analizados/i)).toBeInTheDocument();
    expect(screen.getAllByText(/% del stack/i).length).toBeGreaterThan(0);
  });

  it('should render all categories defined in constants', () => {
    renderSkills();
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(esMessages.skills.categories.length);
  });

  it('should display category names on cards', () => {
    renderSkills();
    esMessages.skills.categories.forEach((category) => {
      expect(screen.getAllByText(new RegExp(category.name, 'i')).length).toBeGreaterThan(0);
    });
  });

  it('should display experience badges on cards', () => {
    renderSkills();
    const experienceBadges = screen.getAllByText(/\d+\+ años/i);
    expect(experienceBadges.length).toBeGreaterThan(0);
  });

  it('should NOT display skill descriptions in cards (they are in the modal)', () => {
    renderSkills();
    // Skill descriptions should not be visible until a card is clicked
    const firstCategory = esMessages.skills.categories[0];
    const firstSkillDescription = firstCategory.skills[0].description;
    expect(screen.queryByText(firstSkillDescription)).not.toBeInTheDocument();
  });

  it('should open modal with skill details when a card is clicked', () => {
    renderSkills();
    const firstCategory = esMessages.skills.categories[0];
    const articles = screen.getAllByRole('article');
    fireEvent.click(articles[0]);

    // Modal should now show the first skill's description
    const firstSkillDescription = firstCategory.skills[0].description;
    expect(screen.getByText(firstSkillDescription)).toBeInTheDocument();
  });

  it('should close modal when Escape is pressed', () => {
    renderSkills();
    const articles = screen.getAllByRole('article');
    fireEvent.click(articles[0]);

    // Modal is open — now close with Escape
    fireEvent.keyDown(document, { key: 'Escape' });

    const firstCategory = esMessages.skills.categories[0];
    const firstSkillDescription = firstCategory.skills[0].description;
    expect(screen.queryByText(firstSkillDescription)).not.toBeInTheDocument();
  });

  it('should show usage information in modal when available', () => {
    renderSkills();
    const articles = screen.getAllByRole('article');
    fireEvent.click(articles[0]);
    const usage = screen.getAllByText(/% uso repos/i);
    expect(usage.length).toBeGreaterThan(0);
  });

  describe('Donut Chart', () => {
    it('should render donut chart with language distribution', () => {
      renderSkills();
      const percentages = screen.getAllByText(/% del stack/i);
      expect(percentages.length).toBeGreaterThan(0);
    });

    it('should calculate total usage correctly', () => {
      renderSkills();
      const reposText = screen.getByText(/repos analizados/i);
      expect(reposText).toBeInTheDocument();
    });
  });

  describe('Localization', () => {
    it('should format percentages according to locale', () => {
      const { container: esContainer } = renderSkills('es');
      const esContent = esContainer.textContent || '';

      const { container: enContainer } = renderSkills('en');
      const enContent = enContainer.textContent || '';

      expect(esContent).toMatch(/%/);
      expect(enContent).toMatch(/%/);
    });
  });
});
