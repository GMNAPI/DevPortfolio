# Changelog · 10/11/2025 · 15:20

## Resumen
- Rediseño completo de `About` como un timeline profesional e incorporación de certificaciones.
- Mejora del Hero con layout bi-columnar, imagen profesional y CTA de descarga de CV.
- Centralización de datos de carrera y actualización de la información personal utilizada en la UI.

## Detalles

### feat(about): timeline y certificaciones (#5, #9)
- Sustituye la sección estática por un timeline responsivo con hitos reales importados desde `@/shared/constants/career`.
- Añade cuadrícula de certificaciones reutilizable y mantiene el stack tecnológico como bloque final.

### feat(shared): datos de carrera reutilizables (#5, #8, #9)
- Crea `@/shared/constants/career` con experiencias y certificaciones provenientes del CV oficial.
- Garantiza formato tipado para futuras extensiones (p. ej. certificaciones adicionales o links a credenciales).

### feat(hero): imagen profesional y CTA CV (#6, #7)
- Ajusta Hero a un layout dividido: contenido textual + contenedor visual para la imagen.
- Integra placeholder SVG en `public/images/avatar-placeholder.svg` y enlaza descarga a `/documents/cv-angel-hidalgo-barreiro.pdf`.
- Refresca la información personal (`email`, `avatar`, `cvUrl`) en `@/shared/constants/personal`.

## Notas
- Sustituir el placeholder `avatar-placeholder.svg` por la imagen definitiva cuando esté disponible.
- Colocar el PDF final del CV en `public/documents/cv-angel-hidalgo-barreiro.pdf` para completar el flujo de descarga.

