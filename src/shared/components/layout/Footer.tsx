/**
 * Footer Component
 *
 * Simple footer with brand name, social links, and copyright notice.
 * Follows minimalist design philosophy.
 */

import { BRAND_NAME, SOCIAL_LINKS } from '@/shared/constants/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-background-secondary border-t border-border py-12 px-6"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand Name */}
          <div>
            <p className="text-lg font-bold font-mono text-foreground">{BRAND_NAME}</p>
            <p className="text-sm text-foreground-secondary mt-1">Desarrollo cosas</p>
          </div>

          {/* Social Links */}
          <div className="md:text-center">
            <h3 className="text-sm font-semibold font-mono text-foreground mb-3">Encuéntrame</h3>
            <div className="flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-6">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-sm font-mono text-foreground-secondary hover:text-accent transition-colors"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="md:text-right">
            <p className="text-sm text-foreground-secondary font-mono">
              © {currentYear} {BRAND_NAME}
            </p>
            <p className="text-xs text-foreground-secondary mt-1">Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
