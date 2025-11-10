# Changelog · 10/11/2025 · 16:07

## Resumen
- Sección `Skills` en producción con datos normalizados, porcentajes y años de experiencia.
- About enriquecido con métricas de actividad GitHub y estadísticas del audit reciente.
- Mejoras a `Projects`: aviso de repos privados, enlaces a detalle y estructura base para futuras vistas.

## Detalles

### feat(skills): visualización interactiva (#16, #17)
- Crea `src/shared/constants/skills.ts` con categorías (Backend, Frontend, DB, DevOps, IA, Testing), porcentajes y experiencia.
- Añade la feature `Skills` con gráficos de lenguajes, cards por categoría y badges reutilizables.
- Integra la sección en `app/page.tsx` y cubre con pruebas unitarias (`tests/features/skills/Skills.test.tsx`).

### feat(about): métricas GitHub (#18)
- Inserta bloque de estadísticas (contribuciones, repos analizados, activos y fecha de creación).
- Aprovecha `SKILL_SUMMARY` para mantener single source of truth.
- Actualiza tests para validar la presencia del nuevo contenido.

### feat(projects): nota repos privados & skeleton detalle (#19, #20)
- Cada card muestra aviso con contacto directo y añade CTA `Ver detalle`.
- Amplía `Project` con `detailSlug` y expone nueva ruta `app/projects/[slug]/page.tsx` como base (contenido placeholder).
- Ajusta tests de `Projects` para cubrir los nuevos elementos.

### chore(docs)
- `README.md` documenta la sección de skills, stats y la nota actualizada de repos privados.

## Notas
- Las páginas de detalle (`/projects/[slug]`) muestran un placeholder informativo; pendiente completar contenido cuando haya assets definitivos.
- La llanza de demo seguirá oculta mientras no existan URLs públicas; actualizar `PROJECTS` si se habilitan demos.

