/**
 * Projects Section
 *
 * Portfolio projects showcase.
 * Displays project cards with tech stack and links.
 */

'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Project } from '@/core/entities/Project';
import type { ProjectCategory, ProjectMessageItem } from '@/shared/constants/projects';
import { personalInfo } from '@/shared/constants/personal';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';

export function Projects() {
  const locale = useLocale();
  const tProjects = useTranslations('projects');

  const rawProjects = useMemo(() => tProjects.raw('items') as ProjectMessageItem[], [tProjects]);
  const projects = useMemo(() => rawProjects.map((data) => new Project(data)), [rawProjects]);

  const categories = useMemo(() => tProjects.raw('categories') as ProjectCategory[], [tProjects]);
  const categoriesById = useMemo(
    () =>
      categories.reduce<Record<Project['categoryId'], ProjectCategory>>(
        (acc, category) => {
          acc[category.id] = category;
          return acc;
        },
        {} as Record<Project['categoryId'], ProjectCategory>
      ),
    [categories]
  );
  const [activeCategory, setActiveCategory] = useState<'all' | Project['categoryId']>('all');

  const categoryCounts = useMemo(() => {
    return projects.reduce<Record<Project['categoryId'], number>>(
      (acc, project) => {
        acc[project.categoryId] = (acc[project.categoryId] ?? 0) + 1;
        return acc;
      },
      {} as Record<Project['categoryId'], number>
    );
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects;
    }

    return projects.filter((project) => project.categoryId === activeCategory);
  }, [activeCategory, projects]);

  return (
    <m.section
      id="projects"
      className="min-h-screen py-20 px-6 bg-background-secondary"
      initial={{ opacity: 1 }}
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer(0.16)}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <m.div className="space-y-4" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">{tProjects('title')}</h2>
          <p className="text-lg text-foreground-secondary max-w-3xl">{tProjects('subtitle')}</p>
        </m.div>

        {/* Filters */}
        <m.div className="flex flex-wrap gap-3" variants={fadeInUp}>
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
          >
            {tProjects('filters.all', { count: projects.length })}
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name} ({categoryCounts[category.id] ?? 0})
            </Button>
          ))}
        </m.div>

        {/* Category overview */}
        <m.div className="grid grid-cols-1 gap-4 md:grid-cols-2" variants={fadeInUp}>
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border border-border bg-background p-4 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent/80">
                {category.name}
              </p>
              <p className="mt-2 text-sm text-foreground-secondary">{category.description}</p>
            </div>
          ))}
        </m.div>

        {/* Projects Grid */}
        <m.div
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer(0.12, 0.2)}
        >
          {filteredProjects.map((project) => {
            const category = categoriesById[project.categoryId];

            return (
              <m.article
                key={project.id}
                data-project-id={project.id}
                variants={fadeInUp}
                whileHover={{ translateY: -6 }}
              >
                <Card className="flex h-full flex-col border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm shadow-transparent transition-shadow hover:shadow-accent/20">
                  <CardHeader className="mb-0 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full border border-border bg-background-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
                        {category?.name ?? 'Proyecto'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-2xl text-foreground">{project.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-6 pt-6">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2" aria-label={tProjects('aria.tech')}>
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs font-mono text-foreground-secondary transition-colors hover:border-accent hover:text-accent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md border border-accent px-4 py-2 font-mono text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background"
                        >
                          {tProjects('labels.github')}
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 font-mono text-sm font-medium text-background transition-colors hover:bg-accent-hover"
                        >
                          {tProjects('labels.demo')}
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.detailSlug}`}
                        className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 font-mono text-sm font-medium text-foreground-secondary transition-colors hover:border-accent hover:text-accent"
                      >
                        {tProjects('labels.detail')}
                      </Link>
                    </div>
                    <p className="flex flex-wrap items-center gap-1 text-xs text-foreground-secondary/80">
                      <span aria-hidden="true">🔒</span>
                      <span>
                        {tProjects.rich('privateNotice.text', {
                          linkLabel: tProjects('privateNotice.linkLabel'),
                          link: (chunks) => (
                            <a
                              href={personalInfo.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent underline-offset-2 hover:underline"
                            >
                              {chunks}
                            </a>
                          ),
                        })}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </m.article>
            );
          })}
        </m.div>
      </div>
    </m.section>
  );
}
