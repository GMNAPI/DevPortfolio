/**
 * useScrollSpy Hook
 *
 * Detects which section is currently visible in the viewport
 * using Intersection Observer API.
 *
 * @param sectionIds - Array of section IDs to observe
 * @returns The ID of the currently active section, or null if none
 *
 * @example
 * const activeSection = useScrollSpy(['hero', 'about', 'projects', 'contact']);
 */

'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Early return if no section IDs provided
    if (sectionIds.length === 0) {
      return;
    }

    // Get all section elements
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);

        if (intersectingEntry) {
          setActiveSection(intersectingEntry.target.id);
        } else {
          // If no entries are intersecting, check if any were previously intersecting
          const anyIntersecting = entries.some((entry) => entry.isIntersecting);
          if (!anyIntersecting) {
            // Only set to null if we explicitly see entries leaving
            const allLeavingView = entries.every((entry) => !entry.isIntersecting);
            if (allLeavingView) {
              setActiveSection(null);
            }
          }
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Middle 50% of viewport
        threshold: 0, // Trigger as soon as any part enters the middle 50%
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
