---
name: component-generator
description: Generate React components following DevPortfolio patterns with automatic scaffolding. Use when asked to create components, generate UI elements, scaffold new features, or create React components. Generates TypeScript components with proper structure, translations, tests, and animations.
allowed-tools: Read, Write, Grep, Glob, AskUserQuestion
---

## Purpose

Generate production-ready React components that follow DevPortfolio Clean Architecture, include proper TypeScript typing, i18n translations, Framer Motion animations, dark mode support, and test scaffolds.

---

## Component Types

### 1. Feature Components

**Location**: `src/features/[feature-name]/`
**Purpose**: Main feature sections (Hero, About, Skills, Projects, Contact, Blog)
**Characteristics**:

- `'use client'` directive (uses hooks)
- Framer Motion animations
- next-intl translations
- State management with hooks
- Imports from `@/core` and `@/shared`

### 2. UI Components

**Location**: `src/shared/components/ui/`
**Purpose**: Reusable atomic components (Button, Card, Input, Modal)
**Characteristics**:

- Variant support (primary, secondary, outline)
- Size support (sm, md, lg)
- Fully typed with TypeScript
- Accessibility built-in
- Dark mode support
- NO feature-specific logic

### 3. Layout Components

**Location**: `src/shared/components/layout/`
**Purpose**: Layout elements (Navigation, Footer, Header)
**Characteristics**:

- Used across multiple pages
- Responsive design
- Translation support
- Consistent styling

---

## Generation Process

### Step 1: Understand Requirements

**Questions to Ask**:

1. What type of component? (Feature / UI / Layout)
2. What is the purpose/functionality?
3. What props are needed?
4. Does it need state management?
5. Should it have animations?
6. Does it need translations?

**Example**:

```
User: "Generate a Modal component"

Claude asks:
- Should it support different sizes? (sm, md, lg)
- What animation style? (fade, slide, scale)
- Should it close on overlay click?
- Keyboard navigation (Esc to close)?
```

---

### Step 2: Generate Component Structure

#### Feature Component Template

```tsx
// src/features/[feature]/[Feature].tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion as m } from 'framer-motion';
import { useMemo, useState } from 'react';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';

export function [Feature]() {
  const t = useTranslations('[feature]');
  const [state, setState] = useState<StateType>(initialState);

  const computed = useMemo(() => {
    // Computed values
  }, [dependencies]);

  const handleAction = () => {
    // Event handlers
  };

  return (
    <m.section
      id="[feature]"
      className="min-h-screen py-20 px-6"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer(0.16)}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <m.div className="space-y-4" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('title')}
          </h2>
          <p className="text-lg text-foreground-secondary max-w-3xl">
            {t('subtitle')}
          </p>
        </m.div>

        {/* Content */}
        <m.div variants={fadeInUp}>
          {/* Component content */}
        </m.div>
      </div>
    </m.section>
  );
}
```

#### UI Component Template

```tsx
// src/shared/components/ui/[Component].tsx
import { cn } from '@/shared/utils/cn';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface [Component]Props extends ComponentPropsWithoutRef<'[element]'> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const [Component] = forwardRef<HTML[Element]Element, [Component]Props>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    return (
      <[element]
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-md font-medium',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          'disabled:opacity-50 disabled:cursor-not-allowed',

          // Variant styles
          variant === 'default' && 'bg-accent text-white hover:bg-accent/90',
          variant === 'outline' && 'border border-accent text-accent hover:bg-accent/10',
          variant === 'ghost' && 'text-foreground hover:bg-background-secondary',

          // Size styles
          size === 'sm' && 'text-sm px-3 py-1.5',
          size === 'md' && 'text-base px-4 py-2',
          size === 'lg' && 'text-lg px-6 py-3',

          className
        )}
        {...props}
      >
        {children}
      </[element]>
    );
  }
);

[Component].displayName = '[Component]';
```

---

### Step 3: Generate Translation Keys

**Spanish (messages/es.json)**:

```json
{
  "[feature]": {
    "title": "[Título en español]",
    "subtitle": "[Subtítulo en español]",
    "action": "[Acción en español]",
    "description": "[Descripción en español]"
  }
}
```

**English (messages/en.json)**:

```json
{
  "[feature]": {
    "title": "[English Title]",
    "subtitle": "[English Subtitle]",
    "action": "[English Action]",
    "description": "[English Description]"
  }
}
```

---

### Step 4: Generate Test Scaffold

