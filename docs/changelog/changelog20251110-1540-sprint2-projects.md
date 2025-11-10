# Changelog · 10/11/2025 · 15:40

## Resumen

- Actualización de los datos de portfolio con 10 proyectos reales organizados por categorías estratégicas.
- Rediseño de la sección `Projects` con grid responsive, badges de tecnologías y filtros interactivos.
- Ajustes en tests y entidades para soportar la nueva estructura de categorías, manteniendo lint y suite completamente en verde.

## Detalles

### data(projects): fuente única de proyectos (#11, #12)

- Crea `PROJECT_CATEGORIES` y `PROJECTS` con información verídica (repositorios privados, stack, descripciones).
- Define `ProjectCategoryId` tipado en la entidad de dominio para garantizar consistencia.
- Expone `PROJECT_CATEGORY_LIST` para facilitar render y filtros.

### feat(projects): UI con grid y filtros (#13, #14, #15)

- Añade `'use client'`, estados locales y memorias para filtrar por categoría.
- Incorpora chips de categorías, contador dinámico y overview descriptivo para cada grupo.
- Mejora tarjetas con badges de tech stack, enlaces estilizados y layout adaptable a 2/3 columnas.

### test(core/projects): cobertura actualizada (#11, #13)

- Ajusta unit tests de `Project` para validar el nuevo `categoryId`.
- Refactoriza pruebas de la feature `Projects` para consumir datos reales y adaptar assertions condicionales de enlaces Demo.

### chore(contact): UX submission

- Reduce tiempo simulado de envío de formulario a 300 ms para mejorar feedback percibido en tests y experiencia local.

## Notas

- El botón "Demo" aparecerá automáticamente al aportar URL en `PROJECTS`; hoy no hay demos públicos.
- Pendiente actualizar `README.md` (Issue #10) con el nuevo detalle de proyectos y roadmap antes de cerrar Sprint 2.
