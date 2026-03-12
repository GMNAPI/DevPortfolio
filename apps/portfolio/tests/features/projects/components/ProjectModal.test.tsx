import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../../messages/es.json';
import { ProjectModal } from '@/features/projects/components/ProjectModal';
import { Project } from '@/core/entities/Project';

const testProject = new Project({
  id: 'modal-project',
  title: 'Modal Test Project',
  description: 'Full description of the modal test project',
  tech: ['React', 'TypeScript', 'Node.js'],
  links: {
    github: 'https://github.com/test/modal-project',
    demo: 'https://demo.example.com',
  },
  categoryId: 'arquitectura-avanzada',
  detailSlug: 'modal-project',
});

function renderModal(project: Project | null = testProject, onClose = vi.fn()) {
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <ProjectModal project={project} categoryName="Arquitectura Avanzada" onClose={onClose} />
    </NextIntlClientProvider>
  );
}

describe('ProjectModal', () => {
  describe('Rendering', () => {
    it('renders nothing when project is null', () => {
      const { container } = renderModal(null);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders project title when open', () => {
      renderModal();
      expect(screen.getByText('Modal Test Project')).toBeInTheDocument();
    });

    it('renders full description', () => {
      renderModal();
      expect(screen.getByText('Full description of the modal test project')).toBeInTheDocument();
    });

    it('renders all tech pills', () => {
      renderModal();
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
    });

    it('renders GitHub link when available', () => {
      renderModal();
      const githubLink = screen.getByRole('link', { name: /github/i });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/test/modal-project');
    });

    it('renders Demo link when available', () => {
      renderModal();
      const demoLink = screen.getByRole('link', { name: /demo/i });
      expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');
    });

    it('does not render Demo link when not available', () => {
      const projectWithoutDemo = new Project({
        ...testProject.toJSON(),
        links: { github: 'https://github.com/test' },
      });
      renderModal(projectWithoutDemo);
      expect(screen.queryByRole('link', { name: /demo/i })).not.toBeInTheDocument();
    });

    it('renders category badge', () => {
      renderModal();
      expect(screen.getByText('Arquitectura Avanzada')).toBeInTheDocument();
    });

    it('has role="dialog" and aria-modal', () => {
      renderModal();
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('Close interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn();
      renderModal(testProject, onClose);
      const closeBtn = screen.getByRole('button', { name: /cerrar modal/i });
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('calls onClose when Escape key is pressed', () => {
      const onClose = vi.fn();
      renderModal(testProject, onClose);
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('calls onClose when backdrop is clicked', () => {
      const onClose = vi.fn();
      renderModal(testProject, onClose);
      const backdrop = document.querySelector('.fixed.inset-0');
      expect(backdrop).toBeTruthy();
      fireEvent.click(backdrop!);
      expect(onClose).toHaveBeenCalledOnce();
    });
  });
});
