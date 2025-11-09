/**
 * Hero Section
 *
 * Landing section with main message and CTA.
 * Features minimalist design with subtle animations.
 */

'use client';

import { Button } from '@/shared/components/ui/Button';

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground animate-slide-up">
          Desarrollo cosas
        </h1>

        <p className="text-xl md:text-2xl text-foreground-secondary max-w-2xl mx-auto animate-slide-up [animation-delay:100ms]">
          Desarrollador creando soluciones con código limpio y arquitectura escalable
        </p>

        <div className="pt-4 animate-slide-up [animation-delay:200ms]">
          <Button size="lg" onClick={scrollToProjects} data-scroll-to="projects">
            Ver proyectos →
          </Button>
        </div>
      </div>
    </section>
  );
}
