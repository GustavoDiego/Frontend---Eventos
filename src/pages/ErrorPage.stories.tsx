import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';

const meta: Meta = {
  title: 'Pages/ErrorPage',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Error page displayed when a route is not found or an unexpected error occurs.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const NotFound: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-display font-normal text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>
        <p className="text-muted mb-8">A página que você está procurando não existe ou foi movida.</p>
        <Button variant="outline">Voltar para o Início</Button>
      </div>
    </div>
  ),
};

export const GenericError: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-display font-normal text-primary mb-4">Erro</h1>
        <h2 className="text-2xl font-bold mb-4">Ops! Ocorreu um erro inesperado.</h2>
        <p className="text-muted mb-8">Erro desconhecido</p>
        <Button variant="outline">Voltar para o Início</Button>
      </div>
    </div>
  ),
};
