---
name: feature-planner
description: Analyze feature documentation (PDF, markdown, or requirements) and create comprehensive implementation plans for DevPortfolio features. Use when asked to create implementation plans, analyze feature requirements, plan new sections, or design features. Generates detailed phase-by-phase plans with entity design, core layer, components, hooks, styling, i18n, and testing checklists.
allowed-tools: Read, Grep, Glob, AskUserQuestion, WebFetch
---

## Purpose

Analyze feature documentation and create a comprehensive, structured implementation plan that adheres to DevPortfolio Clean Architecture, Next.js 15 best practices, and project standards (80%+ test coverage, i18n ES/EN, TypeScript strict).

---

## DevPortfolio Architecture Reference

### Project Overview

**DevPortfolio**: Personal portfolio website for Ángel Hidalgo Barreiro, full-stack developer specializing in SaaS, scalable architectures, and DevOps.

**Tech Stack**:
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4
- **i18n**: next-intl (ES default, EN support)
- **Animations**: Framer Motion
- **Testing**: Vitest + React Testing Library (80%+ coverage REQUIRED)
- **Forms**: React Hook Form + Zod validation
- **Email**: Nodemailer (API routes)
- **Fonts**: JetBrains Mono via next/font
- **Theme**: next-themes (warm color palette: beige/brown)

**Core Features**: Hero section, professional timeline, skills visualization, 10 projects showcase with filtering, contact form with serverless API, GitHub stats integration.

### Directory Structure

```
DevPortfolio/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # i18n routes (es, en)
│   │   ├── layout.tsx             # Root layout with providers
│   │   ├── page.tsx               # Homepage (integrates all features)
│   │   ├── providers.tsx          # Client providers (Theme, Motion)
│   │   └── projects/[slug]/       # Dynamic project detail pages
│   │       └── page.tsx
│   ├── api/                       # Serverless API routes
│   │   └── contact/
│   │       └── route.ts           # Contact form API
│   ├── globals.css                # Global styles, theme variables
│   ├── robots.ts                  # SEO robots configuration
│   └── sitemap.ts                 # Dynamic sitemap generation
│
├── src/
│   ├── core/                      # 🎯 Domain Layer - Pure business logic
│   │   ├── entities/              # Domain entities (Project, Contact)
│   │   │   ├── Project.ts
│   │   │   └── Contact.ts
│   │   └── use-cases/             # Pure functions, fully testable
│   │
│   ├── features/                  # 📦 Features Layer - Vertical slices
│   │   ├── hero/
│   │   │   └── Hero.tsx
│   │   ├── about/
│   │   │   └── About.tsx
│   │   ├── skills/
│   │   │   └── Skills.tsx
│   │   ├── projects/
│   │   │   └── Projects.tsx
│   │   └── contact/
│   │       └── Contact.tsx
│   │
│   ├── shared/                    # 🔧 Shared Layer - Reusable code
│   │   ├── components/
│   │   │   ├── ui/                # Button, Card, Input (atomic)
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Input.tsx
│   │   │   └── layout/            # Navigation, Footer
│   │   │       ├── Navigation.tsx
│   │   │       └── Footer.tsx
│   │   ├── hooks/                 # Custom hooks
│   │   │   └── useScrollSpy.tsx
│   │   ├── utils/                 # Utility functions
│   │   │   ├── cn.ts              # className merger
│   │   │   └── motion.ts          # Framer Motion helpers
│   │   ├── constants/             # Portfolio data
│   │   │   ├── projects.ts
│   │   │   ├── skills.ts
│   │   │   └── personal.ts
│   │   ├── providers/
│   │   │   └── MotionProvider.tsx
│   │   └── services/
│   │       └── email.ts           # Email service
│   │
│   └── i18n/                      # i18n configuration
│       ├── config.ts
│       ├── routing.ts
│       ├── request.ts
│       └── navigation.ts
│
├── messages/                      # Translation files
│   ├── es.json                    # Spanish (default)
│   └── en.json                    # English
│
├── tests/                         # Test files (mirrors src/ structure)
│   ├── core/
│   │   └── entities/
│   │       └── Project.test.ts
│   ├── features/
│   │   └── hero/
│   │       └── Hero.test.tsx
│   └── setup.ts                   # Vitest setup (RTL, jsdom)
│
├── public/                        # Static assets
│   └── cv/
│       └── Angel_Hidalgo_CV.pdf
│
├── CLAUDE.md                      # Project documentation
├── vitest.config.ts               # Vitest configuration
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
└── tsconfig.json                  # TypeScript configuration
```

### Clean Architecture - Dependency Rule (CRITICAL)

**Dependencies MUST flow inward only**:

```
app/ (App Router)
  ↓ imports
features/ (Features Layer)
  ↓ imports
shared/ (Shared Layer)
  ↓ imports
core/ (Domain Layer)
  ↓ imports
  NOTHING (pure TypeScript only)
```

**Rules**:
- ✅ `app/` → can import from `features/`, `shared/`, `core/`
- ✅ `features/` → can import from `shared/` and `core/`
- ✅ `shared/` → can import from `core/`
- ❌ `core/` → CANNOT import from ANYWHERE (pure TypeScript only, NO React, NO Next.js)

**Violations**:
```typescript
// ❌ CRITICAL VIOLATION: Framework import in core/
// src/core/entities/Project.ts
import { useState } from 'react';  // ❌ FORBIDDEN

// ✅ CORRECT: Pure TypeScript only
export class Project {
  // Pure TypeScript implementation
}
```

