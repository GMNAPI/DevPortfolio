/**
 * Input Component
 *
 * A flexible input component with label, error state, and textarea support.
 * Used in forms with validation feedback.
 *
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   error={errors.email}
 *   {...register('email')}
 * />
 */

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  multiline?: false;
}

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  multiline: true;
}

type CombinedInputProps = InputProps | TextareaProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedInputProps>(
  ({ className, label, error, id, multiline, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const baseStyles =
      'flex w-full rounded-md border border-border bg-background px-4 py-3 font-mono text-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-foreground-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const errorStyles = error ? 'border-red-500 focus-visible:ring-red-500' : '';

    const Element = multiline ? 'textarea' : 'input';

    // Default type to 'text' for input elements if not specified
    const inputProps = multiline ? props : { type: 'text', ...(props as InputProps) };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <Element
          id={inputId}
          ref={ref as any}
          className={cn(baseStyles, errorStyles, multiline && 'min-h-[120px] resize-y', className)}
          aria-invalid={error ? 'true' : 'false'}
          {...(inputProps as any)}
        />
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
