---
id: testing-strategy
title: Estrategia de Testing en DevPortfolio
sidebar_label: Testing Strategy
sidebar_position: 2
description: Guía de testing con Vitest y React Testing Library para alcanzar 80%+ de cobertura
keywords: [testing, vitest, react testing library, coverage, aaa pattern]
---

# Testing Strategy - DevPortfolio

## Objetivo de Testing

**Meta de cobertura**: 80%+ (líneas, funciones, branches, statements)

**Herramientas**:

- **Vitest**: Test runner (reemplazo de Jest, más rápido)
- **React Testing Library**: Testing de componentes
- **@testing-library/user-event**: Simulación de interacciones de usuario
- **jsdom**: Entorno DOM para tests

## Configuración

### Archivos de Configuración

**vitest.config.ts**:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/', '*.config.*', '.next/', 'app/layout.tsx'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/app': path.resolve(__dirname, './app'),
      '@/tests': path.resolve(__dirname, './tests'),
    },
  },
});
```

**tests/setup.ts**:

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

### Scripts de Testing

```bash
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with Vitest UI
npm run test:run      # Run tests once (CI mode)
npm run test:coverage # Generate coverage report
```

## Qué Testear

### Regla General

**Testear comportamiento, no implementación**. Los tests deben verificar que el código hace lo que debe hacer, no cómo lo hace.

### Prioridades de Testing

1. **Core Layer (90-100% coverage)**: Lógica de negocio crítica
   - Entities: Validación, métodos de negocio
   - Use Cases: Funciones puras, edge cases

2. **Features Layer (80-90% coverage)**: Componentes y funcionalidad
   - Componentes: Renderizado, interacciones de usuario, estados
   - Hooks personalizados: Lógica de estado, efectos

3. **Shared Layer (80-90% coverage)**: Reutilizables
   - Componentes UI: Props, variantes, accesibilidad
   - Hooks: Comportamiento, edge cases
   - Utils: Funciones de utilidad, edge cases

4. **App Layer (Opcional, <50% coverage)**: Layout y páginas
   - Páginas: Renderizado básico
   - Layouts: Estructura, providers

## Testing por Capa

### 1. Testing Core Layer (Entities & Use Cases)

**Objetivo**: 90-100% coverage, tests simples sin mocks.

#### Testing Entities

```typescript
// tests/core/entities/Project.test.ts
import { describe, it, expect } from 'vitest';
import { Project, type ProjectData } from '@/core/entities/Project';

describe('Project Entity', () => {
  describe('Constructor & Validation', () => {
    it('creates project with valid data', () => {
      // Arrange
      const validData: ProjectData = {
        id: 'project-1',
        title: 'DevPortfolio',
        description: 'Personal portfolio',
        technologies: ['Next.js', 'React', 'TypeScript'],
        category: 'fullstack',
      };

      // Act
      const project = new Project(validData);

      // Assert
      expect(project.id).toBe('project-1');
      expect(project.title).toBe('DevPortfolio');
      expect(project.technologies).toHaveLength(3);
    });

    it('throws error when ID is missing', () => {
      // Arrange
      const invalidData = {
        id: '',
        title: 'Test',
        description: 'Test',
        technologies: ['React'],
        category: 'frontend' as const,
      };

      // Act & Assert
      expect(() => new Project(invalidData)).toThrow('Project ID is required');
    });

    it('throws error when title is missing', () => {
      const invalidData = {
        id: 'test-1',
        title: '',
        description: 'Test',
        technologies: ['React'],
        category: 'frontend' as const,
      };

      expect(() => new Project(invalidData)).toThrow('Project title is required');
    });

    it('throws error when technologies array is empty', () => {
      const invalidData = {
        id: 'test-1',
        title: 'Test',
        description: 'Test',
        technologies: [],
        category: 'frontend' as const,
      };

      expect(() => new Project(invalidData)).toThrow('At least one technology is required');
    });

    it('throws error for invalid GitHub URL', () => {
      const invalidData = {
        id: 'test-1',
        title: 'Test',
        description: 'Test',
        technologies: ['React'],
        category: 'frontend' as const,
        githubUrl: 'not-a-url',
      };

      expect(() => new Project(invalidData)).toThrow('Invalid GitHub URL');
    });
  });

  describe('Business Methods', () => {
    it('hasLiveDemo returns true when liveUrl exists', () => {
      const project = new Project({
        id: 'test-1',
        title: 'Test',
        description: 'Test',
        technologies: ['React'],
        category: 'frontend',
        liveUrl: 'https://example.com',
      });

      expect(project.hasLiveDemo()).toBe(true);
    });

    it('hasLiveDemo returns false when liveUrl is missing', () => {
      const project = new Project({
        id: 'test-1',
        title: 'Test',
        description: 'Test',
        technologies: ['React'],
        category: 'frontend',
      });

      expect(project.hasLiveDemo()).toBe(false);
    });

    it('hasSourceCode returns true when githubUrl exists', () => {
      const project = new Project({
        id: 'test-1',
        title: 'Test',
        description: 'Test',
        technologies: ['React'],
        category: 'frontend',
        githubUrl: 'https://github.com/user/repo',
      });

      expect(project.hasSourceCode()).toBe(true);
    });
  });
});
```

#### Testing Use Cases

```typescript
// tests/core/use-cases/filterProjectsByCategory.test.ts
import { describe, it, expect } from 'vitest';
import { filterProjectsByCategory } from '@/core/use-cases/filterProjectsByCategory';
import { Project } from '@/core/entities/Project';