### Path Aliases

Configured in `tsconfig.json` and `vitest.config.ts`:

```typescript
"paths": {
  "@/*": ["./*"],
  "@/core/*": ["./src/core/*"],
  "@/features/*": ["./src/features/*"],
  "@/shared/*": ["./src/shared/*"],
  "@/app/*": ["./app/*"],
  "@/i18n/*": ["./src/i18n/*"],
  "@/messages/*": ["./messages/*"]
}
```

**Usage**:
```typescript
import { Project } from '@/core/entities/Project';
import { Hero } from '@/features/hero/Hero';
import { Button } from '@/shared/components/ui/Button';
import { cn } from '@/shared/utils/cn';
```

### i18n Translation Pattern (CRITICAL)

**ALL user-facing text MUST use next-intl translation system.**

#### Client Component Pattern

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('myComponent');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('submit')}</button>
    </div>
  );
}
```

#### Server Component Pattern

```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('page');

  return <h1>{t('title')}</h1>;
}
```

#### Translation Files Structure

**messages/es.json** (default locale):
```json
{
  "myComponent": {
    "title": "Mi Título",
    "description": "Descripción del componente",
    "submit": "Enviar"
  }
}
```

**messages/en.json**:
```json
{
  "myComponent": {
    "title": "My Title",
    "description": "Component description",
    "submit": "Submit"
  }
}
```

#### Translation with Variables

```tsx
const t = useTranslations('blog');

// Usage
<p>{t('publishedOn', { date: formattedDate })}</p>
<span>{t('readTime', { minutes: 5 })}</span>
```

```json
{
  "blog": {
    "publishedOn": "Publicado el {date}",
    "readTime": "{minutes} min de lectura"
  }
}
```

#### Rich Text Translation

```tsx
<p>
  {t.rich('privateNotice.text', {
    linkLabel: t('privateNotice.linkLabel'),
    link: (chunks) => (
      <a href="/contact" className="text-accent underline">
        {chunks}
      </a>
    ),
  })}
</p>
```

**Violations**:
```tsx
// ❌ CRITICAL: Hardcoded text (any language)
<h1>Welcome to my portfolio</h1>
<button>Enviar</button>
<p>Read more...</p>

// ✅ CORRECT: All text translated
const t = useTranslations('home');
<h1>{t('welcome')}</h1>
<button>{t('submit')}</button>
<p>{t('readMore')}</p>
```

### Testing Requirements (CRITICAL)

**Coverage Thresholds**: 80% minimum (lines, functions, branches, statements)

**Configured in `vitest.config.ts`**:
```typescript
coverage: {
  provider: 'v8',
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 80,
    statements: 80,
  },
}
```

#### Test Structure

Tests mirror `src/` structure in `tests/` directory:

```
tests/
├── core/
│   └── entities/
│       └── Project.test.ts       # Entity tests
├── features/
│   └── hero/
│       └── Hero.test.tsx          # Component tests
└── shared/
    ├── hooks/
    │   └── useScrollSpy.test.tsx  # Hook tests
    └── utils/
        └── cn.test.ts             # Utility tests
```

#### Entity Test Pattern (Core Layer)

```typescript
// tests/core/entities/Project.test.ts
import { describe, it, expect } from 'vitest';
import { Project, ProjectData } from '@/core/entities/Project';

describe('Project Entity', () => {
  const validProjectData: ProjectData = {
    id: 'verifacturgmn',
    title: 'VerifacturGMN',
    description: 'Sistema de facturación electrónica',
    categoryId: 'billing',
    tech: ['PHP', 'Symfony', 'MySQL'],
    detailSlug: 'verifacturgmn',
    links: { github: 'https://github.com/...' },
  };

  describe('Constructor', () => {
    it('creates project with valid data', () => {
      const project = new Project(validProjectData);

      expect(project.id).toBe('verifacturgmn');
      expect(project.title).toBe('VerifacturGMN');
      expect(project.tech).toHaveLength(3);
    });

    it('throws error when title is empty', () => {
      const invalidData = { ...validProjectData, title: '' };

      expect(() => new Project(invalidData)).toThrow('Title is required');
    });

    it('validates categoryId is valid', () => {
      const invalidData = { ...validProjectData, categoryId: 'invalid' as any };

      expect(() => new Project(invalidData)).toThrow();
    });
  });

  describe('Methods', () => {
    it('hasTag() returns true when tag exists', () => {
      const project = new Project(validProjectData);

      expect(project.hasTag('PHP')).toBe(true);
      expect(project.hasTag('Symfony')).toBe(true);
    });

    it('hasTag() is case-insensitive', () => {
      const project = new Project(validProjectData);

      expect(project.hasTag('php')).toBe(true);
      expect(project.hasTag('SYMFONY')).toBe(true);
    });
  });
});
```

#### Component Test Pattern (Features Layer)

```typescript
// tests/features/hero/Hero.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { Hero } from '@/features/hero/Hero';
import messages from '@/messages/es.json';

