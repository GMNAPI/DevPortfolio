import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/components/ui/Card';

describe('Card Components', () => {
  describe('Card', () => {
    it('should render children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<Card className="custom-card">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-card');
    });

    it('should have default card styles', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('rounded-lg', 'border');
    });
  });

  describe('CardHeader', () => {
    it('should render header content', () => {
      render(<CardHeader>Header</CardHeader>);
      expect(screen.getByText('Header')).toBeInTheDocument();
    });
  });

  describe('CardTitle', () => {
    it('should render title with proper heading', () => {
      render(<CardTitle>Test Title</CardTitle>);
      const title = screen.getByText('Test Title');
      expect(title.tagName).toBe('H3');
    });

    it('should apply title styles', () => {
      render(<CardTitle>Title</CardTitle>);
      const title = screen.getByText('Title');
      expect(title).toHaveClass('font-semibold');
    });
  });

  describe('CardDescription', () => {
    it('should render description', () => {
      render(<CardDescription>This is a description</CardDescription>);
      expect(screen.getByText('This is a description')).toBeInTheDocument();
    });

    it('should apply description styles', () => {
      render(<CardDescription>Description</CardDescription>);
      const desc = screen.getByText('Description');
      expect(desc).toHaveClass('text-foreground-secondary');
    });
  });

  describe('CardContent', () => {
    it('should render content area', () => {
      render(<CardContent>Card body</CardContent>);
      expect(screen.getByText('Card body')).toBeInTheDocument();
    });
  });

  describe('Composition', () => {
    it('should render complete card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Project Title</CardTitle>
            <CardDescription>Project description here</CardDescription>
          </CardHeader>
          <CardContent>Main content</CardContent>
        </Card>
      );

      expect(screen.getByText('Project Title')).toBeInTheDocument();
      expect(screen.getByText('Project description here')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
    });
  });
});
