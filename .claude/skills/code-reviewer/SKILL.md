---
name: code-reviewer
description: Validate feature implementations against DevPortfolio Clean Architecture standards and coding guidelines. Use when asked to review code, validate implementations, check coding standards, or assess code quality. Generates comprehensive validation reports with compliance scoring, layer-by-layer analysis, and prioritized action items.
allowed-tools: Read, Grep, Glob, Bash, AskUserQuestion
---

## Purpose

Analyze code implementations and generate comprehensive validation reports that identify violations of Clean Architecture principles, coding standards, testing requirements, and i18n completeness. Provide actionable feedback with file:line references and compliance scoring.

---

## DevPortfolio Architecture Reference

### Project Overview

**DevPortfolio**: Personal portfolio website following Clean Architecture principles.

**Tech Stack**:

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4
- **i18n**: next-intl (ES default, EN support)
- **Animations**: Framer Motion
- **Testing**: Vitest + React Testing Library (80%+ coverage REQUIRED)
- **Forms**: React Hook Form + Zod validation
- **Email**: Nodemailer (API routes)

### Clean Architecture - Dependency Rule (CRITICAL)

**Dependencies MUST flow inward only**:

```
app/ → features/ → shared/ → core/ → NOTHING
```

**Rules**:

- ✅ `app/` → can import from `features/`, `shared/`, `core/`
- ✅ `features/` → can import from `shared/` and `core/`
- ✅ `shared/` → can import from `core/`
- ❌ `core/` → CANNOT import from ANYWHERE (pure TypeScript only)

**CRITICAL VIOLATIONS**:

```typescript
// ❌ Framework import in core layer
import { useState } from 'react'; // in src/core/entities/Project.ts

// ❌ Feature importing from another feature
import { Hero } from '@/features/hero'; // in src/features/about/About.tsx

// ✅ CORRECT patterns
import { Project } from '@/core/entities/Project'; // features → core
import { Button } from '@/shared/components/ui/Button'; // features → shared
```

### Path Aliases

```typescript
@/core/*        → ./src/core/*
@/features/*    → ./src/features/*
@/shared/*      → ./src/shared/*
@/app/*         → ./app/*
@/i18n/*        → ./src/i18n/*
@/messages/*    → ./messages/*
```

### i18n Requirements (CRITICAL)

**ALL user-facing text MUST use next-intl translation system.**

**CRITICAL VIOLATIONS**:

```tsx
// ❌ Hardcoded text (any language)
<h1>Welcome to my portfolio</h1>
<button>Enviar</button>
<p>Read more</p>

// ✅ CORRECT
const t = useTranslations('home');
<h1>{t('welcome')}</h1>
<button>{t('submit')}</button>
<p>{t('readMore')}</p>
```

### Testing Requirements (CRITICAL)

**Coverage Thresholds**: 80% minimum (lines, functions, branches, statements)

**Test Structure**:

```
tests/
├── core/entities/        # Entity tests
├── core/use-cases/       # Use-case tests
├── features/[feature]/   # Component tests
└── shared/               # Hook/utility tests
```

**CRITICAL**: Tests must achieve 80%+ coverage or CI fails.

---

## Validation Methodology

### Step 1: Git Branch Analysis

**Purpose**: Identify changed files and ensure not validating on main/master.

**Tasks**:

1. Check current git branch
2. Prevent validation on `main` or `master` branches
3. Get list of changed files (committed + uncommitted)
4. Categorize files by layer (core, features, shared, app)

**Git Commands**:

```bash
# Get current branch
git branch --show-current

# Get changed files (committed)
git diff --name-only master...HEAD

# Get uncommitted changes
git diff --name-only
git diff --name-only --cached
```

**Example Output**:

```
Current Branch: feature/blog
Files Changed (12):
  - src/core/entities/BlogPost.ts (ADDED)
  - src/features/blog/Blog.tsx (ADDED)
  - src/features/blog/BlogList.tsx (ADDED)
  - src/features/blog/BlogCard.tsx (ADDED)
  - messages/es.json (MODIFIED)
  - messages/en.json (MODIFIED)
  - tests/features/blog/Blog.test.tsx (ADDED)
```

