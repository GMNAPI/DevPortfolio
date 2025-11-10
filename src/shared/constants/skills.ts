/**
 * Skills Data
 *
 * Canonical mapping of technical skills grouped by category.
 * Data is sourced from `temp/github-audit.md` (35 repos analizados) y CV.
 */

export interface SkillItem {
  name: string;
  description: string;
  usagePercentage?: number;
  experienceYears?: number;
  experienceProjects?: number;
  keywords?: string[];
}

export interface SkillCategory {
  id: 'backend' | 'frontend' | 'databases' | 'devops' | 'ai-automation' | 'testing';
  name: string;
  summary: string;
  experienceYears: number;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    name: 'Backend',
    summary:
      'Migraciones ERP a SaaS, APIs REST y plataformas de servicios con foco en resiliencia y dominio del negocio.',
    experienceYears: 6,
    skills: [
      {
        name: 'PHP',
        description: 'Lenguaje principal en 11 repositorios con foco en arquitectura limpia.',
        usagePercentage: 31,
        experienceYears: 6,
        experienceProjects: 18,
        keywords: ['Symfony', 'Laravel', 'OOP', 'DDD'],
      },
      {
        name: 'Symfony 7',
        description: 'Framework estrella para APIs y backoffice multi-tenant.',
        usagePercentage: 31,
        experienceYears: 5,
        experienceProjects: 12,
        keywords: ['API Platform', 'Messenger', 'Hexagonal'],
      },
      {
        name: 'Node.js',
        description: 'Servicios suplementarios, workers y automatización con TypeScript.',
        usagePercentage: 20,
        experienceYears: 4,
        experienceProjects: 8,
        keywords: ['Express', 'Serverless', 'Workers'],
      },
      {
        name: 'API Platform',
        description: 'Contratos REST enriquecidos para ecosistemas B2B.',
        usagePercentage: 14,
        experienceYears: 4,
        experienceProjects: 6,
        keywords: ['OpenAPI', 'JWT', 'HATEOAS'],
      },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    summary:
      'Interfaces empresariales con Next.js 15/React 19, componentes a medida y rendimiento optimizado.',
    experienceYears: 5,
    skills: [
      {
        name: 'JavaScript / TypeScript',
        description: 'Uso combinado en stack moderno para tipado estricto y DX superior.',
        usagePercentage: 29,
        experienceYears: 5,
        experienceProjects: 15,
        keywords: ['TypeScript', 'ESNext', 'monorepos'],
      },
      {
        name: 'React 18/19',
        description: 'SPA/SSR con hooks avanzados, Suspense y patrones RSC.',
        usagePercentage: 20,
        experienceYears: 5,
        experienceProjects: 12,
        keywords: ['Hooks', 'Context', 'RSC', 'RHF'],
      },
      {
        name: 'Next.js 15',
        description: 'App Router, ISR y layouts anidados para portfolio y productos SaaS.',
        usagePercentage: 14,
        experienceYears: 4,
        experienceProjects: 9,
        keywords: ['App Router', 'ISR', 'SEO', 'next-intl'],
      },
      {
        name: 'Tailwind CSS / shadcn/ui',
        description: 'Design system minimalista con componentes accesibles.',
        usagePercentage: 14,
        experienceYears: 4,
        experienceProjects: 9,
        keywords: ['Design tokens', 'Dark mode', 'Framer Motion'],
      },
    ],
  },
  {
    id: 'databases',
    name: 'Bases de Datos',
    summary: 'Modelado y optimización para sistemas de alta disponibilidad con reporting y ETL.',
    experienceYears: 5,
    skills: [
      {
        name: 'MariaDB / MySQL',
        description: 'Motores principales en soluciones ERP y plataformas SaaS.',
        usagePercentage: 28,
        experienceYears: 5,
        experienceProjects: 14,
        keywords: ['Replication', 'Query tuning', 'Migrations'],
      },
      {
        name: 'PostgreSQL',
        description: 'Implementado en arquitecturas multi-servicio y analítica avanzada.',
        usagePercentage: 17,
        experienceYears: 4,
        experienceProjects: 7,
        keywords: ['JSONB', 'PL/pgSQL', 'Materialized views'],
      },
      {
        name: 'MongoDB',
        description: 'Soporte a microservicios y pipelines de ingesta flexible.',
        usagePercentage: 9,
        experienceYears: 3,
        experienceProjects: 4,
        keywords: ['Aggregation', 'Atlas', 'ODM'],
      },
      {
        name: 'ElasticSearch',
        description: 'Buscadores facetados y observabilidad de logs.',
        usagePercentage: 6,
        experienceYears: 3,
        experienceProjects: 3,
        keywords: ['Full-text', 'Kibana', 'Ingest pipelines'],
      },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    summary:
      'Automatización de despliegues, infraestructura como código y observabilidad para SaaS.',
    experienceYears: 5,
    skills: [
      {
        name: 'Docker & Compose',
        description: 'Empaquetado de servicios, pipelines de CI y entornos reproducibles.',
        usagePercentage: 40,
        experienceYears: 5,
        experienceProjects: 20,
        keywords: ['Multi-stage', 'CI/CD', 'Devcontainers'],
      },
      {
        name: 'GitHub Actions',
        description: 'Workflows CI/CD para lint, tests, build y despliegues.',
        usagePercentage: 34,
        experienceYears: 4,
        experienceProjects: 10,
        keywords: ['Matrix builds', 'Secrets', 'Artifacts'],
      },
      {
        name: 'AWS / VPS',
        description: 'Infraestructura híbrida con focos en coste, seguridad y monitoreo.',
        usagePercentage: 20,
        experienceYears: 4,
        experienceProjects: 6,
        keywords: ['EC2', 'Lightsail', 'S3', 'Terraform'],
      },
      {
        name: 'Terraform',
        description: 'Provisionamiento declarativo para entornos multi-stage.',
        usagePercentage: 9,
        experienceYears: 3,
        experienceProjects: 3,
        keywords: ['IaC', 'Modules', 'State management'],
      },
    ],
  },
  {
    id: 'ai-automation',
    name: 'IA & Automatización',
    summary:
      'Integración de modelos y orquestación de workflows inteligentes para automación de procesos.',
    experienceYears: 3,
    skills: [
      {
        name: 'OpenAI Platform',
        description: 'Integraciones conversacionales y copilotos para soporte.',
        usagePercentage: 9,
        experienceYears: 3,
        experienceProjects: 5,
        keywords: ['GPT', 'Embeddings', 'Function calling'],
      },
      {
        name: 'RAG Systems',
        description:
          'Diseño de pipelines Retrieval Augmented Generation para conocimiento interno.',
        usagePercentage: 6,
        experienceYears: 2,
        experienceProjects: 3,
        keywords: ['Vector stores', 'Hybrid search', 'Context windows'],
      },
      {
        name: 'n8n Workflows',
        description: 'Automatización de procesos de negocio con integraciones low-code.',
        usagePercentage: 6,
        experienceYears: 2,
        experienceProjects: 4,
        keywords: ['Automation', 'Webhook', 'Orchestration'],
      },
    ],
  },
  {
    id: 'testing',
    name: 'Testing & QA',
    summary:
      'Cobertura integral con suites unitarias, de integración y end-to-end para asegurar calidad continua.',
    experienceYears: 5,
    skills: [
      {
        name: 'PHPUnit',
        description: 'Testing para dominios complejos en Symfony y servicios backend.',
        usagePercentage: 20,
        experienceYears: 5,
        experienceProjects: 10,
        keywords: ['TDD', 'Mockery', 'Integration tests'],
      },
      {
        name: 'Vitest',
        description: 'Pruebas unitarias y de componentes en frontend con TypeScript.',
        usagePercentage: 9,
        experienceYears: 2,
        experienceProjects: 5,
        keywords: ['RTL', 'Snapshots', 'Monorepo'],
      },
      {
        name: 'Jest',
        description: 'Legacy y servicios Node.js con mocks avanzados.',
        usagePercentage: 9,
        experienceYears: 3,
        experienceProjects: 6,
        keywords: ['Mocks', 'Coverage', 'Watch mode'],
      },
      {
        name: 'Playwright',
        description: 'End-to-end para flujos críticos con CI y reporting visual.',
        usagePercentage: 6,
        experienceYears: 2,
        experienceProjects: 3,
        keywords: ['Trace viewer', 'CI pipelines', 'Cross-browser'],
      },
    ],
  },
];

export const SKILL_SUMMARY = {
  totalRepositoriesAnalysed: 35,
  mainLanguagesShare: [
    { language: 'PHP', usagePercentage: 31.4 },
    { language: 'JavaScript', usagePercentage: 20.0 },
    { language: 'Twig', usagePercentage: 14.3 },
    { language: 'TypeScript', usagePercentage: 8.6 },
    { language: 'Python', usagePercentage: 2.9 },
  ],
  contributionsLastYear: 1706,
  activeRepositories: 9,
  repositoriesWithStars: 3,
  accountCreatedAt: '2024-04-22',
};
