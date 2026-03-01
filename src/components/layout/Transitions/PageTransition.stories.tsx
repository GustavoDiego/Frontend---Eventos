import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageTransition } from './PageTransition';

const meta: Meta<typeof PageTransition> = {
  title: 'Layout/PageTransition',
  component: PageTransition,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Wrapper component that provides entrance/exit animations using Framer Motion.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageTransition>;

export const Default: Story = {
  render: () => (
    <PageTransition>
      <div className="p-8 bg-surface border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
        <h2 className="text-3xl font-display uppercase tracking-wider text-ink mb-4">
          Conteúdo Animado
        </h2>
        <p className="text-lg text-muted">
          Este componente envolve o conteúdo da página com animações de entrada e saída suaves.
        </p>
      </div>
    </PageTransition>
  ),
};

export const WithCard: Story = {
  render: () => (
    <PageTransition>
      <div className="space-y-4 max-w-md">
        <div className="bg-primary p-6 border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
          <h3 className="text-2xl font-display uppercase text-ink">Card 1</h3>
        </div>
        <div className="bg-secondary p-6 border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
          <h3 className="text-2xl font-display uppercase text-surface">Card 2</h3>
        </div>
        <div className="bg-accent p-6 border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
          <h3 className="text-2xl font-display uppercase text-ink">Card 3</h3>
        </div>
      </div>
    </PageTransition>
  ),
};
