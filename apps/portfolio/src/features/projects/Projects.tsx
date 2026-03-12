/**
 * Projects Section
 *
 * Portfolio projects showcase.
 * Displays compact project cards; clicking opens a detail modal.
 */

'use client';

import { useMemo, useState } from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components/ui/Button';
import { Project } from '@/core/entities/Project';
import type { ProjectCategory, ProjectMessageItem } from '@/shared/constants/projects';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';

export function Projects() {
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer(0.12, 0.2)}
        >
          {filteredProjects.map((project) => {
            const category = categoriesById[project.categoryId];
            return (
              <ProjectCard
                key={project.id}
                project={project}
                categoryName={category?.name ?? tProjects('labels.categoryFallback')}
                onOpen={setSelectedProject}
              />
            );
          })}
        </m.div>
      </div>

      {/* Detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          categoryName={
            categoriesById[selectedProject.categoryId]?.name ?? tProjects('labels.categoryFallback')
          }
          onClose={() => setSelectedProject(null)}
        />
      )}
    </m.section>
  );
}
