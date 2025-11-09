# Core Layer

## Purpose

Contains the **business logic** and **domain models** of the application. This layer is framework-agnostic and should not depend on external libraries or implementation details.

## Structure

### `/entities`

Domain entities representing core business objects:

- `Project.ts` - Portfolio project entity
- `Contact.ts` - Contact message entity

### `/use-cases`

Application business rules and use cases:

- `getProjects.ts` - Retrieve and filter projects
- `validateContact.ts` - Validate contact form data

## Principles

- **Pure TypeScript** - No React, no Next.js, no external deps
- **Framework independent** - Can be reused in any context
- **Highly testable** - Pure functions and classes
- **Single Responsibility** - Each entity/use-case has one job

## Dependencies

- Only TypeScript types
- Other core modules
