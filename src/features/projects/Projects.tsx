/**
 * Projects Section
 *
 * Portfolio projects showcase.
 * Displays project cards with tech stack and links.
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Project } from '@/core/entities/Project';
import { PROJECTS } from '@/shared/constants/projects';

export function Projects() {
  const projects = PROJECTS.map((data) => new Project(data));

  return (
    <section id="projects" className="min-h-screen py-20 px-6 bg-background-secondary">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Proyectos</h2>
          <p className="text-lg text-foreground-secondary">Algunas cosas que he construido</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article key={project.id}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-background text-foreground-secondary text-xs font-mono rounded border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md font-mono font-medium text-sm px-4 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-background transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md font-mono font-medium text-sm px-4 py-2 bg-accent text-background hover:bg-accent-hover transition-colors"
                      >
                        Demo →
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
