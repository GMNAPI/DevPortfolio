# Changelog · 10/11/2025 · 23:13

## Resumen

- Nueva visualización de habilidades con gráfico donut y leyenda dinámica para comunicar el stack de un vistazo.
- Localización completa de la navegación y el footer, incluyendo selector de idioma accesible y enlaces sociales traducidos.
- Refactor de tests asociados para cubrir la nueva UI y las cadenas i18n.

## Detalles

### feat(skills): visualización híbrida con donut (#17)

- Sustituye el sumario plano por un gráfico `conic-gradient` animado y leyenda multicolor ligada a `mainLanguagesShare`.
- Mantiene las tarjetas de categorías, ahora con etiquetas y progresos dependientes de `next-intl`.
- Añade textos de soporte (`visualization.title`, `visualization.legendLabel`, etc.) en `messages/es.json` y `messages/en.json`.

### feat(layout): selector de idioma e i18n en navegación/footer (#28)

- Refactoriza `Navigation` para consumir `next-intl`, ofrecer selector de idioma (desktop y mobile) y preservar el hash actual al cambiar de locale.
- Centraliza la configuración en `NAV_SECTIONS` y `SOCIAL_LINK_URLS` y expone las etiquetas a través de las traducciones.
- Actualiza `Footer` para leer el branding, tagline y accesibilidad de enlaces desde i18n.

### test: cobertura para UI localizada

- Envuelve pruebas de `Navigation`, `Footer` y `Skills` con `NextIntlClientProvider` y añade assertions específicas del nuevo gráfico y switcher.
- Ejecución de `npm run lint` y `npm run test` sin incidencias tras los cambios.

## Notas

- Evaluar una librería ligera de charts si se requiere interactividad adicional (tooltips o filtros) en futuras iteraciones.
- Actualizar los enlaces reales de GitHub/LinkedIn cuando se disponga de las URLs definitivas en producción.

