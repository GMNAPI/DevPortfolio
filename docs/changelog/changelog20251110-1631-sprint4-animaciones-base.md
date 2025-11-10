# Changelog · 10/11/2025 · 16:31

## Resumen

- Integración base de `framer-motion` para animaciones consistentes con control de accesibilidad.
- Animaciones suaves añadidas en Hero, About, Skills, Projects, Contact y Navigation sin romper tree-shaking.
- Refuerzo de la accesibilidad: sincronización con preferencias de movimiento reducido y estructura ARIA estable.

## Detalles

### feat(shared): proveedor de motion

- Crea `MotionProvider` con `LazyMotion` y `MotionConfig` respetando `prefers-reduced-motion`.
- Define utilidades (`staggerContainer`, `fadeInUp`, `fadeIn`, `scaleTap`) para estandarizar transiciones.
- Ajusta `app/providers.tsx` y `globals.css` para propagar la configuración y respetar usuarios sensibles.

### feat(ui): animaciones secciones principales (#34, #35, #38)

- `Hero`, `About`, `Skills`, `Projects` y `Contact` migran a componentes `m.*`, con apariciones suaves y hover feedback.
- Navegación con entrada animada, menú móvil expandible y CTA con micro-interacción.
- Contacto añade feedback visual con transiciones animadas y mantiene el reset del formulario.

### fix(runtime): compatibilidad LazyMotion

- Sustituye `motion.*` por `m.*` en componentes clientes para evitar errores de tree-shaking.
- Marca explícitamente `'use client'` en secciones que consumen animaciones para evitar ejecuciones server-side.

### feat(api): endpoint de contacto (#30, #31)

- Crea `app/api/contact/route.ts` con validación de dominio (`Contact`) y envío mediante Nodemailer.
- Añade `src/shared/services/email.ts` para centralizar la configuración SMTP vía variables `EMAIL_*`.
- Actualiza `Contact` UI para consumir la API, gestionar estados de error y feedback de éxito.

### test(contact): cobertura de servidor y UI (#33, #39)

- Añade `tests/api/contact/route.test.ts` con doble de `nodemailer` y escenarios de validación/errores.
- Refuerza `tests/features/contact/Contact.test.tsx` simulando `fetch` y validando los nuevos estados visuales.
- Suite completa (`npm test`) y lint en verde tras la integración.

## Notas

- Configurar las variables `EMAIL_*` en `.env.local` o infraestructura antes de desplegar.
- Pendiente revisar Lighthouse tras completar animaciones para ajustar velocidades y accesibilidad si es necesario.
