---
id: testing-strategy
title: Testing Strategy in DevPortfolio
sidebar_label: Testing Strategy
sidebar_position: 2
description: Testing guide with Vitest and React Testing Library to achieve 80%+ coverage
keywords: [testing, vitest, react testing library, coverage, aaa pattern]
---

# Testing Strategy - DevPortfolio

## Testing Goal

**Coverage target**: 80%+ (lines, functions, branches, statements)

**Tools**:

- **Vitest**: Test runner (Jest replacement, faster)
- **React Testing Library**: Component testing
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM environment for tests

## Configuration

### Configuration Files

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

### Testing Scripts

```bash
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with Vitest UI
npm run test:run      # Run tests once (CI mode)
npm run test:coverage # Generate coverage report
```

## What to Test

### General Rule

**Test behavior, not implementation**. Tests should verify that the code does what it's supposed to do, not how it does it.

### Testing Priorities

1. **Core Layer (90-100% coverage)**: Critical business logic
   - Entities: Validation, business methods
   - Use Cases: Pure functions, edge cases

2. **Features Layer (80-90% coverage)**: Components and functionality
   - Components: Rendering, user interactions, states
   - Custom hooks: State logic, effects

3. **Shared Layer (80-90% coverage)**: Reusables
   - UI Components: Props, variants, accessibility
   - Hooks: Behavior, edge cases
   - Utils: Utility functions, edge cases

4. **App Layer (Optional, less than 50% coverage)**: Layout and pages
   - Pages: Basic rendering
   - Layouts: Structure, providers

## Testing by Layer

### 1. Testing Core Layer (Entities and Use Cases)

**Goal**: 90-100% coverage, simple tests without mocks.

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
      const invalidData = {
        id: '',
        title: 'Test',
        description: 'Test',
        technologies: ['React'],
        category: 'frontend' as const,
      };

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
    new Project({ id: '1', title: 'Project 1', description: 'Test', technologies: ['React'], category: 'frontend' }),
    new Project({ id: '2', title: 'Project 2', description: 'Test', technologies: ['Node.js'], category: 'backend' }),
    new Project({ id: '3', title: 'Project 3', description: 'Test', technologies: ['Next.js'], category: 'fullstack' }),
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

### 2. Testing Features Layer (Components)

**Goal**: 80-90% coverage, testing with React Testing Library.

#### AAA Pattern (Arrange-Act-Assert)

All tests must follow the AAA pattern:

1. **Arrange**: Prepare data and mocks
2. **Act**: Execute the action to test
3. **Assert**: Verify the result

#### Testing Components

```typescript
// tests/features/projects/ProjectCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/features/projects/ProjectCard';
import { Project } from '@/core/entities/Project';

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

    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument();
  });
});
```

#### Testing User Interactions

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
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<ContactForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Hello, this is a test message');
    await user.click(screen.getByRole('button', { name: /send/i }));

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

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<ContactForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message here');

    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});
```

### 3. Testing Shared Layer (UI Components and Hooks)

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
    expect(screen.getByRole('button')).toHaveClass('bg-accent');
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-background');
  });

  it('applies outline variant styles', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-2', 'border-accent');
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
    expect(screen.getByRole('button')).toBeDisabled();
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
    // Setup DOM elements for test
    const section1 = document.createElement('div');
    section1.id = 'section-1';
    const section2 = document.createElement('div');
    section2.id = 'section-2';
    document.body.appendChild(section1);
    document.body.appendChild(section2);
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  it('returns empty string initially', () => {
    const { result } = renderHook(() => useScrollSpy(['section-1', 'section-2']));
    expect(result.current).toBe('');
  });

  it('updates active section when element intersects', () => {
    const { result } = renderHook(() => useScrollSpy(['section-1', 'section-2']));

    const mockCallback = vi.fn();
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      mockCallback.mockImplementation(callback);
      return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
    });

    mockCallback([{ isIntersecting: true, target: { id: 'section-1' } }]);

    expect(result.current).toBe('section-1');
  });
});
```

## Mocking in Tests

### Mock next-intl

```typescript
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
```

### Mock framer-motion

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

### Mock next/navigation

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

## Useful Commands

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

## Testing Checklist

Before considering a feature complete:

- [ ] Core entities have 90%+ coverage
- [ ] Core use cases have 90%+ coverage
- [ ] Main components have 80%+ coverage
- [ ] User interactions are tested
- [ ] Edge cases are covered
- [ ] Validations are tested
- [ ] Tests follow the AAA pattern
- [ ] Mocks are minimal and necessary
- [ ] Tests are readable and maintainable
- [ ] `npm run test:coverage` passes with 80%+

## References

- Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Vitest: https://vitest.dev/
- Clean Architecture Testing: See `.claude/architecture/clean-architecture.md`
