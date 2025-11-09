import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollSpy } from '@/shared/hooks/useScrollSpy';

describe('useScrollSpy Hook', () => {
  let observerCallback: IntersectionObserverCallback | null = null;
  let observeMock: any;
  let disconnectMock: any;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();

    // Mock IntersectionObserver as a proper constructor function
    const MockIntersectionObserver = function (
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) {
      observerCallback = callback;
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: vi.fn(),
        root: null,
        rootMargin: options?.rootMargin || '',
        thresholds: [],
        takeRecords: () => [],
      };
    } as any;

    global.IntersectionObserver = MockIntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
    observerCallback = null;
  });

  describe('Initialization', () => {
    it('should return null initially', () => {
      const { result } = renderHook(() => useScrollSpy(['section1', 'section2']));
      expect(result.current).toBeNull();
    });

    it('should observe all section IDs', () => {
      // Create mock elements
      const section1 = document.createElement('section');
      section1.id = 'section1';
      const section2 = document.createElement('section');
      section2.id = 'section2';
      document.body.appendChild(section1);
      document.body.appendChild(section2);

      renderHook(() => useScrollSpy(['section1', 'section2']));

      expect(observeMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('Section Detection', () => {
    it('should return active section ID when section is intersecting', () => {
      const section = document.createElement('section');
      section.id = 'about';
      document.body.appendChild(section);

      const { result } = renderHook(() => useScrollSpy(['hero', 'about', 'projects']));

      // Simulate intersection
      act(() => {
        observerCallback(
          [
            {
              target: section,
              isIntersecting: true,
              intersectionRatio: 0.6,
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver
        );
      });

      expect(result.current).toBe('about');
    });

    it('should return null when no sections are intersecting', () => {
      const section = document.createElement('section');
      section.id = 'about';
      document.body.appendChild(section);

      const { result } = renderHook(() => useScrollSpy(['hero', 'about']));

      // Simulate no intersection
      act(() => {
        observerCallback(
          [
            {
              target: section,
              isIntersecting: false,
              intersectionRatio: 0,
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver
        );
      });

      expect(result.current).toBeNull();
    });

    it('should update active section when scrolling', () => {
      const section1 = document.createElement('section');
      section1.id = 'hero';
      const section2 = document.createElement('section');
      section2.id = 'about';
      document.body.appendChild(section1);
      document.body.appendChild(section2);

      const { result } = renderHook(() => useScrollSpy(['hero', 'about']));

      // First section is active
      act(() => {
        observerCallback(
          [
            {
              target: section1,
              isIntersecting: true,
              intersectionRatio: 0.6,
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver
        );
      });
      expect(result.current).toBe('hero');

      // Scroll to second section
      act(() => {
        observerCallback(
          [
            {
              target: section1,
              isIntersecting: false,
              intersectionRatio: 0,
            } as IntersectionObserverEntry,
            {
              target: section2,
              isIntersecting: true,
              intersectionRatio: 0.6,
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver
        );
      });
      expect(result.current).toBe('about');
    });
  });

  describe('Cleanup', () => {
    it('should disconnect observer on unmount', () => {
      // Create a mock element first
      const section = document.createElement('section');
      section.id = 'section1';
      document.body.appendChild(section);

      const { unmount } = renderHook(() => useScrollSpy(['section1']));

      unmount();

      expect(disconnectMock).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty section IDs array', () => {
      const { result } = renderHook(() => useScrollSpy([]));
      expect(result.current).toBeNull();
    });

    it('should handle non-existent section IDs', () => {
      const { result } = renderHook(() => useScrollSpy(['non-existent']));
      expect(result.current).toBeNull();
      // Should not throw error
    });
  });
});
