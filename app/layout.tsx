import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navigation } from '@/shared/components/layout/Navigation';
import { Footer } from '@/shared/components/layout/Footer';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dev Portfolio | Desarrollador Full Stack',
  description:
    'Portfolio personal de desarrollador full stack. Especializado en Next.js, React, TypeScript y desarrollo web moderno. Explora mis proyectos y contáctame para colaboraciones.',
  keywords: [
    'desarrollador',
    'full stack',
    'Next.js',
    'React',
    'TypeScript',
    'portfolio',
    'web developer',
    'frontend',
    'backend',
  ],
  authors: [{ name: 'Dev Portfolio' }],
  creator: 'Dev Portfolio',
  publisher: 'Dev Portfolio',
  metadataBase: new URL('https://devportfolio.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://devportfolio.dev',
    title: 'Dev Portfolio | Desarrollador Full Stack',
    description:
      'Portfolio personal de desarrollador full stack. Especializado en Next.js, React, TypeScript y desarrollo web moderno.',
    siteName: 'Dev Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dev Portfolio - Desarrollador Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Portfolio | Desarrollador Full Stack',
    description:
      'Portfolio personal de desarrollador full stack. Especializado en Next.js, React, TypeScript y desarrollo web moderno.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={jetbrainsMono.variable}>
      <body>
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
