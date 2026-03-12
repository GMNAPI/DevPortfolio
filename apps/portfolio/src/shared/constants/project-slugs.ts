/**
 * Project Slugs for Static Generation
 *
 * List of project IDs/slugs used for generating static pages at build time.
 * The full project data is loaded from translation files at runtime.
 */

export const PROJECT_SLUGS = [
  'apigns',
  'facturae-docusaurus',
  'frontend-json',
  'fynkus',
  'genesis-enterprise',
  'gestiono-mi-negocio',
  'llarjove',
  'streamlit-gmn',
  'verifactur-gmn',
  'vita-liber',
  'zend-laminas-tech-tests',
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];
