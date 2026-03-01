import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design System/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography styles and font families used in the Carva design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const FontFamilies: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-display uppercase tracking-wider text-ink mb-6">Tipografia</h2>
        <p className="text-muted text-lg">Famílias tipográficas do Design System Carva.</p>
      </div>

      <div className="space-y-8">
        <div className="border-4 border-ink p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
          <p className="text-sm font-bold text-muted uppercase tracking-widest mb-2">Display — Laviossa</p>
          <p className="text-5xl font-display uppercase tracking-wider text-ink">
            Carva Eventos
          </p>
          <p className="text-3xl font-display uppercase tracking-wider text-ink mt-2">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
        </div>

        <div className="border-4 border-ink p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
          <p className="text-sm font-bold text-muted uppercase tracking-widest mb-2">Cinema — LifeCinemaScreen</p>
          <p className="text-5xl font-cinema uppercase tracking-wider text-ink">
            Carva Eventos
          </p>
          <p className="text-3xl font-cinema uppercase tracking-wider text-ink mt-2">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
        </div>

        <div className="border-4 border-ink p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
          <p className="text-sm font-bold text-muted uppercase tracking-widest mb-2">Body — Newsreader</p>
          <p className="text-2xl font-body text-ink">
            Festival editorial, com disciplina de sistema. Organize eventos com a melhor experiência e clareza.
          </p>
          <p className="text-lg font-body text-ink mt-2">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
          </p>
        </div>

        <div className="border-4 border-ink p-6 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
          <p className="text-sm font-bold text-muted uppercase tracking-widest mb-2">UI — Inter</p>
          <p className="text-2xl font-ui text-ink">
            Interface limpa e funcional para administração.
          </p>
          <p className="text-lg font-ui text-ink mt-2">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
          </p>
        </div>
      </div>
    </div>
  ),
};

export const TextSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-display uppercase tracking-wider text-ink mb-6">Escalas de Texto</h2>

      <div className="space-y-4">
        {[
          { size: 'text-xs', label: 'Extra Small (xs)' },
          { size: 'text-sm', label: 'Small (sm)' },
          { size: 'text-base', label: 'Base' },
          { size: 'text-lg', label: 'Large (lg)' },
          { size: 'text-xl', label: 'Extra Large (xl)' },
          { size: 'text-2xl', label: '2XL' },
          { size: 'text-3xl', label: '3XL' },
          { size: 'text-4xl', label: '4XL' },
          { size: 'text-5xl', label: '5XL' },
          { size: 'text-6xl', label: '6XL' },
        ].map((item) => (
          <div key={item.size} className="flex items-baseline gap-4 border-b border-border pb-2">
            <code className="text-xs font-mono text-muted w-20 shrink-0">{item.size}</code>
            <span className={`${item.size} font-ui text-ink`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-display uppercase tracking-wider text-ink mb-6">Pesos Tipográficos</h2>

      <div className="space-y-4">
        {[
          { weight: 'font-normal', label: 'Normal (400)' },
          { weight: 'font-medium', label: 'Medium (500)' },
          { weight: 'font-semibold', label: 'Semibold (600)' },
          { weight: 'font-bold', label: 'Bold (700)' },
          { weight: 'font-extrabold', label: 'Extra Bold (800)' },
        ].map((item) => (
          <div key={item.weight} className="flex items-baseline gap-4 border-b border-border pb-2">
            <code className="text-xs font-mono text-muted w-28 shrink-0">{item.weight}</code>
            <span className={`text-2xl font-ui text-ink ${item.weight}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