---

### Step 2: Requirements Validation

**Purpose**: Compare implementation against original requirements (if provided).

**Tasks**:

1. Read feature documentation (if provided)
2. Extract requirements list
3. Verify each requirement is implemented
4. Flag missing or partial implementations

**Example Output**:

```
Requirements Validation:
✅ Implemented (8/10):
  1. Display blog posts in grid layout
  2. Filter posts by tag
  3. Show recent posts indicator
  4. Responsive design
  5. Dark mode support
  6. Spanish/English translations
  7. Reading time display
  8. Post card with excerpt

⚠️ Partially Implemented (1/10):
  9. Search functionality (UI only, no backend)

❌ Missing (1/10):
  10. Export posts to PDF
```

---

### Step 3: Core Layer Validation

**Purpose**: Ensure core layer contains only pure TypeScript, no framework dependencies.

**Files to Check**: `src/core/**/*.ts`

**Validation Checklist**:

#### 3.1 No Framework Dependencies (CRITICAL)

```typescript
// ❌ CRITICAL VIOLATION
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ✅ CORRECT - Pure TypeScript only
export interface ProjectData {
  id: string;
  title: string;
}

export class Project {
  // Pure TypeScript implementation
}
```

**Grep Pattern**:

```bash
# Check for React imports in core/
grep -r "from 'react'" src/core/
grep -r "from 'next" src/core/

# Should return NO matches
```

#### 3.2 Entity Validation

**Requirements**:

- ✅ Constructor validates all input data
- ✅ Properties are `readonly`
- ✅ Methods contain business logic only
- ✅ No side effects (no API calls, no localStorage)
- ✅ `toJSON()` method for serialization

**Example Validation**:

```typescript
// ✅ CORRECT Entity
export class BlogPost {
  readonly id: string;
  readonly title: string;

  constructor(data: BlogPostData) {
    this.validate(data); // ✅ Validation in constructor
    Object.assign(this, data);
  }

  private validate(data: BlogPostData): void {
    if (!data.title) throw new Error('Title required');
  }

  hasTag(tag: string): boolean {
    // ✅ Business logic
    return this.tags.includes(tag);
  }
}

// ❌ VIOLATIONS
export class BlogPost {
  title: string; // ❌ Not readonly

  constructor(data: BlogPostData) {
    this.title = data.title; // ❌ No validation
  }

  async save(): Promise<void> {
    // ❌ Side effect (API call)
    await fetch('/api/blog', { method: 'POST' });
  }
}
```

#### 3.3 Use-Case Validation

**Requirements**:

- ✅ Pure functions (input → output)
- ✅ No side effects
- ✅ Fully testable
- ✅ JSDoc documentation

**Example Validation**:

```typescript
// ✅ CORRECT Use-Case
/**
 * Filter blog posts by tag
 * @param posts - Array of blog posts
 * @param tag - Tag to filter by
 * @returns Filtered array
 */
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter((post) => post.hasTag(tag));
}

// ❌ VIOLATION - Side effect
export function loadPosts(): Promise<BlogPost[]> {
  // ❌ Side effect
  return fetch('/api/posts').then((r) => r.json());
}
```

**Core Layer Score Calculation**:

```
Total Checks: 10
Passed: 8
Failed: 2 (Framework imports, mutable property)

Score: 8/10 = 80%
```

---

### Step 4: Features Layer Validation

**Purpose**: Ensure feature components follow React 19 + Next.js 15 patterns.

**Files to Check**: `src/features/**/*.tsx`

**Validation Checklist**:

#### 4.1 Client/Server Component Designation

