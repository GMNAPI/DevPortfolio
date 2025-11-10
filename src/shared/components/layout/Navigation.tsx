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

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, m } from 'framer-motion';
import { NAV_ITEMS, BRAND_NAME } from '@/shared/constants/navigation';
import { useScrollSpy } from '@/shared/hooks/useScrollSpy';
import { cn } from '@/shared/utils/cn';
import { fadeInUp } from '@/shared/utils/motion';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Get section IDs from nav items
  const sectionIds = NAV_ITEMS.map((item) => item.sectionId);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <m.nav
      className="sticky top-0 z-40 w-full backdrop-blur-sm bg-background/95 border-b border-border"
      aria-label="Navegación principal"
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
              {BRAND_NAME}
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
            {NAV_ITEMS.map((item) => (
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
              Hablemos →
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-md font-mono font-medium transition-colors px-3 py-2 bg-transparent text-foreground hover:bg-background-secondary"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center rounded-md font-mono font-medium transition-colors px-3 py-2 bg-transparent text-foreground hover:bg-background-secondary"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
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
                {NAV_ITEMS.map((item) => (
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
                {/* CTA in Mobile Menu */}
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className="block px-4 py-2 rounded-md text-sm font-mono bg-accent text-background hover:bg-accent-hover transition-colors text-center"
                  >
                    Hablemos →
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
