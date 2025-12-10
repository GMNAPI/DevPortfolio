---
name: test-writer
description: Generate comprehensive test suites ensuring 80%+ coverage for DevPortfolio. Use when asked to write tests, generate test suites, increase coverage, or create test cases. Generates Vitest + React Testing Library tests following AAA pattern with accessibility and i18n tests.
allowed-tools: Read, Write, Grep, Glob, Bash, AskUserQuestion
---

## Purpose

Generate comprehensive, production-ready test suites that achieve 80%+ coverage using Vitest and React Testing Library. Tests follow AAA pattern (Arrange-Act-Assert), include accessibility checks, i18n rendering tests, and edge case coverage.

---

## Testing Requirements

### Coverage Thresholds (CRITICAL)

**Configured in `vitest.config.ts`**:
```typescript
coverage: {
  provider: 'v8',
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 80,
    statements: 80,
  },
}
```

**All thresholds MUST be ≥ 80%**

### Test Structure

```
tests/
├── core/
│   ├── entities/
│   │   └── [Entity].test.ts        # Entity validation tests
│   └── use-cases/
│       └── [useCase].test.ts       # Use-case logic tests
├── features/
│   └── [feature]/
│       └── [Component].test.tsx    # Component tests
└── shared/
    ├── hooks/
    │   └── [hook].test.tsx         # Custom hook tests
    └── utils/
        └── [util].test.ts          # Utility function tests
```

---

## Test Types

### 1. Entity Tests (Core Layer)

**Purpose**: Test domain entities (validation, methods, business logic)
**Location**: `tests/core/entities/[Entity].test.ts`
**Coverage Target**: 90-100% (pure TypeScript, easy to test)

**Template**:
```typescript
// tests/core/entities/BlogPost.test.ts
import { describe, it, expect } from 'vitest';
import { BlogPost, BlogPostData } from '@/core/entities/BlogPost';

describe('BlogPost Entity', () => {
  const validData: BlogPostData = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test blog post content that is long enough for validation.',
    excerpt: '',
    publishedAt: new Date('2025-01-01'),
    tags: ['React', 'TypeScript'],
    author: 'Test Author',
    readingTimeMinutes: 5,
  };

  describe('Constructor & Validation', () => {
    it('creates blog post with valid data', () => {
      const post = new BlogPost(validData);

      expect(post.id).toBe('1');
      expect(post.title).toBe('Test Post');
      expect(post.tags).toHaveLength(2);
      expect(post.tags).toContain('React');
    });

    it('throws error when title is empty', () => {
      const invalidData = { ...validData, title: '' };

      expect(() => new BlogPost(invalidData)).toThrow('title is required');
    });

    it('throws error when title is only whitespace', () => {
      const invalidData = { ...validData, title: '   ' };

      expect(() => new BlogPost(invalidData)).toThrow('title is required');
    });

    it('throws error when title exceeds 100 characters', () => {
      const invalidData = { ...validData, title: 'A'.repeat(101) };

      expect(() => new BlogPost(invalidData)).toThrow('100 characters or less');
    });

    it('throws error when content is too short', () => {
      const invalidData = { ...validData, content: 'Short' };

      expect(() => new BlogPost(invalidData)).toThrow('at least 50 characters');
    });

    it('throws error when publishedAt is invalid', () => {
      const invalidData = { ...validData, publishedAt: 'invalid' as any };

      expect(() => new BlogPost(invalidData)).toThrow('Valid publish date');
    });

    it('throws error when tags array is empty', () => {
      const invalidData = { ...validData, tags: [] };

      expect(() => new BlogPost(invalidData)).toThrow('at least one tag');
    });

    it('generates excerpt when not provided', () => {
      const post = new BlogPost(validData);

      expect(post.excerpt).toBeDefined();
      expect(post.excerpt.length).toBeGreaterThan(0);
    });

    it('trims whitespace from title', () => {
      const dataWithWhitespace = { ...validData, title: '  Test Post  ' };
      const post = new BlogPost(dataWithWhitespace);

      expect(post.title).toBe('Test Post');
    });
  });

  describe('Methods', () => {
    it('hasTag() returns true when tag exists', () => {
      const post = new BlogPost(validData);

      expect(post.hasTag('React')).toBe(true);
      expect(post.hasTag('TypeScript')).toBe(true);
    });

    it('hasTag() is case-insensitive', () => {
      const post = new BlogPost(validData);

      expect(post.hasTag('react')).toBe(true);
      expect(post.hasTag('TYPESCRIPT')).toBe(true);
    });

    it('hasTag() returns false when tag does not exist', () => {
      const post = new BlogPost(validData);

      expect(post.hasTag('Vue')).toBe(false);
      expect(post.hasTag('Angular')).toBe(false);
    });

    it('isRecent returns true for posts within 30 days', () => {
      const recentData = { ...validData, publishedAt: new Date() };
      const post = new BlogPost(recentData);

      expect(post.isRecent).toBe(true);
    });

    it('isRecent returns false for old posts', () => {
      const oldData = { ...validData, publishedAt: new Date('2024-01-01') };
      const post = new BlogPost(oldData);

      expect(post.isRecent).toBe(false);
    });

    it('getFormattedDate() formats date correctly for Spanish', () => {
      const post = new BlogPost(validData);
      const formatted = post.getFormattedDate('es');

      expect(formatted).toContain('2025');
      expect(formatted).toContain('enero');
    });

    it('getFormattedDate() formats date correctly for English', () => {
      const post = new BlogPost(validData);
      const formatted = post.getFormattedDate('en');

      expect(formatted).toContain('2025');
      expect(formatted).toContain('January');
    });

    it('toJSON() returns plain object representation', () => {
      const post = new BlogPost(validData);
      const json = post.toJSON();

      expect(json).toEqual(expect.objectContaining({
        id: '1',
        title: 'Test Post',
      }));
      expect(json).not.toBe(validData); // New object, not reference
    });
  });
});
```

