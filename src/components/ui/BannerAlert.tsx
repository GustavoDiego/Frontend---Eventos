import { AlertTriangle, XCircle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from './Button';

interface BannerAlertProps {
  type: 'error' | 'warning' | 'info' | 'success';
  title?: string;
  message: string;
  className?: string;
}

export function BannerAlert({ type, title, message, className }: BannerAlertProps) {
  const styles = {
    error: 'bg-danger/10 text-danger border-danger/20',
    warning: 'bg-warning/10 text-[#B37B16] border-warning/20', // darkened text for higher contrast
    info: 'bg-secondary/10 text-secondary border-secondary/20',
    success: 'bg-success/10 text-success border-success/20',
  };

  const icons = {
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle2,
  };

  const Icon = icons[type];

  return (
    <div className={cn('p-4 border rounded-md flex items-start gap-3', styles[type], className)}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        {title && <h4 className="font-semibold text-sm">{title}</h4>}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