describe('Hero Component', () => {
  const renderHero = () => {
    return render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );
  };

  describe('Rendering', () => {
    it('renders hero title', () => {
      renderHero();
      expect(screen.getByRole('heading', { name: /desarrollador/i })).toBeInTheDocument();
    });

    it('renders professional tagline', () => {
      renderHero();
      expect(screen.getByText(/saas/i)).toBeInTheDocument();
    });

    it('renders CV download button', () => {
      renderHero();
      const downloadButton = screen.getByRole('link', { name: /descargar cv/i });
      expect(downloadButton).toBeInTheDocument();
      expect(downloadButton).toHaveAttribute('href', expect.stringContaining('.pdf'));
    });
  });

  describe('Translations', () => {
    it('displays Spanish translations by default', () => {
      renderHero();
      expect(screen.getByText(/desarrollador/i)).toBeInTheDocument();
    });

    it('displays English translations when locale is en', () => {
      render(
        <NextIntlClientProvider locale="en" messages={messagesEn}>
          <Hero />
        </NextIntlClientProvider>
      );
      expect(screen.getByText(/developer/i)).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('handles CV download click', async () => {
      const user = userEvent.setup();
      renderHero();

      const downloadLink = screen.getByRole('link', { name: /descargar cv/i });
      await user.click(downloadLink);

      // Link should open in new tab
      expect(downloadLink).toHaveAttribute('target', '_blank');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      renderHero();
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      renderHero();

      await user.tab();
      const downloadLink = screen.getByRole('link', { name: /descargar cv/i });
      expect(downloadLink).toHaveFocus();
    });
  });
});
```

#### API Route Test Pattern

```typescript
// tests/api/contact/route.test.ts
import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/contact/route';

describe('Contact API Route', () => {
  it('returns 400 when email is invalid', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('sends email when data is valid', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
```

### Styling Guidelines

#### Tailwind Utility Classes

**Color Palette** (warm tones - beige/brown):
```css
/* Light mode */
--background: #faf8f5;
--foreground: #2d2520;
--accent: #d4733f;

/* Dark mode */
--background: #1c1410;
--foreground: #f5f1eb;
--accent: #e88556;
```

**Usage**:
```tsx
<div className="bg-background text-foreground">
  <button className="bg-accent text-white hover:bg-accent/90">
    Click me
  </button>
</div>
```

#### Responsive Design (Mobile-First)

```tsx
<div className="
  px-4 py-6           // Mobile
  md:px-6 md:py-8     // Tablet
  lg:px-8 lg:py-12    // Desktop
  xl:px-12 xl:py-16   // Large Desktop
">
  Content
</div>
```

#### Dark Mode Support

```tsx
<div className="
  bg-gray-100 dark:bg-gray-900
  text-gray-900 dark:text-gray-100
">
  Supports dark mode
</div>
```

#### cn() Utility for Conditional Classes

```typescript
import { cn } from '@/shared/utils/cn';

<button
  className={cn(
    'px-4 py-2 rounded-md transition-colors',
    variant === 'primary' && 'bg-accent text-white',
    variant === 'secondary' && 'bg-gray-200 text-gray-900',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Button
</button>
```

### Framer Motion Patterns

#### Standard Animations

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### Motion Utilities

```typescript
// src/shared/utils/motion.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Usage
<motion.section
  variants={staggerContainer(0.12, 0.2)}
  initial="initial"
  whileInView="animate"
>
  <motion.div variants={fadeInUp}>Child 1</motion.div>
  <motion.div variants={fadeInUp}>Child 2</motion.div>
</motion.section>
```

---

## Implementation Phases

When creating implementation plans, follow these 8 phases in order:

### Phase 1: Entity & Type Design

**Estimated Time**: 1-3 hours (depending on complexity)

**Purpose**: Design TypeScript interfaces, types, and domain entities that represent the core business logic.

**Tasks**:
1. Define TypeScript interfaces for data structures
2. Create domain entity classes (if business logic needed)
3. Design validation rules with Zod schemas (if forms)
4. Identify relationships and constraints
5. Document entity responsibilities

**Location**: `src/core/entities/`

**CRITICAL**:
- ✅ Entities are PURE TypeScript (no React, no Next.js imports)
- ✅ All validation logic in entity constructor
- ✅ Immutable properties (readonly)
- ✅ Methods for business logic only
- ❌ NO framework dependencies

**Template**:

```typescript
// src/core/entities/BlogPost.ts

/**
 * BlogPost Data Interface
 * Describes the raw data structure
 */
export interface BlogPostData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: Date;
  tags: string[];
  author: string;
  readingTimeMinutes: number;
}

/**
 * BlogPost Entity
 * Domain entity with validation and business logic
 */
export class BlogPost {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly excerpt: string;
  readonly publishedAt: Date;
  readonly tags: string[];
  readonly author: string;
  readonly readingTimeMinutes: number;

  constructor(data: BlogPostData) {
    // Validation in constructor
    this.validate(data);

    // Assign properties
    this.id = data.id;
    this.title = data.title.trim();
    this.content = data.content;
    this.excerpt = data.excerpt || this.generateExcerpt(data.content);
    this.publishedAt = data.publishedAt;
    this.tags = data.tags;
    this.author = data.author;
    this.readingTimeMinutes = data.readingTimeMinutes;
  }

  /**
   * Validate entity data
   */
  private validate(data: BlogPostData): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Blog post title is required');
    }

    if (data.title.length > 100) {
      throw new Error('Blog post title must be 100 characters or less');
    }

    if (!data.content || data.content.length < 50) {
      throw new Error('Blog post content must be at least 50 characters');
    }

    if (!data.publishedAt || !(data.publishedAt instanceof Date)) {
      throw new Error('Valid publish date is required');
    }

    if (!data.tags || data.tags.length === 0) {
      throw new Error('Blog post must have at least one tag');
    }
  }

  /**
   * Generate excerpt from content
   */
  private generateExcerpt(content: string, length: number = 150): string {
    if (content.length <= length) {
      return content;
    }
    return content.substring(0, length).trim() + '...';
  }

  /**
   * Check if post is recent (published within last 30 days)
   */
  get isRecent(): boolean {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return this.publishedAt >= thirtyDaysAgo;
  }

  /**
   * Check if post has a specific tag
   */
  hasTag(tag: string): boolean {
    return this.tags.some(t => t.toLowerCase() === tag.toLowerCase());
  }

  /**
   * Get formatted publish date
   */
  getFormattedDate(locale: string = 'es'): string {
    return this.publishedAt.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Convert to plain object (for serialization)
   */
  toJSON(): BlogPostData {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      excerpt: this.excerpt,
      publishedAt: this.publishedAt,
      tags: this.tags,
      author: this.author,
      readingTimeMinutes: this.readingTimeMinutes,
    };
  }
}
```

**Checklist**:
- [ ] Define `[Entity]Data` interface
- [ ] Create `[Entity]` class with readonly properties
- [ ] Implement validation in constructor
- [ ] Add business logic methods (if applicable)
- [ ] Add getter methods for computed properties
- [ ] Implement `toJSON()` for serialization
- [ ] Document with JSDoc comments

---

### Phase 2: Core Layer (Use Cases)

**Estimated Time**: 2-4 hours

**Purpose**: Create pure functions that contain business logic and orchestrate entities.

**Tasks**:
1. Identify use-cases for the feature
2. Create pure functions (input → output, no side effects)
3. Add filtering, sorting, transformation logic
4. Ensure full testability (no framework dependencies)
5. Document use-case purpose and parameters

**Location**: `src/core/use-cases/`

**CRITICAL**:
- ✅ Pure functions only (deterministic)
- ✅ NO side effects (API calls, localStorage, etc.)
- ✅ Fully testable with unit tests
- ❌ NO React hooks
- ❌ NO framework dependencies

**Template**:

```typescript
// src/core/use-cases/blogPosts.ts

import { BlogPost } from '@/core/entities/BlogPost';

/**
 * Filter blog posts by tag
 * @param posts - Array of blog posts
 * @param tag - Tag to filter by
 * @returns Filtered array of posts
 */
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  if (!tag || tag.trim() === '') {
    return posts;
  }

  return posts.filter(post => post.hasTag(tag));
}

/**
 * Get recent blog posts (published within last 30 days)
 * @param posts - Array of blog posts
 * @returns Array of recent posts
 */
export function getRecentPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(post => post.isRecent);
}

/**
 * Sort blog posts by publish date (newest first)
 * @param posts - Array of blog posts
 * @returns Sorted array of posts
 */
export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    return b.publishedAt.getTime() - a.publishedAt.getTime();
  });
}

