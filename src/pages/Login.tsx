import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginRequest } from '@/domain/auth/auth.schema';
import { authService } from '@/services/api';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BannerAlert } from '@/components/ui/BannerAlert';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginRequest) => {
    setError('');
    try {
      const res = await authService.login(data);
      login(res.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao efetuar login');
    }
  };

  return (
    <div className="min-h-screen flex text-ink bg-bg">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-display font-normal text-ink">Entrar no Painel</h2>
          <p className="mt-2 text-sm text-muted">Acesse a administração de eventos</p>

          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && <BannerAlert type="error" message={error} />}
              
              <Input
                label="E-mail"
                type="email"
                placeholder="admin@events.com"
                {...register('email')}
                error={errors.email?.message}
              />

              <Input
                label="Senha"
                type="password"
                placeholder="******"
                {...register('password')}
                error={errors.password?.message}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-border text-secondary focus:ring-secondary" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-ink">Lembrar-me</label>
                </div>
              </div>

              <Button type="submit" className="w-full" loading={isSubmitting}>
                Entrar
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted">Ainda não tem conta? </span>
              <Link to="/register" className="font-semibold text-primary hover:underline transition-all">
                Crie agora
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1 bg-surface border-l border-border">
        <div className="absolute inset-0 flex items-center justify-center p-12">
           <div className="max-w-lg">
             <h1 className="text-4xl font-display font-normal leading-tight text-ink">
               Criamos histórias <br/> <span className="text-primary text-5xl">Memoráveis!</span>
             </h1>
             <p className="mt-6 text-xl text-muted font-body">Festival editorial, com disciplina de sistema. Organize eventos com a melhor experiência e clareza.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