```tsx
// ✅ CORRECT - Client component with hooks
'use client';

import { useState } from 'react';

export function Blog() {
  const [state, setState] = useState();
  // ...
}

// ✅ CORRECT - Server component (no hooks)
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('page');
  return <h1>{t('title')}</h1>;
}

// ❌ VIOLATION - Missing 'use client' with hooks
import { useState } from 'react'; // ❌ No 'use client' directive

export function Blog() {
  const [state, setState] = useState(); // ❌ Error
}
```

#### 4.2 Translation Usage (CRITICAL)

**All user-facing text MUST be translated.**

```tsx
// ❌ CRITICAL VIOLATIONS
<h1>Welcome to my blog</h1> // ❌ Hardcoded English
<button>Enviar</button> // ❌ Hardcoded Spanish
<p>Read more...</p> // ❌ Hardcoded text

// ✅ CORRECT
const t = useTranslations('blog');
<h1>{t('welcome')}</h1>
<button>{t('submit')}</button>
<p>{t('readMore')}</p>
```

**Grep Pattern**:

```bash
# Find potential hardcoded strings in JSX
grep -n '>[ ]*[A-Z][a-z]' src/features/**/*.tsx
grep -n '>[ ]*[0-9]' src/features/**/*.tsx
```

**Manual Check**: Review each match to verify if it's user-facing text.

#### 4.3 Props TypeScript Interfaces

```tsx
// ✅ CORRECT - Props interface defined
interface BlogCardProps {
  post: BlogPost;
  onSelect?: (id: string) => void;
}

export function BlogCard({ post, onSelect }: BlogCardProps) {
  // ...
}

// ❌ VIOLATION - No props interface
export function BlogCard({ post, onSelect }) {
  // ❌ No types
  // ...
}
```

#### 4.4 Imports from Correct Layers

```tsx
// ✅ CORRECT - Features can import from core and shared
import { BlogPost } from '@/core/entities/BlogPost';
import { filterPostsByTag } from '@/core/use-cases/blogPosts';
import { Button } from '@/shared/components/ui/Button';
import { useDebounce } from '@/shared/hooks/useDebounce';

// ❌ VIOLATION - Feature importing from another feature
import { Hero } from '@/features/hero/Hero'; // ❌ Cross-feature import
```

**Features Layer Score Calculation**:

```
Total Checks: 20
Passed: 16
Failed: 4 (2 missing translations, 1 missing 'use client', 1 wrong import)

Score: 16/20 = 80%
```

---

### Step 5: Shared Layer Validation

**Purpose**: Ensure shared components/hooks are reusable and properly typed.

**Files to Check**: `src/shared/**/*.tsx`, `src/shared/**/*.ts`

**Validation Checklist**:

#### 5.1 UI Components

```tsx
// ✅ CORRECT - Reusable, typed, accessible
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'default', className, ...props }: ButtonProps) {
  return <button className={cn('px-4 py-2', className)} {...props} />;
}

// ❌ VIOLATION - Feature-specific logic
export function Button({ onClick }: any) {
  // ❌ No types
  const posts = fetchBlogPosts(); // ❌ Feature-specific logic
  return <button onClick={onClick}>Click</button>;
}
```

#### 5.2 Custom Hooks

```tsx
// ✅ CORRECT - Reusable hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // ✅ Cleanup
  }, [value, delay]);

  return debouncedValue;
}

// ❌ VIOLATION - Missing cleanup
export function useInterval(callback: () => void, delay: number) {
  useEffect(() => {
    const timer = setInterval(callback, delay);
    // ❌ Missing cleanup - memory leak
  }, [callback, delay]);
}
```

**Shared Layer Score Calculation**:

```
Total Checks: 8
Passed: 7
Failed: 1 (Missing cleanup in hook)

Score: 7/8 = 87.5%
```

---

### Step 6: Translation Completeness

**Purpose**: Verify all text is translated in both ES and EN.

**Files to Check**: `messages/es.json`, `messages/en.json`

**Validation Checklist**:

#### 6.1 Translation Keys Match

