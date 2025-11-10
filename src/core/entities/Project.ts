/**
 * Project Entity
 *
 * Represents a portfolio project in the domain layer.
 * This is a pure TypeScript class with no framework dependencies.
 *
 * @example
 * const project = new Project({
 *   id: '1',
 *   title: 'My Portfolio',
 *   description: 'A personal portfolio website',
 *   tech: ['Next.js', 'TypeScript'],
 *   links: { github: 'https://github.com/user/portfolio' }
 * });
 */

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export type ProjectCategoryId =
  | 'facturacion-compliance'
  | 'gestion-servicios'
  | 'arquitectura-avanzada'
  | 'erp-transformacion'
  | 'herramientas'
  | 'educacion';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links: ProjectLinks;
  categoryId: ProjectCategoryId;
  detailSlug?: string;
}

export class Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tech: string[];
  readonly links: ProjectLinks;
  readonly categoryId: ProjectCategoryId;
  readonly detailSlug: string;

  constructor(data: ProjectData) {
    this.validate(data);

    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.tech = data.tech;
    this.links = data.links;
    this.categoryId = data.categoryId;
    this.detailSlug = data.detailSlug ?? data.id;
  }

  /**
   * Validates project data
   * @throws Error if validation fails
   */
  private validate(data: ProjectData): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Title is required');
    }

    if (!data.tech || data.tech.length === 0) {
      throw new Error('At least one technology is required');
    }

    if (!data.categoryId) {
      throw new Error('Category is required');
    }
  }

  /**
   * Checks if project uses a specific technology (case-insensitive)
   */
  hasTech(technology: string): boolean {
    return this.tech.some((t) => t.toLowerCase() === technology.toLowerCase());
  }

  /**
   * Converts project to plain object
   */
  toJSON(): ProjectData {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      tech: [...this.tech],
      links: { ...this.links },
      categoryId: this.categoryId,
      detailSlug: this.detailSlug,
    };
  }
}
