# Shared Layer

## Purpose

Contains **reusable code** used across multiple features. This includes UI components, custom hooks, utilities, and constants.

## Structure

### `/components/ui`

Reusable UI components (atomic design):

- `Button.tsx` - Button component with variants
- `Card.tsx` - Card container
- `Input.tsx` - Form input with validation

### `/hooks`

Custom React hooks:

- `useIntersectionObserver.ts` - Scroll animations
- `useContactForm.ts` - Form state management

### `/utils`

Helper functions and utilities:

- `validators.ts` - Validation functions
- `formatters.ts` - Data formatting utilities

### `/constants`

Application constants:

- `config.ts` - App configuration
- `metadata.ts` - SEO metadata

## Principles

- **Reusability** - Used by multiple features
- **Single purpose** - Each module does one thing well
- **Well documented** - Clear API and examples
- **Tested** - High test coverage for reliability

## Dependencies

- React and Next.js
- TypeScript
- Tailwind CSS
