# i18n Patterns - DevPortfolio Monorepo

## Introducción

El **Portfolio** del monorepo DevPortfolio implementa internacionalización (i18n) usando **next-intl**, soportando español (ES) e inglés (EN). El español es el locale por defecto.

**Nota**: Este documento se aplica solo a `apps/portfolio/`. La app `apps/lab/` (Docusaurus) tiene su propio sistema de i18n.

## Configuración

### Locales Soportados

```typescript
// apps/portfolio/src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed', // ES no tiene prefijo, EN tiene /en
});
```

**URLs resultantes**:

- Español (default): `/`, `/projects`, `/projects/devportfolio`
- Inglés: `/en`, `/en/projects`, `/en/projects/devportfolio`

### Archivos de Traducción

```
apps/portfolio/messages/
├── es.json  # Traducciones en español (fuente de verdad)
└── en.json  # Traducciones en inglés
```

**Estructura de archivos**:

```json
{
  "hero": {
    "greeting": "Hola, soy",
    "name": "Ángel Hidalgo",
    "tagline": "Full Stack Developer especializado en SaaS y arquitecturas escalables",
    "cta": {
      "projects": "Ver Proyectos",
      "contact": "Contacto"
    }
  },
  "about": {
    "title": "Sobre Mí",
    "timeline": {
      "experience": "Años de Experiencia",
      "projects": "Proyectos Completados"
    }
  },
  "projects": {
    "title": "Proyectos",
    "filters": {
      "all": "Todos",
      "fullstack": "Full Stack",
      "frontend": "Frontend",
      "backend": "Backend",
      "devops": "DevOps",
      "mobile": "Mobile",
      "data": "Data"
    },
    "details": {
      "technologies": "Tecnologías",
      "liveDemo": "Ver Demo",
      "sourceCode": "Ver Código"
    }
  },
  "contact": {
    "title": "Contacto",
    "form": {
      "name": "Nombre",
      "email": "Email",
      "message": "Mensaje",
      "submit": "Enviar",
      "sending": "Enviando...",
      "success": "¡Mensaje enviado! Gracias por contactarme.",
      "error": "Error al enviar. Por favor intenta de nuevo."
    },
    "validation": {
      "nameRequired": "El nombre es requerido",
      "emailRequired": "El email es requerido",
      "emailInvalid": "Email inválido",
      "messageRequired": "El mensaje es requerido",
      "messageMinLength": "El mensaje debe tener al menos 10 caracteres"
    }
  }
}
```

### Middleware de Routing

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './apps/portfolio/src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

## Uso en Componentes

### useTranslations (Client Components)

Para componentes con 'use client':

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

**Namespace**: El argumento de `useTranslations('hero')` debe coincidir con la clave raíz en los archivos JSON.

### getTranslations (Server Components)

Para server components y páginas:

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

### Traducciones Dinámicas

Para traducciones con variables:

```typescript
// messages/es.json
{
  "welcome": {
    "greeting": "Hola {name}, tienes {count} mensajes nuevos"
  }
}

// Componente
const t = useTranslations('welcome');
<p>{t('greeting', { name: 'Ángel', count: 5 })}</p>
// Output: "Hola Ángel, tienes 5 mensajes nuevos"
```

### Traducciones con Plurales

```typescript
// messages/es.json
{
  "projects": {
    "count": "{count, plural, =0 {No hay proyectos} =1 {1 proyecto} other {# proyectos}}"
  }
}

// Componente
const t = useTranslations('projects');
<p>{t('count', { count: 0 })}</p> // "No hay proyectos"
<p>{t('count', { count: 1 })}</p> // "1 proyecto"
<p>{t('count', { count: 5 })}</p> // "5 proyectos"
```

## Patrones Comunes

### Patrón 1: Feature Section con i18n

```typescript
// apps/portfolio/src/features/projects/ProjectsSection.tsx
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

**Estructura JSON correspondiente**:

```json
{
  "projects": {
    "title": "Proyectos",
    "filters": {
      "all": "Todos",
      "fullstack": "Full Stack",
      "frontend": "Frontend"
    }
  }
}
```

### Patrón 2: Validación con Mensajes de Error i18n

```typescript
// apps/portfolio/src/features/contact/ContactForm.tsx
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

**Estructura JSON**:

```json
{
  "contact": {
    "form": {
      "submit": "Enviar"
    },
    "validation": {
      "nameRequired": "El nombre es requerido",
      "emailRequired": "El email es requerido",
      "emailInvalid": "Email inválido"
    }
  }
}
```

### Patrón 3: Shared Component con i18n Opcional

Para componentes shared que pueden ser reutilizados en múltiples contexts:

```typescript
// apps/portfolio/src/shared/components/ui/Modal.tsx
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

**Estructura JSON**:

```json
{
  "ui": {
    "modal": {
      "defaultTitle": "Información",
      "close": "Cerrar"
    }
  }
}
```

### Patrón 4: Dynamic Routes con i18n

Para páginas dinámicas como `/projects/[slug]`:

```typescript
// apps/portfolio/app/[locale]/projects/[slug]/page.tsx
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

