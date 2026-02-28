import React from 'react';
import { cn } from './Button';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center bg-surface border border-border border-dashed rounded-md', className)}>
      {Icon && <Icon className="w-12 h-12 text-muted mb-4" strokeWidth={1.5} />}
      <h3 className="text-lg font-display font-normal text-ink mb-1">{title}</h3>
      <p className="text-sm text-muted max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
