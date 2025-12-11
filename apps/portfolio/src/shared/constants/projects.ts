/**
 * Projects Data Types
 *
 * Interfaces describing project categories used across the portfolio.
 * Translation messages provide the localized content for these structures.
 */

import type { ProjectData, ProjectCategoryId } from '@/core/entities/Project';

export interface ProjectCategory {
  id: ProjectCategoryId;
  name: string;
  description: string;
}

export type ProjectMessageItem = ProjectData;
