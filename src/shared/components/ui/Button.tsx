/**
 * Button Component
 *
 * A versatile button component with multiple variants and sizes.
 * Follows the warm minimalist design system.
 *
 * @example
 * <Button variant="default" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  default: 'bg-accent text-background hover:bg-accent-hover',
  outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-background',
  ghost: 'bg-transparent text-foreground hover:bg-background-secondary',
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantStyles = buttonVariants[variant];
    const sizeStyles = buttonSizes[size];

    // If asChild, render children directly with applied styles
    if (asChild) {
      const child = children as React.ReactElement;
      return (
        <child.type
          {...child.props}
          className={cn(baseStyles, variantStyles, sizeStyles, className, child.props.className)}
          ref={ref}
        />
      );
    }

    return (
      <button ref={ref} className={cn(baseStyles, variantStyles, sizeStyles, className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
