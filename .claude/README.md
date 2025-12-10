# Claude Code Skills - DevPortfolio

Sistema de skills personalizados de Claude Code para el proyecto DevPortfolio (Next.js 15 + React 19 + TypeScript).

## Overview

Este directorio contiene 4 skills especializados que asisten en el desarrollo de features siguiendo la Clean Architecture del proyecto y los estándares de calidad establecidos (80%+ test coverage, i18n ES/EN, TypeScript estricto).

## Skills Disponibles

### 1. feature-planner 🎯

**Propósito**: Crear planes de implementación comprensivos para nuevas features

**Cuándo usarlo**:

- Necesitas planificar una nueva feature desde cero
- Tienes documentación de requerimientos (PDF, MD, texto)
- Quieres un roadmap detallado fase por fase

**Output**: `feature-plan-[nombre].md` (500-1,000 líneas)

- 8 fases de implementación
- Ejemplos TypeScript/React completos
- Checklists de archivos a crear
- Estimaciones de tiempo por fase

**Invocación**:

```
"Create implementation plan for blog feature"
"Plan the testimonials section from these requirements"
```

---

### 2. code-reviewer 🔍

**Propósito**: Validar implementaciones contra los estándares del proyecto

**Cuándo usarlo**:

- Completaste una feature y quieres validar calidad
- Necesitas review antes de merge
- Quieres identificar violaciones de arquitectura

**Output**: `validation-report-[branch]-[fecha].md` (600-1,000 líneas)

- Compliance score (X/100)
- Violaciones por capa (core, features, shared)
- File:line references con fixes
- Action items priorizados (Critical → Low)

**Invocación**:

```
"Review my implementation on feature/blog branch"
"Validate the contact feature code quality"
```

---

### 3. component-generator ⚛️

**Propósito**: Generar componentes React con estructura completa

**Cuándo usarlo**:

- Necesitas crear un nuevo componente rápidamente
- Quieres scaffold completo (component + translations + tests)
- Generar componentes siguiendo patrones del proyecto

**Output**: Archivos generados automáticamente

- Component files (.tsx)
- TypeScript interfaces
- Translation updates (es.json, en.json)
- Test scaffolds (.test.tsx)
- Framer Motion animations incluidas

**Invocación**:

```
"Generate a Modal component with animations"
"Create BlogCard component for the blog feature"
```

---

### 4. test-writer 🧪

**Propósito**: Generar test suites comprehensivos (80%+ coverage)

**Cuándo usarlo**:

- Necesitas tests para un feature/component nuevo
- Coverage está bajo el 80%
- Quieres template de tests siguiendo best practices

**Output**: Test files (.test.ts, .test.tsx)

- Entity tests (core layer)
- Component tests (React Testing Library)
- Accessibility tests
- i18n rendering tests
- Coverage estimate

**Invocación**:

```
"Write tests for the Skills component with 80%+ coverage"
"Generate comprehensive tests for BlogPost entity"
```

---

## Quick Start

### Ejemplo 1: Planificar Nueva Feature

```
User: "I want to add a blog feature to my portfolio.
       Create an implementation plan."

Claude: [Invoca feature-planner skill]

Output: feature-plan-blog.md
- Phase 1: Entity & Type Design (2h)
- Phase 2: Core Layer (3h)
- Phase 3: Feature Components (4h)
- Phase 4: UI Components (2h)
- Phase 5: State & Hooks (2h)
- Phase 6: Tailwind Styling (1h)
- Phase 7: i18n Setup (1h)
- Phase 8: Testing (3h)

Total: 18h estimado
```

### Ejemplo 2: Validar Feature Implementada

```
User: "Review my contact form implementation
       on feature/contact-form branch"

Claude: [Invoca code-reviewer skill]

Output: validation-report-contact-form-2025-12-10.md
- Compliance Score: 82/100
- 3 CRITICAL violations encontradas
- 5 HIGH violations
- Test coverage: 85% ✅

Action Items:
❌ CRITICAL: Remove React import from core/entities
❌ CRITICAL: Add missing translations (12 instances)
⚠️ HIGH: Improve error handling in form submission
```

### Ejemplo 3: Generar Componente

```
User: "Generate a Testimonials component with cards"

Claude: [Invoca component-generator skill]

Output: Files created:
✅ src/features/testimonials/Testimonials.tsx
✅ src/features/testimonials/TestimonialCard.tsx
✅ messages/es.json (updated with 8 keys)
✅ messages/en.json (updated with 8 keys)
✅ tests/features/testimonials/Testimonials.test.tsx
```

### Ejemplo 4: Generar Tests

```
User: "Write comprehensive tests for the Projects component"

Claude: [Invoca test-writer skill]

Output: tests/features/projects/Projects.test.tsx
- 22 test cases generated
- Current coverage: 45% → Estimated: 88%
- AAA pattern (Arrange-Act-Assert)
- Accessibility tests included
- i18n rendering tests included
```

---

## Arquitectura del Proyecto

Este portfolio sigue **Clean Architecture** con 3 capas:

```
/src
├── /core              # Domain Layer (pure TypeScript)
│   ├── /entities      # Project, Contact, etc.
│   └── /use-cases     # Pure functions, fully testable
│
├── /features          # Features Layer (vertical slices)
│   ├── /hero
│   ├── /about
│   ├── /skills
│   ├── /projects
│   └── /contact
│
└── /shared            # Shared Layer (reusable)
    ├── /components/ui
    ├── /hooks
    ├── /utils
    └── /constants
```

**Dependency Rule** (CRÍTICA):

