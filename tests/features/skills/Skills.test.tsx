import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skills } from '@/features/skills/Skills';
import { SKILL_CATEGORIES } from '@/shared/constants/skills';

describe('Skills Section', () => {
  it('should render heading', () => {
    render(<Skills />);
    expect(screen.getByRole('heading', { name: /habilidades técnicas/i })).toBeInTheDocument();
  });

  it('should render all categories defined in constants', () => {
    render(<Skills />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(SKILL_CATEGORIES.length);
  });

  it('should display skills from constants', () => {
    render(<Skills />);
    SKILL_CATEGORIES.forEach((category) => {
      category.skills.slice(0, 2).forEach((skill) => {
        expect(
          screen.getAllByText(new RegExp(`^${skill.name}$`, 'i'), { exact: false }).length
        ).toBeGreaterThan(0);
      });
    });
  });

  it('should show usage information when available', () => {
    render(<Skills />);
    const usage = screen.getAllByText(/% uso repos/i);
    expect(usage.length).toBeGreaterThan(0);
  });
});
