/**
 * Career Data
 *
 * Experience and certification data sourced from the canonical CV.
 * These constants centralize professional milestones for reuse across features.
 */

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: {
    start: string;
    end: string;
  };
  headline: string;
  achievements: string[];
}

export const experiences: ExperienceItem[] = [
  {
    role: 'Cofundador & Lead Dev',
    company: 'GestionoMiNegocio',
    period: { start: '2020', end: 'Actualidad' },
    headline: 'Migración ERP legacy a SaaS moderno sobre Symfony 7 con foco en resiliencia.',
    achievements: [
      'Reducción del 70% en incidencias de producción tras automatizar CI/CD.',
      'Activación de más de 8 usuarios beta y adopción progresiva del nuevo flujo SaaS.',
      'Diseño de arquitectura escalable con despliegues automatizados.',
    ],
  },
  {
    role: 'Especialista de programa',
    company: 'Vita Liber S.L.U.',
    period: { start: '2021', end: 'Actualidad' },
    headline: 'Modernización de plataforma a stack Next.js + Symfony con foco en integraciones.',
    achievements: [
      'Construcción de APIs REST con API Platform 4.1 e integración con MariaDB.',
      'Implantación de estrategia de testing con Jest, Playwright y PHPUnit.',
      'Liderazgo de roadmap técnico garantizando entregas iterativas.',
    ],
  },
  {
    role: 'Consultor & Tech Lead',
    company: 'Fastbyte SL',
    period: { start: '2019', end: 'Actualidad' },
    headline: 'Transformación de sistemas PHP legacy hacia microservicios con Symfony/Next.js.',
    achievements: [
      'Definición de arquitecturas escalables y asesoría DevOps continua.',
      'Automatización de despliegues y observabilidad para servicios críticos.',
    ],
  },
  {
    role: 'Developer',
    company: '240dots',
    period: { start: '2020', end: '2023' },
    headline: 'Desarrollo de soluciones headless combinando WordPress y Symfony.',
    achievements: [
      'Construcción de plugins conectados con APIs personalizadas.',
      'Optimización de rendimiento y pipelines de contenido.',
    ],
  },
  {
    role: 'Webmaster',
    company: 'Seedstockers (BCG)',
    period: { start: '2023', end: '2024' },
    headline: 'Gestión de e-commerce multilingüe en PrestaShop con foco en conversión.',
    achievements: [
      'Implementación de módulos de pago y logística a medida.',
      'Mantenimiento de catálogo en múltiples idiomas con automatizaciones.',
    ],
  },
  {
    role: 'AI Projects',
    company: 'Autónomo',
    period: { start: '2023', end: 'Actualidad' },
    headline: 'Investigación y entrega de soluciones IA aplicadas a procesos de negocio.',
    achievements: [
      'Diseño de sistemas RAG y workflows con n8n para automatización inteligente.',
      'Experimentación con modelos locales e integración con OpenAI Platform.',
    ],
  },
];

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  description?: string;
  credentialUrl?: string;
}

export const certifications: CertificationItem[] = [
  {
    name: 'Zend Certificate of E-Learning – PHP OOP & Software Patterns',
    issuer: 'Zend',
    year: '2025',
    description:
      'Programa avanzado sobre patrones de diseño orientados a objetos aplicados en PHP.',
  },
];