describe('filterProjectsByCategory', () => {
  const mockProjects = [
    new Project({
      id: '1',
      title: 'Project 1',
      description: 'Test',
      technologies: ['React'],
      category: 'frontend',
    }),
    new Project({
      id: '2',
      title: 'Project 2',
      description: 'Test',
      technologies: ['Node.js'],
      category: 'backend',
    }),
    new Project({
      id: '3',
      title: 'Project 3',
      description: 'Test',
      technologies: ['Next.js'],
      category: 'fullstack',
    }),
  ];

  it('returns all projects when category is "all"', () => {
    const result = filterProjectsByCategory(mockProjects, 'all');
    expect(result).toHaveLength(3);
  });

  it('filters projects by frontend category', () => {
    const result = filterProjectsByCategory(mockProjects, 'frontend');
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('frontend');
  });

  it('filters projects by backend category', () => {
    const result = filterProjectsByCategory(mockProjects, 'backend');
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('backend');
  });

  it('returns empty array when no projects match category', () => {
    const result = filterProjectsByCategory(mockProjects, 'mobile');
    expect(result).toHaveLength(0);
  });

  it('handles empty projects array', () => {
    const result = filterProjectsByCategory([], 'frontend');
    expect(result).toHaveLength(0);
  });
});
```

### 2. Testing Features Layer (Componentes)

**Objetivo**: 80-90% coverage, testing con React Testing Library.

#### Patrón AAA (Arrange-Act-Assert)

Todos los tests deben seguir el patrón AAA:

1. **Arrange**: Preparar datos y mocks
2. **Act**: Ejecutar la acción a testear
3. **Assert**: Verificar el resultado

#### Testing Componentes

```typescript
// tests/features/projects/ProjectCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/features/projects/ProjectCard';
import { Project } from '@/core/entities/Project';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    // Arrange
    const mockProject = new Project({
      id: 'test-1',
      title: 'Test Project',
      description: 'This is a test project',
      technologies: ['React', 'TypeScript'],
      category: 'frontend',
    });

    // Act
    render(<ProjectCard project={mockProject} />);

    // Assert
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project')).toBeInTheDocument();
  });

  it('renders all technologies as badges', () => {
    const mockProject = new Project({
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      technologies: ['React', 'TypeScript', 'Tailwind'],
      category: 'frontend',
    });

    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
  });

  it('shows live demo link when liveUrl exists', () => {
    const mockProject = new Project({
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      technologies: ['React'],
      category: 'frontend',
      liveUrl: 'https://example.com',
    });

    render(<ProjectCard project={mockProject} />);

    const liveLink = screen.getByRole('link', { name: /live demo/i });
    expect(liveLink).toHaveAttribute('href', 'https://example.com');
  });

  it('does not show live demo link when liveUrl is missing', () => {
    const mockProject = new Project({
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      technologies: ['React'],
      category: 'frontend',
    });

    render(<ProjectCard project={mockProject} />);

    const liveLink = screen.queryByRole('link', { name: /live demo/i });
    expect(liveLink).not.toBeInTheDocument();
  });

  it('shows GitHub link when githubUrl exists', () => {
    const mockProject = new Project({
      id: 'test-1',
      title: 'Test',
      description: 'Test',
      technologies: ['React'],
      category: 'frontend',
      githubUrl: 'https://github.com/user/repo',
    });

    render(<ProjectCard project={mockProject} />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/user/repo');
  });
});
```

#### Testing Interacciones de Usuario

```typescript
// tests/features/contact/ContactForm.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/features/contact/ContactForm';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('ContactForm', () => {
  it('submits form with valid data', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<ContactForm onSubmit={mockSubmit} />);

    // Act
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test message');
    await user.click(screen.getByRole('button', { name: /send/i }));

    // Assert
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message',
      });
    });
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<ContactForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test');

    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});
