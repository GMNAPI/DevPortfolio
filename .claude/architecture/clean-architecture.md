# Clean Architecture - DevPortfolio Monorepo

## Introducción

El **Portfolio** del monorepo DevPortfolio implementa una versión simplificada de **Clean Architecture** con 3 capas principales. Esta arquitectura garantiza separación de responsabilidades, testabilidad y mantenibilidad del código.

**Nota**: Este documento se aplica solo a `apps/portfolio/`. La app `apps/lab/` (Docusaurus) sigue su propia estructura.

## Estructura de Capas

```
apps/portfolio/src/
├── /core              # 🎯 Capa de Dominio
├── /features          # 📦 Capa de Features
└── /shared            # 🔧 Capa Compartida
```

### Regla de Dependencias

**CRÍTICO**: Las dependencias fluyen hacia adentro únicamente:

```
features → puede importar → core + shared
shared   → puede importar → core
core     → NO puede importar nada (TypeScript puro)
```

**Ejemplo CORRECTO**:

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

**Ejemplo INCORRECTO**:

```typescript
// ❌ core/entities/Project.ts
import { useState } from 'react'; // NUNCA importar React en core/
import { cn } from '@/shared/utils/cn'; // NUNCA importar shared en core/

// ❌ shared/components/ui/Button.tsx
import { Project } from '@/features/projects/types'; // NUNCA importar features en shared/
```

## Capa 1: Core (Dominio)

**Ubicación**: `apps/portfolio/src/core`

**Responsabilidad**: Lógica de negocio pura, independiente de frameworks.

**Contenido**:

- **Entities** (`apps/portfolio/src/core/entities`): Modelos de dominio con validación
- **Use Cases** (`apps/portfolio/src/core/use-cases`): Funciones puras de lógica de negocio

**Reglas**:

- ✅ Solo TypeScript puro
- ✅ 100% testeable sin mocks
- ❌ NO imports de React, Next.js, Framer Motion, etc.
- ❌ NO side effects (API calls, localStorage, etc.)

### Ejemplo: Entity

```typescript
// apps/portfolio/src/core/entities/Project.ts
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

### Ejemplo: Use Case

```typescript
// apps/portfolio/src/core/use-cases/filterProjectsByCategory.ts
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

## Capa 2: Features (Características)

**Ubicación**: `/src/features`

**Responsabilidad**: Implementación de características específicas del portfolio. Cada feature es una vertical slice con componentes, hooks, tipos y constantes.

**Contenido**:

- Componentes React específicos de la feature
- Custom hooks de la feature
- Tipos TypeScript de la feature
- Constantes de la feature

**Reglas**:

- ✅ Puede importar de `@/core` y `@/shared`
- ✅ Componentes con 'use client' si usan hooks de React
- ✅ Traducciones con `useTranslations('feature-name')`
- ❌ NO importar de otras features (evitar acoplamiento)
- ❌ NO lógica de negocio compleja (moverla a core/)

### Ejemplo: Feature Structure

```
/src/features/projects/
├── ProjectsSection.tsx        # Componente principal
├── ProjectCard.tsx            # Componente de tarjeta
├── ProjectFilters.tsx         # Componente de filtros
├── types.ts                   # Tipos específicos de la feature
└── constants.ts               # Constantes de la feature
```

### Ejemplo: Feature Component

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

## Capa 3: Shared (Compartida)

**Ubicación**: `/src/shared`

**Responsabilidad**: Código reutilizable por múltiples features.

**Contenido**:

- `/components/ui`: Componentes atómicos (Button, Card, Modal, etc.)
- `/components/layout`: Layout components (Navbar, Footer)
- `/hooks`: Custom hooks reutilizables
- `/utils`: Funciones de utilidad
- `/constants`: Constantes globales del proyecto

**Reglas**:

- ✅ Puede importar de `@/core`
- ✅ Componentes UI genéricos y reutilizables
- ✅ Sin dependencias de features específicas
- ❌ NO importar de `/features`
- ❌ NO lógica de negocio (moverla a core/)

### Ejemplo: Shared UI Component

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

### Ejemplo: Shared Hook

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

El proyecto usa path aliases para imports limpios:

