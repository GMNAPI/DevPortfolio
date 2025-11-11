import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../messages/es.json';
import { Skills } from '@/features/skills/Skills';

function renderSkills() {
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
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

  it('should display skills from constants', () => {
    renderSkills();
    esMessages.skills.categories.forEach((category) => {
      category.skills.slice(0, 2).forEach((skill) => {
        expect(
          screen.getAllByText(new RegExp(`^${skill.name}$`, 'i'), { exact: false }).length
        ).toBeGreaterThan(0);
      });
    });
  });

  it('should show usage information when available', () => {
    renderSkills();
    const usage = screen.getAllByText(/% uso repos/i);
    expect(usage.length).toBeGreaterThan(0);
  });
});
