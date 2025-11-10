import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Project } from '@/core/entities/Project';
import { PROJECTS } from '@/shared/constants/projects';

interface ProjectDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.detailSlug ?? project.id,
  }));
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const projectData = PROJECTS.find(
    (project) => (project.detailSlug ?? project.id) === params.slug
  );

  if (!projectData) {
    notFound();
  }

  const project = new Project(projectData);

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
            Detalle en preparación
          </p>
          <h1 className="text-4xl font-bold text-foreground">{project.title}</h1>
          <p className="text-lg text-foreground-secondary">{project.description}</p>
        </header>

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
