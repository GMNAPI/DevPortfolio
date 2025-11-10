/**
 * Projects Data
 *
 * Portfolio projects data grouped by strategic categories.
 * Source of truth for the Projects feature.
 */

import type { ProjectData, ProjectCategoryId } from '@/core/entities/Project';

export interface ProjectCategory {
  id: ProjectCategoryId;
  name: string;
  description: string;
}

export const PROJECT_CATEGORIES: Record<ProjectCategoryId, ProjectCategory> = {
  'facturacion-compliance': {
    id: 'facturacion-compliance',
    name: 'Facturación & Compliance',
    description: 'Soluciones fiscales y documentación técnica para entornos VeriFactu y ERP.',
  },
  'gestion-servicios': {
    id: 'gestion-servicios',
    name: 'Gestión de Servicios',
    description: 'Aplicaciones SaaS para automatizar reservas, operaciones y backoffice.',
  },
  'arquitectura-avanzada': {
    id: 'arquitectura-avanzada',
    name: 'Arquitectura Avanzada',
    description: 'Plataformas con enfoque en arquitectura hexagonal, DDD y escalabilidad.',
  },
  'erp-transformacion': {
    id: 'erp-transformacion',
    name: 'ERP & Transformación Digital',
    description: 'Modernización de sistemas legacy a infraestructuras SaaS mantenibles.',
  },
  herramientas: {
    id: 'herramientas',
    name: 'Herramientas & Automatización',
    description: 'Productos internos para analítica, automatización y soporte inteligente.',
  },
  educacion: {
    id: 'educacion',
    name: 'Educación & Comunidad',
    description: 'Material formativo y pruebas técnicas para compartir conocimiento.',
  },
};

export const PROJECT_CATEGORY_LIST = Object.values(PROJECT_CATEGORIES);

export const PROJECTS: ProjectData[] = [
  {
    id: 'verifactur-gmn',
    title: 'VerifacturGMN',
    description:
      'Sistema completo de facturación electrónica compatible con VeriFactu/AEAT con flujos SaaS y automatización fiscal.',
    tech: ['Symfony 7', 'API Platform', 'PostgreSQL', 'Docker', 'CI/CD'],
    links: {
      github: 'https://github.com/GMNAPI/VerifacturGMN',
    },
    categoryId: 'facturacion-compliance',
  },
  {
    id: 'facturae-docusaurus',
    title: 'FacturaeDocusaurus',
    description:
      'Portal de documentación técnica para VeriFactu y Facturae con guías, ejemplos y despliegue automatizado.',
    tech: ['Docusaurus', 'TypeScript', 'MDX', 'GitHub Actions'],
    links: {
      github: 'https://github.com/GMNAPI/FacturaeDocusaurus',
    },
    categoryId: 'facturacion-compliance',
  },
  {
    id: 'apigns',
    title: 'apiGns',
    description:
      'API REST moderna para la gestión integral de servicios con autenticación avanzada y paneles externos.',
    tech: ['Symfony 7.3', 'API Platform', 'MariaDB', 'Redis', 'Docker'],
    links: {
      github: 'https://github.com/GMNAPI/apiGns',
    },
    categoryId: 'gestion-servicios',
  },
  {
    id: 'frontend-json',
    title: 'FrontendJson',
    description:
      'Frontend empresarial en Next.js 15 con arquitectura limpia, tipado estricto y diseño atómico.',
    tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Clean Architecture'],
    links: {
      github: 'https://github.com/GMNAPI/FrontendJson',
    },
    categoryId: 'gestion-servicios',
  },
  {
    id: 'fynkus',
    title: 'FYNKUS',
    description:
      'Plataforma de reservas deportivas con arquitectura hexagonal, DDD y CQRS, enfocada en escalabilidad.',
    tech: ['PHP 8.2', 'Symfony 5.4', 'CQRS', 'React 18', 'Docker'],
    links: {
      github: 'https://github.com/GMNAPI/FYNKUS',
    },
    categoryId: 'arquitectura-avanzada',
  },
  {
    id: 'gestiono-mi-negocio',
    title: 'GestiónoMiNegocio',
    description:
      'Migración de ERP legacy a SaaS modular con multi-tenant, automatización de facturación y paneles analíticos.',
    tech: ['Symfony 7', 'Next.js', 'RabbitMQ', 'PostgreSQL', 'Terraform'],
    links: {
      github: 'https://github.com/GMNAPI/gestionominegocio',
    },
    categoryId: 'erp-transformacion',
  },
  {
    id: 'vita-liber',
    title: 'Vita Liber Platform',
    description:
      'Plataforma full-stack para gestión logística y académica con integración Symfony + Next.js.',
    tech: ['Next.js 14', 'Symfony 6', 'MariaDB', 'API Platform', 'Jest'],
    links: {
      github: 'https://github.com/GMNAPI/vitaliber',
    },
    categoryId: 'erp-transformacion',
  },
  {
    id: 'genesis-enterprise',
    title: 'Genesis Enterprise',
    description:
      'Ecosistema enterprise (4M LOC) modernizado hacia microservicios con Symfony, mensajería y DevOps.',
    tech: ['Symfony', 'RabbitMQ', 'Microservices', 'Docker', 'CI/CD'],
    links: {
      github: 'https://github.com/GMNAPI/genesis',
    },
    categoryId: 'erp-transformacion',
  },
  {
    id: 'streamlit-gmn',
    title: 'Streamlit GMN',
    description:
      'Simulador de modelos de negocio SaaS con analítica en tiempo real y dashboards interactivos.',
    tech: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
    links: {
      github: 'https://github.com/GMNAPI/streamlitGMN',
    },
    categoryId: 'herramientas',
  },
  {
    id: 'zend-laminas-tech-tests',
    title: 'Zend Laminas Tech Tests',
    description:
      'Colección de 10 pruebas técnicas realistas para Laminas MVC y Mezzio orientadas a formación profesional.',
    tech: ['Laminas', 'PHP', 'Mezzio', 'Docker', 'Testing'],
    links: {
      github: 'https://github.com/GMNAPI/zend-laminas-tech-tests',
    },
    categoryId: 'educacion',
  },
];