```bash
# Extract keys from es.json
jq -r 'keys[]' messages/es.json > es-keys.txt

# Extract keys from en.json
jq -r 'keys[]' messages/en.json > en-keys.txt

# Compare
diff es-keys.txt en-keys.txt
```

**Expected**: No differences (all keys exist in both files)

#### 6.2 No Missing Translations

```json
// ✅ CORRECT - All keys have values
{
  "blog": {
    "title": "Blog",
    "subtitle": "Artículos sobre desarrollo",
    "readMore": "Leer más"
  }
}

// ❌ VIOLATION - Empty values
{
  "blog": {
    "title": "Blog",
    "subtitle": "", // ❌ Empty value
    "readMore": "Leer más"
  }
}
```

#### 6.3 Component Text Coverage

**Manual Check**:

1. Read component files
2. Find all `t('keyName')` calls
3. Verify each key exists in `messages/es.json` and `messages/en.json`
4. Flag missing keys

**Translation Completeness Score**:

```
Total Text Elements: 45
Translated (ES): 45/45 (100%)
Translated (EN): 43/45 (95.5%) - 2 missing

Score: 95.5%
```

---

### Step 7: Testing Coverage Analysis

**Purpose**: Verify test coverage meets 80%+ threshold.

**Commands**:

```bash
# Run tests with coverage
npm run test:coverage

# Parse coverage output
# Expected format:
# File                     | % Stmts | % Branch | % Funcs | % Lines
# src/core/entities/*.ts   |   95.2  |   92.1   |   100   |   94.8
# src/features/**/*.tsx    |   85.3  |   82.5   |   88.2  |   86.1
# Overall                  |   87.4  |   84.2   |   90.1  |   88.3
```

**Validation**:

- ✅ Overall coverage ≥ 80% (lines, functions, branches, statements)
- ⚠️ Coverage < 80% triggers warning
- ❌ Coverage < 70% is CRITICAL

**Missing Tests Detection**:

```bash
# Find files without corresponding tests
for file in src/**/*.tsx; do
  test_file="tests/${file#src/}"
  test_file="${test_file%.tsx}.test.tsx"
  if [ ! -f "$test_file" ]; then
    echo "Missing test: $test_file"
  fi
done
```

**Testing Score Calculation**:

```
Coverage: 87.4%
Threshold: 80%

Files with Tests: 32/35 (91.4%)
Missing Tests: 3

Score: 87.4% (PASS)
```

---

### Step 8: Security & Performance Analysis

#### 8.1 Security Checks

**XSS Vulnerabilities**:

```tsx
// ❌ CRITICAL - Unescaped user input
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // ❌ XSS risk

// ✅ CORRECT - React auto-escapes
<div>{userInput}</div>
```

**API Route Validation**:

```typescript
// ❌ CRITICAL - No input validation
export async function POST(request: Request) {
  const data = await request.json();
  await sendEmail(data); // ❌ No validation
}

// ✅ CORRECT - Zod validation
const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json();
  const data = schema.parse(body); // ✅ Validated
  await sendEmail(data);
}
```

#### 8.2 Performance Checks

**Large Bundle Imports**:

```tsx
// ❌ VIOLATION - Importing entire library
import _ from 'lodash'; // ❌ 70KB bundle

// ✅ CORRECT - Tree-shaking
import { debounce } from 'lodash-es';
```

**Unoptimized Images**:

```tsx
// ❌ VIOLATION - <img> tag
<img src="/hero.png" alt="Hero" />;

// ✅ CORRECT - next/image
import Image from 'next/image';
<Image src="/hero.png" alt="Hero" width={800} height={600} />;
```

**Security & Performance Score**:

```
Security Checks: 5
Passed: 4
Failed: 1 (Unescaped user input in BlogPost)

Performance Checks: 3
Passed: 3
Failed: 0

Score: 7/8 = 87.5%
```

---

## Violation Severity Levels

### CRITICAL ❌

**Impact**: Breaks build, violates core principles, security risk
**Must Fix**: Before merge

**Examples**:

