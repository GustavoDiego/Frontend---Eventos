import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    
const baseStyles = 'inline-flex items-center justify-center font-display uppercase tracking-wider transition-all focus-visible:outline-none border-2 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none font-bold';

    const variants = {
      primary: 'bg-primary text-ink hover:bg-[#FF2DAA]',
      secondary: 'bg-secondary text-surface hover:bg-[#B8F400] hover:text-ink',
      danger: 'bg-danger text-surface hover:bg-[#1A1A1A]',
      ghost: 'bg-transparent text-ink hover:bg-surface border-transparent shadow-none hover:shadow-none hover:translate-y-0 active:translate-y-0 underline decoration-2 underline-offset-4',
      outline: 'bg-surface text-ink hover:bg-[#B8F400]',
    };

    const sizes = {
      sm: 'h-10 px-4 text-xs font-semibold',
      md: 'h-12 px-6 text-sm font-bold',
      lg: 'h-14 px-8 text-base font-extrabold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          (disabled || loading) && 'opacity-60 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
