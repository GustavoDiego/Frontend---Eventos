import { Loader2 } from 'lucide-react';

export function Loading({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-muted ${className || ''}`}>
      <Loader2 className="w-8 h-8 animate-spin text-secondary mb-4" />
      <p className="text-sm font-medium">Carregando...</p>
    </div>
  );
}
