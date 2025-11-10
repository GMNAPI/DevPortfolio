import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { Providers } from './providers';
import { Navigation } from '@/shared/components/layout/Navigation';
import { Footer } from '@/shared/components/layout/Footer';
import { personalInfo } from '@/shared/constants/personal';
import { routing } from '@/i18n/routing';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// TODO: Update with real domain when available
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://angelhidalgo.dev';

// TODO: Convert to generateMetadata in Issue #29 for locale-specific metadata
export const metadata: Metadata = {
  title: {
    default: `${personalInfo.name} | ${personalInfo.tagline}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.bio.full,
  keywords: [
    'Ángel Hidalgo Barreiro',
    'desarrollador full stack',
    'Barcelona',
    'SaaS',
    'microservicios',
    'DevOps',
    'PHP',
    'Symfony',
    'Node.js',
    'React',
    'Next.js',
    'TypeScript',
    'Clean Architecture',
    'DDD',
    'portfolio',
    'arquitecturas escalables',
    'modernización legacy',
    'API Platform',
  ],
  authors: [
    {
      name: personalInfo.name,
      url: personalInfo.social.github,
    },
  ],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      es: '/',
      en: '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    title: `${personalInfo.name} | ${personalInfo.tagline}`,
    description: personalInfo.bio.full,
    siteName: personalInfo.name,
    images: [
      {
        url: '/og-image.jpg', // TODO: Create OG image with personal branding
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - Portfolio Profesional`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} | ${personalInfo.tagline}`,
    description: personalInfo.bio.full,
    images: ['/og-image.jpg'],
    creator: personalInfo.social.twitter
      ? `@${new URL(personalInfo.social.twitter).pathname.slice(1)}`
      : undefined,
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
    // TODO: Add Google Search Console verification code when site is deployed
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  category: 'technology',
  classification: 'Portfolio Personal',
  other: {
    'application-name': `${personalInfo.name} Portfolio`,
    'apple-mobile-web-app-title': personalInfo.name,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={jetbrainsMono.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
