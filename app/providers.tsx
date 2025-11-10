'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';
import { MotionProvider } from '@/shared/providers/MotionProvider';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root providers for the application
 * Wraps the app with necessary context providers
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <MotionProvider>{children}</MotionProvider>
    </NextThemesProvider>
  );
}
