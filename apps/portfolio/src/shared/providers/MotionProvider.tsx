'use client';

import { LazyMotion, MotionConfig } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * MotionProvider
 *
 * Wraps the application with framer-motion configuration.
 * - Lazy loads animation features (domAnimation).
 * - Respects user preferences for reduced motion.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={() => import('framer-motion').then((mod) => mod.domAnimation)} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
