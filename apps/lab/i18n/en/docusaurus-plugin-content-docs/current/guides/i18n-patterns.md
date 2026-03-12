---
id: i18n-patterns
title: i18n Patterns in DevPortfolio
sidebar_label: i18n Patterns
sidebar_position: 3
description: Internationalization guide with next-intl, supporting Spanish and English
keywords: [i18n, internationalization, next-intl, translations, locale]
---

# i18n Patterns - DevPortfolio

## Introduction

DevPortfolio implements internationalization (i18n) using **next-intl**, supporting Spanish (ES) and English (EN). Spanish is the default locale.

## Configuration

### Supported Locales

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed', // ES has no prefix, EN has /en
});
```

**Resulting URLs**:

- Spanish (default): `/`, `/projects`, `/projects/devportfolio`
- English: `/en`, `/en/projects`, `/en/projects/devportfolio`

### Translation Files

```
/messages
├── es.json  # Spanish translations (source of truth)
└── en.json  # English translations
```

**File structure**:

```json
{
  "hero": {
    "greeting": "Hello, I am",
    "name": "Ángel Hidalgo",
    "tagline": "Full Stack Developer specialized in SaaS and scalable architectures",
    "cta": {
      "projects": "View Projects",
      "contact": "Contact"
    }
  },
  "about": {
    "title": "About Me",
    "timeline": {
      "experience": "Years of Experience",
      "projects": "Completed Projects"
    }
  },
  "projects": {
    "title": "Projects",
    "filters": {
      "all": "All",
      "fullstack": "Full Stack",
      "frontend": "Frontend",
      "backend": "Backend",
      "devops": "DevOps",
      "mobile": "Mobile",
      "data": "Data"
    },
    "details": {
      "technologies": "Technologies",
      "liveDemo": "Live Demo",
      "sourceCode": "View Code"
    }
  },
  "contact": {
    "title": "Contact",
    "form": {
      "name": "Name",
      "email": "Email",
      "message": "Message",
      "submit": "Send",
      "sending": "Sending...",
      "success": "Message sent! Thank you for reaching out.",
      "error": "Error sending. Please try again."
    },
    "validation": {
      "nameRequired": "Name is required",
      "emailRequired": "Email is required",
      "emailInvalid": "Invalid email",
      "messageRequired": "Message is required",
      "messageMinLength": "Message must be at least 10 characters"
    }
  }
}
```

### Routing Middleware

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

## Usage in Components

### useTranslations (Client Components)

For components with 'use client':

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section>
      <h1>{t('greeting')}</h1>
      <p className="text-xl">{t('name')}</p>
      <p className="text-lg">{t('tagline')}</p>
      <button>{t('cta.projects')}</button>
      <button>{t('cta.contact')}</button>
    </section>
  );
}
```

**Namespace**: The argument to `useTranslations('hero')` must match the root key in the JSON files.

### getTranslations (Server Components)

For server components and pages:

```typescript
import { getTranslations } from 'next-intl/server';

export default async function ProjectsPage() {
  const t = await getTranslations('projects');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('filters.all')}</p>
    </div>
  );
}
```

### Dynamic Translations

For translations with variables:

```typescript
// messages/en.json
{
  "welcome": {
    "greeting": "Hello {name}, you have {count} new messages"
  }
}

// Component
const t = useTranslations('welcome');
<p>{t('greeting', { name: 'Ángel', count: 5 })}</p>
// Output: "Hello Ángel, you have 5 new messages"
```

### Plural Translations

```typescript
// messages/en.json
{
  "projects": {
    "count": "{count, plural, =0 {No projects} =1 {1 project} other {# projects}}"
  }
}

// Component
const t = useTranslations('projects');
<p>{t('count', { count: 0 })}</p> // "No projects"
<p>{t('count', { count: 1 })}</p> // "1 project"
<p>{t('count', { count: 5 })}</p> // "5 projects"
```

## Common Patterns

### Pattern 1: Feature Section with i18n

```typescript
// src/features/projects/ProjectsSection.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { ProjectCategory } from '@/core/entities/Project';

export function ProjectsSection() {
  const t = useTranslations('projects');
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory | 'all'>('all');

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8">{t('title')}</h2>

      <div className="flex gap-2 mb-8">
        <button onClick={() => setSelectedCategory('all')}>
          {t('filters.all')}
        </button>
        <button onClick={() => setSelectedCategory('fullstack')}>
          {t('filters.fullstack')}
        </button>
        <button onClick={() => setSelectedCategory('frontend')}>
          {t('filters.frontend')}
        </button>
      </div>

      {/* Render projects... */}
    </section>
  );
}
```