**Coverage Checklist**:
- [ ] Constructor with valid data
- [ ] All validation rules (empty, too short, too long, invalid format)
- [ ] Edge cases (whitespace, null, undefined)
- [ ] All public methods
- [ ] Getter properties
- [ ] toJSON() serialization

---

### 2. Use-Case Tests (Core Layer)

**Purpose**: Test pure functions (business logic)
**Location**: `tests/core/use-cases/[useCase].test.ts`
**Coverage Target**: 85-95% (pure functions, deterministic)

**Template**:
```typescript
// tests/core/use-cases/blogPosts.test.ts
import { describe, it, expect } from 'vitest';
import { BlogPost } from '@/core/entities/BlogPost';
import {
  filterPostsByTag,
  getRecentPosts,
  sortPostsByDate,
  getAllTags,
  searchPosts,
} from '@/core/use-cases/blogPosts';

describe('Blog Post Use Cases', () => {
  const createPost = (overrides: Partial<BlogPostData>): BlogPost => {
    return new BlogPost({
      id: '1',
      title: 'Test Post',
      content: 'Test content that is long enough for validation.',
      excerpt: '',
      publishedAt: new Date('2025-01-15'),
      tags: ['React'],
      author: 'Author',
      readingTimeMinutes: 5,
      ...overrides,
    });
  };

  const posts = [
    createPost({ id: '1', title: 'React Post', tags: ['React', 'Frontend'] }),
    createPost({ id: '2', title: 'TypeScript Post', tags: ['TypeScript', 'Backend'], publishedAt: new Date('2025-01-10') }),
    createPost({ id: '3', title: 'Node Post', tags: ['Node', 'Backend'], publishedAt: new Date('2024-12-01') }),
  ];

  describe('filterPostsByTag', () => {
    it('returns all posts when tag is empty', () => {
      const result = filterPostsByTag(posts, '');
      expect(result).toHaveLength(3);
    });

    it('returns all posts when tag is whitespace', () => {
      const result = filterPostsByTag(posts, '   ');
      expect(result).toHaveLength(3);
    });

    it('filters posts by tag', () => {
      const result = filterPostsByTag(posts, 'React');
      expect(result).toHaveLength(1);
      expect(result[0].hasTag('React')).toBe(true);
    });

    it('is case-insensitive', () => {
      const result = filterPostsByTag(posts, 'react');
      expect(result).toHaveLength(1);
    });

    it('returns multiple posts when tag is shared', () => {
      const result = filterPostsByTag(posts, 'Backend');
      expect(result).toHaveLength(2);
    });

    it('returns empty array when no posts match', () => {
      const result = filterPostsByTag(posts, 'Vue');
      expect(result).toHaveLength(0);
    });

    it('does not mutate original array', () => {
      const original = [...posts];
      filterPostsByTag(posts, 'React');
      expect(posts).toEqual(original);
    });
  });

  describe('sortPostsByDate', () => {
    it('sorts posts by date (newest first)', () => {
      const sorted = sortPostsByDate(posts);

      expect(sorted[0].id).toBe('1'); // Jan 15 (newest)
      expect(sorted[1].id).toBe('2'); // Jan 10
      expect(sorted[2].id).toBe('3'); // Dec 1 (oldest)
    });

    it('does not mutate original array', () => {
      const original = [...posts];
      sortPostsByDate(posts);
      expect(posts).toEqual(original);
    });

    it('handles single post', () => {
      const singlePost = [posts[0]];
      const sorted = sortPostsByDate(singlePost);
      expect(sorted).toHaveLength(1);
    });

    it('handles empty array', () => {
      const sorted = sortPostsByDate([]);
      expect(sorted).toHaveLength(0);
    });
  });

  describe('getAllTags', () => {
    it('returns all unique tags', () => {
      const tags = getAllTags(posts);

      expect(tags).toHaveLength(5);
      expect(tags).toContain('React');
      expect(tags).toContain('TypeScript');
      expect(tags).toContain('Frontend');
      expect(tags).toContain('Backend');
      expect(tags).toContain('Node');
    });

    it('returns sorted tags', () => {
      const tags = getAllTags(posts);
      expect(tags).toEqual([...tags].sort());
    });

    it('handles posts with no tags', () => {
      const postsNoTags = [createPost({ tags: [] })];
      const tags = getAllTags(postsNoTags);
      expect(tags).toHaveLength(0);
    });
  });

  describe('searchPosts', () => {
    it('returns all posts when query is empty', () => {
      const result = searchPosts(posts, '');
      expect(result).toHaveLength(3);
    });

    it('searches by title', () => {
      const result = searchPosts(posts, 'React');
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('React');
    });

    it('is case-insensitive', () => {
      const result = searchPosts(posts, 'react');
      expect(result).toHaveLength(1);
    });

    it('searches by content', () => {
      const result = searchPosts(posts, 'Test content');
      expect(result.length).toBeGreaterThan(0);
    });

    it('returns empty array when no match', () => {
      const result = searchPosts(posts, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });
});
```

