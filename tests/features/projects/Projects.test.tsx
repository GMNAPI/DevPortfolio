import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Projects } from '@/features/projects/Projects';
import { PROJECTS } from '@/shared/constants/projects';

describe('Projects Section', () => {
  describe('Rendering', () => {
    it('should render section heading', () => {
      render(<Projects />);
      expect(screen.getByRole('heading', { name: /proyectos/i })).toBeInTheDocument();
    });

    it('should render multiple project cards', () => {
      render(<Projects />);
      const cards = screen.getAllByRole('article');
      expect(cards.length).toBe(PROJECTS.length);
    });

    it('should render first project title', () => {
      render(<Projects />);
      expect(screen.getByText(PROJECTS[0].title)).toBeInTheDocument();
    });

    it('should display project titles', () => {
      render(<Projects />);
      PROJECTS.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });

    it('should display project descriptions', () => {
      render(<Projects />);
      expect(screen.getByText(/Sistema completo de facturación electrónica/i)).toBeInTheDocument();
    });

    it('should display tech stack for each project', () => {
      render(<Projects />);
      const nextjsTags = screen.getAllByText('Next.js');
      const typescriptTags = screen.getAllByText('TypeScript');
      expect(nextjsTags.length).toBeGreaterThan(0);
      expect(typescriptTags.length).toBeGreaterThan(0);
    });
  });

  describe('Links', () => {
    it('should render GitHub links for projects', () => {
      render(<Projects />);
      const githubLinks = screen.getAllByRole('link', { name: /github/i });
      expect(githubLinks.length).toBeGreaterThan(0);
    });

    it('should render demo links when available', () => {
      render(<Projects />);
      const demoLinks = screen.queryAllByRole('link', { name: /demo/i });
      const hasDemo = PROJECTS.some((project) => Boolean(project.links.demo));

      if (hasDemo) {
        expect(demoLinks.length).toBeGreaterThan(0);
      } else {
        expect(demoLinks.length).toBe(0);
      }
    });

    it('should have proper href attributes', () => {
      render(<Projects />);
      const link = screen.getAllByRole('link', { name: /github/i })[0];
      expect(link).toHaveAttribute('href');
      expect(link.getAttribute('href')).toContain('github.com');
    });

    it('should open links in new tab', () => {
      render(<Projects />);
      const link = screen.getAllByRole('link')[0];
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render private repository notice', () => {
      render(<Projects />);
      const notices = screen.getAllByText(/repositorio privado/i);
      expect(notices.length).toBeGreaterThan(0);
    });

    it('should render detail links for projects', () => {
      render(<Projects />);
      const detailLinks = screen.getAllByRole('link', { name: /ver detalle/i });
      expect(detailLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Structure', () => {
    it('should have section id for navigation', () => {
      const { container } = render(<Projects />);
      const section = container.querySelector('#projects');
      expect(section).toBeInTheDocument();
    });

    it('should use Card components', () => {
      render(<Projects />);
      // Cards should be article elements
      const cards = screen.getAllByRole('article');
      expect(cards[0]).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Projects />);
      const heading = screen.getByRole('heading', { name: /proyectos/i });
      expect(heading.tagName).toBe('H2');
    });

    it('should have semantic article elements for projects', () => {
      render(<Projects />);
      const articles = screen.getAllByRole('article');
      expect(articles.length).toBeGreaterThan(0);
    });
  });
});
