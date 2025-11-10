/**
 * Professional Experience Timeline
 *
 * Timeline completo de experiencia profesional de Ángel Hidalgo Barreiro.
 * Incluye roles, empresas, responsabilidades y logros clave.
 */

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: {
    start: string; // YYYY-MM
    end: string | 'present'; // YYYY-MM or 'present'
  };
  type: 'full-time' | 'freelance' | 'founder' | 'consultant';
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  highlights?: string[];
}

export const experienceTimeline: ExperienceItem[] = [
  {
    id: 'gestionominegocio',
    role: 'Cofundador & Lead Developer',
    company: 'GestionoMiNegocio',
    companyUrl: 'https://github.com/GMNAPI/gestionominegocio',
    location: 'Barcelona, España',
    period: {
      start: '2020-01',
      end: 'present',
    },
    type: 'founder',
    description:
      'Liderazgo técnico en la transformación de un ERP tradicional a una plataforma SaaS moderna y escalable.',
    responsibilities: [
      'Arquitectura y diseño de la migración completa a SaaS',
      'Liderazgo del equipo de desarrollo',
      'Implementación de Clean Architecture y Domain-Driven Design',
      'Optimización de rendimiento y escalabilidad',
      'Gestión de infraestructura cloud y DevOps',
    ],
    achievements: [
      'Reducción del 70% en errores de producción',
      'Migración exitosa de arquitectura monolítica a microservicios',
      'Implementación de CI/CD completo con testing automatizado',
      'Escalado a múltiples clientes con arquitectura multi-tenant',
    ],
    technologies: [
      'PHP',
      'Symfony 7',
      'MySQL',
      'Docker',
      'GitHub Actions',
      'API Platform',
      'Twig',
      'JavaScript',
    ],
    highlights: ['Proyecto SaaS principal', 'Reducción 70% errores', 'Clean Architecture'],
  },

  {
    id: 'vitaliber',
    role: 'Especialista de Programa',
    company: 'Vita Liber S.L.U.',
    location: 'Barcelona, España',
    period: {
      start: '2021-01',
      end: '2023-07',
    },
    type: 'full-time',
    description:
      'Modernización de sistemas legacy y desarrollo de nuevas funcionalidades con stack moderno.',
    responsibilities: [
      'Modernización de aplicación legacy a Next.js + Symfony',
      'Diseño e implementación de APIs REST con API Platform',
      'Implementación de testing avanzado (unitario, integración, E2E)',
      'Optimización de rendimiento backend y frontend',
      'Mentoría técnica del equipo',
    ],
    achievements: [
      'Migración exitosa a stack moderno sin downtime',
      'Implementación de arquitectura de APIs RESTful escalable',
      'Cobertura de tests aumentada del 20% al 85%',
      'Mejora del 60% en tiempo de carga de aplicación',
    ],
    technologies: [
      'Next.js',
      'Symfony',
      'TypeScript',
      'React',
      'API Platform',
      'PHPUnit',
      'Vitest',
      'PostgreSQL',
    ],
    highlights: ['Modernización Next.js + Symfony', 'APIs REST escalables', 'Testing avanzado'],
  },

  {
    id: 'fastbyte',
    role: 'Consultor & Tech Lead',
    company: 'Fastbyte',
    location: 'Barcelona, España',
    period: {
      start: '2022-06',
      end: '2024-10',
    },
    type: 'consultant',
    description:
      'Consultoría técnica especializada en migración de sistemas legacy y arquitectura de microservicios.',
    responsibilities: [
      'Asesoría en migración a Symfony y Next.js',
      'Diseño de arquitectura de microservicios',
      'Implementación de estrategias DevOps y CI/CD',
      'Code reviews y mejora de calidad de código',
      'Capacitación técnica del equipo cliente',
    ],
    achievements: [
      'Migración exitosa de múltiples proyectos a stack moderno',
      'Implementación de pipeline CI/CD completo',
      'Reducción de 50% en tiempo de deployment',
      'Documentación técnica completa de arquitectura',
    ],
    technologies: [
      'Symfony',
      'Next.js',
      'Docker',
      'Kubernetes',
      'GitLab CI',
      'Microservices',
      'API Gateway',
      'Message Queues',
    ],
    highlights: ['Arquitectura microservicios', 'DevOps & CI/CD', 'Migración legacy'],
  },

  {
    id: '240dots',
    role: 'Desarrollador Full-Stack',
    company: '240dots.es',
    companyUrl: 'https://github.com/GMNAPI/240dots.es',
    location: 'Barcelona, España',
    period: {
      start: '2023-03',
      end: '2023-06',
    },
    type: 'freelance',
    description:
      'Desarrollo de plataforma de soporte informático inteligente combinando IA con atención humana.',
    responsibilities: [
      'Desarrollo full-stack con Symfony y Twig',
      'Integración de IA para soporte automatizado',
      'Diseño de sistema de tickets y gestión de incidencias',
      'Implementación de chat en tiempo real',
    ],
    achievements: [
      'Lanzamiento exitoso de plataforma MVP',
      'Integración de chatbot con OpenAI',
      'Sistema de gestión de tickets completo',
    ],
    technologies: ['Symfony', 'Twig', 'OpenAI API', 'JavaScript', 'MySQL'],
    highlights: ['Integración IA', 'Soporte inteligente', 'Chat tiempo real'],
  },

  {
    id: 'seedstockers',
    role: 'Desarrollador E-commerce',
    company: 'Seedstockers',
    location: 'Remote',
    period: {
      start: '2021-09',
      end: '2022-02',
    },
    type: 'freelance',
    description: 'Desarrollo y optimización de tienda e-commerce multilingüe de alto tráfico.',
    responsibilities: [
      'Desarrollo de funcionalidades custom en PrestaShop',
      'Optimización de rendimiento para alto tráfico',
      'Implementación de sistema multilingüe (5+ idiomas)',
      'Integración de pasarelas de pago',
      'SEO y optimización de conversión',
    ],
    achievements: [
      'Mejora del 40% en velocidad de carga',
      'Implementación exitosa de 5 idiomas',
      'Aumento del 25% en tasa de conversión',
    ],
    technologies: ['PrestaShop', 'PHP', 'JavaScript', 'MySQL', 'Redis', 'Payment Gateways'],
    highlights: ['E-commerce multilingüe', 'Alto tráfico', 'Optimización SEO'],
  },

  {
    id: 'ai-projects',
    role: 'Desarrollador IA & Automation',
    company: 'Proyectos Personales',
    location: 'Barcelona, España',
    period: {
      start: '2023-06',
      end: 'present',
    },
    type: 'freelance',
    description:
      'Desarrollo de soluciones de IA y automatización con RAG systems y workflows inteligentes.',
    responsibilities: [
      'Implementación de RAG (Retrieval-Augmented Generation) systems',
      'Desarrollo de workflows de automatización con n8n',
      'Integración con OpenAI Platform y modelos locales',
      'Desarrollo de chatbots inteligentes y asistentes virtuales',
    ],
    achievements: [
      'Implementación de múltiples sistemas RAG para clientes',
      'Automatización de procesos empresariales con IA',
      'Integración de modelos locales (Ollama) para privacidad',
    ],
    technologies: [
      'OpenAI Platform',
      'n8n',
      'Python',
      'Ollama',
      'Vector Databases',
      'LangChain',
      'Embeddings',
    ],
    highlights: ['RAG systems', 'n8n workflows', 'IA generativa'],
  },
];

