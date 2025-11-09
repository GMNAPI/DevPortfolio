/**
 * About Section
 *
 * Personal information and tech stack display.
 * Shows developer profile and technologies used.
 */

export function About() {
  const technologies = [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'Git',
    'Vitest',
    'Clean Architecture',
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Sobre mí</h2>
          <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed">
            Desarrollador enfocado en crear soluciones robustas y escalables. Apasionado por el
            código limpio, las buenas prácticas y la arquitectura de software. Cada proyecto es una
            oportunidad para aprender y mejorar.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground">Stack tecnológico</h3>
          <ul className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="px-4 py-2 bg-background-secondary border border-border rounded-md text-foreground font-mono text-sm hover:bg-accent hover:text-background transition-colors"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