```typescript
// tests/features/[feature]/[Feature].test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { [Feature] } from '@/features/[feature]/[Feature]';
import messages from '@/messages/es.json';

describe('[Feature] Component', () => {
  const render[Feature] = () => {
    return render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <[Feature] />
      </NextIntlClientProvider>
    );
  };

  describe('Rendering', () => {
    it('renders component title', () => {
      render[Feature]();
      expect(screen.getByRole('heading', { name: /[title]/i })).toBeInTheDocument();
    });

    it('renders component content', () => {
      render[Feature]();
      // Add specific content checks
    });
  });

  describe('User Interactions', () => {
    it('handles user action', async () => {
      const user = userEvent.setup();
      render[Feature]();

      // Test interaction
      const button = screen.getByRole('button', { name: /[action]/i });
      await user.click(button);

      // Verify result
      expect(/* assertion */).toBe(true);
    });
  });

  describe('Translations', () => {
    it('displays Spanish translations', () => {
      render[Feature]();
      expect(screen.getByText(/[spanish text]/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible heading', () => {
      render[Feature]();
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render[Feature]();

      await user.tab();
      // Verify focus state
    });
  });
});
```

---

## Component Examples

### Example 1: Modal Component

```tsx
// src/shared/components/ui/Modal.tsx
'use client';

import { cn } from '@/shared/utils/cn';
import { motion as m, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  // Close on Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <m.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <m.div
              className={cn(
                'bg-background rounded-lg shadow-xl',
                'max-h-[90vh] overflow-y-auto',
                'w-full',
                size === 'sm' && 'max-w-md',
                size === 'md' && 'max-w-2xl',
                size === 'lg' && 'max-w-4xl'
              )}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {title && (
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                </div>
              )}

              {/* Content */}
              <div className="px-6 py-4">{children}</div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
```

**Usage**:

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings" size="md">
  <p>Modal content here</p>
</Modal>;
```

---

### Example 2: Card Component

```tsx
// src/shared/components/ui/Card.tsx
import { cn } from '@/shared/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export function Card({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-background',
        'shadow-sm hover:shadow-md',
        'transition-shadow duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('p-6 pb-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3 className={cn('text-2xl font-semibold text-foreground', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: ComponentPropsWithoutRef<'p'>) {
  return (
    <p className={cn('text-sm text-foreground-secondary mt-1', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('p-6 pt-3', className)} {...props}>
      {children}
    </div>
  );
}
```

**Usage**:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>Project description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

---

### Example 3: Blog Feature Component

```tsx
// src/features/blog/Blog.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion as m } from 'framer-motion';
import { useMemo, useState } from 'react';
import { BlogList } from './BlogList';
import { BlogPost } from '@/core/entities/BlogPost';
import { filterPostsByTag, getAllTags } from '@/core/use-cases/blogPosts';
import { blogPosts } from '@/shared/constants/blog';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';
import { Button } from '@/shared/components/ui/Button';

export function Blog() {
  const t = useTranslations('blog');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => getAllTags(blogPosts), []);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return blogPosts;
    return filterPostsByTag(blogPosts, selectedTag);
  }, [selectedTag]);

  return (
    <m.section
      id="blog"
      className="min-h-screen py-20 px-6 bg-background"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer(0.16)}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <m.div className="space-y-4" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">{t('title')}</h2>
          <p className="text-lg text-foreground-secondary max-w-3xl">{t('subtitle')}</p>
        </m.div>

        <m.div className="flex flex-wrap gap-3" variants={fadeInUp}>
          <Button
            variant={selectedTag === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(null)}
          >
            {t('allPosts', { count: blogPosts.length })}
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </m.div>

        <BlogList posts={filteredPosts} />
      </div>
    </m.section>
  );
}
```

---

## Component Generation Checklist

### For Feature Components

- [ ] Create main component file in `src/features/[feature]/[Feature].tsx`
- [ ] Add `'use client'` directive (if using hooks)
- [ ] Import and use `useTranslations()` hook
- [ ] Add Framer Motion animations (fadeInUp, staggerContainer)
- [ ] Create child components as needed
- [ ] Add TypeScript interfaces for props
- [ ] Implement responsive design (mobile-first)
- [ ] Add dark mode support (`dark:` classes)
- [ ] Create corresponding test file in `tests/features/[feature]/`
- [ ] Add translation keys to `messages/es.json` and `messages/en.json`
- [ ] Export component from feature directory

### For UI Components

- [ ] Create component file in `src/shared/components/ui/[Component].tsx`
- [ ] Add variant support (default, outline, ghost, etc.)
- [ ] Add size support (sm, md, lg)
- [ ] Use `forwardRef` for ref forwarding
- [ ] Add `displayName` for better debugging
- [ ] Use `cn()` utility for conditional classes
- [ ] Add proper TypeScript interfaces
- [ ] Ensure accessibility (ARIA labels, keyboard nav)
- [ ] Add dark mode support
- [ ] Create test file in `tests/shared/components/ui/`
- [ ] Export component

### For Layout Components

- [ ] Create component file in `src/shared/components/layout/[Component].tsx`
- [ ] Add `'use client'` if needed (navigation often needs it)
- [ ] Use `useTranslations()` for text
- [ ] Ensure responsive design
- [ ] Add proper semantic HTML (nav, footer, header)
- [ ] Add ARIA landmarks
- [ ] Create test file in `tests/shared/components/layout/`

---

## Translation Keys Template

When generating components, always include translation keys:

```json
{
  "[feature]": {
    "title": "[Title]",
    "subtitle": "[Subtitle]",
    "description": "[Description]",
    "action": "[Action text]",
    "cancel": "Cancelar",
    "save": "Guardar",
    "close": "Cerrar",
    "loading": "Cargando...",
    "error": "Error",
    "success": "Éxito",
    "noResults": "No hay resultados",
    "readMore": "Leer más"
  }
}
```

---

## Styling Patterns

### Responsive Design

```tsx
<div
  className="
  px-4 py-6              // Mobile
  sm:px-6 sm:py-8        // Tablet
  md:px-8 md:py-10       // Desktop
  lg:px-10 lg:py-12      // Large
  xl:px-12 xl:py-16      // XL