- Framework imports in core layer
- Missing translations (breaks i18n)
- Test coverage < 70%
- XSS vulnerabilities
- Unvalidated API inputs

### HIGH ⚠️

**Impact**: Code quality issues, potential bugs
**Should Fix**: Before merge (recommended)

**Examples**:

- Missing TypeScript interfaces
- Business logic in components
- Missing cleanup in useEffect
- Test coverage 70-79%
- Missing accessibility labels

### MEDIUM 💡

**Impact**: Best practices, maintainability
**Can Fix**: In follow-up PR

**Examples**:

- Missing JSDoc comments
- Inconsistent naming
- Could extract to custom hook
- Missing error boundaries

### LOW ℹ️

**Impact**: Stylistic, minor improvements
**Optional**: Nice to have

**Examples**:

- Could use const instead of let
- Could destructure props
- Could add more specific type

---

## Validation Report Template

```markdown
# Implementation Validation Report: [Feature Name]

**Generated**: [Date]
**Branch**: [branch-name]
**Reviewed By**: Claude Code (code-reviewer skill)

---

## Executive Summary

**Overall Status**: [✅ PASS / ⚠️ PASS WITH ISSUES / ❌ FAIL]
**Compliance Score**: [X/100]

**Files Changed**: [N]
**Lines Added**: [+XXX]
**Lines Removed**: [-XXX]

**Summary**:

- ✅ [N] checks passed
- ⚠️ [N] warnings
- ❌ [N] critical violations

---

## Git Branch Analysis

**Current Branch**: `[branch-name]`
**Base Branch**: `master`

**Changed Files ([N])**:
```

Core Layer (N files):

- src/core/entities/[Entity].ts (ADDED, XXX lines)
- src/core/use-cases/[feature].ts (ADDED, XXX lines)

Features Layer (N files):

- src/features/[feature]/[Feature].tsx (ADDED, XXX lines)
  M src/features/[feature]/[Component].tsx (MODIFIED, +XX/-XX lines)

Shared Layer (N files):
M src/shared/constants/[file].ts (MODIFIED, +XX lines)

Translations (2 files):
M messages/es.json (MODIFIED, +XX keys)
M messages/en.json (MODIFIED, +XX keys)

Tests (N files):

- tests/core/entities/[Entity].test.ts (ADDED, XXX lines)
- tests/features/[feature]/[Feature].test.tsx (ADDED, XXX lines)

````

---

## Requirements Validation

✅ **Implemented ([X]/[Y])**:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