**Coverage Checklist**:
- [ ] Happy path (normal inputs)
- [ ] Edge cases (empty, null, whitespace)
- [ ] Array immutability (original not mutated)
- [ ] Case-insensitivity where applicable
- [ ] Empty results
- [ ] Multiple results

---

### 3. Component Tests (Features Layer)

**Purpose**: Test React component rendering, interactions, translations
**Location**: `tests/features/[feature]/[Component].test.tsx`
**Coverage Target**: 80-90%

**Template**:
```typescript
// tests/features/blog/Blog.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { Blog } from '@/features/blog/Blog';
import messages from '@/messages/es.json';
import messagesEn from '@/messages/en.json';

// Mock if needed
vi.mock('@/shared/constants/blog', () => ({
  blogPosts: [
    // Mock data
  ],
}));

describe('Blog Component', () => {
  const renderBlog = (locale = 'es') => {
    const currentMessages = locale === 'es' ? messages : messagesEn;

    return render(
      <NextIntlClientProvider locale={locale} messages={currentMessages}>
        <Blog />
      </NextIntlClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

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
      expect(heading).toHaveClass('text-4xl');
    });

    it('renders subtitle', () => {
      renderBlog();
      expect(screen.getByText(/artículos/i)).toBeInTheDocument();
    });

    it('renders all posts by default', () => {
      renderBlog();
      const posts = screen.getAllByRole('article');
      expect(posts.length).toBeGreaterThan(0);
    });

    it('renders tag filter buttons', () => {
      renderBlog();
      const allButton = screen.getByRole('button', { name: /todos/i });
      expect(allButton).toBeInTheDocument();
    });
  });

  describe('Filtering', () => {
    it('filters posts when tag button is clicked', async () => {
      const user = userEvent.setup();
      renderBlog();

      const initialPosts = screen.getAllByRole('article');
      const reactButton = screen.getByRole('button', { name: /react/i });

      await user.click(reactButton);

      await waitFor(() => {
        const filteredPosts = screen.getAllByRole('article');
        expect(filteredPosts.length).toBeLessThanOrEqual(initialPosts.length);
      });
    });

    it('shows all posts when "Todos" is clicked', async () => {
      const user = userEvent.setup();
      renderBlog();

      const reactButton = screen.getByRole('button', { name: /react/i });
      await user.click(reactButton);

      const todosButton = screen.getByRole('button', { name: /todos/i });
      await user.click(todosButton);

      const posts = screen.getAllByRole('article');
      expect(posts.length).toBeGreaterThan(0);
    });

    it('displays no posts message when filter has no results', async () => {
      const user = userEvent.setup();
      renderBlog();

      // Assuming there's a tag with no posts
      const emptyTagButton = screen.getByRole('button', { name: /unknown/i });
      await user.click(emptyTagButton);

      expect(screen.getByText(/no hay publicaciones/i)).toBeInTheDocument();
    });

    it('active filter button has correct styling', async () => {
      const user = userEvent.setup();
      renderBlog();

      const reactButton = screen.getByRole('button', { name: /react/i });
      await user.click(reactButton);

      expect(reactButton).toHaveClass('bg-accent');
    });
  });

  describe('Translations', () => {
    it('displays Spanish translations by default', () => {
      renderBlog();
      expect(screen.getByText(/blog/i)).toBeInTheDocument();
      expect(screen.getByText(/artículos/i)).toBeInTheDocument();
    });

    it('displays English translations when locale is en', () => {
      renderBlog('en');
      expect(screen.getByText(/articles/i)).toBeInTheDocument();
    });

    it('displays correct post count in filter button', () => {
      renderBlog();
      const todosButton = screen.getByRole('button', { name: /todos \(\d+\)/i });
      expect(todosButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible heading with correct level', () => {
      renderBlog();
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('has semantic section element', () => {
      renderBlog();
      const section = screen.getByRole('region');
      expect(section.tagName).toBe('SECTION');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      renderBlog();

      await user.tab();
      const firstButton = screen.getAllByRole('button')[0];
      expect(firstButton).toHaveFocus();

      await user.keyboard('{Enter}');
      // Verify button action
    });

    it('all interactive elements are keyboard accessible', async () => {
      const user = userEvent.setup();
      renderBlog();

      const buttons = screen.getAllByRole('button');

      for (const button of buttons) {
        button.focus();
        expect(button).toHaveFocus();
      }
    });
  });

  describe('Animations', () => {
    it('applies Framer Motion animation classes', () => {
      renderBlog();
      const section = screen.getByRole('region');
      expect(section).toHaveStyle({ opacity: expect.any(String) });
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes', () => {
      renderBlog();
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-4xl', 'md:text-5xl');
    });
  });
});
```

