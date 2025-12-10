# Claude Code Skills - Usage Examples

Comprehensive examples demonstrating how to use the DevPortfolio Claude Code skills for planning, code review, component generation, and test writing.

---

## Skill 1: feature-planner

### Example 1: Planning a Blog Feature from Requirements

**User Request**:
```
I want to add a blog section to my portfolio with the following requirements:
- Display blog posts in a grid layout
- Filter posts by tags (React, TypeScript, Next.js, etc.)
- Show reading time and publish date
- Support ES/EN translations
- Recent posts should be highlighted
- Posts should link to full article pages

Create an implementation plan following Clean Architecture.
```

**Claude Response** (invokes feature-planner skill):

```markdown
# Feature Implementation Plan: Blog System

## Overview

**Feature**: Blog system with list view, filtering, and detail pages
**Complexity**: Medium
**Estimated Total Time**: 16-20 hours
**Dependencies**: None

---

## Phase 1: Entity & Type Design

**Estimated Time**: 2 hours

**Tasks**:
1. Define `BlogPostData` interface - 20 min
2. Create `BlogPost` entity class with validation - 1 hour
3. Add business logic methods (hasTag, isRecent) - 30 min
4. Document entity with JSDoc - 10 min

**Files to Create**:
- [ ] `src/core/entities/BlogPost.ts` - Domain entity class

**Example Code**:
```typescript
// src/core/entities/BlogPost.ts
export interface BlogPostData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: Date;
  tags: string[];
  author: string;
  readingTimeMinutes: number;
}

export class BlogPost {
  readonly id: string;
  readonly title: string;
  // ... (full implementation)

  constructor(data: BlogPostData) {
    this.validate(data);
    Object.assign(this, data);
  }

  private validate(data: BlogPostData): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Title is required');
    }
    // ... more validation
  }

  get isRecent(): boolean {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return this.publishedAt >= thirtyDaysAgo;
  }

  hasTag(tag: string): boolean {
    return this.tags.some(t => t.toLowerCase() === tag.toLowerCase());
  }
}
```

---

## Phase 2: Core Layer (Use Cases)

**Estimated Time**: 3 hours

**Tasks**:
1. Create `filterPostsByTag()` function - 30 min
2. Create `sortPostsByDate()` function - 30 min
3. Create `getAllTags()` function - 30 min
4. Create `searchPosts()` function - 1 hour
5. Write unit tests for all use-cases - 30 min

**Files to Create**:
- [ ] `src/core/use-cases/blogPosts.ts` - Pure functions

**Example Code**:
```typescript
// src/core/use-cases/blogPosts.ts
import { BlogPost } from '@/core/entities/BlogPost';

export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  if (!tag || tag.trim() === '') return posts;
  return posts.filter(post => post.hasTag(tag));
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) =>
    b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
```

---

[... continues with all 8 phases ...]

---

## Files Checklist

### Core Layer
- [ ] `src/core/entities/BlogPost.ts` (150 lines)
- [ ] `src/core/use-cases/blogPosts.ts` (100 lines)

### Features Layer
- [ ] `src/features/blog/Blog.tsx` (120 lines)
- [ ] `src/features/blog/BlogList.tsx` (60 lines)
- [ ] `src/features/blog/BlogCard.tsx` (80 lines)

### App Router
- [ ] `app/[locale]/blog/page.tsx` (40 lines)
- [ ] `app/[locale]/blog/[slug]/page.tsx` (60 lines)

### Translations
- [ ] `messages/es.json` (+18 keys)
- [ ] `messages/en.json` (+18 keys)

### Tests
- [ ] `tests/core/entities/BlogPost.test.ts` (180 lines, 15 tests)
- [ ] `tests/core/use-cases/blogPosts.test.ts` (150 lines, 12 tests)
- [ ] `tests/features/blog/Blog.test.tsx` (200 lines, 18 tests)

**Total Files**: 12 files
**Estimated Lines of Code**: ~1,200 lines

---

## Estimated Timeline

| Phase | Time Estimate |
|-------|---------------|
| Phase 1: Entity & Type Design | 2 hours |
| Phase 2: Core Layer | 3 hours |
| Phase 3: Feature Layer | 4 hours |
| Phase 4: UI Components | 2 hours |
| Phase 5: Client Interactions | 2 hours |
| Phase 6: Styling | 1 hour |
| Phase 7: i18n & Translations | 1 hour |
| Phase 8: Testing | 3 hours |
| **Total** | **18 hours** |

---

## Success Criteria

- [ ] Blog posts displayed in grid layout
- [ ] Tag filtering works (React, TypeScript, etc.)
- [ ] Reading time and publish date shown
- [ ] Recent posts highlighted
- [ ] Full Spanish/English translations
- [ ] Test coverage ≥ 80%
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Accessibility verified
```

