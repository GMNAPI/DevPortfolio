'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { Modal } from '@/shared/components/ui/Modal';
import type { SkillCategory } from '@/shared/constants/skills';
import { CATEGORY_ICONS } from './SkillCard';

interface SkillModalProps {
  category: SkillCategory | null;
  onClose: () => void;
}

export function SkillModal({ category, onClose }: SkillModalProps) {
  const t = useTranslations('skills');
  const locale = useLocale();
  const numberLocale = locale === 'es' ? 'es-ES' : 'en-US';

  const percentFormatter = useMemo(
    () =>
      new Intl.NumberFormat(numberLocale, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0,
      }),
    [numberLocale]
  );

  if (!category) return null;

  return (
    <Modal isOpen={true} onClose={onClose} ariaLabel={category.name}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-6 pb-4 border-b border-border">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">
            {CATEGORY_ICONS[category.id]} {category.name}
          </p>
          <span className="inline-flex items-center rounded-full border border-border bg-background-secondary/60 px-3 py-1 text-xs font-medium text-foreground-secondary">
            {t('experienceLabel', { years: category.experienceYears })}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label={t('aria.closeModal')}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-secondary border border-border text-foreground-secondary hover:text-foreground transition-colors"
        >
          ×
        </button>
      </div>

      {/* Summary */}
      <div className="px-6 pt-4 pb-2">
        <p className="text-sm text-foreground-secondary leading-relaxed">{category.summary}</p>
      </div>

      {/* Skill list */}
      <ul className="px-6 pb-6 space-y-5">
        {category.skills.map((skill) => {
          const usageLabel =
            skill.usagePercentage !== undefined
              ? t('usageLabel', {
                  percentage: percentFormatter.format(skill.usagePercentage),
                })
              : null;

          return (
            <li
              key={skill.name}
              className="space-y-2 pt-4 border-t border-border/50 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                {usageLabel && (
                  <span className="font-mono text-xs text-foreground-secondary">{usageLabel}</span>
                )}
              </div>

              {skill.usagePercentage !== undefined && (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-background-secondary">
                    <span
                      className="block h-full bg-accent/80 transition-all"
                      style={{ width: `${Math.min(skill.usagePercentage, 100)}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}

              <p className="text-sm text-foreground-secondary">{skill.description}</p>

              {(skill.experienceYears !== undefined || skill.experienceProjects !== undefined) && (
                <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-secondary/80">
                  {skill.experienceYears !== undefined && (
                    <span>{t('experienceLabel', { years: skill.experienceYears })}</span>
                  )}
                  {skill.experienceProjects !== undefined && (
                    <span>{t('projectsLabel', { count: skill.experienceProjects })}</span>
                  )}
                </div>
              )}

              {skill.keywords && skill.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {skill.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-mono text-foreground-secondary"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