**Coverage Checklist**:
- [ ] Rendering tests (all major elements)
- [ ] User interaction tests (clicks, inputs, forms)
- [ ] Translation tests (ES/EN rendering)
- [ ] Accessibility tests (ARIA, keyboard nav, semantic HTML)
- [ ] State changes (filters, toggles, selections)
- [ ] Edge cases (empty states, error states)
- [ ] Responsive classes applied

---

### 4. Hook Tests

**Purpose**: Test custom React hooks
**Location**: `tests/shared/hooks/[hook].test.tsx`
**Coverage Target**: 85-95%

**Template**:
```typescript
// tests/shared/hooks/useDebounce.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDebounce } from '@/shared/hooks/useDebounce';

describe('useDebounce Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Still initial

    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current).toBe('updated');
    });
  });

  it('cancels previous timeout on new value', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'first' } }
    );

    rerender({ value: 'second' });
    vi.advanceTimersByTime(300);

    rerender({ value: 'third' });
    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current).toBe('third');
    });
  });

  it('uses custom delay', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });
    vi.advanceTimersByTime(999);
    expect(result.current).toBe('initial');

    vi.advanceTimersByTime(1);
    await waitFor(() => {
      expect(result.current).toBe('updated');
    });
  });

  it('cleans up timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('value', 500));

    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
```