**User**: "Perfect! Let's start implementing Phase 1"

---

### Example 2: Planning from Technical Documentation

**User Request**:
```
I have a PDF with requirements for a testimonials section.
Here are the key points:
- Display 6 testimonials from clients
- Carousel with auto-rotate every 5 seconds
- User can pause auto-rotate
- Each testimonial shows: photo, name, role, company, quote
- Responsive (3 cols desktop, 2 cols tablet, 1 col mobile)

Create an implementation plan.
```

**Claude Response** (invokes feature-planner skill):

Generates a comprehensive 8-phase plan similar to Example 1, but focused on the Testimonials feature with specific tasks for carousel implementation, auto-rotate logic, and responsive layout.

---

## Skill 2: code-reviewer

### Example 1: Reviewing a Completed Feature

**User Request**:
```
Review my blog feature implementation on the feature/blog branch.
I've completed all the code and want to know if it's ready to merge.
```

**Claude Response** (invokes code-reviewer skill):

```markdown
# Implementation Validation Report: Blog Feature

**Generated**: 2025-12-10
**Branch**: feature/blog
**Reviewed By**: Claude Code (code-reviewer skill)

---

## Executive Summary

**Overall Status**: ⚠️ PASS WITH ISSUES
**Compliance Score**: 76/100

**Files Changed**: 12
**Lines Added**: +1,234
**Lines Removed**: -0

**Summary**:
- ✅ 42 checks passed
- ⚠️ 8 warnings
- ❌ 3 critical violations

---

## Git Branch Analysis

**Current Branch**: `feature/blog`
**Base Branch**: `master`

**Changed Files (12)**:
```
Core Layer (2 files):
  + src/core/entities/BlogPost.ts (ADDED, 152 lines)
  + src/core/use-cases/blogPosts.ts (ADDED, 98 lines)

Features Layer (3 files):
  + src/features/blog/Blog.tsx (ADDED, 125 lines)
  + src/features/blog/BlogList.tsx (ADDED, 62 lines)
  + src/features/blog/BlogCard.tsx (ADDED, 85 lines)

App Router (2 files):
  + app/[locale]/blog/page.tsx (ADDED, 42 lines)
  + app/[locale]/blog/[slug]/page.tsx (ADDED, 68 lines)

Translations (2 files):
  M messages/es.json (MODIFIED, +18 keys)
  M messages/en.json (MODIFIED, +15 keys) ⚠️ Missing 3 keys

Tests (3 files):
  + tests/core/entities/BlogPost.test.ts (ADDED, 180 lines)
  + tests/features/blog/Blog.test.tsx (ADDED, 145 lines)
  + tests/features/blog/BlogCard.test.tsx (ADDED, 95 lines)
```

---

## Critical Violations ❌

### 1. Missing Translations (CRITICAL)

**File**: `messages/en.json`

**Found 3 missing translation keys**:
- `blog.filterByTag`
- `blog.clearFilter`
- `blog.postsCount`

**Impact**: English locale will show missing key errors

**Fix**:
Add to `messages/en.json`:
```json
{
  "blog": {
    "filterByTag": "Filter by tag",
    "clearFilter": "Clear filter",
    "postsCount": "{count} posts"
  }
}
```

**Time to Fix**: 5 minutes

---

### 2. Missing 'use client' Directive (CRITICAL)

**File**: `src/features/blog/BlogCard.tsx:1`

**Issue**: Component uses `useState` but missing `'use client'` directive

```tsx
// ❌ WRONG
import { useState } from 'react';

export function BlogCard() {
  const [expanded, setExpanded] = useState(false);
  // ...
}
```

**Fix**:
```tsx
// ✅ CORRECT
'use client';

import { useState } from 'react';

