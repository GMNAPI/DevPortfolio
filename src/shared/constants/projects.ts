/**
 * Projects Data
 *
 * Portfolio projects data.
 * First project is this portfolio itself (meta!)
 */

import { ProjectData } from '@/core/entities/Project';

export const PROJECTS: ProjectData[] = [
  {
    id: '1',
    title: 'Personal Portfolio',
    description:
      'Portfolio minimalista con arquitectura limpia. Implementado con TDD, Clean Architecture y diseño modular. Este mismo proyecto es una demostración de buenas prácticas de desarrollo.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vitest', 'Clean Architecture'],
    links: {
      github: 'https://github.com/usuario/portfolio',
      demo: 'https://portfolio.dev',
    },
  },
  {
    id: '2',
    title: 'Proyecto Ejemplo 1',
    description: 'Descripción del proyecto. Problema que resuelve y tecnologías utilizadas.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    links: {
      github: 'https://github.com/usuario/proyecto1',
    },
  },
  {
    id: '3',
    title: 'Proyecto Ejemplo 2',
    description: 'Otro proyecto interesante con sus propias características y soluciones.',
    tech: ['Next.js', 'TypeScript', 'Prisma'],
    links: {
      github: 'https://github.com/usuario/proyecto2',
      demo: 'https://proyecto2.vercel.app',
    },
  },
];
