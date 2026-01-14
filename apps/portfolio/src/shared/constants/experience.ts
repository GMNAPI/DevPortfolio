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
      'Trabajo con usuarios beta: recogida de feedback, mejoras y acompañamiento en uso del producto. Enfoque en claridad, calidad y experiencia de usuario.',
    responsibilities: [
      'Recogida de feedback y acompañamiento a usuarios beta',
      'Comunicación constante con stakeholders para priorizar funcionalidades',
      'Coordinación de entregas iterativas con foco en UX',
      'Gestión de incidencias y soporte funcional',
      'Validación de requisitos con usuarios finales',
    ],
    achievements: [
      'Activación de más de 8 usuarios beta con acompañamiento personalizado',
      'Comunicación efectiva para alinear expectativas de producto',
      'Mejora continua basada en feedback de usuarios',
      'Entregas iterativas con validación funcional constante',
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
    highlights: ['Feedback usuarios beta', 'Comunicación stakeholders', 'Entregas iterativas'],
  },

  {
    id: 'vitaliber',
    role: 'Especialista de Programa',
    company: 'Vita Liber S.L.U.',
    location: 'Barcelona, España',
    period: {
      start: '2020-01',
      end: 'present',
    },
    type: 'full-time',
    description:
      'Gestión de necesidades de usuarios internos: priorización, incidencias, validación y soporte funcional.',
    responsibilities: [
      'Atención personalizada y resolución de incidencias',
      'Coordinación con equipos internos para priorización de tareas',
      'Seguimiento de entregas y validación funcional',
      'Soporte funcional a usuarios finales',
      'Comunicación efectiva con stakeholders internos',
    ],
    achievements: [
      'Resolución efectiva de incidencias con comunicación clara',
      'Coordinación exitosa entre equipos técnicos y de negocio',
      'Validación funcional con usuarios finales',
      'Mejora continua de procesos de soporte',
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
    highlights: ['Gestión incidencias', 'Soporte funcional', 'Coordinación equipos'],
  },

  {
    id: 'fastbyte',
    role: 'Consultor & Tech Lead',
    company: 'Fastbyte SL',
    location: 'Barcelona, España',
    period: {
      start: '2019-01',
      end: 'present',
    },
    type: 'consultant',
    description:
      'Toma de requisitos con clientes/equipos y traducción a soluciones prácticas. Comunicación constante, seguimiento de tareas y entrega por fases.',
    responsibilities: [
      'Toma de requisitos con clientes y equipos técnicos',
      'Traducción de necesidades de negocio a soluciones técnicas',
      'Comunicación constante y seguimiento de tareas',
      'Coordinación técnica para alinear expectativas',
      'Resolución proactiva de bloqueos e incidencias',
    ],
    achievements: [
      'Comunicación efectiva con stakeholders de múltiples proyectos',
      'Entregas por fases con seguimiento constante',
      'Resolución proactiva de bloqueos técnicos',
      'Alineación exitosa de expectativas cliente-equipo',
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
    highlights: ['Toma de requisitos', 'Comunicación cliente', 'Entregas por fases'],
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
    role: 'Webmaster',
    company: 'Seedstockers (BCG)',
    location: 'Remote',
    period: {
      start: '2023-01',
      end: '2024-01',
    },
    type: 'freelance',
    description: 'Gestión de e-commerce multilingüe y coordinación con áreas de pagos/logística.',
    responsibilities: [
      'Gestión de e-commerce multilingüe en PrestaShop',
      'Coordinación con áreas de pagos y logística',
      'Resolución de incidencias operativas en flujo de compra',
      'Mejora continua de experiencia de usuario',
      'Colaboración transversal con equipos de negocio',
    ],
    achievements: [
      'Coordinación efectiva para resolver incidencias operativas',
      'Mejora continua de UX en procesos clave',
      'Colaboración transversal con equipos de negocio y operaciones',
    ],
    technologies: ['PrestaShop', 'PHP', 'JavaScript', 'MySQL', 'Redis', 'Payment Gateways'],
    highlights: ['Gestión e-commerce', 'Coordinación pagos/logística', 'Mejora UX'],
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