export function BlogCard() {
  const [expanded, setExpanded] = useState(false);
  // ...
}
```

**Impact**: Runtime error in production build
**Time to Fix**: 1 minute

---

### 3. Test Coverage Below Threshold (CRITICAL)

**Current Coverage**: 78.5%
**Required**: 80%
**Gap**: 1.5%

**Files with Insufficient Coverage**:
- `src/features/blog/BlogList.tsx`: 75% (need +5%)
- `src/features/blog/BlogCard.tsx`: 72% (need +8%)

**Missing Tests**:
- [ ] BlogList empty state test
- [ ] BlogCard expanded state test
- [ ] BlogCard accessibility tests

**Recommendation**: Add 4-5 more test cases

**Time to Fix**: 45 minutes

---

## Layer-by-Layer Analysis

### Core Layer Validation

**Score**: 9/10 ⭐⭐⭐⭐⭐

✅ **Passes (8/8)**:
- NO framework dependencies
- Entities have proper validation
- Use-cases are pure functions
- Proper TypeScript interfaces
- Immutable properties (readonly)
- Business logic in entities
- JSDoc documentation
- toJSON() methods present

❌ **Failures (0/0)**: None

**Excellent work on core layer!**

---

### Features Layer Validation

**Score**: 7/10 ⭐⭐⭐⭐

✅ **Passes (10/12)**:
- Component structure follows pattern
- Props properly typed
- Uses custom hooks from shared/
- Framer Motion animations included
- Responsive design classes
- Dark mode support
- Imports follow dependency rule
- State management appropriate
- Event handlers well structured
- Clean component composition

❌ **Failures (2/12)**:
1. **Missing 'use client'** (CRITICAL)
   - File: `BlogCard.tsx:1`
   - Impact: Production error

2. **Inconsistent prop naming**
   - Some props use `onAction`, others use `handleAction`
   - Recommendation: Standardize to `onAction`

---

### Translation Validation

**Score**: 8/10 ⭐⭐⭐⭐

✅ **Passes**:
- Translation files exist (es.json, en.json)
- Components use `useTranslations()`
- Most keys defined in both locales
- Variable interpolation correct
- Rich text translations working

❌ **Failures**:
- **Missing Keys** (CRITICAL)
  - 3 keys in ES but not in EN
  - Keys: filterByTag, clearFilter, postsCount

**Impact**: Breaks English locale support

---

### Testing Validation

**Score**: 7/10 ⭐⭐⭐⭐

**Coverage Analysis**:
```
File                              | Stmts | Branch | Funcs | Lines
src/core/entities/BlogPost.ts     | 95.2% | 92.1%  | 100%  | 94.8%
src/core/use-cases/blogPosts.ts   | 90.3% | 88.2%  | 95.5%  | 91.1%
src/features/blog/Blog.tsx        | 85.5% | 82.3%  | 87.1%  | 86.2%
src/features/blog/BlogList.tsx    | 75.0% | 70.5%  | 80.0%  | 74.2% ⚠️
src/features/blog/BlogCard.tsx    | 72.3% | 68.1%  | 75.0%  | 71.8% ⚠️

Overall Coverage                  | 78.5% | 75.8%  | 82.1%  | 79.3% ❌
```

⚠️ **Below 80% Threshold**:
- Overall statements: 78.5% (need +1.5%)
- Branch coverage: 75.8% (need +4.2%)

**Recommendation**: Add tests for BlogList and BlogCard components

---

## Action Items (Prioritized)

### Critical (Fix Before Merging) ❌

**Estimated Total Time**: 51 minutes

1. [ ] **Add missing translations to en.json** (5 min)
   - Keys: filterByTag, clearFilter, postsCount

2. [ ] **Add 'use client' to BlogCard.tsx** (1 min)
   - File: `src/features/blog/BlogCard.tsx:1`

3. [ ] **Increase test coverage to 80%+** (45 min)
   - Add tests for BlogList empty state
   - Add tests for BlogCard expanded state
   - Add accessibility tests

**Total Critical Items**: 3
**Total Time**: 51 minutes

---

### High Priority (Recommended) ⚠️

**Estimated Total Time**: 15 minutes

1. [ ] **Standardize prop naming** (10 min)
   - Use consistent `onAction` pattern
   - Update BlogCard and BlogList

2. [ ] **Add error boundary** (5 min)
   - Wrap blog feature in error boundary

**Total High Items**: 2

---

## Compliance Score Breakdown

| Category | Score | Weight | Weighted Score |
|----------|-------|--------|----------------|
| Core Layer | 9/10 | 25% | 22.5/25 |
| Features Layer | 7/10 | 20% | 14/20 |
| Shared Layer | N/A | 10% | 10/10 |
| Translations | 8/10 | 15% | 12/15 |
| Testing | 7/10 | 20% | 14/20 |
| Security & Performance | 10/10 | 10% | 10/10 |
| **Overall** | **76/100** | | **76/100** |

---

## Ready for Production?

⚠️ **YES WITH FIXES**

**Recommendation**:
Good implementation overall! Address 3 critical items (~51 minutes) before merging:
1. Fix missing translations (5 min)
2. Add 'use client' directive (1 min)
3. Increase test coverage to 80%+ (45 min)

Once fixed, re-run validation to confirm 80%+ compliance score.

---

## Next Steps

1. **Fix Critical Items** (51 minutes)
2. **Re-run Tests**: `npm run test:coverage`
3. **Re-run Validation**: "Review my blog feature again"
4. **Merge when compliance ≥ 80%**

---

**Report Generated**: 2025-12-10 15:30:00
**Validation Time**: 2.3 seconds
```

