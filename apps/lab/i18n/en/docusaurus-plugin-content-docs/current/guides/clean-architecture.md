---
id: clean-architecture
title: Clean Architecture in DevPortfolio
sidebar_label: Clean Architecture
sidebar_position: 1
description: Comprehensive guide on implementing Clean Architecture with 3 layers in Next.js
keywords: [clean architecture, next.js, typescript, dependency rule]
---

# Clean Architecture - DevPortfolio

## Introduction

DevPortfolio implements a simplified version of **Clean Architecture** with 3 main layers. This architecture ensures separation of concerns, testability, and maintainability.

## Layer Structure

```
/src
├── /core              # 🎯 Domain Layer
├── /features          # 📦 Features Layer
└── /shared            # 🔧 Shared Layer
```

### Dependency Rule

**CRITICAL**: Dependencies flow inward only:

```
features → can import → core + shared
shared   → can import → core
core     → CANNOT import anything (pure TypeScript)
```

**CORRECT Example**:

```typescript
// ✅ features/hero/HeroSection.tsx
import { validateEmail } from '@/core/use-cases/validateEmail';
import { Button } from '@/shared/components/ui/Button';

// ✅ shared/hooks/useFormValidation.ts
import { validateEmail } from '@/core/use-cases/validateEmail';

// ✅ core/use-cases/validateEmail.ts
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

**INCORRECT Example**:

```typescript
// ❌ core/entities/Project.ts
import { useState } from 'react'; // NEVER import React in core/
import { cn } from '@/shared/utils/cn'; // NEVER import shared in core/

// ❌ shared/components/ui/Button.tsx
import { Project } from '@/features/projects/types'; // NEVER import features in shared/
```

## Layer 1: Core (Domain)

**Location**: `/src/core`

**Responsibility**: Pure business logic, independent of frameworks.

**Contents**:

- **Entities** (`/entities`): Domain models with validation
- **Use Cases** (`/use-cases`): Pure business logic functions

**Rules**:

- ✅ Pure TypeScript only
- ✅ 100% testable without mocks
- ❌ NO React, Next.js, Framer Motion, etc. imports
- ❌ NO side effects (API calls, localStorage, etc.)

### Example: Entity

```typescript
// src/core/entities/Project.ts
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: ProjectCategory;
}

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'devops' | 'mobile' | 'data';

export class Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly category: ProjectCategory;

  constructor(data: ProjectData) {
    this.validate(data);
    Object.assign(this, data);
  }

  private validate(data: ProjectData): void {
    if (!data.id || data.id.trim().length === 0) {
      throw new Error('Project ID is required');
    }

    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Project title is required');
    }

    if (data.technologies.length === 0) {
      throw new Error('At least one technology is required');
    }

    if (data.githubUrl && !this.isValidUrl(data.githubUrl)) {
      throw new Error('Invalid GitHub URL');
    }

    if (data.liveUrl && !this.isValidUrl(data.liveUrl)) {
      throw new Error('Invalid live URL');
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  hasLiveDemo(): boolean {
    return !!this.liveUrl;
  }

  hasSourceCode(): boolean {
    return !!this.githubUrl;
  }
}
```

### Example: Use Case

```typescript
// src/core/use-cases/filterProjectsByCategory.ts
import type { Project } from '@/core/entities/Project';
import type { ProjectCategory } from '@/core/entities/Project';

export function filterProjectsByCategory(
  projects: Project[],
  category: ProjectCategory | 'all'
): Project[] {
  if (category === 'all') {
    return projects;
  }

  return projects.filter((project) => project.category === category);
}

// src/core/use-cases/validateContactForm.ts
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

## Layer 2: Features

**Location**: `/src/features`

**Responsibility**: Implementation of specific portfolio features. Each feature is a vertical slice with components, hooks, types, and constants.

**Contents**:

- Feature-specific React components
- Feature-specific custom hooks
- Feature-specific TypeScript types
- Feature-specific constants

**Rules**:

- ✅ Can import from `@/core` and `@/shared`
- ✅ Components with 'use client' if they use React hooks
- ✅ Translations with `useTranslations('feature-name')`
- ❌ NO importing from other features (avoid coupling)
- ❌ NO complex business logic (move it to core/)

### Example: Feature Structure

```
/src/features/projects/
├── ProjectsSection.tsx        # Main component
├── ProjectCard.tsx            # Card component
├── ProjectFilters.tsx         # Filters component
├── types.ts                   # Feature-specific types
└── constants.ts               # Feature-specific constants
```

### Example: Feature Component

