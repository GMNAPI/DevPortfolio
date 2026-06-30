/**
 * Tipos y selector del contenido de la página de detalle de un proyecto.
 * El contenido vive en los ficheros i18n (messages/*.json) bajo `projects.details`,
 * indexado por slug. `getProjectDetail` es puro para poder testearlo sin next-intl.
 */

export interface ProjectDetailSection {
  heading: string;
  body: string;
}

export interface ProjectDetailMetric {
  label: string;
  value: string;
}

export interface ProjectDetailContent {
  sections: ProjectDetailSection[];
  metrics?: ProjectDetailMetric[];
}

export function getProjectDetail(
  details: Record<string, ProjectDetailContent> | undefined,
  slug: string
): ProjectDetailContent | null {
  return details?.[slug] ?? null;
}