**User**: "Thanks! I'll fix those 3 issues now."

---

## Skill 3: component-generator

### Example 1: Generate a Modal Component

**User Request**:
```
Generate a Modal component with the following features:
- Supports sizes: sm, md, lg
- Fade and slide animation (Framer Motion)
- Closes on Esc key
- Closes on overlay click
- Portal rendering (no layout issues)
- Accessible (focus trap, keyboard nav)
- Dark mode support
```

**Claude Response** (invokes component-generator skill):

```
✅ Component Generated: Modal

Files Created:
  ✅ src/shared/components/ui/Modal.tsx (145 lines)
  ✅ tests/shared/components/ui/Modal.test.tsx (120 lines)

Component Features:
  ✅ TypeScript interface (ModalProps)
  ✅ Framer Motion animations (fade + slide)
  ✅ Portal rendering with createPortal
  ✅ Keyboard support (Esc to close)
  ✅ Overlay click to close
  ✅ Size variants (sm, md, lg)
  ✅ Dark mode support
  ✅ Focus trap (body scroll lock)
  ✅ Accessibility (ARIA labels)
  ✅ Test scaffold (12 test cases)

Component Code:
```tsx
// src/shared/components/ui/Modal.tsx
'use client';

import { cn } from '@/shared/utils/cn';
import { motion as m, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <m.div
              className={cn(
                'bg-background rounded-lg shadow-xl max-h-[90vh] overflow-y-auto w-full',
                size === 'sm' && 'max-w-md',
                size === 'md' && 'max-w-2xl',
                size === 'lg' && 'max-w-4xl'
              )}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {title && (
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-2xl font-bold">{title}</h2>
                </div>
              )}
              <div className="px-6 py-4">{children}</div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
```

Usage Example:
```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Settings"
  size="md"
>
  <p>Modal content here</p>
</Modal>
```

Next Steps:
  1. Import and use: import { Modal } from '@/shared/components/ui/Modal'
  2. Run tests: npm test Modal.test.tsx
  3. Customize styling as needed
```

---

### Example 2: Generate a Testimonials Feature Component

**User Request**:
```
Generate a Testimonials feature component with:
- Display testimonials in cards
- Show client photo, name, role, company, quote
- Carousel with left/right navigation
- Responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- Spanish/English translations
```

**Claude Response** (invokes component-generator skill):

Generates:
- `src/features/testimonials/Testimonials.tsx`
- `src/features/testimonials/TestimonialCard.tsx`
- Updates to `messages/es.json` and `messages/en.json`
- Test file `tests/features/testimonials/Testimonials.test.tsx`

---

## Skill 4: test-writer

### Example 1: Generate Tests for Blog Component

**User Request**:
```
Write comprehensive tests for the Blog component to ensure 80%+ coverage.
The component is at src/features/blog/Blog.tsx.
```

**Claude Response** (invokes test-writer skill):

```
✅ Tests Generated: Blog Component

Files Created:
  ✅ tests/features/blog/Blog.test.tsx (210 lines, 22 test cases)

Test Suites:
  ✓ Rendering (6 tests)
    - Renders blog section with correct id
    - Renders blog title
    - Renders subtitle
    - Renders all posts by default
    - Renders tag filter buttons
    - Renders post count

  ✓ Filtering (5 tests)
    - Filters posts when tag is clicked
    - Shows all posts when "Todos" is clicked
    - Active filter button has correct styling
    - Displays no posts message when filter is empty
    - Maintains filter state on interaction

  ✓ Translations (3 tests)
    - Displays Spanish translations by default
    - Displays English translations when locale is en
    - Displays correct post count in filter button

  ✓ Accessibility (5 tests)
    - Has accessible heading with correct level
    - Has semantic section element
    - Supports keyboard navigation
    - All interactive elements keyboard accessible
    - Focus indicators visible

  ✓ Animations (2 tests)
    - Applies Framer Motion classes
    - Stagger animation works on children

  ✓ Responsive Design (1 test)
    - Applies responsive classes

Coverage Estimate:
  - Statements: 88%
  - Branches: 85%
  - Functions: 92%
  - Lines: 87%

Status: ✅ Exceeds 80% threshold

Run Tests:
  npm test Blog.test.tsx

View Coverage:
  npm run test:coverage
```

**Generated Test File**:
```typescript
// tests/features/blog/Blog.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { Blog } from '@/features/blog/Blog';
import messages from '@/messages/es.json';

describe('Blog Component', () => {
  const renderBlog = () => {
    return render(
      <NextIntlClientProvider locale="es" messages={messages}>
        <Blog />
      </NextIntlClientProvider>
    );
  };

  describe('Rendering', () => {
    it('renders blog section with correct id', () => {
      renderBlog();
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('id', 'blog');
    });

    it('renders blog title', () => {
      renderBlog();
      const heading = screen.getByRole('heading', { name: /blog/i });
      expect(heading).toBeInTheDocument();
    });

    // ... 20 more tests
  });
});
```

---

### Example 2: Generate Tests for Entity

**User Request**:
```
Write tests for the BlogPost entity in src/core/entities/BlogPost.ts.
Focus on validation and business logic methods.
```

**Claude Response** (invokes test-writer skill):

Generates comprehensive entity tests with:
- Constructor validation tests (9 tests)
- Method tests (8 tests)
- Edge case tests (5 tests)
- Coverage: 95%+

---

## Common Workflows

### Workflow 1: New Feature Development

```
1. Plan
   → "Create implementation plan for testimonials feature"
   → [feature-planner generates plan]

2. Implement Core
   → Follow Phase 1 & 2 from plan
   → Create entities and use-cases

3. Generate Components
   → "Generate Testimonials component with carousel"
   → [component-generator creates component + tests]

4. Write Additional Tests
   → "Write tests for testimonials use-cases"
   → [test-writer generates comprehensive tests]

5. Review
   → "Review my implementation on feature/testimonials"
   → [code-reviewer validates code]

6. Fix Issues
   → Address critical violations

7. Merge
   → Once compliance ≥ 80%
```

---

### Workflow 2: Code Review & Refactoring

```
1. Review Current Code
   → "Review the contact feature code quality"
   → [code-reviewer analyzes and reports]

2. Identify Issues
   → Check validation report for violations

3. Fix Critical Issues
   → Address CRITICAL and HIGH priority items

4. Increase Test Coverage
   → "Write tests for Contact component to reach 80%"
   → [test-writer generates additional tests]

5. Re-review
   → "Review contact feature again"
   → Verify compliance score improved

6. Refactor
   → Extract reusable logic
   → "Generate custom hook for form handling"
```

---

### Workflow 3: Quick Component Addition

```
1. Generate Component
   → "Generate a Loading Spinner component"
   → [component-generator creates component]

2. Generate Tests
   → "Write tests for LoadingSpinner"
   → [test-writer generates test suite]

3. Quick Review
   → "Quick review of LoadingSpinner component"
   → [code-reviewer validates]

4. Use Component
   → Import and integrate into features
```

---

## Tips for Best Results

### For feature-planner:
1. **Provide Clear Requirements**: The more detailed your requirements, the better the plan
2. **Mention Complexity**: Indicate if it's a simple or complex feature
3. **Specify Constraints**: Mention technical constraints upfront
4. **Include Examples**: Show similar features as reference

### For code-reviewer:
1. **Commit Your Code**: Ensure changes are committed (or staged)
2. **Use Feature Branches**: Don't review on main/master
3. **Provide Context**: Mention original requirements if available
4. **Run After Completion**: Review when feature is fully implemented

### For component-generator:
1. **Describe Purpose**: Explain what the component does
2. **List Features**: Specify variants, sizes, behaviors
3. **Mention Dependencies**: If it needs specific libraries
4. **Request Accessibility**: Explicitly ask for a11y if critical

### For test-writer:
1. **Specify Coverage Goal**: "80%+" or "comprehensive"
2. **Mention File Path**: Provide exact file to test
3. **Request Specific Tests**: "Include accessibility tests"
4. **Ask for Edge Cases**: Request specific scenarios

---

## Troubleshooting

### "Skill didn't activate"
**Solution**: Use clear keywords
- ✅ "Create implementation plan for..."
- ✅ "Review my code on branch..."
- ✅ "Generate a Modal component"
- ✅ "Write tests for..."

### "Output was incomplete"
**Solution**: Skills generate 500-2,000 lines
- Wait for completion
- Ask to continue if cut off

### "Wrong skill activated"
**Solution**: Be more specific
- ❌ "Help with blog" (ambiguous)
- ✅ "Create implementation plan for blog"
- ✅ "Review blog feature code"

### "Tests don't pass"
**Solution**: Common fixes
- Verify translation files imported
- Check mocks are configured
- Ensure test setup.ts is correct

---

**Last Updated**: 2025-12-10
**Version**: 1.0.0
**Project**: DevPortfolio (Next.js 15 + React 19 + TypeScript 5)
