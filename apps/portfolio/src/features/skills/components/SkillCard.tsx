'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/utils/motion';
import type { SkillCategory } from '@/shared/constants/skills';

export const CATEGORY_ICONS: Record<SkillCategory['id'], string> = {
  backend: '🛠️',
  frontend: '🎨',
  databases: '🗄️',
  devops: '⚙️',
  'ai-automation': '🤖',
  testing: '✅',
  leadership: '🤝',
};

const MAX_VISIBLE_SKILLS = 3;

interface SkillCardProps {
  category: SkillCategory;
  onOpen: (category: SkillCategory) => void;
}

export function SkillCard({ category, onOpen }: SkillCardProps) {
  const t = useTranslations('skills');

  const visibleSkills = category.skills.slice(0, MAX_VISIBLE_SKILLS);
  const overflowCount = category.skills.length - MAX_VISIBLE_SKILLS;

  return (
    <m.article
      variants={fadeInUp}
      whileHover={{ scale: 1.03, translateY: -4 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="group relative cursor-pointer rounded-xl border border-border bg-background-secondary/30 backdrop-blur overflow-hidden shadow-sm hover:shadow-lg hover:shadow-accent/20 transition-shadow h-52"
      onClick={() => onOpen(category)}
      role="article"
      aria-label={t('aria.openCategory', { name: category.name })}
    >
      {/* Default card content */}
      <div className="p-5 h-full flex flex-col gap-3">
        {/* Header: icon + name + experience badge */}
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">
            {CATEGORY_ICONS[category.id]} {category.name}
          </p>
          <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-foreground-secondary">
            {t('experienceLabel', { years: category.experienceYears })}
          </span>
        </div>

        {/* Summary truncated to 2 lines */}
        <p className="text-sm text-foreground-secondary leading-relaxed line-clamp-2">
          {category.summary}
        </p>

        {/* Skill name pills: first 3 + overflow */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {visibleSkills.map((skill) => (
            <span
              key={skill.name}
              className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-mono text-foreground-secondary"
            >
              {skill.name}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs font-mono text-accent">
              +{overflowCount}
            </span>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-background opacity-0 group-hover:opacity-95 transition-opacity duration-200 flex flex-col gap-2 p-5 pointer-events-none group-hover:pointer-events-auto overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80 shrink-0">
          {CATEGORY_ICONS[category.id]} {category.name}
        </p>
        <ul className="space-y-2 flex-1">
          {category.skills.map((skill) => (
            <li key={skill.name} className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-foreground">{skill.name}</span>
                {skill.usagePercentage !== undefined && (
                  <span className="text-xs font-mono text-foreground-secondary shrink-0">
                    {skill.usagePercentage}%
                  </span>
                )}
              </div>
              {skill.usagePercentage !== undefined && (
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
                  <span
                    className="block h-full bg-accent/80 transition-all"
                    style={{ width: `${Math.min(skill.usagePercentage, 100)}%` }}
                    aria-hidden="true"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="text-xs text-accent font-mono text-right shrink-0">Ver detalles →</p>
      </div>
    </m.article>
  );
}
