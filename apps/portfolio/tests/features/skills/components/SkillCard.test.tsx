import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../../messages/es.json';
import { SkillCard } from '@/features/skills/components/SkillCard';
import type { SkillCategory } from '@/shared/constants/skills';

const testCategory: SkillCategory = {
  id: 'backend',
  name: 'Backend',
  summary: 'Migraciones ERP a SaaS y APIs REST de alto rendimiento',
  experienceYears: 6,
  skills: [
    {
      name: 'PHP',
      description: 'Lenguaje principal en múltiples repositorios',
      usagePercentage: 31,
      experienceYears: 6,
      experienceProjects: 18,
      keywords: ['Symfony', 'Laravel', 'OOP'],
    },
    {
      name: 'Symfony 7',
      description: 'Framework para APIs REST',
      usagePercentage: 25,
      keywords: ['DDD', 'CQRS'],
    },
    {
      name: 'Node.js',
      description: 'Servicios backend asíncronos',
      usagePercentage: 15,
    },
    {
      name: 'API Platform',
      description: 'Framework para APIs RESTful y GraphQL',
      usagePercentage: 10,
    },
  ],
};

function renderCard(category = testCategory, onOpen = vi.fn()) {
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <SkillCard category={category} onOpen={onOpen} />
    </NextIntlClientProvider>
  );
}

describe('SkillCard', () => {
  describe('Rendering', () => {
    it('renders the category name', () => {
      renderCard();
      expect(screen.getAllByText(/Backend/i).length).toBeGreaterThan(0);
    });

    it('renders the experience badge', () => {
      renderCard();
      expect(screen.getAllByText(/6\+ años/i).length).toBeGreaterThan(0);
    });

    it('renders the summary truncated', () => {
      renderCard();
      expect(screen.getByText(testCategory.summary)).toBeInTheDocument();
    });

    it('renders max 3 skill name pills', () => {
      renderCard();
      // First 3 skill names visible as pills
      expect(screen.getAllByText('PHP').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Symfony 7').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
    });

    it('shows overflow badge when there are more than 3 skills', () => {
      renderCard();
      // 4 skills - 3 visible = 1 more
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    it('does not show overflow badge when 3 or fewer skills', () => {
      const fewSkills: SkillCategory = {
        ...testCategory,
        skills: testCategory.skills.slice(0, 3),
      };
      renderCard(fewSkills);
      expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
    });

    it('renders all skills in the hover overlay', () => {
      renderCard();
      // All 4 skills should appear (some in default view, all in overlay)
      expect(screen.getAllByText('API Platform').length).toBeGreaterThan(0);
    });
  });

  describe('Interaction', () => {
    it('calls onOpen with the category when clicked', () => {
      const onOpen = vi.fn();
      renderCard(testCategory, onOpen);
      const article = screen.getByRole('article');
      fireEvent.click(article);
      expect(onOpen).toHaveBeenCalledOnce();
      expect(onOpen).toHaveBeenCalledWith(testCategory);
    });

    it('is a clickable article element', () => {
      renderCard();
      const article = screen.getByRole('article');
      expect(article).toHaveClass('cursor-pointer');
    });
  });

  describe('Accessibility', () => {
    it('has an aria-label describing the category', () => {
      renderCard();
      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-label');
      expect(article.getAttribute('aria-label')).toContain('Backend');
    });
  });
});
