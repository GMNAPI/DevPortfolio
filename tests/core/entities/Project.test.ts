import { describe, it, expect } from 'vitest';
import { Project } from '@/core/entities/Project';

describe('Project Entity', () => {
  describe('Creation', () => {
    it('should create a valid project with all required fields', () => {
      const project = new Project({
        id: '1',
        title: 'Personal Portfolio',
        description: 'A clean portfolio website',
        tech: ['Next.js', 'TypeScript', 'Tailwind'],
        links: {
          github: 'https://github.com/user/portfolio',
          demo: 'https://portfolio.dev',
        },
        categoryId: 'gestion-servicios',
      });

      expect(project.id).toBe('1');
      expect(project.title).toBe('Personal Portfolio');
      expect(project.description).toBe('A clean portfolio website');
      expect(project.tech).toEqual(['Next.js', 'TypeScript', 'Tailwind']);
      expect(project.links.github).toBe('https://github.com/user/portfolio');
      expect(project.links.demo).toBe('https://portfolio.dev');
      expect(project.detailSlug).toBe('1');
    });

    it('should throw error if title is empty', () => {
      expect(() => {
        new Project({
          id: '1',
          title: '',
          description: 'Test',
          tech: ['React'],
          links: { github: 'https://github.com' },
          categoryId: 'gestion-servicios',
        });
      }).toThrow('Title is required');
    });

    it('should throw error if tech array is empty', () => {
      expect(() => {
        new Project({
          id: '1',
          title: 'Test Project',
          description: 'Test',
          tech: [],
          links: { github: 'https://github.com' },
          categoryId: 'gestion-servicios',
        });
      }).toThrow('At least one technology is required');
    });

    it('should allow project without demo link', () => {
      const project = new Project({
        id: '1',
        title: 'Backend API',
        description: 'REST API',
        tech: ['Node.js'],
        links: { github: 'https://github.com/user/api' },
        categoryId: 'gestion-servicios',
      });

      expect(project.links.demo).toBeUndefined();
    });
  });

  describe('Methods', () => {
    it('should check if project uses a specific technology', () => {
      const project = new Project({
        id: '1',
        title: 'Web App',
        description: 'Full stack app',
        tech: ['React', 'Node.js', 'PostgreSQL'],
        links: { github: 'https://github.com' },
        categoryId: 'gestion-servicios',
      });

      expect(project.hasTech('React')).toBe(true);
      expect(project.hasTech('Vue')).toBe(false);
    });

    it('should be case-insensitive when checking technology', () => {
      const project = new Project({
        id: '1',
        title: 'Web App',
        description: 'Test',
        tech: ['TypeScript'],
        links: { github: 'https://github.com' },
        categoryId: 'gestion-servicios',
      });

      expect(project.hasTech('typescript')).toBe(true);
      expect(project.hasTech('TYPESCRIPT')).toBe(true);
    });

    it('should convert to plain object', () => {
      const projectData = {
        id: '1',
        title: 'Test',
        description: 'Description',
        tech: ['React'],
        links: { github: 'https://github.com' },
        categoryId: 'gestion-servicios',
        detailSlug: 'test',
      };

      const project = new Project(projectData);
      const plain = project.toJSON();

      expect(plain).toEqual(projectData);
    });
  });
});