- `features` → puede importar de `core` y `shared`
- `shared` → puede importar de `core`
- `core` → NO puede importar de NADA (pure TypeScript)

---

## Estándares del Proyecto

### 1. Testing (ESTRICTO)

- **80%+ coverage requerido** (lines, functions, branches, statements)
- Vitest + React Testing Library
- Tests deben seguir AAA pattern
- Archivos: `tests/` mirror de `src/`

### 2. i18n (OBLIGATORIO)

- **TODO texto visible debe usar traducciones**
- Soportar ES (default) y EN
- Client components: `useTranslations()`
- Server components: `getTranslations()`
- Archivos: `messages/es.json`, `messages/en.json`

### 3. TypeScript (ESTRICTO)

- Strict mode enabled
- Interfaces para todas las props
- No `any` types
- Path aliases: `@/core`, `@/features`, `@/shared`

### 4. Styling

- Tailwind CSS utility classes
- Responsive design (mobile-first)
- Dark mode support
- Framer Motion para animaciones

---

## Workflow Típico

### Desarrollo de Nueva Feature

1. **Plan** → Usa `feature-planner`

   ```
   "Create implementation plan for [feature]"
   ```

   Output: Plan detallado de 8 fases

2. **Implement** → Sigue el plan generado
   - Crear entities (core/)
   - Crear components (features/)
   - Añadir traducciones
   - Escribir tests

3. **Generate** → Usa `component-generator` para componentes específicos

   ```
   "Generate [ComponentName] component"
   ```

4. **Test** → Usa `test-writer` para completar coverage

   ```
   "Write tests for [feature] with 80%+ coverage"
   ```

5. **Review** → Usa `code-reviewer` antes de merge

   ```
   "Review my implementation on feature/[name]"
   ```

   Output: Validation report con violations

6. **Fix** → Corregir violations críticas

7. **Merge** → Una vez compliance score > 80

---

## Validaciones Automáticas

Los skills validan automáticamente:

### Core Layer ✅

- ❌ NO framework imports (React, Next.js)
- ✅ SOLO pure TypeScript
- ✅ Entity validation en constructors
- ✅ Use-cases como pure functions

### Features Layer ✅

- ✅ Imports permitidos de `core/` y `shared/`
- ✅ Uso correcto de `useTranslations()`
- ✅ Framer Motion animations
- ✅ Props TypeScript interfaces
- ❌ NO business logic extensa en components

### Shared Layer ✅

- ✅ Componentes reutilizables
- ✅ Custom hooks siguiendo rules of hooks
- ✅ Utilities sin side effects
- ✅ Constants exportadas correctamente

### Translation ✅

- ❌ NO hardcoded strings (ES/EN)
- ✅ TODO texto usa `t()` function
- ✅ Ambos idiomas soportados
- ✅ Keys consistentes entre locales

### Testing ✅

- ✅ 80%+ coverage MÍNIMO
- ✅ Tests para entities (core)
- ✅ Tests para components (features)
- ✅ Tests para hooks (shared)
- ✅ Accessibility tests
- ✅ i18n rendering tests

---

## Tips para Mejores Resultados

### Con feature-planner:

1. Provee contexto claro de la feature
2. Menciona requirements específicos
3. Indica complejidad esperada
4. Especifica si hay constraints técnicas

### Con code-reviewer:

1. Asegúrate de estar en feature branch (no main/master)
2. Haz commit de cambios antes de review
3. Provee documentación de requirements si existe
4. Ejecuta después de completar la feature

### Con component-generator:

1. Describe el propósito del componente
2. Menciona props esperadas
3. Indica si es feature o UI component
4. Especifica animations si las necesitas

### Con test-writer:

1. Provee el archivo/feature a testear
2. Menciona coverage target (80%+ default)
3. Indica casos edge específicos si existen
4. Especifica tipo de tests (unit, integration)

---

## Troubleshooting

### "Skill no se invoca automáticamente"

- Usa keywords claras: "plan", "review", "generate", "write tests"
- Menciona el nombre del skill explícitamente
- Proporciona contexto suficiente

### "Output incompleto"

- Los skills generan 500-2,000 líneas
- Dale tiempo para completar
- Pide continuación si se corta

### "Violations no son claras"

- Los reports incluyen file:line references
- Busca secciones "❌ WRONG → ✅ CORRECT"
- Revisa "Time to Fix" estimates

### "Tests no pasan después de generar"

- Verifica imports de traducciones
- Asegura mocks están configurados
- Revisa setup.ts configuration

---

## Archivos de Referencia

### Architecture Guides

- `.claude/architecture/clean-architecture.md` - Detalles de Clean Architecture
- `.claude/architecture/testing-strategy.md` - Estrategia de testing 80%+
- `.claude/architecture/i18n-patterns.md` - Patrones de next-intl

### Examples

- `.claude/EXAMPLES.md` - Ejemplos completos de uso real

### Skills

- `.claude/skills/feature-planner/SKILL.md` - Implementation planning
- `.claude/skills/code-reviewer/SKILL.md` - Code validation
- `.claude/skills/component-generator/SKILL.md` - Component generation
- `.claude/skills/test-writer/SKILL.md` - Test generation

---

## Notas Importantes

- **Auto-contenidos**: Cada skill tiene arquitectura completa embebida
- **No requieren CLAUDE.md**: Skills funcionan independientemente
- **Compartibles**: Teammates pueden usar sin setup adicional
- **Actualizados**: Reflejan Next.js 15, React 19, TypeScript 5

---

**Última actualización**: 2025-12-10
**Versión**: 1.0.0
**Proyecto**: DevPortfolio (Next.js 15 + React 19 + TypeScript 5)
