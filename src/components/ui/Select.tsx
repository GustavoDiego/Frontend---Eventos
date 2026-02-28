import React from 'react';
import { cn } from './Button';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helper, id, options, ...props }, ref) => {
    const selectId = id || React.useId();
    
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-xl font-display uppercase tracking-wider text-ink">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          aria-invalid={!!error}
          className={cn(
            'flex min-h-[3.5rem] w-full border-4 border-ink bg-[#FAF6EF] px-4 py-3 text-lg font-bold text-ink placeholder:text-muted/60 appearance-none shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all cursor-pointer',
            'focus-visible:outline-none focus-visible:bg-[#B8F400] focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]',
            'hover:bg-[#B8F400]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
            error && 'border-danger focus-visible:bg-[#FF4D3D] text-danger focus-visible:text-ink',
            className
          )}
          style={{ backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%231A1A1A' stroke-linecap='square' stroke-linejoin='miter' stroke-width='4' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")` }}
          {...props}
        >
          <option value="" disabled hidden className="bg-[#FAF6EF] text-ink font-bold">Selecione...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#FAF6EF] text-ink font-bold py-2">
              {opt.label}
            </option>
          ))}
        </select>
        {(error || helper) && (
          <span className={cn('text-sm font-bold', error ? 'text-danger' : 'text-muted')}>
            {error || helper}
          </span>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
