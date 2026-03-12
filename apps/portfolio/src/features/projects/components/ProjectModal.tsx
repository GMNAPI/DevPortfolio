'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Modal } from '@/shared/components/ui/Modal';
import { cn } from '@/shared/utils/cn';
import type { Project } from '@/core/entities/Project';
import { personalInfo } from '@/shared/constants/personal';
import { CATEGORY_GRADIENTS } from '../utils/categoryColors';

interface ProjectModalProps {
  project: Project | null;
  categoryName: string;
  onClose: () => void;
}

export function ProjectModal({ project, categoryName, onClose }: ProjectModalProps) {
  const t = useTranslations('projects');

  if (!project) return null;

  return (
    <Modal isOpen={true} onClose={onClose} ariaLabel={project.title}>
      {/* Header gradient / image */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div
            className={cn(
              'h-full w-full bg-gradient-to-br flex items-center justify-center',
              CATEGORY_GRADIENTS[project.categoryId]
            )}
          >
            <span className="text-7xl font-mono font-bold text-foreground/20 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t('aria.closeModal')}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground-secondary hover:text-foreground transition-colors"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Category + links row */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <span className="inline-flex items-center rounded-full border border-border bg-background-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
            {categoryName}
          </span>
          <div className="flex gap-2 flex-wrap">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center rounded-md border border-accent px-3 py-1.5 font-mono text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-background"
              >
                {t('labels.github')}
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-medium text-background transition-colors hover:bg-accent/80"
              >
                {t('labels.demo')}
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>

        {/* Description */}
        <p className="text-sm text-foreground-secondary leading-relaxed">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2" aria-label={t('aria.tech')}>
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-mono text-foreground-secondary transition-colors hover:border-accent hover:text-accent"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Detail link */}
        <Link
          href={`/projects/${project.detailSlug}`}
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 font-mono text-sm font-medium text-foreground-secondary transition-colors hover:border-accent hover:text-accent"
        >
          {t('labels.detail')} →
        </Link>

        {/* Private notice */}
        <p className="flex flex-wrap items-center gap-1 text-xs text-foreground-secondary/80">
          <span aria-hidden="true">🔒</span>
          <span>
            {t.rich('privateNotice.text', {
              linkLabel: t('privateNotice.linkLabel'),
              link: (chunks) => (
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </span>
        </p>
      </div>
    </Modal>
  );
}
