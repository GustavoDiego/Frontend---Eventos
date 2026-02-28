import { Link, useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-display font-normal text-primary mb-4">
          {error?.status === 404 ? '404' : 'Erro'}
        </h1>
        <h2 className="text-2xl font-bold mb-4">
          {error?.status === 404 
            ? 'Página não encontrada' 
            : 'Ops! Ocorreu um erro inesperado.'}
        </h2>
        <p className="text-muted mb-8">
          {error?.status === 404 
            ? 'A página que você está procurando não existe ou foi movida.'
            : (error?.statusText || error?.message || 'Erro desconhecido')}
        </p>
        <Link to="/" className="inline-block mt-4">
          <Button variant="outline">
            Voltar para o Início
          </Button>
        </Link>
      </div>
    </div>
  );
}
