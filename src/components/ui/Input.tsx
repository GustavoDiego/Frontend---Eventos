import React from 'react';
import { cn } from './Button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helper, id, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xl font-display uppercase tracking-wider text-ink">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          className={cn(
            'flex min-h-[3.5rem] w-full border-4 border-ink bg-[#FAF6EF] px-4 py-3 text-lg font-bold text-ink placeholder:text-ink/40 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all',
            'focus-visible:outline-none focus-visible:bg-[#B8F400] focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
            error && 'border-danger focus-visible:bg-[#FF4D3D] text-danger focus-visible:text-ink',
            className
          )}
          {...props}
        />
        {(error || helper) && (
          <span className={cn('text-sm font-bold', error ? 'text-danger' : 'text-ink')}>
            {error || helper}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
