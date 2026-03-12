'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/utils/cn';
import { fadeInUp } from '@/shared/utils/motion';
import type { Project } from '@/core/entities/Project';
import { CATEGORY_GRADIENTS } from '../utils/categoryColors';

const MAX_VISIBLE_TECH = 3;

interface ProjectCardProps {
  project: Project;
  categoryName: string;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, categoryName, onOpen }: ProjectCardProps) {
  const t = useTranslations('projects');

  const visibleTech = project.tech.slice(0, MAX_VISIBLE_TECH);
  const overflowCount = project.tech.length - MAX_VISIBLE_TECH;

  return (
    <m.article
      key={project.id}
      data-project-id={project.id}
      variants={fadeInUp}
      whileHover={{ scale: 1.03, translateY: -4 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="group relative cursor-pointer rounded-xl border border-border/60 bg-background/80 backdrop-blur overflow-hidden shadow-sm hover:shadow-lg hover:shadow-accent/20 transition-shadow h-80"
      onClick={() => onOpen(project)}
      role="article"
      aria-label={t('aria.openProject', { title: project.title })}
    >
      {/* Image / Gradient area */}
      <div className="relative h-44 w-full overflow-hidden">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div
            className={cn(
              'h-full w-full bg-gradient-to-br flex items-center justify-center',
              CATEGORY_GRADIENTS[project.categoryId]
            )}
          >
            <span className="text-5xl font-mono font-bold text-foreground/20 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Default card content */}
      <div className="p-4 space-y-2">
        <span className="inline-flex items-center rounded-full border border-border bg-background-secondary/60 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
          {categoryName}
        </span>
        <h3 className="text-base font-bold text-foreground leading-tight line-clamp-2">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-mono text-foreground-secondary"
            >
              {tech}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs font-mono text-accent">
              {t('labels.moretech', { count: overflowCount })}
            </span>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-background opacity-0 group-hover:opacity-95 transition-opacity duration-200 flex flex-col justify-between p-5 pointer-events-none group-hover:pointer-events-auto">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full border border-border bg-background-secondary/60 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
            {categoryName}
          </span>
          <h3 className="text-base font-bold text-foreground leading-tight line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-foreground-secondary leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1" aria-label={t('aria.tech')}>
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-mono text-foreground-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-accent font-mono text-right">{t('labels.detail')} →</p>
      </div>
    </m.article>
  );
}
