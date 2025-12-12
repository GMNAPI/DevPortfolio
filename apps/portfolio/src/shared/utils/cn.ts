/**
 * Class Names Utility
 *
 * Merges Tailwind CSS classes efficiently, handling conflicts.
 * Uses clsx for conditional classes and tailwind-merge for deduplication.
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
