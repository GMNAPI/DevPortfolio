import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { Project, type ProjectData } from '@/core/entities/Project';
import {
  getProjectDetail,
  type ProjectDetailContent,
} from '@/features/projects/utils/projectDetail';
import { routing } from '@/i18n/routing';
import { PROJECT_SLUGS } from '@/shared/constants/project-slugs';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  // Generate static params for all locale + slug combinations
  // This runs at build time without request context, so we use constants
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const slug of PROJECT_SLUGS) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const t = await getTranslations('projects');
  const projectsData = t.raw('items') as ProjectData[];

  const projectData = projectsData.find((project) => (project.detailSlug ?? project.id) === slug);

  if (!projectData) {
    notFound();
  }

  const project = new Project(projectData);
  const details = t.raw('details') as Record<string, ProjectDetailContent> | undefined;
  const detail = getProjectDetail(details, slug);

  return (
    <section className="min-h-screen bg-background py-20 px-6">
      <div className="mx-auto max-w-4xl space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-accent"
        >
          ← Volver al portfolio
        </Link>

        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-accent/80">
            {detail ? project.categoryId.replace(/-/g, ' ') : 'Detalle en preparación'}
          </p>
          <h1 className="text-4xl font-bold text-foreground">{project.title}</h1>
          <p className="text-lg text-foreground-secondary">{project.description}</p>
        </header>

        {detail ? (
          <>
            {detail.metrics && detail.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {detail.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-border bg-background-secondary/40 p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs uppercase tracking-wide text-foreground-secondary">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <article className="space-y-8">
              {detail.sections.map((item) => (
                <div key={item.heading} className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground">{item.heading}</h2>
                  <p className="leading-relaxed text-foreground-secondary">{item.body}</p>
                </div>
              ))}
            </article>

            <div className="flex flex-wrap gap-3 text-sm text-foreground-secondary/90">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs font-mono text-foreground-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        ) : (
          <article className="space-y-6 rounded-xl border border-border bg-background-secondary/40 p-6 shadow-sm">
            <p className="text-sm text-foreground-secondary">
              Estamos preparando una ficha completa con arquitectura, capturas y métricas clave de
              este proyecto. Mientras tanto, puedes solicitar una demo privada o más información
              directa.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-foreground-secondary/90">
              <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs uppercase tracking-wide">
                {project.categoryId.replace(/-/g, ' ')}
              </span>
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs font-mono text-foreground-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        )}

        <div className="space-y-3 rounded-xl border border-accent/40 bg-accent/5 p-6 text-sm text-foreground-secondary">
          <p className="flex items-center gap-2 font-medium text-accent">
            <span aria-hidden="true">🔒</span>
            Acceso con invitación
          </p>
          <p>
            Este repositorio es privado. Solicita acceso enviando un mensaje a través de{' '}
            <Link
              href={project.links.github ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
            >
              GitHub
            </Link>{' '}
            o contactando desde el portfolio.
          </p>
        </div>
      </div>
    </section>
  );
}