/**
 * Get all unique tags from blog posts
 * @param posts - Array of blog posts
 * @returns Array of unique tags
 */
export function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>();

  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/**
 * Calculate total reading time for posts
 * @param posts - Array of blog posts
 * @returns Total reading time in minutes
 */
export function calculateTotalReadingTime(posts: BlogPost[]): number {
  return posts.reduce((total, post) => total + post.readingTimeMinutes, 0);
}

/**
 * Search blog posts by title or content
 * @param posts - Array of blog posts
 * @param query - Search query string
 * @returns Array of matching posts
 */
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  if (!query || query.trim() === '') {
    return posts;
  }

  const lowerQuery = query.toLowerCase();

  return posts.filter(post => {
    return (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery)
    );
  });
}
```

**Checklist**:
- [ ] Create use-case functions in `src/core/use-cases/`
- [ ] Ensure functions are pure (no side effects)
- [ ] Add JSDoc documentation
- [ ] Export all functions
- [ ] NO framework imports (pure TypeScript)

---

### Phase 3: Feature Layer (React Components)

**Estimated Time**: 4-8 hours (depending on complexity)

**Purpose**: Create React components that compose the feature UI and integrate business logic.

**Tasks**:
1. Create main feature component
2. Implement component logic with hooks
3. Add translation integration (next-intl)
4. Set up state management (useState, useReducer)
5. Add animations (Framer Motion)
6. Integrate use-cases from core layer
7. Add proper TypeScript interfaces for props

**Location**: `src/features/[feature-name]/`

**CRITICAL**:
- ✅ Use `'use client'` directive if hooks or interactivity
- ✅ All text uses `useTranslations()` hook
- ✅ Import entities and use-cases from `@/core`
- ✅ TypeScript interfaces for all props
- ❌ NO business logic in components (keep in core/)
- ❌ NO hardcoded strings (use translations)

**Template - Main Feature Component**:

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

  // Get all available tags
  const allTags = useMemo(() => getAllTags(blogPosts), []);

  // Filter posts by selected tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) {
      return blogPosts;
    }
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
        {/* Header */}
        <m.div className="space-y-4" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('title')}
          </h2>
          <p className="text-lg text-foreground-secondary max-w-3xl">
            {t('subtitle')}
          </p>
        </m.div>

        {/* Tag Filters */}
        <m.div className="flex flex-wrap gap-3" variants={fadeInUp}>
          <Button
            variant={selectedTag === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(null)}
          >
            {t('allPosts', { count: blogPosts.length })}
          </Button>
          {allTags.map(tag => (
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

        {/* Posts List */}
        <BlogList posts={filteredPosts} />
      </div>
    </m.section>
  );
}
```

