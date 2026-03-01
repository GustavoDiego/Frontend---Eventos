import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BannerAlert } from '@/components/ui/BannerAlert';

/**
 * Visual representation of the Login page layout.
 * Since the actual Login page depends on auth context and routing,
 * this story recreates the visual structure.
 */
const meta: Meta = {
  title: 'Pages/Login',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Login page for the admin panel authentication.',
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
          <h2 className="mt-6 text-3xl font-display font-normal text-ink">Entrar no Painel</h2>
          <p className="mt-2 text-sm text-muted">Acesse a administração de eventos</p>

          <div className="mt-8">
            <form className="space-y-6">
              <Input
                label="E-mail"
                type="email"
                placeholder="admin@events.com"
              />
              <Input
                label="Senha"
                type="password"
                placeholder="******"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-border text-secondary focus:ring-secondary" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-ink">Lembrar-me</label>
                </div>
              </div>

              <Button type="button" className="w-full">
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted">Ainda não tem conta? </span>
              <span className="font-semibold text-primary hover:underline cursor-pointer transition-all">
                Crie agora
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1 bg-surface border-l border-border">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg">
            <h1 className="text-4xl font-display font-normal leading-tight text-ink">
              Criamos histórias <br /> <span className="text-primary text-5xl">Memoráveis!</span>
            </h1>
            <p className="mt-6 text-xl text-muted font-body">Festival editorial, com disciplina de sistema. Organize eventos com a melhor experiência e clareza.</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="min-h-screen flex text-ink bg-bg">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-display font-normal text-ink">Entrar no Painel</h2>
          <p className="mt-2 text-sm text-muted">Acesse a administração de eventos</p>

          <div className="mt-8">
            <form className="space-y-6">
              <BannerAlert type="error" message="Credenciais inválidas. Verifique seu e-mail e senha." />
              <Input
                label="E-mail"
                type="email"
                placeholder="admin@events.com"
                error="E-mail ou senha incorretos"
              />
              <Input
                label="Senha"
                type="password"
                placeholder="******"
              />
              <Button type="button" className="w-full">
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="min-h-screen flex text-ink bg-bg">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-display font-normal text-ink">Entrar no Painel</h2>
          <p className="mt-2 text-sm text-muted">Acesse a administração de eventos</p>

          <div className="mt-8">
            <form className="space-y-6">
              <Input label="E-mail" type="email" value="admin@events.com" readOnly />
              <Input label="Senha" type="password" value="password" readOnly />
              <Button type="button" className="w-full" loading>
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ),
};
