/**
 * Project Slugs for Static Generation
 *
 * List of project IDs/slugs used for generating static pages at build time.
 * The full project data is loaded from translation files at runtime.
 */

export const PROJECT_SLUGS = [
  'devfreelancer-client-tracker',
  'gestiono-mi-negocio-facturacion',
  'llarjove-rag-chatbot',
  'vitaliber-crm-erp-v2',
  'vita-liber-erp-interno',
  'fastbyte-api-servicios',
  'seedstockers-b2b-platform',
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];
