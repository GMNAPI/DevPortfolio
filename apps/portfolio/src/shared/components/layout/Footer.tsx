'use client';

import { useTranslations } from 'next-intl';

import { SOCIAL_LINK_URLS, type SocialLinkKey } from '@/shared/constants/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const tNavigation = useTranslations('navigation');
  const tFooter = useTranslations('footer');
  const tSocial = useTranslations('social');

  const socialLinks = Object.entries(SOCIAL_LINK_URLS) as [SocialLinkKey, string][];

  return (
    <footer
      className="bg-background-secondary border-t border-border py-12 px-6"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand Name */}
          <div>
            <p className="text-lg font-bold font-mono text-foreground">{tNavigation('brand')}</p>
            <p className="text-sm text-foreground-secondary mt-1">{tFooter('tagline')}</p>
          </div>

          {/* Social Links */}
          <div className="md:text-center">
            <h3 className="text-sm font-semibold font-mono text-foreground mb-3">
              {tFooter('findMe')}
            </h3>
            <div className="flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-6">
              {socialLinks.map(([key, url]) => {
                const label = tSocial(`${key}.label` as const);
                const aria = tSocial(`${key}.aria` as const);
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={aria}
                    className="text-sm font-mono text-foreground-secondary hover:text-accent transition-colors"
                  >
                    {label} →
                  </a>
                );
              })}
            </div>
          </div>

          {/* Copyright */}
          <div className="md:text-right">
            <p className="text-sm text-foreground-secondary font-mono">
              © {currentYear} {tNavigation('brand')}
            </p>
            <p className="text-xs text-foreground-secondary mt-1">{tFooter('copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
