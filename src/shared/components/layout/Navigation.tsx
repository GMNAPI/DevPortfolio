/**
 * Navigation Component
 *
 * Sticky navigation header with scroll spy, theme toggle, and mobile menu.
 * Uses Intersection Observer to highlight the active section.
 *
 * Features:
 * - Responsive design (mobile menu for < md breakpoint)
 * - Theme toggle (light/dark mode)
 * - Smooth scroll navigation
 * - Active section highlighting
 * - CTA button
 */

'use client';

import { useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { NAV_SECTIONS } from '@/shared/constants/navigation';
import { useScrollSpy } from '@/shared/hooks/useScrollSpy';
import { cn } from '@/shared/utils/cn';
import { fadeInUp } from '@/shared/utils/motion';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const tNavigation = useTranslations('navigation');
  const navItems = useMemo(
    () =>
      NAV_SECTIONS.map((section) => ({
        ...section,
        label: tNavigation(`items.${section.key}` as const),
      })),
    [tNavigation]
  );

  const sectionIds = useMemo(() => navItems.map((item) => item.sectionId), [navItems]);
  const activeSection = useScrollSpy(sectionIds);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const localeOptions = useMemo(
    () =>
      locales.map((code) => ({
        code,
        label: tNavigation(`locale.options.${code}` as const),
      })),
    [tNavigation]
  );

  const buildLocalizedPath = (targetLocale: Locale) => {
    if (targetLocale === locale) {
      return pathname;
    }

    if (locale === defaultLocale && targetLocale !== defaultLocale) {
      const suffix = pathname === '/' ? '' : pathname;
      return `/${targetLocale}${suffix}`;
    }

    if (locale !== defaultLocale && targetLocale === defaultLocale) {
      const prefix = `/${locale}`;
      if (pathname === prefix) {
        return '/';
      }
      if (pathname.startsWith(`${prefix}/`)) {
        return pathname.replace(prefix, '');
      }
    }

    if (locale !== defaultLocale && targetLocale !== defaultLocale) {
      const currentPrefix = `/${locale}`;
      if (pathname.startsWith(currentPrefix)) {
        return pathname.replace(currentPrefix, `/${targetLocale}`);
      }
    }

    const suffix = pathname === '/' ? '' : pathname;
    return `/${targetLocale}${suffix}`;
  };

  const handleLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    const targetPath = buildLocalizedPath(nextLocale);
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    router.replace(`${targetPath}${hash}`);
    setIsMobileMenuOpen(false);
  };

  const localeLabel = tNavigation(`locale.options.${locale}` as const);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <m.nav
      className="sticky top-0 z-40 w-full backdrop-blur-sm bg-background/95 border-b border-border"
      aria-label={tNavigation('ariaLabel')}
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Name */}
          <m.div className="flex-shrink-0" whileHover={{ scale: 1.02 }}>
            <a
              href="#hero"
              className="text-xl font-bold font-mono text-foreground hover:text-accent transition-colors"
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              {tNavigation('brand')}
            </a>
          </m.div>

          {/* Desktop Navigation */}
          <m.ul
            className="hidden md:flex items-center space-x-8"
            role="list"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  className={cn(
                    'text-sm font-mono transition-colors',
                    activeSection === item.sectionId
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-foreground-secondary hover:text-foreground'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </m.ul>

          {/* Right Side: CTA + Theme Toggle + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* CTA Button - Hidden on mobile */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center justify-center rounded-md font-mono font-medium text-sm px-4 py-2 bg-accent text-background hover:bg-accent-hover transition-colors"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              {tNavigation('cta')}
            </a>

            {/* Locale Switcher */}
            <label className="sr-only" htmlFor="locale-switcher-desktop">
              {tNavigation('locale.label')}
            </label>
            <select
              id="locale-switcher-desktop"
              value={locale}
              onChange={(event) => handleLocaleChange(event.target.value as Locale)}
              aria-label={tNavigation('locale.label')}
              className="hidden md:inline-flex items-center rounded-md border border-border bg-background-secondary px-3 py-2 text-xs font-mono text-foreground-secondary hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {localeOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-md font-mono font-medium transition-colors px-3 py-2 bg-transparent text-foreground hover:bg-background-secondary"
              aria-label={tNavigation('theme.toggle')}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center rounded-md font-mono font-medium transition-colors px-3 py-2 bg-transparent text-foreground hover:bg-background-secondary"
              aria-label={isMobileMenuOpen ? tNavigation('menu.close') : tNavigation('menu.open')}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <m.div
              className="md:hidden mt-4 pb-4"
              role="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ul className="flex flex-col space-y-3" role="list">
                {navItems.map((item) => (
                  <li key={item.sectionId}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.sectionId)}
                      className={cn(
                        'block px-4 py-2 rounded-md text-sm font-mono transition-colors',
                        activeSection === item.sectionId
                          ? 'bg-accent/10 text-accent'
                          : 'text-foreground-secondary hover:bg-background-secondary hover:text-foreground'
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <label
                    htmlFor="locale-switcher-mobile"
                    className="block px-4 text-xs font-mono text-foreground-secondary"
                  >
                    {tNavigation('locale.current', { locale: localeLabel })}
                  </label>
                  <select
                    id="locale-switcher-mobile"
                    value={locale}
                    onChange={(event) => handleLocaleChange(event.target.value as Locale)}
                    aria-label={tNavigation('locale.label')}
                    className="mt-1 block w-full rounded-md border border-border bg-background px-4 py-2 text-sm font-mono text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {localeOptions.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </li>
                {/* CTA in Mobile Menu */}
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className="block px-4 py-2 rounded-md text-sm font-mono bg-accent text-background hover:bg-accent-hover transition-colors text-center"
                  >
                    {tNavigation('cta')}
                  </a>
                </li>
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.nav>
  );
}
