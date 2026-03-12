import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../../messages/es.json';
import { ProjectCard } from '@/features/projects/components/ProjectCard';
import { Project } from '@/core/entities/Project';
import type { ProjectData } from '@/core/entities/Project';

const baseData: ProjectData = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  tech: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Docker'],
  links: { github: 'https://github.com/test/project' },
  categoryId: 'arquitectura-avanzada',
  detailSlug: 'test-project',
};

function renderCard(overrides?: Partial<ProjectData>, onOpen = vi.fn()) {
  const project = new Project({ ...baseData, ...overrides });
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <ProjectCard project={project} categoryName="Arquitectura Avanzada" onOpen={onOpen} />
    </NextIntlClientProvider>
  );
}

describe('ProjectCard', () => {
  describe('Rendering', () => {
    it('renders project title', () => {
      renderCard();
      expect(screen.getAllByText('Test Project').length).toBeGreaterThan(0);
    });

    it('renders category badge', () => {
      renderCard();
      expect(screen.getAllByText('Arquitectura Avanzada').length).toBeGreaterThan(0);
    });

    it('renders max 3 tech pills in the default view', () => {
      renderCard();
      const article = screen.getByRole('article');
      // The default visible area (not the hover overlay) shows max 3 tech pills
      // We look for the overflow badge which indicates there are more
      expect(screen.getByText(/\+\d+ más/)).toBeInTheDocument();
    });

    it('shows overflow badge when there are more than 3 techs', () => {
      renderCard();
      // 5 techs - 3 visible = 2 more
      expect(screen.getByText('+2 más')).toBeInTheDocument();
    });

    it('does not show overflow badge when 3 or fewer techs', () => {
      renderCard({ tech: ['React', 'TypeScript', 'Tailwind CSS'] });
      expect(screen.queryByText(/\+\d+ más/)).not.toBeInTheDocument();
    });

    it('renders gradient placeholder when imageUrl is not provided', () => {
      renderCard();
      const article = screen.getByRole('article');
      // Should have a gradient div, not an img
      expect(article.querySelector('img')).not.toBeInTheDocument();
      const gradientDiv = article.querySelector('.bg-gradient-to-br');
      expect(gradientDiv).toBeInTheDocument();
    });

    it('renders image when imageUrl is provided', () => {
      renderCard({ imageUrl: '/images/projects/test.webp' });
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/images/projects/test.webp');
    });
  });

  describe('Interaction', () => {
    it('calls onOpen with the project when card is clicked', () => {
      const onOpen = vi.fn();
      renderCard({}, onOpen);
      const article = screen.getByRole('article');
      fireEvent.click(article);
      expect(onOpen).toHaveBeenCalledOnce();
      expect(onOpen.mock.calls[0][0]).toBeInstanceOf(Project);
      expect(onOpen.mock.calls[0][0].id).toBe('test-project');
    });

    it('renders as a clickable article element', () => {
      renderCard();
      const article = screen.getByRole('article');
      expect(article).toHaveClass('cursor-pointer');
    });
  });

  describe('Accessibility', () => {
    it('has an aria-label describing the project', () => {
      renderCard();
      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-label');
      expect(article.getAttribute('aria-label')).toContain('Test Project');
    });
  });
});