**Coverage Checklist**:
- [ ] Initial state
- [ ] State changes
- [ ] Cleanup functions (useEffect return)
- [ ] Edge cases (null, undefined)
- [ ] Dependencies array updates

---

### 5. Utility Tests

**Purpose**: Test utility functions
**Location**: `tests/shared/utils/[util].test.ts`
**Coverage Target**: 90-100% (simple functions)

**Template**:
```typescript
// tests/shared/utils/cn.test.ts
import { describe, it, expect } from 'vitest';
import { cn } from '@/shared/utils/cn';

describe('cn Utility', () => {
  it('merges class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const result = cn('foo', false && 'bar', 'baz');
    expect(result).toBe('foo baz');
  });

  it('handles Tailwind class conflicts', () => {
    const result = cn('px-4', 'px-6');
    expect(result).toBe('px-6'); // Later class wins
  });

  it('handles undefined and null', () => {
    const result = cn('foo', undefined, null, 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles arrays', () => {
    const result = cn(['foo', 'bar'], 'baz');
    expect(result).toBe('foo bar baz');
  });
});
```

---

## AAA Pattern (Arrange-Act-Assert)

All tests should follow the AAA pattern:

```typescript
it('filters posts by tag', () => {
  // Arrange - Setup test data
  const posts = [
    createPost({ tags: ['React'] }),
    createPost({ tags: ['Vue'] }),
  ];

  // Act - Execute the function
  const result = filterPostsByTag(posts, 'React');

  // Assert - Verify results
  expect(result).toHaveLength(1);
  expect(result[0].hasTag('React')).toBe(true);
});
```

---

## Coverage Analysis

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test Blog.test.tsx

# Run in UI mode
npm run test:ui
```

### Coverage Report

```
File                              | Stmts | Branch | Funcs | Lines
src/core/entities/BlogPost.ts     | 95.2% | 92.1%  | 100%  | 94.8%
src/core/use-cases/blogPosts.ts   | 88.3% | 85.2%  | 90.5%  | 89.1%
src/features/blog/Blog.tsx        | 85.5% | 82.3%  | 87.1%  | 86.2%

Overall Coverage                  | 87.4% | 84.8%  | 90.2%  | 88.3%
```

**Status**: ✅ PASS (all thresholds ≥ 80%)

---

## Test Generation Checklist

When generating tests for a file:

- [ ] Identify file type (entity, use-case, component, hook, utility)
- [ ] Create test file in corresponding `tests/` directory
- [ ] Import necessary testing utilities (vitest, RTL)
- [ ] Set up test data (fixtures, mocks)
- [ ] Write describe blocks for logical grouping
- [ ] Follow AAA pattern for each test
- [ ] Test happy path first
- [ ] Add edge cases
- [ ] Test error handling
- [ ] Add accessibility tests (components only)
- [ ] Add i18n tests (components only)
- [ ] Verify cleanup (hooks/effects)
- [ ] Run tests and check coverage
- [ ] Ensure ≥ 80% coverage

---

## Test Output Summary

When generating tests, provide summary:

```
✅ Tests Generated: [ComponentName]

Files Created:
  ✅ tests/features/blog/Blog.test.tsx ([XXX] lines, [XX] test cases)

Test Coverage:
  - Rendering tests: [N] tests
  - User interaction tests: [N] tests
  - Translation tests: [N] tests
  - Accessibility tests: [N] tests
  - Edge cases: [N] tests

Estimated Coverage: [XX]%
Time to Run: [X.X]s

Run Tests:
  npm test Blog.test.tsx

View Coverage:
  npm run test:coverage
```

---

**Skill Version**: 1.0.0
**Last Updated**: 2025-12-10
**Target Project**: DevPortfolio (Next.js 15 + React 19 + TypeScript 5)
