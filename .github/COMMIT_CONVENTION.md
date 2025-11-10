# Commit Convention

Este proyecto sigue [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial de commits limpio y semántico.

## Formato

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Componentes

- **type**: Tipo de cambio (requerido)
- **scope**: Área afectada (opcional pero recomendado)
- **subject**: Descripción breve del cambio (requerido)
- **body**: Descripción detallada (opcional)
- **footer**: Referencias a issues, breaking changes (opcional)

## Types Permitidos

| Type | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(hero): add CV download button` |
| `fix` | Corrección de bug | `fix(contact): resolve email validation issue` |
| `docs` | Cambios en documentación | `docs(readme): update installation instructions` |
| `style` | Cambios de formato (no afectan código) | `style(projects): adjust card spacing` |
| `refactor` | Refactorización de código | `refactor(utils): simplify cn function` |
| `test` | Añadir o modificar tests | `test(hero): add unit tests for Hero component` |
| `chore` | Mantenimiento, dependencias | `chore(deps): update next to v15.0.3` |
| `perf` | Mejoras de performance | `perf(images): implement lazy loading` |
| `ci` | Cambios en CI/CD | `ci: add GitHub Actions workflow` |

## Scopes Sugeridos

### Por Componente/Feature
- `hero` - Hero section
- `about` - About section
- `projects` - Projects section
- `contact` - Contact form
- `skills` - Skills section
- `nav` - Navigation
- `footer` - Footer

### Por Área Técnica
- `i18n` - Internacionalización
- `api` - API routes
- `seo` - SEO y metadata
- `deps` - Dependencias
- `config` - Archivos de configuración
- `types` - TypeScript types
- `tests` - Testing

## Reglas de Subject

1. **Máximo 50 caracteres**
2. **No terminar con punto**
3. **Usar imperativo** ("add" no "added" ni "adds")
4. **Minúsculas** para consistencia
5. **Ser específico** y descriptivo

## Body

- Explicar el **qué** y el **por qué**, no el cómo
- Usar viñetas para múltiples cambios
- Separar del subject con línea en blanco

## Footer

- Referenciar issues: `Closes #123` o `Refs #456`
- Breaking changes: `BREAKING CHANGE: description`
- Co-autores: `Co-authored-by: Name <email>`

## Ejemplos Completos

### Ejemplo 1: Feature Simple

```
feat(hero): add professional tagline and CV download button

Implements personalized hero section with Ángel Hidalgo's information
including download CV functionality.

Closes #4
```

### Ejemplo 2: Feature con Múltiples Cambios

```
feat(projects): integrate 10 GitHub repositories with categories

- Add VerifacturGMN, apiGns, FrontendJson, FYNKUS projects
- Create category filters (Facturación, Servicios, Arquitectura, etc.)
- Implement uniform card design without hierarchy
- Add "private repo" notes with access request option

Closes #11, #12, #13
```

### Ejemplo 3: Fix

```
fix(contact): resolve form validation on submit

The form was not properly validating email format before submission,
causing server errors. Added client-side validation with Zod schema.

Fixes #45
```

### Ejemplo 4: Refactor

```
refactor(projects): extract project card to separate component

Improves code maintainability and reusability by extracting
ProjectCard component from Projects.tsx.
```

### Ejemplo 5: Docs

```
docs(readme): update setup instructions for i18n

Added next-intl configuration steps and locale file structure
documentation.
```

### Ejemplo 6: Chore (Dependencias)

```
chore(deps): update dependencies to latest versions

- next: 15.0.2 → 15.0.3
- framer-motion: 11.0.0 → 11.0.5
- typescript: 5.3.0 → 5.3.3
```

### Ejemplo 7: Style

```
style(projects): improve card hover effects and spacing

Adjusted padding and added smooth transition effects for better UX.
```

### Ejemplo 8: Test

```
test(api): add integration tests for contact endpoint

Tests cover successful submission, validation errors, and rate limiting.

Closes #40
```

## Commits con Breaking Changes

```
feat(i18n): migrate to next-intl v3

BREAKING CHANGE: Route structure changed to /[locale]/[...rest].
Update all internal links to include locale prefix.

Migration guide: docs/i18n-migration.md

Closes #23
```

## Multi-Issue Commits

Cuando un commit cierra múltiples issues relacionados:

```
feat(experience): add professional timeline

Implements complete experience section with:
- Timeline component
- Experience data constants
- Responsive design
- Animation effects

Closes #2, #5
```

## Commits Pequeños y Atómicos

✅ **Bueno** (commits atómicos):
```
feat(hero): add personal information constants
feat(hero): implement CV download button
feat(hero): integrate professional image
```

❌ **Malo** (commit muy grande):
```
feat(hero): complete hero section with all features
```

## Verificación Antes de Commit

Antes de hacer commit, verifica:

- [ ] El type es correcto
- [ ] El scope es apropiado (si aplica)
- [ ] El subject es claro y conciso (<50 chars)
- [ ] Usas imperativo en inglés
- [ ] Referencias el issue si aplica
- [ ] El commit es atómico (un solo propósito)

## Herramientas

### Pre-commit Hooks (Opcional)

Puedes usar Husky + commitlint para validar commits automáticamente:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
```

### Template de Commit

Puedes configurar un template global:

```bash
git config commit.template .github/commit_template.txt
```

## Referencias

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)

---

**Nota**: Este proyecto será público y servirá como portfolio demo. Mantener commits limpios y profesionales es esencial para demostrar buenas prácticas de desarrollo.
