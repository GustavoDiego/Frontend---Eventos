import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterRequest } from '@/domain/auth/auth.schema';
import { authService } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BannerAlert } from '@/components/ui/BannerAlert';

export function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterRequest) => {
    setError('');
    setSuccess('');
    try {
      await authService.register(data);
      setSuccess('Conta criada com sucesso! Faça login para continuar.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta');
    }
  };

  return (
    <div className="min-h-screen flex text-ink bg-bg">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-display font-normal text-ink">Criar Conta</h2>
          <p className="mt-2 text-sm text-muted">Junte-se à nossa plataforma de eventos</p>

          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && <BannerAlert type="error" message={error} />}
              {success && <BannerAlert type="success" message={success} />}
              
              <Input
                label="Nome"
                type="text"
                placeholder="Seu Nome"
                {...register('name')}
                error={errors.name?.message}
              />

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

              <Button type="submit" className="w-full" loading={isSubmitting}>
                Cadastrar
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <span className="text-muted">Já tem uma conta? </span>
              <Link to="/login" className="font-semibold text-primary hover:underline transition-all">
                Entre agora
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1 bg-surface border-l border-border">
        <div className="absolute inset-0 flex items-center justify-center p-12">
           <div className="max-w-lg">
             <h1 className="text-4xl font-display font-normal leading-tight text-ink">
               O primeiro passo para <br/> <span className="text-primary text-5xl">Eventos Incríveis!</span>
             </h1>
             <p className="mt-6 text-xl text-muted font-body">Crie agora a sua conta e transforme a forma de gerenciar e organizar encontros memoráveis.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
