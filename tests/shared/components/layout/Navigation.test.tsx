import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

import esMessages from '../../../../messages/es.json';
import { Navigation } from '@/shared/components/layout/Navigation';

// Mock useScrollSpy hook
vi.mock('@/shared/hooks/useScrollSpy', () => ({
  useScrollSpy: vi.fn(() => null),
}));

// Mock next-themes
const mockSetTheme = vi.fn();
const mockUseTheme = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}));

// Mock @/i18n/navigation router helpers
const mockReplace = vi.fn();
const mockUseRouter = vi.fn();
const mockUsePathname = vi.fn();

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => mockUseRouter(),
  usePathname: () => mockUsePathname(),
  Link: vi.fn(),
  redirect: vi.fn(),
}));

function renderNavigation() {
  return render(
    <NextIntlClientProvider locale="es" messages={esMessages}>
      <Navigation />
    </NextIntlClientProvider>
  );
}

describe('Navigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Set default mock return values
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    mockUseRouter.mockReturnValue({
      replace: mockReplace,
    });

    // Default locale (es) uses '/' as pathname (no locale prefix)
    mockUsePathname.mockReturnValue('/');

    // Reset window.location.hash
    Object.defineProperty(window, 'location', {
      value: { hash: '' },
      writable: true,
      configurable: true,
    });
  });

  describe('Rendering', () => {
    it('should render navigation element', () => {
      renderNavigation();
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should render brand name', () => {
      renderNavigation();
      expect(screen.getByText(/Dev Portfolio/i)).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
      renderNavigation();
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
      expect(screen.getByText('Proyectos')).toBeInTheDocument();
      expect(screen.getByText('Contacto')).toBeInTheDocument();
    });

    it('should render CTA button', () => {
      renderNavigation();
      const ctaButton = screen.getByRole('link', { name: /hablemos/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#contact');
    });

    it('should render theme toggle button', () => {
      renderNavigation();
      const themeButton = screen.getByLabelText(/cambiar tema/i);
      expect(themeButton).toBeInTheDocument();
    });

    it('should render mobile menu button', () => {
      renderNavigation();
      const menuButton = screen.getByLabelText(/abrir menú/i);
      expect(menuButton).toBeInTheDocument();
    });

    it('should render locale switcher', () => {
      renderNavigation();
      const localeSelect = screen.getByLabelText(/idioma/i);
      expect(localeSelect).toBeInTheDocument();
      expect(localeSelect).toHaveValue('es');
    });
  });

  describe('Styles', () => {
    it('should have sticky positioning', () => {
      renderNavigation();
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('sticky');
    });

    it('should have proper z-index', () => {
      renderNavigation();
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('z-40');
    });

    it('should hide desktop nav on small screens', () => {
      renderNavigation();
      const desktopNav = screen.getAllByRole('list')[0];
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    it('should hide mobile menu button on desktop', () => {
      renderNavigation();
      const menuButton = screen.getByLabelText(/abrir menú/i);
      expect(menuButton).toHaveClass('md:hidden');
    });
  });

  describe('Mobile Menu', () => {
    it('should not show mobile menu initially', () => {
      renderNavigation();
      const mobileMenu = screen.queryByRole('menu');
      expect(mobileMenu).not.toBeInTheDocument();
    });

    it('should toggle mobile menu when button is clicked', async () => {
      const user = userEvent.setup();
      renderNavigation();

      const menuButton = screen.getByLabelText(/abrir menú/i);
      await user.click(menuButton);

      const mobileMenu = screen.getByRole('menu');
      expect(mobileMenu).toBeInTheDocument();
    });

    it('should close mobile menu when clicking nav item', async () => {
      const user = userEvent.setup();
      renderNavigation();

      const menuButton = screen.getByLabelText(/abrir menú/i);
      await user.click(menuButton);

      const navLink = screen.getAllByText('Inicio')[1];
      await user.click(navLink);

      const mobileMenu = screen.queryByRole('menu');
      expect(mobileMenu).not.toBeInTheDocument();
    });

    it('should show locale switcher inside mobile menu', async () => {
      const user = userEvent.setup();
      renderNavigation();

      const menuButton = screen.getByLabelText(/abrir menú/i);
      await user.click(menuButton);

      expect(
        screen.getByLabelText(/idioma/i, { selector: 'select#locale-switcher-mobile' })
      ).toBeInTheDocument();
    });

    it('should update aria-expanded when menu toggles', async () => {
      const user = userEvent.setup();
      renderNavigation();

      const menuButton = screen.getByLabelText(/abrir menú/i);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      await user.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Navigation Links', () => {
    it('should have correct href for each link', () => {
      renderNavigation();

      const inicioLink = screen.getAllByRole('link', { name: /inicio/i })[0];
      expect(inicioLink).toHaveAttribute('href', '#hero');

      const aboutLink = screen.getAllByRole('link', { name: /sobre mí/i })[0];
      expect(aboutLink).toHaveAttribute('href', '#about');

      const projectsLink = screen.getAllByRole('link', { name: /proyectos/i })[0];
      expect(projectsLink).toHaveAttribute('href', '#projects');

      const contactLink = screen.getAllByRole('link', { name: /contacto/i })[0];
      expect(contactLink).toHaveAttribute('href', '#contact');
    });

    it('should scroll to section when link is clicked', async () => {
      const user = userEvent.setup();
      const section = document.createElement('section');
      section.id = 'about';
      section.scrollIntoView = vi.fn();
      document.body.appendChild(section);

      renderNavigation();

      const aboutLink = screen.getAllByRole('link', { name: /sobre mí/i })[0];
      await user.click(aboutLink);

      expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(section);
    });

    it('should scroll to hero when brand name is clicked', async () => {
      const user = userEvent.setup();
      const heroSection = document.createElement('section');
      heroSection.id = 'hero';
      heroSection.scrollIntoView = vi.fn();
      document.body.appendChild(heroSection);

      renderNavigation();

      const brandLink = screen.getByText(/Dev Portfolio/i);
      await user.click(brandLink);

      expect(heroSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(heroSection);
    });

    it('should scroll to contact when CTA button is clicked', async () => {
      const user = userEvent.setup();
      const contactSection = document.createElement('section');
      contactSection.id = 'contact';
      contactSection.scrollIntoView = vi.fn();
      document.body.appendChild(contactSection);

      renderNavigation();

      const ctaButton = screen.getByRole('link', { name: /hablemos/i });
      await user.click(ctaButton);

      expect(contactSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(contactSection);
    });

    it('should scroll to contact when mobile CTA is clicked', async () => {
      const user = userEvent.setup();
      const contactSection = document.createElement('section');
      contactSection.id = 'contact';
      contactSection.scrollIntoView = vi.fn();
      document.body.appendChild(contactSection);

      renderNavigation();

      // Open mobile menu
      const menuButton = screen.getByLabelText(/abrir menú/i);
      await user.click(menuButton);

      // Click mobile CTA
      const mobileCta = screen.getAllByRole('link', { name: /hablemos/i })[1];
      await user.click(mobileCta);

      expect(contactSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(contactSection);
    });
  });

  describe('Accessibility', () => {
    it('should have proper navigation landmark', () => {
      renderNavigation();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should have aria-label for navigation', () => {
      renderNavigation();
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Navegación principal');
    });

    it('should have aria-label for mobile menu button', () => {
      renderNavigation();
      expect(screen.getByLabelText(/abrir menú/i)).toBeInTheDocument();
    });

    it('should have aria-label for theme toggle', () => {
      renderNavigation();
      expect(screen.getByLabelText(/cambiar tema/i)).toBeInTheDocument();
    });
  });

  describe('Theme Toggle', () => {
    it('should toggle theme from light to dark when clicked', async () => {
      const user = userEvent.setup();

      mockUseTheme.mockReturnValue({
        theme: 'light',
        setTheme: mockSetTheme,
      });

      renderNavigation();
      const themeButton = screen.getByLabelText(/cambiar tema/i);

      await user.click(themeButton);

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('should toggle theme from dark to light when clicked', async () => {
      const user = userEvent.setup();

      mockUseTheme.mockReturnValue({
        theme: 'dark',
        setTheme: mockSetTheme,
      });

      renderNavigation();
      const themeButton = screen.getByLabelText(/cambiar tema/i);

      await user.click(themeButton);

      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });

  describe('Locale Switching', () => {
    it('should change locale from es to en via desktop selector', async () => {
      const user = userEvent.setup();

      renderNavigation();
      const localeSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-desktop',
      });

      await user.selectOptions(localeSelect, 'en');

      expect(mockReplace).toHaveBeenCalledWith('/', { locale: 'en' });
    });

    it('should change locale from es to en and preserve hash', async () => {
      const user = userEvent.setup();

      // Mock window.location.hash
      Object.defineProperty(window, 'location', {
        value: { hash: '#about' },
        writable: true,
      });

      renderNavigation();
      const localeSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-desktop',
      });

      await user.selectOptions(localeSelect, 'en');

      expect(mockReplace).toHaveBeenCalledWith('/#about', { locale: 'en' });
    });

    it('should handle locale change in mobile menu', async () => {
      const user = userEvent.setup();

      renderNavigation();

      // Open mobile menu
      const menuButton = screen.getByLabelText(/abrir menú/i);
      await user.click(menuButton);

      // Change locale in mobile menu
      const mobileLocaleSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-mobile',
      });

      await user.selectOptions(mobileLocaleSelect, 'en');

      expect(mockReplace).toHaveBeenCalledWith('/', { locale: 'en' });
    });

    it('should close mobile menu after locale change', async () => {
      const user = userEvent.setup();

      renderNavigation();

      // Open mobile menu
      const menuButton = screen.getByLabelText(/abrir menú/i);
      await user.click(menuButton);

      expect(screen.getByRole('menu')).toBeInTheDocument();

      // Change locale
      const mobileLocaleSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-mobile',
      });

      await user.selectOptions(mobileLocaleSelect, 'en');

      // Menu should be closed
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Locale Switching with Paths', () => {
    it('should handle path when switching from default locale to en', async () => {
      const user = userEvent.setup();

      mockUsePathname.mockReturnValue('/projects');

      renderNavigation();
      const localeSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-desktop',
      });

      await user.selectOptions(localeSelect, 'en');

      expect(mockReplace).toHaveBeenCalledWith('/projects', { locale: 'en' });
    });

    it('should handle root path when switching from default locale', async () => {
      const user = userEvent.setup();

      mockUsePathname.mockReturnValue('/');

      renderNavigation();
      const localeSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-desktop',
      });

      await user.selectOptions(localeSelect, 'en');

      expect(mockReplace).toHaveBeenCalledWith('/', { locale: 'en' });
    });

    it('should handle switching from en to default locale (es)', async () => {
      const user = userEvent.setup();

      mockUsePathname.mockReturnValue('/projects');

      render(
        <NextIntlClientProvider locale="en" messages={esMessages}>
          <Navigation />
        </NextIntlClientProvider>
      );

      const localeSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-desktop',
      });

      await user.selectOptions(localeSelect, 'es');

      expect(mockReplace).toHaveBeenCalledWith('/projects', { locale: 'es' });
    });

    it('should handle switching from en root to default locale', async () => {
      const user = userEvent.setup();

      mockUsePathname.mockReturnValue('/');

      render(
        <NextIntlClientProvider locale="en" messages={esMessages}>
          <Navigation />
        </NextIntlClientProvider>
      );

      const localeSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-desktop',
      });

      await user.selectOptions(localeSelect, 'es');

      expect(mockReplace).toHaveBeenCalledWith('/', { locale: 'es' });
    });

    it('should handle same locale selection (no-op)', async () => {
      const user = userEvent.setup();

      renderNavigation();
      const localeSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-desktop',
      });

      await user.selectOptions(localeSelect, 'es');

      // Should not call replace since locale hasn't changed
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('should handle switching with custom path', async () => {
      const user = userEvent.setup();

      mockUsePathname.mockReturnValue('/custom/path');

      renderNavigation();
      const localeSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-desktop',
      });

      await user.selectOptions(localeSelect, 'en');

      expect(mockReplace).toHaveBeenCalledWith('/custom/path', { locale: 'en' });
    });

    it('should preserve hash when switching with custom path', async () => {
      const user = userEvent.setup();

      mockUsePathname.mockReturnValue('/about');

      Object.defineProperty(window, 'location', {
        value: { hash: '#section' },
        writable: true,
        configurable: true,
      });

      renderNavigation();
      const localeSelect = screen.getByLabelText(/idioma/i, {
        selector: 'select#locale-switcher-desktop',
      });

      await user.selectOptions(localeSelect, 'en');

      expect(mockReplace).toHaveBeenCalledWith('/about#section', { locale: 'en' });
    });
  });
});
