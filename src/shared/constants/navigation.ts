/**
 * Navigation Constants
 *
 * Configuration for navigation items and social links
 * used in Navigation and Footer components.
 */

export interface NavItem {
  label: string;
  sectionId: string;
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
  ariaLabel: string;
}

/**
 * Main navigation items
 * These link to different sections of the page
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Inicio',
    sectionId: 'hero',
    href: '#hero',
  },
  {
    label: 'Sobre mí',
    sectionId: 'about',
    href: '#about',
  },
  {
    label: 'Proyectos',
    sectionId: 'projects',
    href: '#projects',
  },
  {
    label: 'Contacto',
    sectionId: 'contact',
    href: '#contact',
  },
];

/**
 * Social media links
 * Used in Footer component
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/usuario',
    ariaLabel: 'Visita mi perfil de GitHub',
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/usuario',
    ariaLabel: 'Visita mi perfil de LinkedIn',
  },
];

/**
 * Brand name used in Navigation and Footer
 */
export const BRAND_NAME = 'Dev Portfolio';
