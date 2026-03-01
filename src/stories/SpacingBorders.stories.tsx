import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design System/Spacing & Borders',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Spacing tokens and border radius used in the Carva design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-display uppercase tracking-wider text-ink mb-2">Espaçamento</h2>
        <p className="text-muted text-lg">Escala de espaçamento personalizada do sistema.</p>
      </div>

      <div className="space-y-3">
        {[
          { token: '1 (4px)', width: '4px' },
          { token: '2 (8px)', width: '8px' },
          { token: '3 (12px)', width: '12px' },
          { token: '4 (16px)', width: '16px' },
          { token: '5 (24px)', width: '24px' },
          { token: '6 (32px)', width: '32px' },
          { token: '8 (48px)', width: '48px' },
          { token: '10 (64px)', width: '64px' },
          { token: '12 (80px)', width: '80px' },
        ].map((item) => (
          <div key={item.token} className="flex items-center gap-4">
            <code className="text-xs font-mono text-muted w-24 shrink-0">{item.token}</code>
            <div
              className="h-6 bg-secondary border-2 border-ink"
              style={{ width: item.width }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-display uppercase tracking-wider text-ink mb-2">Border Radius</h2>
        <p className="text-muted text-lg">Valores de arredondamento de bordas.</p>
      </div>

      <div className="flex flex-wrap gap-6">
        {[
          { label: 'sm (10px)', value: '10px' },
          { label: 'md (14px)', value: '14px' },
          { label: 'lg (18px)', value: '18px' },
          { label: 'xl (24px)', value: '24px' },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div
              className="w-24 h-24 bg-primary border-4 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] mb-2"
              style={{ borderRadius: item.value }}
            />
            <code className="text-xs font-mono text-muted">{item.label}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-display uppercase tracking-wider text-ink mb-2">Sombras (Brutalist)</h2>
        <p className="text-muted text-lg">Efeito de sombra sólida usado no sistema.</p>
      </div>

      <div className="flex flex-wrap gap-8">
        <div className="text-center">
          <div className="w-32 h-32 bg-surface border-2 border-ink shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] mb-3" />
          <code className="text-xs font-mono text-muted">2px hover</code>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 bg-surface border-2 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] mb-3" />
          <code className="text-xs font-mono text-muted">4px default</code>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 bg-surface border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] mb-3" />
          <code className="text-xs font-mono text-muted">8px elevated</code>
        </div>
        <div className="text-center">
          <div className="w-32 h-32 bg-surface border-4 border-ink shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] mb-3" />
          <code className="text-xs font-mono text-muted">12px prominent</code>
        </div>
      </div>
    </div>
  ),
};
