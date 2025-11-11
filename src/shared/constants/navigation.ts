/**
 * Navigation Constants
 *
 * Configuration for navigation items and social links
 * used in Navigation and Footer components.
 */

export interface NavSection {
  key: 'home' | 'about' | 'projects' | 'contact';
  sectionId: string;
  href: string;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    key: 'home',
    sectionId: 'hero',
    href: '#hero',
  },
  {
    key: 'about',
    sectionId: 'about',
    href: '#about',
  },
  {
    key: 'projects',
    sectionId: 'projects',
    href: '#projects',
  },
  {
    key: 'contact',
    sectionId: 'contact',
    href: '#contact',
  },
];

export const SOCIAL_LINK_URLS = {
  github: 'https://github.com/usuario',
  linkedin: 'https://linkedin.com/in/usuario',
} as const;

export type SocialLinkKey = keyof typeof SOCIAL_LINK_URLS;
