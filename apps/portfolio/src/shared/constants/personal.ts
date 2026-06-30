/**
 * Personal Information Constants
 *
 * Información personal de Ángel Hidalgo Barreiro para uso en el portfolio.
 * Estos datos se utilizan en componentes Hero, About, Contact, y metadata.
 */

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  location: {
    city: string;
    country: string;
    countryCode: string;
  };
  tagline: string;
  bio: {
    short: string;
    full: string;
  };
  avatar: string;
  social: {
    email: string;
    linkedin: string;
    github: string;
    twitter?: string;
    website?: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: 'Ángel Hidalgo Barreiro',
  firstName: 'Ángel',
  lastName: 'Hidalgo Barreiro',

  location: {
    city: 'Barcelona',
    country: 'España',
    countryCode: 'ES',
  },

  tagline: 'Full-Stack Developer | Symfony · React/Next.js | SaaS & IA aplicada',

  bio: {
    short:
      'Desarrollador full-stack (Symfony/PHP, React/Next.js) especializado en SaaS en producción e IA aplicada.',
    full: 'Desarrollador full-stack con 6+ años construyendo y desplegando SaaS en producción. Backend con Symfony/PHP y API Platform, frontend con React/Next.js y TypeScript. Experiencia en arquitecturas multi-tenant, integraciones de pago (Stripe), cumplimiento fiscal (Veri*factu/AEAT) e IA aplicada (RAG, OpenAI). Enfoque en escalabilidad, clean code y calidad.',
  },

  avatar: '/images/avatar-placeholder.svg',

  social: {
    email: 'angel@gestionominegocio.es',
    linkedin: 'https://www.linkedin.com/in/angel-hidalgo-barreiro',
    github: 'https://github.com/GMNAPI',
    // twitter: 'https://twitter.com/angelhibarreiro', // Opcional
    // website: 'https://angelhidalgo.dev', // Opcional
  },

  contact: {
    email: 'angel@gestionominegocio.es',
    // phone: '+34 XXX XXX XXX', // Opcional
  },
};

/**
 * Availability Status
 */
export const availability = {
  isAvailable: true,
} as const;

/**
 * Work Preferences
 */
export const workPreferences = {
  remote: true,
  onSite: true,
  hybrid: true,
  freelance: true,
  fullTime: true,
  partTime: false,
} as const;

/**
 * Professional Focus Areas
 */
export const focusAreas = [
  'Full-Stack Development',
  'SaaS Architecture',
  'REST API Design',
  'Multi-tenant Systems',
  'Applied AI (RAG, OpenAI)',
  'CI/CD & DevOps',
  'Technical Leadership',
  'Code Quality & Testing',
] as const;

/**
 * Years of Experience
 */
export const experience = {
  totalYears: 6,
  startYear: 2019,
} as const;

/**
 * Main Tech Stack (for quick reference)
 */
export const mainTechStack = {
  backend: ['PHP', 'Symfony', 'Node.js', 'TypeScript'],
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'MariaDB'],
  devops: ['Docker', 'GitHub Actions', 'AWS', 'VPS'],
  other: ['API Platform', 'REST APIs', 'ElasticSearch'],
} as const;

/**
 * Quick Stats (para About section)
 */
export const quickStats = {
  projectsCompleted: 35,
  yearsExperience: 6,
  technologiesUsed: 20,
  contributionsLastYear: 1706,
  repositoriesContributed: 9,
} as const;
