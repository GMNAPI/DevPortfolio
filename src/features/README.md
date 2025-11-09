# Features Layer

## Purpose

Contains **feature-specific implementations** organized by vertical slices. Each feature is self-contained with its own components, logic, and tests.

## Structure

### `/hero`

Landing section with main CTA

### `/about`

Personal information and tech stack display

### `/projects`

Portfolio projects showcase

### `/contact`

Contact form with validation

## Principles

- **Vertical slicing** - Each feature contains everything it needs
- **Feature cohesion** - Related code stays together
- **Independent features** - Minimal coupling between features
- **Direct core usage** - Can import from `/core` layer

## Dependencies

- `/core` - Business logic and entities
- `/shared` - Shared UI components and utilities
- React and Next.js