```typescript
// src/features/projects/ProjectsSection.tsx
'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './ProjectFilters';
import type { ProjectCategory } from '@/core/entities/Project';
import { filterProjectsByCategory } from '@/core/use-cases/filterProjectsByCategory';
import { PROJECTS } from '@/shared/constants/projects';

export function ProjectsSection() {
  const t = useTranslations('projects');
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory | 'all'>('all');

  const filteredProjects = useMemo(() => {
    return filterProjectsByCategory(PROJECTS, selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8">{t('title')}</h2>

      <ProjectFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

## Layer 3: Shared

**Location**: `/src/shared`

**Responsibility**: Code reusable across multiple features.

**Contents**:

- `/components/ui`: Atomic components (Button, Card, Modal, etc.)
- `/components/layout`: Layout components (Navbar, Footer)
- `/hooks`: Reusable custom hooks
- `/utils`: Utility functions
- `/constants`: Global project constants

**Rules**:

- ✅ Can import from `@/core`
- ✅ Generic and reusable UI components
- ✅ No dependencies on specific features
- ❌ NO imports from `/features`
- ❌ NO business logic (move it to core/)

### Example: Shared UI Component

```typescript
// src/shared/components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg font-medium transition-colors',
          {
            'bg-accent text-white hover:bg-accent/90': variant === 'primary',
            'bg-background text-foreground hover:bg-muted': variant === 'secondary',
            'border-2 border-accent text-accent hover:bg-accent hover:text-white':
              variant === 'outline',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
```

### Example: Shared Hook

```typescript
// src/shared/hooks/useScrollSpy.ts
import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
```

## Path Aliases

The project uses path aliases for clean imports:

```typescript
@/core/*        → ./src/core/*
@/features/*    → ./src/features/*
@/shared/*      → ./src/shared/*
@/app/*         → ./app/*
@/i18n/*        → ./src/i18n/*
@/messages/*    → ./messages/*
```

**Recommended usage**:

```typescript
// ✅ CORRECT: Use path aliases
import { Project } from '@/core/entities/Project';
import { Button } from '@/shared/components/ui/Button';
import { ProjectCard } from '@/features/projects/ProjectCard';

// ❌ AVOID: Long relative imports
import { Project } from '../../../core/entities/Project';
import { Button } from '../../shared/components/ui/Button';
```

## Architecture Validation

### Checklist for Core Layer

- [ ] Is the file in `/src/core`?
- [ ] Does it use only pure TypeScript (no React, Next.js, etc.)?
- [ ] Does it have no side effects (API calls, localStorage)?
- [ ] Is it 100% testable without mocks?
- [ ] Does the entity have validation in its constructor?
- [ ] Is the use case a pure function?

### Checklist for Features Layer

- [ ] Is the file in `/src/features/[feature-name]`?
- [ ] Does it only import from `@/core` and `@/shared`?
- [ ] Does it NOT import from other features?
- [ ] Does it have 'use client' if it uses React hooks?
- [ ] Does it use `useTranslations('[feature-name]')` for i18n?
- [ ] Is the business logic in core/?

### Checklist for Shared Layer

- [ ] Is the file in `/src/shared`?
- [ ] Does it only import from `@/core`?
- [ ] Does it NOT import from `/features`?
- [ ] Is it generic and reusable?
- [ ] Does it have no dependencies on specific features?

## Common Errors and Solutions

### Error 1: Framework imports in core/

**❌ Incorrect**:

```typescript
// src/core/entities/Project.ts
import { useState } from 'react';

export class Project {
  // ...
}
```

**✅ Correct**:

```typescript
// src/core/entities/Project.ts
// No framework imports

export class Project {
  // Pure TypeScript only
}
```

### Error 2: Business logic in components

**❌ Incorrect**:

```typescript
// src/features/contact/ContactForm.tsx
export function ContactForm() {
  const handleSubmit = (data: FormData) => {
    // ❌ Validation in the component
    if (!data.email.includes('@')) {
      setError('Invalid email');
    }
  };
}
```

**✅ Correct**:

```typescript
// src/core/use-cases/validateContactForm.ts
export function validateContactForm(data: ContactFormData) {
  const errors = {};
  if (!data.email.includes('@')) {
    errors.email = 'Invalid email';
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

// src/features/contact/ContactForm.tsx
import { validateContactForm } from '@/core/use-cases/validateContactForm';

export function ContactForm() {
  const handleSubmit = (data: FormData) => {
    const { isValid, errors } = validateContactForm(data);
    if (!isValid) {
      setErrors(errors);
    }
  };
}
```

### Error 3: Circular imports between features

**❌ Incorrect**:

```typescript
// src/features/projects/ProjectCard.tsx
import { ContactButton } from '@/features/contact/ContactButton';
```

**✅ Correct**:

```typescript
// Move ContactButton to shared if reusable
// src/shared/components/ui/ContactButton.tsx
export function ContactButton() {
  /* ... */
}

// src/features/projects/ProjectCard.tsx
import { ContactButton } from '@/shared/components/ui/ContactButton';
```

## Best Practices

1. **Keep core/ pure**: No framework dependencies, 100% testable
2. **Cohesive features**: Each feature should be self-contained
3. **Generic shared**: Only truly reusable components and utilities
4. **Path aliases**: Always use `@/core`, `@/features`, `@/shared`
5. **Early validation**: Validate in entity constructors
6. **Pure functions**: Use cases must be pure functions without side effects
7. **Single Responsibility**: Each file has a single responsibility
8. **DRY with care**: Don't create premature abstractions in shared/

## References

- Clean Architecture (Robert C. Martin)
- DevPortfolio Architecture: See `/CLAUDE.md`
- Testing Strategy: See `.claude/architecture/testing-strategy.md`
- i18n Patterns: See `.claude/architecture/i18n-patterns.md`