```typescript
@/core/*        → ./src/core/*
@/features/*    → ./src/features/*
@/shared/*      → ./src/shared/*
@/app/*         → ./app/*
@/i18n/*        → ./src/i18n/*
@/messages/*    → ./messages/*
```

**Uso recomendado**:

```typescript
// ✅ CORRECTO: Usa path aliases
import { Project } from '@/core/entities/Project';
import { Button } from '@/shared/components/ui/Button';
import { ProjectCard } from '@/features/projects/ProjectCard';

// ❌ EVITAR: Imports relativos largos
import { Project } from '../../../core/entities/Project';
import { Button } from '../../shared/components/ui/Button';
```

## Validación de Arquitectura

### Checklist para Core Layer

- [ ] ¿El archivo está en `apps/portfolio/src/core`?
- [ ] ¿Solo usa TypeScript puro (sin React, Next.js, etc.)?
- [ ] ¿No tiene side effects (API calls, localStorage)?
- [ ] ¿Es 100% testeable sin mocks?
- [ ] ¿La entidad tiene validación en el constructor?
- [ ] ¿El use case es una función pura?

### Checklist para Features Layer

- [ ] ¿El archivo está en `apps/portfolio/src/features/[feature-name]`?
- [ ] ¿Solo importa de `@/core` y `@/shared`?
- [ ] ¿NO importa de otras features?
- [ ] ¿Tiene 'use client' si usa hooks de React?
- [ ] ¿Usa `useTranslations('[feature-name]')` para i18n?
- [ ] ¿La lógica de negocio está en core/?

### Checklist para Shared Layer

- [ ] ¿El archivo está en `apps/portfolio/src/shared`?
- [ ] ¿Solo importa de `@/core`?
- [ ] ¿NO importa de `/features`?
- [ ] ¿Es genérico y reutilizable?
- [ ] ¿No tiene dependencias de features específicas?

## Errores Comunes y Soluciones

### Error 1: Framework imports en core/

**❌ Incorrecto**:

```typescript
// src/core/entities/Project.ts
import { useState } from 'react';

export class Project {
  // ...
}
```

**✅ Correcto**:

```typescript
// src/core/entities/Project.ts
// Sin imports de frameworks

export class Project {
  // Solo TypeScript puro
}
```

### Error 2: Lógica de negocio en componentes

**❌ Incorrecto**:

```typescript
// src/features/contact/ContactForm.tsx
export function ContactForm() {
  const handleSubmit = (data: FormData) => {
    // ❌ Validación en el componente
    if (!data.email.includes('@')) {
      setError('Invalid email');
    }
  };
}
```

**✅ Correcto**:

```typescript
// apps/portfolio/src/core/use-cases/validateContactForm.ts
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

### Error 3: Imports circulares entre features

**❌ Incorrecto**:

```typescript
// src/features/projects/ProjectCard.tsx
import { ContactButton } from '@/features/contact/ContactButton';
```

**✅ Correcto**:

```typescript
// Mover ContactButton a shared si es reutilizable
// src/shared/components/ui/ContactButton.tsx
export function ContactButton() {
  /* ... */
}

// src/features/projects/ProjectCard.tsx
import { ContactButton } from '@/shared/components/ui/ContactButton';
```

## Best Practices

1. **Mantén core/ puro**: Sin framework dependencies, 100% testeable
2. **Features cohesivas**: Cada feature debe ser auto-contenida
3. **Shared genérico**: Solo componentes y utilidades verdaderamente reutilizables
4. **Path aliases**: Siempre usa `@/core`, `@/features`, `@/shared`
5. **Validación temprana**: Valida en constructores de entidades
6. **Funciones puras**: Use cases deben ser funciones puras sin side effects
7. **Single Responsibility**: Cada archivo tiene una única responsabilidad
8. **DRY con cuidado**: No crear abstracciones prematuras en shared/

## Referencias

- Clean Architecture (Robert C. Martin)
- DevPortfolio Architecture: Ver `/CLAUDE.md`
- Testing Strategy: Ver `.claude/architecture/testing-strategy.md`
- i18n Patterns: Ver `.claude/architecture/i18n-patterns.md`
