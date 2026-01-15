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

  tagline: 'Tech Lead | Comunicación técnica | SaaS | Node.js | React | PHP/Symfony',

  bio: {
    short:
      'Tech Lead con experiencia colaborando con usuarios y clientes, comunicación clara y actitud resolutiva.',
    full: 'Tech Lead especializado en traducir requisitos de negocio a soluciones técnicas. Experiencia liderando equipos, coordinando con stakeholders, y gestionando incidencias con comunicación efectiva. Enfocado en entregar valor a través de comunicación clara, seguimiento de tareas y entregas iterativas.',
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
  'Technical Leadership',
  'Stakeholder Communication',
  'Requirements Analysis',
  'Team Coordination',
  'Incident Resolution',
  'Iterative Delivery',
  'User Support & Training',
  'Technical Strategy',
] as const;

/**
 * Years of Experience
 */
export const experience = {
  totalYears: 5,
  startYear: 2020,
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
  yearsExperience: 5,
  technologiesUsed: 20,
  contributionsLastYear: 1706,
  repositoriesContributed: 9,
} as const;
