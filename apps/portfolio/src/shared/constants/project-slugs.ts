/**
 * Project Slugs for Static Generation
 *
 * List of project IDs/slugs used for generating static pages at build time.
 * The full project data is loaded from translation files at runtime.
 */

export const PROJECT_SLUGS = [
  'verifactur-gmn',
  'facturae-docusaurus',
  'apigns',
  'frontend-json',
  'fynkus',
  'gestiono-mi-negocio',
  'vita-liber',
  'genesis-enterprise',
  'streamlit-gmn',
  'zend-laminas-tech-tests',
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];