/**
 * Skills Categories derivadas de la experiencia
 */
export const skillsFromExperience = {
  backend: ['PHP', 'Symfony', 'Node.js', 'API Platform'],
  frontend: ['Next.js', 'React', 'TypeScript', 'Twig'],
  databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  devops: ['Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI'],
  ai: ['OpenAI', 'RAG Systems', 'n8n', 'Ollama'],
  architecture: ['Clean Architecture', 'Microservices', 'Domain-Driven Design', 'REST APIs'],
} as const;

/**
 * Summary stats de la experiencia
 */
export const experienceSummary = {
  totalYears: 5,
  totalRoles: experienceTimeline.length,
  companiesWorked: new Set(experienceTimeline.map((e) => e.company)).size,
  currentRole: experienceTimeline.find((e) => e.period.end === 'present'),
  technologiesUsed: new Set(experienceTimeline.flatMap((e) => e.technologies)).size,
};

/**
 * Tipo de utilidad para filtrar experiencia
 */
export type ExperienceType = ExperienceItem['type'];

/**
 * Helper para obtener experiencia por tipo
 */
export const getExperienceByType = (type: ExperienceType): ExperienceItem[] => {
  return experienceTimeline.filter((exp) => exp.type === type);
};

/**
 * Helper para obtener experiencia actual
 */
export const getCurrentExperience = (): ExperienceItem[] => {
  return experienceTimeline.filter((exp) => exp.period.end === 'present');
};

/**
 * Helper para calcular duración de un rol
 */
export const calculateDuration = (start: string, end: string | 'present'): string => {
  const startDate = new Date(start);
  const endDate = end === 'present' ? new Date() : new Date(end);

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
  }

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  }

  return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
};

/**
 * Helper para formatear período
 */
export const formatPeriod = (start: string, end: string | 'present'): string => {
  const formatDate = (date: string) => {
    const [year, month] = date.split('-');
    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const startFormatted = formatDate(start);
  const endFormatted = end === 'present' ? 'Presente' : formatDate(end);

  return `${startFormatted} - ${endFormatted}`;
};
