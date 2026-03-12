import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../../messages/es.json';
import { SkillModal } from '@/features/skills/components/SkillModal';
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
  ],
};

function renderModal(category: SkillCategory | null = testCategory, onClose = vi.fn()) {
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <SkillModal category={category} onClose={onClose} />
    </NextIntlClientProvider>
  );
}

describe('SkillModal', () => {
  describe('Rendering', () => {
    it('renders nothing when category is null', () => {
      const { container } = renderModal(null);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders category name when open', () => {
      renderModal();
      expect(screen.getAllByText(/Backend/i).length).toBeGreaterThan(0);
    });

    it('renders category summary', () => {
      renderModal();
      expect(screen.getByText(testCategory.summary)).toBeInTheDocument();
    });

    it('renders experience badge', () => {
      renderModal();
      expect(screen.getAllByText(/6\+ años/i).length).toBeGreaterThan(0);
    });

    it('renders all skill names', () => {
      renderModal();
      expect(screen.getByText('PHP')).toBeInTheDocument();
      expect(screen.getByText('Symfony 7')).toBeInTheDocument();
    });

    it('renders skill descriptions', () => {
      renderModal();
      expect(screen.getByText('Lenguaje principal en múltiples repositorios')).toBeInTheDocument();
    });

    it('renders skill keywords', () => {
      renderModal();
      expect(screen.getByText('Symfony')).toBeInTheDocument();
      expect(screen.getByText('Laravel')).toBeInTheDocument();
      expect(screen.getByText('OOP')).toBeInTheDocument();
    });

    it('renders usage percentage labels', () => {
      renderModal();
      const usageLabels = screen.getAllByText(/% uso repos/i);
      expect(usageLabels.length).toBeGreaterThan(0);
    });

    it('renders experience years for skills that have them', () => {
      renderModal();
      const yearLabels = screen.queryAllByText(/años/i);
      expect(yearLabels.length).toBeGreaterThan(0);
    });

    it('renders project count for skills that have them', () => {
      renderModal();
      expect(screen.getByText(/18 proyectos/i)).toBeInTheDocument();
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
      renderModal(testCategory, onClose);
      const closeBtn = screen.getByRole('button', { name: /cerrar modal/i });
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('calls onClose when Escape key is pressed', () => {
      const onClose = vi.fn();
      renderModal(testCategory, onClose);
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('calls onClose when backdrop is clicked', () => {
      const onClose = vi.fn();
      renderModal(testCategory, onClose);
      const backdrop = document.querySelector('.fixed.inset-0');
      expect(backdrop).toBeTruthy();
      fireEvent.click(backdrop!);
      expect(onClose).toHaveBeenCalledOnce();
    });
  });
});