**Corresponding JSON structure**:

```json
{
  "projects": {
    "title": "Projects",
    "filters": {
      "all": "All",
      "fullstack": "Full Stack",
      "frontend": "Frontend"
    }
  }
}
```

### Pattern 2: Validation with i18n Error Messages

```typescript
// src/features/contact/ContactForm.tsx
'use client';

import { useTranslations } from 'next-intl';
import { validateContactForm } from '@/core/use-cases/validateContactForm';

export function ContactForm() {
  const t = useTranslations('contact');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (data: ContactFormData) => {
    const validation = validateContactForm(data);

    if (!validation.isValid) {
      // Map core validation errors to i18n messages
      const translatedErrors: Record<string, string> = {};

      if (validation.errors.name) {
        translatedErrors.name = t('validation.nameRequired');
      }
      if (validation.errors.email === 'Email is required') {
        translatedErrors.email = t('validation.emailRequired');
      }
      if (validation.errors.email === 'Invalid email format') {
        translatedErrors.email = t('validation.emailInvalid');
      }

      setErrors(translatedErrors);
      return;
    }

    // Submit form...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      {errors.name && <p className="text-red-500">{errors.name}</p>}

      <input type="email" name="email" />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <button type="submit">{t('form.submit')}</button>
    </form>
  );
}
```

**JSON structure**:

```json
{
  "contact": {
    "form": {
      "submit": "Send"
    },
    "validation": {
      "nameRequired": "Name is required",
      "emailRequired": "Email is required",
      "emailInvalid": "Invalid email"
    }
  }
}
```

### Pattern 3: Shared Component with Optional i18n

For shared components that can be reused in multiple contexts:

```typescript
// src/shared/components/ui/Modal.tsx
'use client';

import { useTranslations } from 'next-intl';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; // Allow custom title
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const t = useTranslations('ui');

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>{title || t('modal.defaultTitle')}</h2>
        {children}
        <button onClick={onClose}>{t('modal.close')}</button>
      </div>
    </div>
  ) : null;
}
```

**JSON structure**:

```json
{
  "ui": {
    "modal": {
      "defaultTitle": "Information",
      "close": "Close"
    }
  }
}
```

### Pattern 4: Dynamic Routes with i18n

For dynamic pages like `/projects/[slug]`:

```typescript
// app/[locale]/projects/[slug]/page.tsx
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/shared/constants/projects';

interface PageProps {
  params: { locale: string; slug: string };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const t = await getTranslations('projects');

  const project = PROJECTS.find(p => p.id === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1>{t(`items.${params.slug}.title`)}</h1>
      <p>{t(`items.${params.slug}.description`)}</p>

      <div>
        <h2>{t('details.technologies')}</h2>
        <ul>
          {project.technologies.map(tech => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

**JSON structure for projects**:

```json
{
  "projects": {
    "details": {
      "technologies": "Technologies"
    },
    "items": {
      "devportfolio": {
        "title": "DevPortfolio",
        "description": "Personal portfolio with Next.js and React"
      },
      "ecommerce-platform": {
        "title": "E-commerce Platform",
        "description": "Scalable e-commerce system"
      }
    }
  }
}
```

## Locale Switching

### Client-Side Locale Switching

```typescript
// src/shared/components/layout/LocaleSwitcher.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: string) => {
    // Remove current locale prefix from pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');

    // Add new locale prefix (except for default locale 'es')
    const newPath = newLocale === 'es'
      ? pathWithoutLocale || '/'
      : `/${newLocale}${pathWithoutLocale || ''}`;

    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale('es')}
        className={currentLocale === 'es' ? 'font-bold' : ''}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={currentLocale === 'en' ? 'font-bold' : ''}
      >
        EN
      </button>
    </div>
  );
}
```

### Link Component with Locale

```typescript
'use client';

import { Link as NextIntlLink } from '@/i18n/routing';

export function ProjectLink({ slug }: { slug: string }) {
  return (
    <NextIntlLink href={`/projects/${slug}`}>
      View project
    </NextIntlLink>
  );
}
```

## Testing with i18n

### Mock next-intl in Tests

```typescript
// tests/features/hero/HeroSection.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/features/hero/HeroSection';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'greeting': 'Hello, I am',
      'name': 'Ángel Hidalgo',
      'tagline': 'Full Stack Developer',
      'cta.projects': 'View Projects',
      'cta.contact': 'Contact',
    };
    return translations[key] || key;
  },
}));