```

### 3. Testing Shared Layer (UI Components & Hooks)

#### Testing UI Components

```typescript
// tests/shared/components/ui/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/shared/components/ui/Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-accent');
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-background');
  });

  it('applies outline variant styles', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-2', 'border-accent');
  });

  it('applies medium size by default', () => {
    render(<Button>Medium</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-4', 'py-2');
  });

  it('applies small size', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-3', 'py-1.5');
  });

  it('applies large size', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6', 'py-3');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('merges custom className with default styles', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class', 'bg-accent');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref).toHaveBeenCalled();
  });
});
```

#### Testing Custom Hooks

```typescript
// tests/shared/hooks/useScrollSpy.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollSpy } from '@/shared/hooks/useScrollSpy';

describe('useScrollSpy', () => {
  beforeEach(() => {
    // Setup DOM elements
    document.body.innerHTML = `
      <div id="section-1"></div>
      <div id="section-2"></div>
      <div id="section-3"></div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns empty string initially', () => {
    const { result } = renderHook(() => useScrollSpy(['section-1', 'section-2']));
    expect(result.current).toBe('');
  });

  it('updates active section when element intersects', () => {
    const { result } = renderHook(() => useScrollSpy(['section-1', 'section-2']));

    // Mock IntersectionObserver callback
    const mockCallback = vi.fn();
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      mockCallback.mockImplementation(callback);
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });

    // Simulate intersection
    mockCallback([{ isIntersecting: true, target: { id: 'section-1' } }]);

    expect(result.current).toBe('section-1');
  });
});
```

## Mocking en Tests

### Mock de next-intl

```typescript
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
```

### Mock de framer-motion

```typescript
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
    section: 'section',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));
```

### Mock de next/navigation

```typescript
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/en/projects',
  useSearchParams: () => new URLSearchParams(),
}));
```

## Comandos Útiles

```bash
# Run specific test file
npm test -- ProjectCard.test.tsx

# Run tests matching pattern
npm test -- --grep "validates email"

# Run tests with UI (debugging)
npm run test:ui

# Generate coverage report
npm run test:coverage

# Watch mode (default)
npm test
```

## Checklist de Testing

Antes de considerar una feature completa:

- [ ] Core entities tienen 90%+ coverage
- [ ] Core use cases tienen 90%+ coverage
- [ ] Componentes principales tienen 80%+ coverage
- [ ] Interacciones de usuario están testeadas
- [ ] Edge cases están cubiertos
- [ ] Validaciones están testeadas
- [ ] Tests siguen patrón AAA
- [ ] Mocks son mínimos y necesarios
- [ ] Tests son legibles y mantenibles
- [ ] `npm run test:coverage` pasa con 80%+

## Referencias

- Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Vitest: https://vitest.dev/
- Clean Architecture Testing: Ver `.claude/architecture/clean-architecture.md`
