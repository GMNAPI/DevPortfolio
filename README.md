# DevPortfolio Monorepo - Ángel Hidalgo Barreiro

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-2.4-3ECC5F?style=for-the-badge&logo=docusaurus)](https://docusaurus.io/)

Monorepo que contiene el portfolio personal y blog técnico de **Ángel Hidalgo Barreiro**, desarrollador full-stack especializado en SaaS, arquitecturas escalables y DevOps, con sede en Barcelona.

> 🚀 **"Desarrollador de cosas | SaaS | Node.js | React | PHP/Symfony"**

Este proyecto no solo sirve como mi portfolio profesional, sino también como demo de buenas prácticas de desarrollo, arquitectura limpia, monorepos y organización de proyectos.

## 📦 Estructura del Monorepo

```
DevPortfolio/
├── apps/
│   ├── portfolio/          # Next.js 15 - Portfolio principal
│   └── lab/                # Docusaurus 2.4 - Blog técnico + Docs
├── .github/workflows/      # CI/CD para ambas apps
├── package.json            # Root workspace config
├── pnpm-workspace.yaml
└── turbo.json             # Turborepo config
```

**URLs de Producción:**
- Portfolio: `https://desenvolupadormaster.vercel.app`
- Lab (Blog + Docs): `https://desenvolupadormaster.vercel.app/lab`

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con Tailwind CSS
- 🌐 **Bilingüe**: Soporte completo para español e inglés con next-intl
- 📱 **Responsive**: Totalmente adaptable a móviles, tablets y desktop
- ♿ **Accesible**: Cumple estándares WAI-ARIA
- ⚡ **Rápido**: Optimizado para performance (Lighthouse >90)
- 🧪 **Testeado**: Cobertura de tests del 80%+
- 🎭 **Animaciones**: Transiciones sutiles con framer-motion
- 🌙 **Dark Mode**: Modo oscuro/claro con persistencia
- 📊 **10 Proyectos Destacados**: Portfolio completo con categorización
- 📧 **Contacto Funcional**: API serverless para formulario de contacto
- 🧠 **Skills Interactivas**: Visualización de habilidades con porcentajes y años de experiencia
- 📈 **Estadísticas GitHub**: Métricas de contribuciones privadas y repositorios activos

## 🏗️ Arquitectura

Este proyecto sigue una **arquitectura limpia simplificada** (Clean Architecture) adaptada para Next.js:

```
/src
├── /core              # 🎯 Domain Layer - Lógica de negocio pura
│   ├── /entities      # Entidades del dominio
│   └── /use-cases     # Casos de uso
│
├── /features          # 📦 Features Layer - Implementación vertical
│   ├── /hero          # Sección Hero con presentación
│   ├── /about         # Timeline de experiencia profesional
│   ├── /skills        # Visualización de skills y métricas técnicas
│   ├── /projects      # Showcase de 10 proyectos con categorías
│   └── /contact       # Formulario con API serverless
│
└── /shared            # 🔧 Shared Layer - Código reutilizable
    ├── /components/ui # Componentes UI atómicos
    ├── /components/layout # Navigation y Footer
    ├── /hooks         # Custom hooks (useScrollSpy)
    ├── /utils         # Utilidades
    └── /constants     # Datos del portfolio

/app                   # Next.js App Router
/tests                 # Tests (espejo de /src)
```

### Principios de Arquitectura

- **Dependency Rule**: Las dependencias solo fluyen hacia adentro
- **Separation of Concerns**: Cada capa tiene responsabilidades claras
- **Testability**: Core 100% testeable con pure functions
- **Scalability**: Fácil añadir nuevas features

Ver [ARCHITECTURE.md](ARCHITECTURE.md) para más detalles.

## 🚀 Tech Stack

### Core

- **Framework**: [Next.js 15](https://nextjs.org/) con App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)

### Features

- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **i18n**: [next-intl](https://next-intl-docs.vercel.app/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Email**: [Nodemailer](https://nodemailer.com/)

### Development

- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
- **Linting**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Fonts**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via next/font

## 📋 Prerequisitos

- **Node.js**: 18.x o superior (20.x recomendado para portfolio)
- **pnpm**: 8.x o superior

```bash
npm install -g pnpm
```

## 🛠️ Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/GMNAPI/DevPortfolio.git
cd DevPortfolio
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar variables de entorno**

Crear archivo `.env.local` en `apps/portfolio/`:

```env
# Email configuration (para formulario de contacto)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
EMAIL_FROM=noreply@example.com
EMAIL_TO=contact@example.com
```

4. **Ejecutar en desarrollo**

```bash
# Ejecutar ambas apps en paralelo
pnpm dev

# O ejecutar individualmente:
pnpm dev:portfolio      # Portfolio en http://localhost:3000
pnpm dev:lab            # Lab en http://localhost:3001
```

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm dev                # Ejecutar ambas apps en paralelo
pnpm dev:portfolio      # Solo portfolio (localhost:3000)
pnpm dev:lab            # Solo lab (localhost:3001)

# Build
pnpm build              # Build de ambas apps
pnpm build:portfolio    # Solo portfolio
pnpm build:lab          # Solo lab

# Calidad de Código
pnpm lint               # Lint en ambas apps
pnpm format             # Formatear todo el código
pnpm format:check       # Verificar formato

# Testing
pnpm test               # Tests en ambas apps
npm run test:ui         # Ejecutar tests con UI de Vitest
npm run test:run        # Ejecutar tests una vez (CI mode)
npm run test:coverage   # Generar reporte de cobertura
```

## 🧪 Testing

El proyecto mantiene una cobertura de tests del 80%+ con Vitest:

```bash
# Ejecutar todos los tests
npm test

# Con UI interactiva
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage
```

## 📦 Proyectos del Portfolio

Este portfolio showcase 10 proyectos reales organizados en 6 categorías:

### 1. Facturación & Compliance

- **VerifacturGMN**: Sistema completo de facturación electrónica compatible con VeriFactu/AEAT
- **FacturaeDocusaurus**: Documentación técnica VERI\*FACTU

### 2. Gestión de Servicios

- **apiGns**: API REST moderna (Symfony 7.3 + API Platform)
- **FrontendJson**: Frontend empresarial (Next.js 15 + TypeScript)

### 3. Arquitectura Avanzada

- **FYNKUS**: Sistema de reservas con Hexagonal Architecture + DDD + CQRS

### 4. ERPs

- **gestionominegocio**: Migración ERP legacy a SaaS moderno
- **vitaliber**: Sistema full-stack de gran escala
- **genesis**: Aplicación enterprise (4M líneas de código)

### 5. Herramientas

- **streamlitGMN**: Simulador de modelo de negocio SaaS

### 6. Educación

- **zend-laminas-tech-tests**: 10 pruebas técnicas para Laminas/Zend

> **Nota**: Los repositorios son privados. Cada card incluye el enlace para solicitar acceso o demo.

## 🌐 i18n (Internacionalización)

El sitio está completamente traducido a:

- 🇪🇸 Español (idioma principal)
- 🇬🇧 Inglés

Cambiar idioma usando el selector en la navegación.

## 🎨 Personalización del Tema

El proyecto soporta modo claro y oscuro con paleta de colores cálidos (beige/marrón):

```css
/* Light mode - Warm neutrals */
--background: #faf8f5 --foreground: #2d2520 --accent: #d4733f /* Dark mode - Brown tones */
  --background: #1c1410 --foreground: #f5f1eb --accent: #e88556;
```

## 🤝 Contribuciones

Este es un proyecto de portfolio personal, pero las sugerencias son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit con [Conventional Commits](.github/COMMIT_CONVENTION.md)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

Ver [CONTRIBUTING.md](.github/CONTRIBUTING.md) para más detalles.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más información.

## 👤 Autor

**Ángel Hidalgo Barreiro**

- 📍 Barcelona, España
- 💼 Desarrollador Full-Stack | SaaS | Arquitecturas Escalables | DevOps
- 📫 [LinkedIn](#) | [GitHub](https://github.com/GMNAPI)

## 🎯 Roadmap

- [x] Setup inicial del proyecto
- [x] Implementar arquitectura limpia
- [x] Diseño responsive
- [x] Dark mode
- [x] **Sprint 1**: Hero personalizado + Timeline de experiencia profesional
- [x] **Sprint 2**: Integración de 10 proyectos con filtros interactivos
- [x] **Sprint 3**: Skills interactivas + Estadísticas GitHub
- [x] **Sprint 4**: Animaciones con framer-motion + API de contacto serverless
- [ ] **Sprint 5**: i18n completo ES/EN con next-intl
- [ ] **Sprint 6**: Optimización SEO + Performance (Lighthouse >90)
- [ ] **Sprint 7**: Accesibilidad WAI-ARIA + Documentación
- [ ] **Milestone**: Hacer repositorio público
- [ ] Blog con MDX (opcional - post-launch)
- [ ] Analytics (opcional - post-launch)

Ver [Issues](https://github.com/GMNAPI/DevPortfolio/issues) y [Milestones](https://github.com/GMNAPI/DevPortfolio/milestones) para progreso detallado.

## 📊 Stats del Proyecto

![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![Test Coverage](https://img.shields.io/badge/Coverage-92%25-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)
![CI/CD](https://img.shields.io/badge/CI%2FCD-passing-brightgreen)

---

**Hecho con ❤️ y ☕ en Barcelona** | Este proyecto es un showcase de buenas prácticas de desarrollo
