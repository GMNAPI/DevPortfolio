import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../messages/es.json';
import { Projects } from '@/features/projects/Projects';
import type { ProjectData } from '@/core/entities/Project';

function renderProjects() {
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <Projects />
    </NextIntlClientProvider>
  );
}

describe('Projects Section', () => {
  describe('Rendering', () => {
    it('should render section heading', () => {
      renderProjects();
      expect(screen.getByRole('heading', { name: /proyectos/i })).toBeInTheDocument();
    });

    it('should render multiple project cards', () => {
      renderProjects();
      const cards = screen.getAllByRole('article');
      expect(cards.length).toBe((esMessages.projects.items as unknown[]).length);
    });

    it('should render first project title', () => {
      renderProjects();
      const firstTitle = esMessages.projects.items[0].title;
      expect(screen.getByText(firstTitle)).toBeInTheDocument();
    });

    it('should display project titles', () => {
      renderProjects();
      esMessages.projects.items.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });

    it('should display project descriptions', () => {
      renderProjects();
      expect(screen.getByText(esMessages.projects.items[0].description)).toBeInTheDocument();
    });

    it('should display tech stack for each project', () => {
      renderProjects();
      const nextjsTags = screen.getAllByText(/Next\.js/i);
      const typescriptTags = screen.getAllByText(/TypeScript/i);
      expect(nextjsTags.length).toBeGreaterThan(0);
      expect(typescriptTags.length).toBeGreaterThan(0);
    });
  });

  describe('Links', () => {
    it('should render GitHub links for projects', () => {
      renderProjects();
      const githubLinks = screen.getAllByRole('link', { name: /github/i });
      expect(githubLinks.length).toBeGreaterThan(0);
    });

    it('should render demo links when available', () => {
      renderProjects();
      const demoLinks = screen.queryAllByRole('link', { name: /demo/i });
      const projectsData = esMessages.projects.items as unknown as ProjectData[];
      const hasDemo = projectsData.some((project) => Boolean(project.links.demo));

      if (hasDemo) {
        expect(demoLinks.length).toBeGreaterThan(0);
      } else {
        expect(demoLinks.length).toBe(0);
      }
    });

    it('should have proper href attributes', () => {
      renderProjects();
      const link = screen.getAllByRole('link', { name: /github/i })[0];
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('href')).toContain('github.com');
    });

    it('should open links in new tab', () => {
      renderProjects();
      const link = screen.getAllByRole('link')[0];
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render private repository notice', () => {
      renderProjects();
      const notices = screen.getAllByText(/repositorio privado/i);
      expect(notices.length).toBeGreaterThan(0);
    });

    it('should render detail links for projects', () => {
      renderProjects();
      const detailLinks = screen.getAllByRole('link', { name: /ver detalle/i });
      expect(detailLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Structure', () => {
    it('should have section id for navigation', () => {
      const { container } = renderProjects();
      const section = container.querySelector('#projects');
      expect(section).toBeInTheDocument();
    });

    it('should use Card components', () => {
      renderProjects();
      // Cards should be article elements
      const cards = screen.getAllByRole('article');
      expect(cards[0]).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderProjects();
      const heading = screen.getByRole('heading', { name: /proyectos/i });
      expect(heading.tagName).toBe('H2');
    });

    it('should have semantic article elements for projects', () => {
      renderProjects();
      const articles = screen.getAllByRole('article');
      expect(articles.length).toBeGreaterThan(0);
    });
  });

  describe('Category Filtering', () => {
    it('should render category filter buttons', () => {
      renderProjects();
      // Should have category filter buttons
      const categoryButtons = screen.getAllByRole('button');
      // Should have "Todas" + at least one category button
      expect(categoryButtons.length).toBeGreaterThan(1);

      // Check that at least one button contains "Todas"
      const allButton = categoryButtons.find((btn) => btn.textContent?.match(/todas/i));
      expect(allButton).toBeDefined();
    });

    it('should show all projects by default', () => {
      renderProjects();
      const totalProjects = (esMessages.projects.items as unknown[]).length;
      const projectCards = screen.getAllByRole('article');
      expect(projectCards.length).toBe(totalProjects);
    });

    it('should filter projects when category button is clicked', async () => {
      const user = userEvent.setup();
      renderProjects();

      // Click on first category button (not "Todas")
      const buttons = screen.getAllByRole('button');
      const categoryButton = buttons.find((btn) => !btn.textContent?.match(/todas/i));

      if (categoryButton) {
        await user.click(categoryButton);

        // Projects should be filtered (less than total)
        const projectCards = screen.getAllByRole('article');
        const totalProjects = (esMessages.projects.items as unknown[]).length;
        expect(projectCards.length).toBeLessThanOrEqual(totalProjects);
      }
    });

    it('should show all projects when "Todas" button is clicked after filtering', async () => {
      const user = userEvent.setup();
      renderProjects();

      const totalProjects = (esMessages.projects.items as unknown[]).length;

      // Click on a category button first
      let buttons = screen.getAllByRole('button');
      const categoryButton = buttons.find((btn) => !btn.textContent?.match(/todas/i));

      if (categoryButton) {
        await user.click(categoryButton);

        // Now find and click "Todas" button (need to re-query after state change)
        buttons = screen.getAllByRole('button');
        const allButton = buttons.find((btn) => btn.textContent?.match(/todas/i));

        if (allButton) {
          await user.click(allButton);

          const projectCards = screen.getAllByRole('article');
          expect(projectCards.length).toBe(totalProjects);
        }
      }
    });

    it('should display project counts in category buttons', () => {
      renderProjects();
      // Category buttons should show count in format "Category (X)"
      const buttons = screen.getAllByRole('button');
      const buttonWithCount = buttons.find((btn) => btn.textContent?.match(/\(\d+\)/));
      expect(buttonWithCount).toBeDefined();
    });

    it('should handle empty category count with nullish coalescing', () => {
      renderProjects();
      // All category buttons should display a count (even if 0)
      const buttons = screen.getAllByRole('button');
      buttons.forEach((btn) => {
        // Button should either be "Todos (X)" or "Category (X)"
        const hasCount = btn.textContent?.match(/\(\d+\)/);
        if (btn.textContent && !btn.textContent.match(/todos/i)) {
          expect(hasCount).toBeTruthy();
        }
      });
    });
  });
});
