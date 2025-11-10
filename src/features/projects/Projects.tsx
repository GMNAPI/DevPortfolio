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

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Project } from '@/core/entities/Project';
import { PROJECTS, PROJECT_CATEGORIES, PROJECT_CATEGORY_LIST } from '@/shared/constants/projects';
import { personalInfo } from '@/shared/constants/personal';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';

export function Projects() {
  const projects = useMemo(() => PROJECTS.map((data) => new Project(data)), []);
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer(0.16)}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <m.div className="space-y-4" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Proyectos</h2>
          <p className="text-lg text-foreground-secondary max-w-3xl">
            Selección de productos SaaS, herramientas internas y documentación técnica desarrollada
            para clientes y proyectos propios. Organizados en 6 categorías estratégicas.
          </p>
        </m.div>

        {/* Filters */}
        <m.div className="flex flex-wrap gap-3" variants={fadeInUp}>
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
          >
            Todas ({projects.length})
          </Button>
          {PROJECT_CATEGORY_LIST.map((category) => (
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
          {PROJECT_CATEGORY_LIST.map((category) => (
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
            const category = PROJECT_CATEGORIES[project.categoryId];

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
                    <div className="flex flex-wrap gap-2" aria-label="Tecnologías utilizadas">
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
                          GitHub
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 font-mono text-sm font-medium text-background transition-colors hover:bg-accent-hover"
                        >
                          Demo →
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.detailSlug}`}
                        className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 font-mono text-sm font-medium text-foreground-secondary transition-colors hover:border-accent hover:text-accent"
                      >
                        Ver detalle
                      </Link>
                    </div>
                    <p className="flex flex-wrap items-center gap-1 text-xs text-foreground-secondary/80">
                      <span aria-hidden="true">🔒</span>
                      <span>
                        Repositorio privado — solicita acceso en{' '}
                        <a
                          href={personalInfo.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline-offset-2 hover:underline"
                        >
                          LinkedIn
                        </a>
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