describe('HeroSection', () => {
  it('renders translated greeting', () => {
    render(<HeroSection />);
    expect(screen.getByText('Hello, I am')).toBeInTheDocument();
  });

  it('renders translated CTA buttons', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: 'View Projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
  });
});
```

### Testing Multiple Locales

```typescript
// tests/i18n/messages.test.ts
import { describe, it, expect } from 'vitest';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

describe('i18n Messages', () => {
  it('has same keys in both locale files', () => {
    const esKeys = Object.keys(esMessages);
    const enKeys = Object.keys(enMessages);

    expect(esKeys).toEqual(enKeys);
  });

  it('has all required sections', () => {
    const requiredSections = ['hero', 'about', 'projects', 'contact'];

    requiredSections.forEach((section) => {
      expect(esMessages).toHaveProperty(section);
      expect(enMessages).toHaveProperty(section);
    });
  });

  it('has matching nested keys for contact form', () => {
    const esContactKeys = Object.keys(esMessages.contact.form);
    const enContactKeys = Object.keys(enMessages.contact.form);

    expect(esContactKeys).toEqual(enContactKeys);
  });
});
```

## Best Practices

### 1. Translation Organization

**DO**: Organize by feature/section

```json
{
  "hero": { ... },
  "about": { ... },
  "projects": { ... },
  "contact": { ... }
}
```

**DON'T**: Organize by content type

```json
{
  "titles": { "hero": "...", "about": "..." },
  "buttons": { "submit": "...", "cancel": "..." }
}
```

### 2. Namespacing

**DO**: Use specific namespace per feature

```typescript
const t = useTranslations('projects');
return <h1>{t('title')}</h1>;
```

**DON'T**: Use global namespace

```typescript
const t = useTranslations();
return <h1>{t('projects.title')}</h1>; // More verbose
```

### 3. Descriptive Keys

**DO**: Semantic and hierarchical keys

```json
{
  "contact": {
    "form": {
      "submit": "Send",
      "sending": "Sending..."
    },
    "validation": {
      "emailRequired": "Email required"
    }
  }
}
```

**DON'T**: Generic or flat keys

```json
{
  "button1": "Send",
  "button2": "Sending...",
  "error1": "Email required"
}
```

### 4. Keep in Sync

**CRITICAL**: Always update both files (es.json and en.json) at the same time.

**Recommended workflow**:

1. Update `messages/es.json` (source of truth)
2. Update `messages/en.json` with equivalent translations
3. Verify that the keys match
4. Run i18n tests

### 5. Avoid Hardcoded Strings

**DO**: Use translations

```typescript
<button>{t('form.submit')}</button>
```

**DON'T**: Hardcode strings

```typescript
<button>Send</button> // ❌ Not translatable
```

### 6. Consistent Formatting

**DO**: Consistent format with punctuation

```json
{
  "validation": {
    "nameRequired": "Name is required",
    "emailRequired": "Email is required"
  }
}
```

**DON'T**: Inconsistent format

```json
{
  "validation": {
    "nameRequired": "Name is required.",
    "emailRequired": "Email required" // Missing period
  }
}
```

## Troubleshooting

### Error: "useTranslations is not a function"

**Cause**: Missing 'use client' directive in component.

**Solution**:

```typescript
'use client'; // ← Add this line

import { useTranslations } from 'next-intl';
```

### Error: Translation key not found

**Cause**: Key does not exist in JSON files.

**Solution**: Verify that the key exists in both `es.json` and `en.json`:

```json
// messages/en.json
{
  "projects": {
    "title": "Projects" // ← Verify it exists
  }
}
```

### Translations not updating after changes

**Cause**: Next.js cache.

**Solution**:

```bash
rm -rf .next
npm run dev
```

## i18n Checklist

Before committing translation changes:

- [ ] Both files (`es.json` and `en.json`) are updated
- [ ] Keys match in both files
- [ ] Translations are semantically equivalent
- [ ] No hardcoded strings in components
- [ ] Correct namespace used in `useTranslations()`
- [ ] Components have 'use client' if using `useTranslations`
- [ ] Tests mock `next-intl` correctly
- [ ] Punctuation format is consistent

## References

- next-intl Documentation: https://next-intl-docs.vercel.app/
- Clean Architecture: See `.claude/architecture/clean-architecture.md`
- Testing Strategy: See `.claude/architecture/testing-strategy.md`
