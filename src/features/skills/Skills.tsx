'use client';

import { useMemo } from 'react';
import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

import type { SkillCategory, SkillSummary } from '@/shared/constants/skills';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';

const CATEGORY_ICONS: Record<SkillCategory['id'], string> = {
  backend: '🛠️',
  frontend: '🎨',
  databases: '🗄️',
  devops: '⚙️',
  'ai-automation': '🤖',
  testing: '✅',
};

const SEGMENT_COLORS = ['#38bdf8', '#34d399', '#fbbf24', '#f97316', '#a855f7', '#ef4444'];

export function Skills() {
  const locale = useLocale();
  const tSkills = useTranslations('skills');
  const numberLocale = locale === 'es' ? 'es-ES' : 'en-US';

  const categories = tSkills.raw('categories') as SkillCategory[];
  const summary = tSkills.raw('summary') as SkillSummary;
  const languages = summary.mainLanguagesShare;

  const percentFormatter = useMemo(
    () =>
      new Intl.NumberFormat(numberLocale, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0,
      }),
    [numberLocale]
  );

  const totalUsage = languages.reduce((acc, language) => acc + language.usagePercentage, 0);
  let cumulative = 0;
  const segments = languages.map((language, index) => {
    const rawNormalized =
      totalUsage > 0
        ? (language.usagePercentage / totalUsage) * 100
        : languages.length > 0
          ? 100 / languages.length
          : 0;
    const normalized = Number(rawNormalized.toFixed(2));
    const start = cumulative;
    cumulative += normalized;
    const end = index === languages.length - 1 ? 100 : cumulative;

    return {
      language: language.language,
      value: language.usagePercentage,
      normalized,
      start,
      end,
      color: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
    };
  });

  const gradientStops = segments
    .map((segment) => `${segment.color} ${segment.start}% ${segment.end}%`)
    .join(', ');
  const donutBackground =
    segments.length > 0
      ? `conic-gradient(${gradientStops})`
      : 'conic-gradient(#38bdf8 0deg, #38bdf8 360deg)';

  const contributionsValue = tSkills('stats.contributions.value', {
    count: summary.contributionsLastYear.toLocaleString(numberLocale),
  });
  const activeReposValue = tSkills('stats.activeRepositories.value', {
    count: summary.activeRepositories.toLocaleString(numberLocale),
  });

  return (
    <m.section
      id="skills"
      className="min-h-screen bg-background py-20 px-6"
      initial={{ opacity: 1 }}
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer(0.16)}
    >
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <m.header className="space-y-4" variants={fadeInUp}>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">{tSkills('eyebrow')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">{tSkills('title')}</h2>
          <p className="max-w-3xl text-lg text-foreground-secondary leading-relaxed">
            {tSkills('intro')}
          </p>
        </m.header>

        {/* Skills visualization */}
        <m.div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]" variants={fadeInUp}>
          <div className="flex flex-col gap-6 rounded-lg border border-border bg-background-secondary/40 p-6 shadow-sm">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {tSkills('visualization.title')}
              </h3>
              <p className="mt-2 text-sm text-foreground-secondary leading-relaxed">
                {tSkills('visualization.subtitle')}
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="relative mx-auto flex aspect-square w-full max-w-[240px] items-center justify-center">
                <div
                  className="relative h-full w-full rounded-full border border-border bg-background-secondary shadow-inner"
                  style={{ background: donutBackground }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full bg-background text-center shadow-sm">
                    <span className="text-xs font-mono text-foreground-secondary">
                      {tSkills('visualization.centerLabel')}
                    </span>
                    <span className="text-2xl font-semibold text-foreground">
                      {summary.totalRepositories.toLocaleString(numberLocale)}
                    </span>
                  </div>
                </div>
              </div>

              <ul className="flex w-full flex-col gap-3">
                {segments.map((segment) => (
                  <li key={segment.language} className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: segment.color }}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-mono text-foreground">{segment.language}</span>
                      <span className="text-xs text-foreground-secondary">
                        {tSkills('visualization.legendLabel', {
                          percentage: percentFormatter.format(segment.normalized),
                        })}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-border bg-background-secondary/40 p-6 shadow-sm md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {tSkills('languages.title')}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground-secondary">
                {languages.map((language) => {
                  const usageDisplay = percentFormatter.format(language.usagePercentage);

                  return (
                    <li key={language.language} className="flex items-center justify-between gap-3">
                      <span className="font-medium text-foreground">{language.language}</span>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-background">
                          <span
                            className="block h-full bg-accent transition-all"
                            style={{
                              width: `${Math.min(language.usagePercentage, 100)}%`,
                            }}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="font-mono text-xs">{usageDisplay}%</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="space-y-3 text-sm text-foreground-secondary">
              <div className="rounded-md border border-border bg-background px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
                  {tSkills('stats.contributions.label')}
                </p>
                <p className="text-lg font-mono text-foreground">{contributionsValue}</p>
              </div>
              <div className="rounded-md border border-border bg-background px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
                  {tSkills('stats.activeRepositories.label')}
                </p>
                <p className="text-lg font-mono text-foreground">{activeReposValue}</p>
              </div>
            </div>
          </div>
        </m.div>

        {/* Skill categories */}
        <m.div className="grid gap-6 lg:grid-cols-2" variants={staggerContainer(0.12, 0.2)}>
          {categories.map((category) => (
            <m.article
              key={category.id}
              className="flex h-full flex-col gap-6 rounded-xl border border-border bg-background-secondary/30 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
              variants={fadeInUp}
              whileHover={{ translateY: -6, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
            >
              <header className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">
                    {CATEGORY_ICONS[category.id]} {category.name}
                  </p>
                  <h3 className="text-2xl font-semibold text-foreground">{category.summary}</h3>
                </div>
                <span className="inline-flex min-w-[110px] items-center justify-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground-secondary">
                  {tSkills('experienceLabel', { years: category.experienceYears })}
                </span>
              </header>

              <ul className="space-y-4">
                {category.skills.map((skill) => {
                  const usageLabel =
                    skill.usagePercentage !== undefined
                      ? tSkills('usageLabel', {
                          percentage: percentFormatter.format(skill.usagePercentage),
                        })
                      : null;

                  return (
                    <li key={skill.name} className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                        {usageLabel && (
                          <span className="font-mono text-xs text-foreground-secondary">
                            {usageLabel}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground-secondary">{skill.description}</p>
                      {(skill.usagePercentage !== undefined ||
                        skill.experienceYears !== undefined ||
                        skill.experienceProjects !== undefined) && (
                        <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-secondary/80">
                          {skill.usagePercentage !== undefined && (
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-background">
                                <span
                                  className="block h-full bg-accent/80 transition-all"
                                  style={{
                                    width: `${Math.min(skill.usagePercentage, 100)}%`,
                                  }}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          )}
                          {skill.experienceYears !== undefined && (
                            <span>
                              {tSkills('experienceLabel', { years: skill.experienceYears })}
                            </span>
                          )}
                          {skill.experienceProjects !== undefined && (
                            <span>
                              {tSkills('projectsLabel', { count: skill.experienceProjects })}
                            </span>
                          )}
                        </div>
                      )}
                      {skill.keywords && (
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
            </m.article>
          ))}
        </m.div>
      </div>
    </m.section>
  );
}