⚠️ **Partially Implemented ([X]/[Y])**:
1. [Requirement with partial implementation]
   - Missing: [What's missing]

❌ **Missing ([X]/[Y])**:
1. [Missing requirement]

---

## Critical Violations ❌

### 1. Framework Dependency in Core Layer (CRITICAL)

**File**: `src/core/entities/[Entity].ts:1`

```typescript
// ❌ WRONG
import { useState } from 'react';

export class [Entity] {
  // ...
}
````

**Fix**:

```typescript
// ✅ CORRECT - Pure TypeScript only
export interface [Entity]Data {
  // ...
}

export class [Entity] {
  // Pure TypeScript implementation, no React
}
```

**Impact**: Violates Clean Architecture dependency rule (core → NO dependencies)
**Time to Fix**: 15 minutes

---

### 2. Missing Translations (CRITICAL)

**File**: `src/features/[feature]/[Component].tsx:23-30`

**Found [N] instances of hardcoded text**:

```tsx
// ❌ WRONG
<div>
  <h2>Latest Blog Posts</h2>
  <button>Read More</button>
  <p>Published on {date}</p>
  <span>5 min read</span>
</div>
```

**Fix**:

```tsx
// ✅ CORRECT
'use client';
import { useTranslations } from 'next-intl';

export function Component() {
  const t = useTranslations('[feature]');

  return (
    <div>
      <h2>{t('latestPosts')}</h2>
      <button>{t('readMore')}</button>
      <p>{t('publishedOn', { date })}</p>
      <span>{t('readTime', { minutes: 5 })}</span>
    </div>
  );
}
```

**Also update translation files**:

`messages/es.json`:

```json
{
  "[feature]": {
    "latestPosts": "Últimas Publicaciones",
    "readMore": "Leer Más",
    "publishedOn": "Publicado el {date}",
    "readTime": "{minutes} min de lectura"
  }
}
```

`messages/en.json`:

```json
{
  "[feature]": {
    "latestPosts": "Latest Posts",
    "readMore": "Read More",
    "publishedOn": "Published on {date}",
    "readTime": "{minutes} min read"
  }
}
```

**Impact**: Breaks multi-language support (ES/EN), violates i18n standards
**Time to Fix**: 30 minutes

---

### 3. Test Coverage Insufficient (CRITICAL)

**Current Coverage**: [XX]%
**Required**: 80%
**Gap**: [XX]%

**Files with Insufficient Coverage**:

- `src/features/[feature]/[Component].tsx`: [XX]% (need +[XX]%)
- `src/core/use-cases/[useCase].ts`: [XX]% (need +[XX]%)

**Missing Tests**:

- [ ] `tests/features/[feature]/[Component].test.tsx` - Component rendering tests
- [ ] `tests/features/[feature]/[Component].test.tsx` - User interaction tests
- [ ] `tests/core/use-cases/[useCase].test.ts` - Use-case unit tests

**Recommendation**:
Add comprehensive test suites:

- Entity validation tests (4-6 tests)
- Use-case logic tests (3-5 tests)
- Component rendering tests (5-8 tests)
- User interaction tests (3-5 tests)
- Accessibility tests (2-3 tests)

**Estimated Time**: 2-3 hours

**Impact**: CI pipeline will fail, blocks merge
**Time to Fix**: 2-3 hours

---

## Layer-by-Layer Analysis

### Core Layer Validation

**Score**: [X]/10

**Files Reviewed**:

- `src/core/entities/[Entity].ts` ([XXX] lines)
- `src/core/use-cases/[feature].ts` ([XXX] lines)

✅ **Passes ([X]/[Y])**:

- NO framework dependencies (pure TypeScript)
- Entities have validation in constructor
- Use-cases are pure functions
- Proper TypeScript interfaces

❌ **Failures ([X]/[Y])**:

- **CRITICAL**: React import found
  - File: `src/core/entities/[Entity].ts:1`
  - Issue: `import { useState } from 'react'`
  - Fix: Remove all framework imports
  - Impact: Violates dependency rule

---

### Features Layer Validation

**Score**: [X]/10

**Files Reviewed**:

- `src/features/[feature]/[Feature].tsx` ([XXX] lines)
- `src/features/[feature]/[Component].tsx` ([XXX] lines)

✅ **Passes ([X]/[Y])**:

- Component structure follows pattern
- Props properly typed
- Uses custom hooks from shared/
- Framer Motion animations included

❌ **Failures ([X]/[Y])**:

- **Missing Translation** (CRITICAL)
  - File: `src/features/[feature]/[Feature].tsx:23-30`
  - Issue: [N] hardcoded strings found
  - Fix: Use `useTranslations()` hook for all text
  - Impact: Breaks i18n support (ES/EN)

- **Missing 'use client' Directive** (HIGH)
  - File: `src/features/[feature]/[Component].tsx:1`
  - Issue: Component uses hooks but missing `'use client'`
  - Fix: Add `'use client'` at top of file
  - Impact: Runtime error in production

---

### Shared Layer Validation

**Score**: [X]/10

**Files Reviewed**:

- `src/shared/components/ui/[Component].tsx`
- `src/shared/hooks/[hookName].ts`

✅ **Passes ([X]/[Y])**:

- Components are reusable
- Proper TypeScript interfaces
- Accessibility built-in
- Dark mode support

❌ **Failures ([X]/[Y])**:

- **Missing Cleanup** (HIGH)
  - File: `src/shared/hooks/[hook].ts:15`
  - Issue: useEffect missing cleanup function
  - Fix: Add cleanup in return statement
  - Impact: Memory leak

---

### Translation Validation

**Score**: [X]/10

✅ **Passes**:

- Translation files exist (es.json, en.json)
- Most components use `useTranslations()`

❌ **Failures**:

- **Missing Keys** (CRITICAL)
  - [N] translation keys missing in `messages/en.json`
  - Keys exist in ES but not EN
  - Impact: Breaks English locale

- **Hardcoded Strings** (CRITICAL)
  - [N] instances of hardcoded text found
  - Files: [list files with violations]
  - Impact: Text not translatable

---

### Testing Validation

**Score**: [X]/10

**Coverage Analysis**:

```
File                              | Stmts | Branch | Funcs | Lines
src/core/entities/[Entity].ts     | 95.2% | 92.1%  | 100%  | 94.8%
src/core/use-cases/[feature].ts   | 88.3% | 85.2%  | 90.5%  | 89.1%
src/features/[feature]/*.tsx      | 78.5% | 75.3%  | 82.1%  | 79.2%

Overall Coverage                  | 82.4% | 79.8%  | 86.2%  | 83.5%
```

✅ **Passes**:

- Entity tests comprehensive (95%+ coverage)
- Use-case tests good (88%+coverage)
- Overall coverage above 80% threshold

⚠️ **Warnings**:

- Feature components at 78.5% (below 80%)
- Branch coverage at 79.8% (below 80%)

**Recommendation**: Add 3-5 more component tests to reach 80%+ feature coverage.

---

### Security & Performance Analysis

**Score**: [X]/10

✅ **Security Passes**:

- No `dangerouslySetInnerHTML` usage
- API routes have validation
- No exposed secrets

❌ **Security Violations**:

- None found

✅ **Performance Passes**:

- Using next/image for images
- Tree-shaking imports
- Lazy loading components

❌ **Performance Violations**:

- None found

---

## Action Items (Prioritized)

### Critical (Fix Before Merging) ❌

**Estimated Total Time**: [X] hours

- [ ] **Remove framework import from core layer** (15 min)
  - File: `src/core/entities/[Entity].ts:1`
  - Remove `import { useState } from 'react'`

- [ ] **Add missing translations** (30 min)
  - Files: `src/features/[feature]/*.tsx`
  - Use `useTranslations()` for all text
  - Update `messages/es.json` and `messages/en.json`

- [ ] **Increase test coverage to 80%+** (2-3 hours)
  - Add component tests for `[Feature].tsx`
  - Add interaction tests
  - Add accessibility tests

**Total Critical Items**: [N]
**Total Time**: [X] hours

---

### High Priority (Recommended Before Merge) ⚠️

**Estimated Total Time**: [X] hours

- [ ] **Add 'use client' directive** (5 min)
  - File: `src/features/[feature]/[Component].tsx:1`

- [ ] **Add cleanup to useEffect** (10 min)
  - File: `src/shared/hooks/[hook].ts:15`
  - Return cleanup function

**Total High Items**: [N]
**Total Time**: [X] minutes

---

### Medium Priority (Can Fix Later) 💡

- [ ] Add JSDoc comments to public methods
- [ ] Extract repeated logic into custom hook
- [ ] Add error boundary for [Feature]

**Total Medium Items**: [N]

---

### Low Priority (Optional) ℹ️

- [ ] Refactor: Could use destructuring for props
- [ ] Consider: Add loading skeleton

**Total Low Items**: [N]

---

## Compliance Score Breakdown

| Category               | Score       | Weight | Weighted Score |
| ---------------------- | ----------- | ------ | -------------- |
| Core Layer             | [X]/10      | 25%    | [X]/25         |
| Features Layer         | [X]/10      | 20%    | [X]/20         |
| Shared Layer           | [X]/10      | 10%    | [X]/10         |
| Translations           | [X]/10      | 15%    | [X]/15         |
| Testing                | [X]/10      | 20%    | [X]/20         |
| Security & Performance | [X]/10      | 10%    | [X]/10         |
| **Overall**            | **[X]/100** |        | **[X]/100**    |

---

## Compliance Rating

| Score Range | Rating               | Description                      |
| ----------- | -------------------- | -------------------------------- |
| 90-100      | ⭐⭐⭐⭐⭐ Excellent | Production-ready, minimal issues |
| 80-89       | ⭐⭐⭐⭐ Good        | Minor improvements needed        |
| 70-79       | ⭐⭐⭐ Fair          | Several issues, needs work       |
| 60-69       | ⭐⭐ Poor            | Significant issues, not ready    |
| < 60        | ⭐ Critical          | Major violations, must address   |

**Your Score**: [X]/100 - [Rating]

---

## Ready for Production?

[✅ YES / ⚠️ YES WITH FIXES / ❌ NO]

**Recommendation**:
[Based on score, provide recommendation]

**If YES WITH FIXES**:

1. Address all CRITICAL violations ([N] items, ~[X] hours)
2. Consider addressing HIGH violations ([N] items, ~[X] minutes)
3. Re-run validation after fixes
4. Merge when compliance ≥ 80%

**If NO**:

1. Critical violations must be fixed before merge
2. Test coverage must reach 80%+
3. All translations must be complete
4. Estimated time to production-ready: [X] hours

---

## Next Steps

1. **Fix Critical Violations** ([N] items)
   - Estimated time: [X] hours
   - Priority: IMMEDIATE

2. **Address High Priority Items** ([N] items)
   - Estimated time: [X] minutes
   - Priority: Before merge

3. **Re-run Validation**

   ```bash
   # After fixes, re-run code-reviewer
   "Review my implementation on [branch]"
   ```

4. **Merge Checklist**
   - [ ] All critical violations fixed
   - [ ] Test coverage ≥ 80%
   - [ ] Translations complete (ES + EN)
   - [ ] CI pipeline passing
   - [ ] Code review approved

---

**Report Generated**: [Date]
**Validation Skill Version**: 1.0.0
**Target Project**: DevPortfolio (Next.js 15 + React 19 + TypeScript 5)

```

---

## Invocation Examples

### Example 1: Review Feature Implementation

```

User: "Review my blog feature implementation on feature/blog branch"

Claude: [Invokes code-reviewer skill]

1. Checks git branch: feature/blog ✅
2. Gets changed files: 12 files found
3. Analyzes each file layer-by-layer
4. Identifies 3 critical violations
5. Calculates compliance score: 76/100
6. Generates comprehensive report

Output: validation-report-blog-2025-12-10.md (800+ lines)

```

### Example 2: Quick Validation

```

User: "Quick code review on my current changes"

Claude: [Invokes code-reviewer skill]

Output: Shortened report focusing on critical issues only

```

### Example 3: Pre-Merge Checklist

```

User: "Am I ready to merge feature/contact-form?"

Claude: [Invokes code-reviewer skill]

Output:

- Compliance: 88/100 ⭐⭐⭐⭐
- Status: ✅ READY (with minor fixes)
- 2 HIGH priority items to address
- Estimated fix time: 20 minutes

```

---

## Final Checklist Before Validation

1. **Git Branch**:
   - [ ] Not on main/master
   - [ ] Has committed or uncommitted changes

2. **Requirements** (optional):
   - [ ] Feature documentation available

3. **Files to Analyze**:
   - [ ] Core layer files exist
   - [ ] Feature layer files exist
   - [ ] Translation files updated
   - [ ] Test files created

4. **Tools Available**:
   - [ ] Git installed
   - [ ] npm test command works
   - [ ] Can read all project files

---

**Skill Version**: 1.0.0
**Last Updated**: 2025-12-10
**Target Project**: DevPortfolio (Next.js 15 + React 19 + TypeScript 5)
```