"
>
  Content
</div>
```

### Dark Mode

```tsx
<div
  className="
  bg-gray-100 dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-gray-300 dark:border-gray-700
"
>
  Content
</div>
```

### Hover States

```tsx
<button
  className="
  bg-accent text-white
  hover:bg-accent/90
  hover:shadow-lg
  transition-all duration-200
"
>
  Button
</button>
```

### Focus States

```tsx
<button
  className="
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-accent
  focus-visible:ring-offset-2
"
>
  Button
</button>
```

---

## Animation Patterns

### Fade In Up

```tsx
import { motion as m } from 'framer-motion';

<m.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</m.div>;
```

### Stagger Children

```tsx
import { motion as m } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/shared/utils/motion';

<m.div variants={staggerContainer(0.12)}>
  <m.div variants={fadeInUp}>Child 1</m.div>
  <m.div variants={fadeInUp}>Child 2</m.div>
  <m.div variants={fadeInUp}>Child 3</m.div>
</m.div>;
```

### Hover Animation

```tsx
<m.div whileHover={{ scale: 1.05, y: -5 }}>Card content</m.div>
```

---

## Generated Files Summary

When generating a component, provide summary:

```
✅ Component Generated: [ComponentName]

Files Created:
  ✅ src/features/[feature]/[Component].tsx ([XXX] lines)
  ✅ tests/features/[feature]/[Component].test.tsx ([XXX] lines)

Files Updated:
  ✅ messages/es.json (+[N] keys)
  ✅ messages/en.json (+[N] keys)

Component Features:
  ✅ TypeScript interfaces
  ✅ Framer Motion animations
  ✅ next-intl translations (ES/EN)
  ✅ Dark mode support
  ✅ Responsive design (mobile-first)
  ✅ Accessibility (ARIA, keyboard nav)
  ✅ Test scaffold (80%+ coverage template)

Next Steps:
  1. Review generated component
  2. Customize styling/behavior as needed
  3. Run tests: npm test [Component].test.tsx
  4. Import and use: import { [Component] } from '@/features/[feature]/[Component]'
```

---

## Component Generation Tips

1. **Always ask clarifying questions** before generating
2. **Follow existing patterns** in the project
3. **Include proper TypeScript types** (no `any`)
4. **Add translations for all text** (ES + EN)
5. **Include test scaffold** (even if basic)
6. **Use `cn()` utility** for conditional classes
7. **Add dark mode support** by default
8. **Ensure accessibility** (ARIA labels, keyboard nav)
9. **Mobile-first responsive** design
10. **Include JSDoc comments** for complex props

---

**Skill Version**: 1.0.0
**Last Updated**: 2025-12-10
**Target Project**: DevPortfolio (Next.js 15 + React 19 + TypeScript 5)