**Template - Child Component**:

```tsx
// src/features/blog/BlogList.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion as m } from 'framer-motion';
import { BlogPost } from '@/core/entities/BlogPost';
import { BlogCard } from './BlogCard';
import { fadeInUp, staggerContainer } from '@/shared/utils/motion';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const t = useTranslations('blog');

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-foreground-secondary">
          {t('noPosts')}
        </p>
      </div>
    );
  }

  return (
    <m.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer(0.12, 0.2)}
    >
      {posts.map(post => (
        <m.article key={post.id} variants={fadeInUp}>
          <BlogCard post={post} />
        </m.article>
      ))}
    </m.div>
  );
}
```

**Template - Card Component**:

```tsx
// src/features/blog/BlogCard.tsx
'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { BlogPost } from '@/core/entities/BlogPost';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/Card';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const locale = useLocale();
  const t = useTranslations('blog');

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <time className="text-sm text-foreground-secondary">
            {post.getFormattedDate(locale)}
          </time>
          {post.isRecent && (
            <span className="px-2 py-1 text-xs font-semibold bg-accent/20 text-accent rounded">
              {t('new')}
            </span>
          )}
        </div>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-background-secondary rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/blog/${post.id}`}
            className="text-accent hover:underline font-medium"
          >
            {t('readMore')} →
          </Link>
        </div>
        <p className="text-xs text-foreground-secondary mt-2">
          {t('readTime', { minutes: post.readingTimeMinutes })}
        </p>
      </CardContent>
    </Card>
  );
}
```

**Checklist**:
- [ ] Create main feature component in `src/features/[feature]/`
- [ ] Add `'use client'` directive if using hooks
- [ ] Implement `useTranslations()` for all text
- [ ] Create child components as needed
- [ ] Add TypeScript interfaces for all props
- [ ] Integrate use-cases from core layer
- [ ] Add Framer Motion animations
- [ ] Ensure responsive design (mobile-first)
- [ ] Add dark mode support

---

### Phase 4: UI Components (Shared Layer)

**Estimated Time**: 2-4 hours

**Purpose**: Create reusable, atomic UI components used across features.

**Tasks**:
1. Identify reusable UI patterns
2. Create atomic components (Button, Card, Input)
3. Add variant support (primary, secondary, outline, etc.)
4. Add size support (sm, md, lg)
5. Ensure accessibility (ARIA labels, keyboard navigation)
6. Add dark mode support

**Location**: `src/shared/components/ui/`

**CRITICAL**:
- ✅ Reusable across multiple features
- ✅ Fully typed with TypeScript
- ✅ Accessibility built-in
- ✅ Dark mode support
- ❌ NO feature-specific logic

**Template - Button Component**:

```tsx
// src/shared/components/ui/Button.tsx
import { cn } from '@/shared/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
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
    </button>
  );
}
```

**Template - Card Component**:

```tsx
// src/shared/components/ui/Card.tsx
import { cn } from '@/shared/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export function Card({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-background',
        'shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('p-6 pb-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      className={cn('text-2xl font-semibold text-foreground', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={cn('text-sm text-foreground-secondary mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('p-6 pt-3', className)} {...props}>
      {children}
    </div>
  );
}
```

**Checklist**:
- [ ] Create UI components in `src/shared/components/ui/`
- [ ] Add variant and size props
- [ ] Use `cn()` utility for conditional classes
- [ ] Add proper TypeScript types
- [ ] Ensure accessibility (ARIA, keyboard nav)
- [ ] Add dark mode support
- [ ] Test in multiple contexts

---

### Phase 5: Client Interactions (Hooks & State)

**Estimated Time**: 2-4 hours

**Purpose**: Implement client-side interactivity with React hooks and state management.

**Tasks**:
1. Create custom hooks for reusable logic
2. Implement state management (useState, useReducer)
3. Add side effects (useEffect)
4. Handle form submissions
5. Add loading and error states
6. Implement debouncing/throttling if needed

**Location**: `src/shared/hooks/` or within feature components

**CRITICAL**:
- ✅ Follow Rules of Hooks
- ✅ Extract reusable logic into custom hooks
- ✅ Properly handle cleanup in useEffect
- ❌ NO business logic in hooks (keep in core/)

**Template - Custom Hook**:

```tsx
// src/shared/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**Template - Form Hook**:

```tsx
// src/features/contact/hooks/useContactForm.ts
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormState {
  data: FormData;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

export function useContactForm() {
  const t = useTranslations('contact');
  const [state, setState] = useState<FormState>({
    data: { name: '', email: '', message: '' },
    isSubmitting: false,
    error: null,
    success: false,
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      error: null,
    }));
  };

  const handleSubmit = async () => {
    setState(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.data),
      });

      if (!response.ok) {
        throw new Error(t('errors.submitFailed'));
      }

      setState(prev => ({
        ...prev,
        isSubmitting: false,
        success: true,
        data: { name: '', email: '', message: '' },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: error instanceof Error ? error.message : t('errors.unknown'),
      }));
    }
  };

  return {
    ...state,
    handleChange,
    handleSubmit,
  };
}
```

**Checklist**:
- [ ] Create custom hooks in `src/shared/hooks/`
- [ ] Extract reusable logic from components
- [ ] Add proper TypeScript types
- [ ] Handle cleanup in useEffect
- [ ] Add loading and error states
- [ ] Test hooks with React Testing Library

---

### Phase 6: Styling (Tailwind CSS)

**Estimated Time**: 1-3 hours

**Purpose**: Apply responsive, accessible styling with Tailwind CSS.

**Tasks**:
1. Apply Tailwind utility classes
2. Ensure mobile-first responsive design
3. Add dark mode variants
4. Implement hover and focus states
5. Add transitions and animations
6. Verify accessibility (contrast, focus visible)

**CRITICAL**:
- ✅ Mobile-first approach (base styles for mobile, then `md:`, `lg:`, etc.)
- ✅ Dark mode support (`dark:` variant)
- ✅ Accessible colors (WCAG AA contrast)
- ✅ Focus indicators visible
- ❌ NO inline styles (use Tailwind classes)

**Responsive Design Pattern**:

```tsx
<div className="
  px-4 py-6              // Mobile (default)
  sm:px-6 sm:py-8        // Small screens (640px+)
  md:px-8 md:py-10       // Medium screens (768px+)
  lg:px-10 lg:py-12      // Large screens (1024px+)
  xl:px-12 xl:py-16      // Extra large (1280px+)
">
  Content
</div>
```

**Dark Mode Pattern**:

```tsx
<div className="
  bg-gray-100 dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-gray-300 dark:border-gray-700
">
  Supports dark mode
</div>
```

**Checklist**:
- [ ] Apply Tailwind classes (no inline styles)
- [ ] Test on mobile, tablet, desktop
- [ ] Verify dark mode appearance
- [ ] Check focus indicators visible
- [ ] Validate color contrast (WCAG AA)
- [ ] Add hover states for interactive elements

---

### Phase 7: i18n & Translations

**Estimated Time**: 1-2 hours

**Purpose**: Add internationalization support for Spanish and English.

**Tasks**:
1. Add all translation keys to `messages/es.json`
2. Add English translations to `messages/en.json`
3. Verify all text uses `useTranslations()` or `getTranslations()`
4. Test language switching
5. Ensure translations are complete (no missing keys)

**CRITICAL**:
- ✅ ALL user-facing text must be translated
- ✅ Both ES and EN must be complete
- ❌ NO hardcoded strings (any language)
- ❌ NO missing translation keys

**Translation Files Structure**:

```json
// messages/es.json
{
  "blog": {
    "title": "Blog",
    "subtitle": "Artículos sobre desarrollo, arquitectura y tecnología",
    "allPosts": "Todos ({count})",
    "noPosts": "No hay publicaciones disponibles",
    "new": "Nuevo",
    "readMore": "Leer más",
    "readTime": "{minutes} min de lectura",
    "publishedOn": "Publicado el {date}"
  }
}
```

```json
// messages/en.json
{
  "blog": {
    "title": "Blog",
    "subtitle": "Articles about development, architecture and technology",
    "allPosts": "All ({count})",
    "noPosts": "No posts available",
    "new": "New",
    "readMore": "Read more",
    "readTime": "{minutes} min read",
    "publishedOn": "Published on {date}"
  }
}
```

**Checklist**:
- [ ] Add all keys to `messages/es.json`
- [ ] Add all keys to `messages/en.json`
- [ ] Verify NO hardcoded strings remain
- [ ] Test language switching (ES ↔ EN)
- [ ] Check variable interpolation works
- [ ] Verify rich text translations render

---

### Phase 8: Testing (Vitest + RTL)

**Estimated Time**: 3-6 hours (depending on complexity)

**Purpose**: Write comprehensive tests to achieve 80%+ coverage.

**Tasks**:
1. Write entity tests (core layer)
2. Write use-case tests (core layer)
3. Write component tests (features layer)
4. Write hook tests (shared layer)
5. Add accessibility tests
6. Add i18n rendering tests
7. Verify coverage reaches 80%+

**CRITICAL**:
- ✅ 80%+ coverage REQUIRED (lines, functions, branches, statements)
- ✅ Entity tests (validation, methods)
- ✅ Use-case tests (pure function logic)
- ✅ Component tests (rendering, interactions, translations)
- ✅ Accessibility tests
- ❌ Tests must NOT break Clean Architecture (no mocking core from features)

**Entity Tests**:

```typescript
// tests/core/entities/BlogPost.test.ts
import { describe, it, expect } from 'vitest';
import { BlogPost, BlogPostData } from '@/core/entities/BlogPost';

describe('BlogPost Entity', () => {
  const validData: BlogPostData = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test blog post with enough content to pass validation.',
    excerpt: '',
    publishedAt: new Date('2025-01-01'),
    tags: ['React', 'TypeScript'],
    author: 'Test Author',
    readingTimeMinutes: 5,
  };

  describe('Constructor & Validation', () => {
    it('creates blog post with valid data', () => {
      const post = new BlogPost(validData);

      expect(post.id).toBe('1');
      expect(post.title).toBe('Test Post');
      expect(post.tags).toHaveLength(2);
    });

    it('throws error when title is empty', () => {
      const invalidData = { ...validData, title: '' };

      expect(() => new BlogPost(invalidData)).toThrow('title is required');
    });

    it('throws error when title exceeds 100 characters', () => {
      const invalidData = { ...validData, title: 'A'.repeat(101) };

      expect(() => new BlogPost(invalidData)).toThrow('100 characters or less');
    });

    it('throws error when content is too short', () => {
      const invalidData = { ...validData, content: 'Short' };

      expect(() => new BlogPost(invalidData)).toThrow('at least 50 characters');
    });

    it('generates excerpt when not provided', () => {
      const post = new BlogPost(validData);

      expect(post.excerpt).toBeDefined();
      expect(post.excerpt.length).toBeGreaterThan(0);
    });
  });

  describe('Methods', () => {
    it('hasTag() returns true when tag exists', () => {
      const post = new BlogPost(validData);

      expect(post.hasTag('React')).toBe(true);
      expect(post.hasTag('TypeScript')).toBe(true);
    });

    it('hasTag() is case-insensitive', () => {
      const post = new BlogPost(validData);

      expect(post.hasTag('react')).toBe(true);
      expect(post.hasTag('TYPESCRIPT')).toBe(true);
    });

    it('hasTag() returns false when tag does not exist', () => {
      const post = new BlogPost(validData);

      expect(post.hasTag('Vue')).toBe(false);
    });

    it('isRecent returns true for posts within 30 days', () => {
      const recentData = {
        ...validData,
        publishedAt: new Date(), // Today
      };
      const post = new BlogPost(recentData);

      expect(post.isRecent).toBe(true);
    });

    it('isRecent returns false for old posts', () => {
      const oldData = {
        ...validData,
        publishedAt: new Date('2024-01-01'), // Over 30 days ago
      };
      const post = new BlogPost(oldData);

      expect(post.isRecent).toBe(false);
    });

    it('getFormattedDate() returns formatted date string', () => {
      const post = new BlogPost(validData);
      const formatted = post.getFormattedDate('es');

      expect(formatted).toContain('2025');
      expect(formatted).toContain('enero');
    });

    it('toJSON() returns plain object', () => {
      const post = new BlogPost(validData);
      const json = post.toJSON();

      expect(json).toEqual(expect.objectContaining({
        id: '1',
        title: 'Test Post',
      }));
      expect(json).not.toBe(validData); // New object
    });
  });
});
```

**Use-Case Tests**:

```typescript
// tests/core/use-cases/blogPosts.test.ts
import { describe, it, expect } from 'vitest';
import { BlogPost } from '@/core/entities/BlogPost';
import {
  filterPostsByTag,
  getRecentPosts,
  sortPostsByDate,
  getAllTags,
} from '@/core/use-cases/blogPosts';

describe('Blog Post Use Cases', () => {
  const posts = [
    new BlogPost({
      id: '1',
      title: 'React Post',
      content: 'Content about React that is long enough for validation.',
      excerpt: '',
      publishedAt: new Date('2025-01-15'),
      tags: ['React', 'Frontend'],
      author: 'Author',
      readingTimeMinutes: 5,
    }),
    new BlogPost({
      id: '2',
      title: 'TypeScript Post',
      content: 'Content about TypeScript that is long enough for validation.',
      excerpt: '',
      publishedAt: new Date('2025-01-10'),
      tags: ['TypeScript', 'Backend'],
      author: 'Author',
      readingTimeMinutes: 8,
    }),
  ];

  describe('filterPostsByTag', () => {
    it('returns all posts when tag is empty', () => {
      const result = filterPostsByTag(posts, '');
      expect(result).toHaveLength(2);
    });

    it('filters posts by tag', () => {
      const result = filterPostsByTag(posts, 'React');
      expect(result).toHaveLength(1);
      expect(result[0].hasTag('React')).toBe(true);
    });

    it('is case-insensitive', () => {
      const result = filterPostsByTag(posts, 'react');
      expect(result).toHaveLength(1);
    });
  });

  describe('sortPostsByDate', () => {
    it('sorts posts by date (newest first)', () => {
      const sorted = sortPostsByDate(posts);

      expect(sorted[0].id).toBe('1'); // Jan 15 (newer)
      expect(sorted[1].id).toBe('2'); // Jan 10 (older)
    });

    it('does not mutate original array', () => {
      const original = [...posts];
      sortPostsByDate(posts);

      expect(posts).toEqual(original);
    });
  });

  describe('getAllTags', () => {
    it('returns all unique tags', () => {
      const tags = getAllTags(posts);

      expect(tags).toHaveLength(4);
      expect(tags).toContain('React');
      expect(tags).toContain('TypeScript');
      expect(tags).toContain('Frontend');
      expect(tags).toContain('Backend');
    });

    it('returns sorted tags', () => {
      const tags = getAllTags(posts);

      expect(tags).toEqual([...tags].sort());
    });
  });
});
```

**Component Tests**:

```typescript
// tests/features/blog/Blog.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { Blog } from '@/features/blog/Blog';
import messages from '@/messages/es.json';

describe('Blog Component', () => {
  const renderBlog = () => {
    return render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <Blog />
      </NextIntlClientProvider>
    );
  };

  describe('Rendering', () => {
    it('renders blog title', () => {
      renderBlog();
      expect(screen.getByRole('heading', { name: /blog/i })).toBeInTheDocument();
    });

    it('renders all posts by default', () => {
      renderBlog();
      const posts = screen.getAllByRole('article');
      expect(posts.length).toBeGreaterThan(0);
    });

    it('renders tag filter buttons', () => {
      renderBlog();
      expect(screen.getByRole('button', { name: /todos/i })).toBeInTheDocument();
    });
  });

  describe('Filtering', () => {
    it('filters posts when tag is selected', async () => {
      const user = userEvent.setup();
      renderBlog();

      const initialPosts = screen.getAllByRole('article');
      const reactButton = screen.getByRole('button', { name: /react/i });

      await user.click(reactButton);

      const filteredPosts = screen.getAllByRole('article');
      expect(filteredPosts.length).toBeLessThanOrEqual(initialPosts.length);
    });

    it('shows all posts when "Todos" is clicked', async () => {
      const user = userEvent.setup();
      renderBlog();

      const reactButton = screen.getByRole('button', { name: /react/i });
      await user.click(reactButton);

      const todosButton = screen.getByRole('button', { name: /todos/i });
      await user.click(todosButton);

      const posts = screen.getAllByRole('article');
      expect(posts.length).toBeGreaterThan(0);
    });
  });

  describe('Translations', () => {
    it('displays Spanish translations', () => {
      renderBlog();
      expect(screen.getByText(/blog/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible heading', () => {
      renderBlog();
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      renderBlog();

      await user.tab();
      const firstButton = screen.getAllByRole('button')[0];
      expect(firstButton).toHaveFocus();
    });
  });
});
```

**Coverage Validation**:

```bash
# Run tests with coverage
npm run test:coverage

# Expected output:
# ✓ Entity tests: 95% coverage
# ✓ Use-case tests: 90% coverage
# ✓ Component tests: 85% coverage
# ✓ Overall: 87% coverage (above 80% threshold)
```

**Checklist**:
- [ ] Write entity tests in `tests/core/entities/`
- [ ] Write use-case tests in `tests/core/use-cases/`
- [ ] Write component tests in `tests/features/[feature]/`
- [ ] Add accessibility tests (ARIA roles, keyboard nav)
- [ ] Add i18n rendering tests (ES/EN)
- [ ] Run `npm run test:coverage`
- [ ] Verify coverage ≥ 80%
- [ ] Fix any failing tests

---

## Implementation Plan Output Template

When generating implementation plans, use this structure:

```markdown
# Feature Implementation Plan: [Feature Name]

## Overview

**Feature**: [Brief description]
**Complexity**: [Low/Medium/High]
**Estimated Total Time**: [X-Y hours]
**Dependencies**: [List any dependencies]

---

## Phase 1: Entity & Type Design

**Estimated Time**: [X hours]

**Tasks**:
1. [Task 1] - [time]
2. [Task 2] - [time]
3. [Task 3] - [time]

**Files to Create**:
- [ ] `src/core/entities/[Entity].ts` - Domain entity class

**Example Code**:
[Insert TypeScript code example]

---

## Phase 2: Core Layer (Use Cases)

**Estimated Time**: [X hours]

**Tasks**:
1. [Task 1] - [time]
2. [Task 2] - [time]

**Files to Create**:
- [ ] `src/core/use-cases/[feature].ts` - Pure functions

**Example Code**:
[Insert TypeScript code example]

---

[Continue with all 8 phases...]

---

## Files Checklist

### Core Layer
- [ ] `src/core/entities/[Entity].ts`
- [ ] `src/core/use-cases/[feature].ts`

### Features Layer
- [ ] `src/features/[feature]/[Feature].tsx`
- [ ] `src/features/[feature]/[ChildComponent].tsx`

### Shared Layer
- [ ] `src/shared/components/ui/[Component].tsx` (if new UI component)
- [ ] `src/shared/hooks/[hookName].ts` (if custom hook)

### App Router
- [ ] `app/[locale]/[feature]/page.tsx` (if new route)

### Translations
- [ ] `messages/es.json` (add [N] keys)
- [ ] `messages/en.json` (add [N] keys)

### Tests
- [ ] `tests/core/entities/[Entity].test.ts`
- [ ] `tests/core/use-cases/[feature].test.ts`
- [ ] `tests/features/[feature]/[Feature].test.tsx`

---

## Estimated Timeline

| Phase | Time Estimate |
|-------|---------------|
| Phase 1: Entity & Type Design | [X hours] |
| Phase 2: Core Layer | [X hours] |
| Phase 3: Feature Layer | [X hours] |
| Phase 4: UI Components | [X hours] |
| Phase 5: Client Interactions | [X hours] |
| Phase 6: Styling | [X hours] |
| Phase 7: i18n & Translations | [X hours] |
| Phase 8: Testing | [X hours] |
| **Total** | **[X-Y hours]** |

---

## Implementation Notes

[Any additional notes, warnings, or considerations for implementation]

---

## Success Criteria

- [ ] All features implemented and functional
- [ ] Clean Architecture maintained (dependency rule)
- [ ] All text translated (ES/EN)
- [ ] Test coverage ≥ 80%
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Accessibility verified
- [ ] No TypeScript errors
- [ ] CI pipeline passes
```

---

## Final Checklist Before Generating Plan

Before generating an implementation plan, ensure:

1. **Requirements Clear**:
   - [ ] Feature purpose understood
   - [ ] User requirements documented
   - [ ] Edge cases identified

2. **Architecture Aligned**:
   - [ ] Follows Clean Architecture
   - [ ] Dependencies flow correctly
   - [ ] No violations of dependency rule

3. **Standards Met**:
   - [ ] 80%+ test coverage planned
   - [ ] i18n ES/EN complete
   - [ ] TypeScript strict mode
   - [ ] Tailwind CSS for styling

4. **Completeness**:
   - [ ] All 8 phases included
   - [ ] Time estimates realistic
   - [ ] File checklists complete
   - [ ] Code examples provided

---

**Skill Version**: 1.0.0
**Last Updated**: 2025-12-10
**Target Project**: DevPortfolio (Next.js 15 + React 19 + TypeScript 5)
