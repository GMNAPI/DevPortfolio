/**
 * About Section
 *
 * Personal information and tech stack display.
 * Shows developer profile and technologies used.
 */

'use client';

import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

import type { CertificationItem, ExperienceItem } from '@/shared/constants/career';
import type { SkillSummary } from '@/shared/constants/skills';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';

export function About() {
  const tAbout = useTranslations('about');
  const tSkills = useTranslations('skills');
  const locale = useLocale();
  const numberLocale = locale === 'es' ? 'es-ES' : 'en-US';

  const technologies = tAbout.raw('technologies') as string[];
  const experiences = tAbout.raw('career.experiences') as ExperienceItem[];
  const certifications = tAbout.raw('career.certifications') as CertificationItem[];
  const skillsSummary = tSkills.raw('summary') as SkillSummary;

  const accountCreatedAt = new Date(skillsSummary.accountCreatedAt);
  const accountCreatedFormatter = new Intl.DateTimeFormat(numberLocale, {
    year: 'numeric',
    month: 'long',
  });
  const formattedAccountCreatedAt = accountCreatedFormatter.format(accountCreatedAt);

  const stats = [
    {
      label: tAbout('stats.contributions.label'),
      value: skillsSummary.contributionsLastYear.toLocaleString(numberLocale),
      detail: tAbout('stats.contributions.detail'),
    },
    {
      label: tAbout('stats.repositoriesAnalysed.label'),
      value: skillsSummary.totalRepositories.toLocaleString(numberLocale),
      detail: tAbout('stats.repositoriesAnalysed.detail'),
    },
    {
      label: tAbout('stats.repositoriesActive.label'),
      value: skillsSummary.activeRepositories.toLocaleString(numberLocale),
      detail: tAbout('stats.repositoriesActive.detail'),
    },
    {
      label: tAbout('stats.repositoriesWithStars.label'),
      value: skillsSummary.repositoriesWithStars.toLocaleString(numberLocale),
      detail: tAbout('stats.repositoriesWithStars.detail'),
    },
    {
      label: tAbout('stats.accountCreated.label'),
      value: formattedAccountCreatedAt,
      detail: tAbout('stats.accountCreated.detail', {
        detailDate: formattedAccountCreatedAt,
      }),
    },
  ];

  return (
    <m.section
      id="about"
      className="min-h-screen py-20 px-6 bg-background"
      initial={{ opacity: 1 }}
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer(0.18)}
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <m.header className="space-y-4" variants={fadeInUp}>
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">{tAbout('eyebrow')}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">{tAbout('title')}</h2>
          <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
            {tAbout('intro')}
          </p>
        </m.header>

        {/* Experience Timeline */}
        <m.section className="space-y-8" variants={fadeInUp}>
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
            {tAbout('sections.timeline')}
          </h3>
          <div className="relative pl-6 md:pl-10">
            <div
              className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-border"
              aria-hidden="true"
            />
            <div className="space-y-12">
              {experiences.map((experience) => (
                <m.article
                  key={`${experience.role}-${experience.company}-${experience.period.start}`}
                  className="relative pl-6 md:pl-10"
                  variants={fadeInUp}
                >
                  <span className="absolute left-0 top-2 flex h-3 w-3 items-center justify-center">
                    <span className="h-3 w-3 rounded-full border-2 border-accent bg-background" />
                  </span>

                  <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">
                        {experience.role} · {experience.company}
                      </h4>
                      <p className="text-sm md:text-base text-foreground-secondary">
                        {experience.headline}
                      </p>
                    </div>
                    <span className="inline-flex rounded-full bg-background-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide text-foreground-secondary">
                      {experience.period.start} — {experience.period.end}
                    </span>
                  </header>

                  <ul className="mt-4 space-y-2 text-sm md:text-base text-foreground-secondary">
                    {experience.achievements.map((achievement) => (
                      <m.li key={achievement} className="flex gap-2" variants={fadeInUp}>
                        <span aria-hidden="true" className="mt-1 text-accent">
                          •
                        </span>
                        <span>{achievement}</span>
                      </m.li>
                    ))}
                  </ul>
                </m.article>
              ))}
            </div>
          </div>
        </m.section>

        {/* GitHub Stats */}
        <m.section className="space-y-6" variants={fadeInUp}>
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
            {tAbout('sections.activity')}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {stats.map((stat) => (
              <m.article
                key={stat.label}
                className="rounded-xl border border-border bg-background-secondary/40 px-5 py-4 shadow-sm"
                whileHover={{ translateY: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-2 text-sm text-foreground-secondary">{stat.detail}</p>
              </m.article>
            ))}
          </div>
        </m.section>

        {/* Certifications */}
        <m.section className="space-y-6" variants={fadeInUp}>
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
            {tAbout('sections.certifications')}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((certification) => (
              <m.article
                key={`${certification.name}-${certification.year}`}
                className="flex flex-col gap-2 rounded-lg border border-border bg-background-secondary/40 px-4 py-4 transition-colors hover:border-accent/60 hover:bg-background-secondary/60"
                whileHover={{ translateY: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}
              >
                <header>
                  <p className="text-sm uppercase tracking-wide text-accent/80">
                    {certification.issuer} · {certification.year}
                  </p>
                  <h4 className="text-lg font-semibold text-foreground">{certification.name}</h4>
                </header>
                {certification.description && (
                  <p className="text-sm text-foreground-secondary">{certification.description}</p>
                )}
                {certification.credentialUrl && (
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Ver credencial
                  </a>
                )}
              </m.article>
            ))}
          </div>
        </m.section>

        {/* Tech Stack */}
        <m.section className="space-y-6" variants={fadeInUp}>
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
            {tAbout('sections.techStack')}
          </h3>
          <ul className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <m.li
                key={tech}
                className="px-4 py-2 bg-background-secondary border border-border rounded-md text-foreground font-mono text-sm hover:bg-accent hover:text-background transition-colors"
                whileHover={{ y: -2 }}
              >
                {tech}
              </m.li>
            ))}
          </ul>
        </m.section>
      </div>
    </m.section>
  );
}