**Estructura JSON para proyectos**:

```json
{
  "projects": {
    "details": {
      "technologies": "Tecnologías"
    },
    "items": {
      "devportfolio": {
        "title": "DevPortfolio",
        "description": "Portfolio personal con Next.js y React"
      },
      "ecommerce-platform": {
        "title": "Plataforma E-commerce",
        "description": "Sistema de comercio electrónico escalable"
      }
    }
  }
}
```

## Locale Switching

### Client-Side Locale Switching

```typescript
// apps/portfolio/src/shared/components/layout/LocaleSwitcher.tsx
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

### Link Component con Locale

```typescript
'use client';

import { Link as NextIntlLink } from '@/i18n/routing';

export function ProjectLink({ slug }: { slug: string }) {
  return (
    <NextIntlLink href={`/projects/${slug}`}>
      Ver proyecto
    </NextIntlLink>
  );
}
```

## Testing con i18n

### Mock de next-intl en Tests

```typescript
// apps/portfolio/tests/features/hero/HeroSection.test.tsx
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

### Testing de Múltiples Locales

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

### 1. Organización de Traducciones

**DO**: Organizar por feature/section

```json
{
  "hero": { ... },
  "about": { ... },
  "projects": { ... },
  "contact": { ... }
}
```

**DON'T**: Organizar por tipo de contenido

```json
{
  "titles": { "hero": "...", "about": "..." },
  "buttons": { "submit": "...", "cancel": "..." }
}
```

### 2. Namespacing

**DO**: Usar namespace específico por feature

```typescript
const t = useTranslations('projects');
return <h1>{t('title')}</h1>;
```

**DON'T**: Usar namespace global

```typescript
const t = useTranslations();
return <h1>{t('projects.title')}</h1>; // Más verboso
```

### 3. Claves Descriptivas

**DO**: Claves semánticas y jerárquicas

```json
{
  "contact": {
    "form": {
      "submit": "Enviar",
      "sending": "Enviando..."
    },
    "validation": {
      "emailRequired": "Email requerido"
    }
  }
}
```

**DON'T**: Claves genéricas o planas

```json
{
  "button1": "Enviar",
  "button2": "Enviando...",
  "error1": "Email requerido"
}
```

### 4. Mantener Sincronización

**CRÍTICO**: Siempre actualizar ambos archivos (es.json y en.json) al mismo tiempo.

**Workflow recomendado**:

1. Actualizar `apps/portfolio/messages/es.json` (fuente de verdad)
2. Actualizar `apps/portfolio/messages/en.json` con traducciones equivalentes
3. Verificar que las claves coinciden
4. Ejecutar tests de i18n

### 5. Evitar Hardcoded Strings

**DO**: Usar traducciones

```typescript
<button>{t('form.submit')}</button>
```

**DON'T**: Hardcodear strings

```typescript
<button>Enviar</button> // ❌ No traducible
```

### 6. Consistencia en Formato

**DO**: Formato consistente con puntuación

```json
{
  "validation": {
    "nameRequired": "El nombre es requerido",
    "emailRequired": "El email es requerido"
  }
}
```

**DON'T**: Formato inconsistente

```json
{
  "validation": {
    "nameRequired": "El nombre es requerido.",
    "emailRequired": "Email requerido" // Falta "El" y "."
  }
}
```

## Troubleshooting

### Error: "useTranslations is not a function"

**Causa**: Missing 'use client' directive en componente.

**Solución**:

```typescript
'use client'; // ← Agregar esta línea

import { useTranslations } from 'next-intl';
```

### Error: Translation key not found

**Causa**: Clave no existe en archivos JSON.

**Solución**: Verificar que la clave existe en ambos `es.json` y `en.json`:

```json
// messages/es.json
{
  "projects": {
    "title": "Proyectos" // ← Verificar que existe
  }
}
```

### Traducciones no actualizan después de cambios

**Causa**: Cache de Next.js.

**Solución**:

```bash
rm -rf .next
npm run dev
```

## Checklist de i18n

Antes de hacer commit de cambios con traducciones:

- [ ] Ambos archivos (`es.json` y `en.json`) están actualizados
- [ ] Las claves coinciden en ambos archivos
- [ ] Las traducciones son semánticamente equivalentes
- [ ] No hay strings hardcodeados en componentes
- [ ] Se usa el namespace correcto en `useTranslations()`
- [ ] Los componentes tienen 'use client' si usan `useTranslations`
- [ ] Los tests mockan `next-intl` correctamente
- [ ] El formato de puntuación es consistente

## Referencias

- next-intl Documentation: https://next-intl-docs.vercel.app/
- Clean Architecture: Ver `.claude/architecture/clean-architecture.md`
- Testing Strategy: Ver `.claude/architecture/testing-strategy.md`
