/**
 * Skills Section
 *
 * Visualiza habilidades técnicas agrupadas por categorías estratégicas.
 * Se apoya en los datos normalizados de `@/shared/constants/skills`.
 */

'use client';

import { m } from 'framer-motion';

import { SKILL_CATEGORIES, SKILL_SUMMARY } from '@/shared/constants/skills';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';

const CATEGORY_ICONS: Record<(typeof SKILL_CATEGORIES)[number]['id'], string> = {
  backend: '🛠️',
  frontend: '🎨',
  databases: '🗄️',
  devops: '⚙️',
  'ai-automation': '🤖',
  testing: '✅',
};

export function Skills() {
  return (
    <m.section
      id="skills"
      className="min-h-screen bg-background py-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer(0.16)}
    >
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <m.header className="space-y-4" variants={fadeInUp}>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">Stack principal</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Habilidades técnicas</h2>
          <p className="max-w-3xl text-lg text-foreground-secondary leading-relaxed">
            Panorama basado en el análisis de 35 repositorios privados y contribuciones recientes.
            Se destacan tecnologías con mayor adopción, años de experiencia y foco actual en
            automatización inteligente.
          </p>
        </m.header>

        {/* Languages usage */}
        <m.div
          className="grid gap-3 rounded-lg border border-border bg-background-secondary/40 p-6 shadow-sm md:grid-cols-2"
          variants={fadeInUp}
        >
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Lenguajes más utilizados
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground-secondary">
              {SKILL_SUMMARY.mainLanguagesShare.map((language) => (
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
                    <span className="font-mono text-xs">{language.usagePercentage}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 text-sm text-foreground-secondary">
            <div className="rounded-md border border-border bg-background px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
                Contribuciones anuales
              </p>
              <p className="text-lg font-mono text-foreground">
                {SKILL_SUMMARY.contributionsLastYear.toLocaleString('es-ES')} commits y PRs privados
              </p>
            </div>
            <div className="rounded-md border border-border bg-background px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
                Repositorios activos
              </p>
              <p className="text-lg font-mono text-foreground">
                {SKILL_SUMMARY.activeRepositories} repos en mantenimiento continuo
              </p>
            </div>
          </div>
        </m.div>

        {/* Skill categories */}
        <m.div className="grid gap-6 lg:grid-cols-2" variants={staggerContainer(0.12, 0.2)}>
          {SKILL_CATEGORIES.map((category) => (
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
                  {category.experienceYears}+ años
                </span>
              </header>

              <ul className="space-y-4">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                      {skill.usagePercentage !== undefined && (
                        <span className="font-mono text-xs text-foreground-secondary">
                          {skill.usagePercentage}% uso repos
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
                          <span>{skill.experienceYears}+ años</span>
                        )}
                        {skill.experienceProjects !== undefined && (
                          <span>{skill.experienceProjects} proyectos</span>
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
                ))}
              </ul>
            </m.article>
          ))}
        </m.div>
      </div>
    </m.section>
  );
}
