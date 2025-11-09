# Clean Architecture - Simplified

Este proyecto utiliza una arquitectura limpia simplificada, adaptada para una aplicación Next.js sin backend.

## Estructura de Capas

```
/src
├── /core              # 🎯 Domain Layer - Lógica de negocio pura
│   ├── /entities      # Entidades del dominio
│   └── /use-cases     # Casos de uso
│
├── /features          # 📦 Features Layer - Implementación vertical
│   ├── /hero          # Sección Hero
│   ├── /about         # Sección About
│   ├── /projects      # Sección Projects
│   └── /contact       # Sección Contact
│
└── /shared            # 🔧 Shared Layer - Código reutilizable
    ├── /components/ui # Componentes UI atómicos
    ├── /hooks         # Custom hooks
    ├── /utils         # Utilidades
    └── /constants     # Constantes

/app                   # Next.js App Router
/tests                 # Tests (espejo de /src)
```

## Principios

### 1. Dependency Rule

Las dependencias solo fluyen hacia adentro:

- `features` → puede importar de `core` y `shared`
- `shared` → puede importar de `core`
- `core` → NO importa de nadie (puro TypeScript)

### 2. Separation of Concerns

- **Core**: Qué hace la aplicación (business logic)
- **Features**: Cómo se implementa (UI + logic)
- **Shared**: Herramientas reutilizables

### 3. Testability

- Core: 100% testeable (pure functions)
- Shared: Alta cobertura (utilities + hooks)
- Features: Tests de integración

## Path Aliases

```typescript
import { Project } from '@/core/entities/Project';
import { getProjects } from '@/core/use-cases/getProjects';
import { Button } from '@/shared/components/ui/Button';
import { Hero } from '@/features/hero/Hero';
```

## Ejemplo de Flujo

```
User interacts with UI
    ↓
Feature Component (e.g., /projects)
    ↓
Use Case from /core (e.g., getProjects)
    ↓
Entity from /core (e.g., Project)
    ↓
Return data to Feature
    ↓
Render with Shared Components
```

## Beneficios

✅ **Mantenibilidad**: Código organizado y predecible
✅ **Testabilidad**: Lógica separada de la UI
✅ **Escalabilidad**: Fácil agregar nuevas features
✅ **Reutilización**: Shared components y utils
✅ **Documentación**: Estructura auto-explicativa
