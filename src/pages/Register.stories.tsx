import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BannerAlert } from '@/components/ui/BannerAlert';

const meta: Meta = {
  title: 'Pages/Register',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Registration page for new users to create an account.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen flex text-ink bg-bg">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-display font-normal text-ink">Criar Conta</h2>
          <p className="mt-2 text-sm text-muted">Junte-se à nossa plataforma de eventos</p>

          <div className="mt-8">
            <form className="space-y-6">
              <Input label="Nome" type="text" placeholder="Seu Nome" />
              <Input label="E-mail" type="email" placeholder="admin@events.com" />
              <Input label="Senha" type="password" placeholder="******" />
              <Button type="button" className="w-full">Cadastrar</Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <span className="text-muted">Já tem uma conta? </span>
              <span className="font-semibold text-primary hover:underline cursor-pointer transition-all">Entre agora</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1 bg-surface border-l border-border">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg">
            <h1 className="text-4xl font-display font-normal leading-tight text-ink">
              O primeiro passo para <br /> <span className="text-primary text-5xl">Eventos Incríveis!</span>
            </h1>
            <p className="mt-6 text-xl text-muted font-body">Crie agora a sua conta e transforme a forma de gerenciar e organizar encontros memoráveis.</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithValidationErrors: Story = {
  render: () => (
    <div className="min-h-screen flex text-ink bg-bg">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-display font-normal text-ink">Criar Conta</h2>
          <p className="mt-2 text-sm text-muted">Junte-se à nossa plataforma de eventos</p>

          <div className="mt-8">
            <form className="space-y-6">
              <Input label="Nome" type="text" error="Nome é obrigatório" />
              <Input label="E-mail" type="email" value="invalid" error="E-mail inválido" />
              <Input label="Senha" type="password" value="12" error="Mínimo de 6 caracteres" />
              <Button type="button" className="w-full">Cadastrar</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="min-h-screen flex text-ink bg-bg">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-display font-normal text-ink">Criar Conta</h2>
          <p className="mt-2 text-sm text-muted">Junte-se à nossa plataforma de eventos</p>

          <div className="mt-8">
            <form className="space-y-6">
              <BannerAlert type="error" message="Erro ao criar conta" />
              <Input label="Nome" type="text" placeholder="Seu Nome" />
              <Input label="E-mail" type="email" placeholder="admin@events.com" />
              <Input label="Senha" type="password" placeholder="******" />
              <Button type="button" className="w-full">Cadastrar</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SuccessState: Story = {
  render: () => (
    <div className="min-h-screen flex text-ink bg-bg">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-display font-normal text-ink">Criar Conta</h2>
          <p className="mt-2 text-sm text-muted">Junte-se à nossa plataforma de eventos</p>

          <div className="mt-8">
            <BannerAlert type="success" message="Conta criada com sucesso! Faça login para continuar." />
          </div>
        </div>
      </div>
    </div>
  ),
};
