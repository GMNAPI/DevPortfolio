import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from '@/shared/components/layout/Navigation';

// Mock useScrollSpy hook
vi.mock('@/shared/hooks/useScrollSpy', () => ({
  useScrollSpy: vi.fn(() => null),
}));

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render navigation element', () => {
      render(<Navigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should render brand name', () => {
      render(<Navigation />);
      expect(screen.getByText(/Dev Portfolio/i)).toBeInTheDocument();
    });

    it('should render all navigation links', () => {
      render(<Navigation />);
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Sobre mí')).toBeInTheDocument();
      expect(screen.getByText('Proyectos')).toBeInTheDocument();
      expect(screen.getByText('Contacto')).toBeInTheDocument();
    });

    it('should render CTA button', () => {
      render(<Navigation />);
      const ctaButton = screen.getByRole('link', { name: /hablemos/i });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#contact');
    });

    it('should render theme toggle button', () => {
      render(<Navigation />);
      const themeButton = screen.getByLabelText(/cambiar tema/i);
      expect(themeButton).toBeInTheDocument();
    });

    it('should render mobile menu button', () => {
      render(<Navigation />);
      const menuButton = screen.getByLabelText(/abrir menú/i);
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Styles', () => {
    it('should have sticky positioning', () => {
      render(<Navigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('sticky');
    });

    it('should have proper z-index', () => {
      render(<Navigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('z-40');
    });

    it('should hide desktop nav on small screens', () => {
      render(<Navigation />);
      const desktopNav = screen.getAllByRole('list')[0];
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    it('should hide mobile menu button on desktop', () => {
      render(<Navigation />);
      const menuButton = screen.getByLabelText(/abrir menú/i);
      expect(menuButton).toHaveClass('md:hidden');
    });
  });

  describe('Mobile Menu', () => {
    it('should not show mobile menu initially', () => {
      render(<Navigation />);
      const mobileMenu = screen.queryByRole('menu');
      expect(mobileMenu).not.toBeInTheDocument();
    });

    it('should toggle mobile menu when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const menuButton = screen.getByLabelText(/abrir menú/i);
      await user.click(menuButton);

      // Mobile menu should now be visible
      const mobileMenu = screen.getByRole('menu');
      expect(mobileMenu).toBeInTheDocument();
    });

    it('should close mobile menu when clicking nav item', async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      // Open menu
      const menuButton = screen.getByLabelText(/abrir menú/i);
      await user.click(menuButton);

      // Click a nav item
      const navLink = screen.getAllByText('Inicio')[1]; // Second one is in mobile menu
      await user.click(navLink);

      // Menu should close
      const mobileMenu = screen.queryByRole('menu');
      expect(mobileMenu).not.toBeInTheDocument();
    });

    it('should show all nav items in mobile menu', async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const menuButton = screen.getByLabelText(/abrir menú/i);
      await user.click(menuButton);

      const mobileMenu = screen.getByRole('menu');
      expect(mobileMenu).toHaveTextContent('Inicio');
      expect(mobileMenu).toHaveTextContent('Sobre mí');
      expect(mobileMenu).toHaveTextContent('Proyectos');
      expect(mobileMenu).toHaveTextContent('Contacto');
    });

    it('should update aria-expanded when menu toggles', async () => {
      const user = userEvent.setup();
      render(<Navigation />);

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
      render(<Navigation />);

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

      // Create mock section
      const section = document.createElement('section');
      section.id = 'about';
      section.scrollIntoView = vi.fn();
      document.body.appendChild(section);

      render(<Navigation />);

      const aboutLink = screen.getAllByRole('link', { name: /sobre mí/i })[0];
      await user.click(aboutLink);

      expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

      document.body.removeChild(section);
    });
  });

  describe('Accessibility', () => {
    it('should have proper navigation landmark', () => {
      render(<Navigation />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should have aria-label for navigation', () => {
      render(<Navigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Navegación principal');
    });

    it('should have aria-label for mobile menu button', () => {
      render(<Navigation />);
      expect(screen.getByLabelText(/abrir menú/i)).toBeInTheDocument();
    });

    it('should have aria-label for theme toggle', () => {
      render(<Navigation />);
      expect(screen.getByLabelText(/cambiar tema/i)).toBeInTheDocument();
    });
  });
});
