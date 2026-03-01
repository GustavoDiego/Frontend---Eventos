import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Design System/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Design tokens for the Carva design system colors.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const colors = [
  { name: 'Background (bg)', value: '#FAF6EF', textClass: 'text-ink' },
  { name: 'Surface', value: '#FFFFFF', textClass: 'text-ink' },
  { name: 'Ink', value: '#1A1A1A', textClass: 'text-white' },
  { name: 'Muted', value: '#5E5E5E', textClass: 'text-white' },
  { name: 'Border', value: '#E8E1D6', textClass: 'text-ink' },
  { name: 'Primary', value: '#FF4D3D', textClass: 'text-ink' },
  { name: 'Secondary', value: '#2D5BFF', textClass: 'text-white' },
  { name: 'Accent', value: '#B8F400', textClass: 'text-ink' },
  { name: 'Accent2', value: '#FF2DAA', textClass: 'text-ink' },
  { name: 'Success', value: '#14B86A', textClass: 'text-white' },
  { name: 'Warning', value: '#FFB020', textClass: 'text-ink' },
  { name: 'Danger', value: '#E5262A', textClass: 'text-white' },
];

export const ColorPalette: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-display uppercase tracking-wider text-ink mb-2">Paleta de Cores</h2>
        <p className="text-muted text-lg">Tokens de cor do Design System Carva.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div key={color.name} className="border-4 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] overflow-hidden">
            <div
              className={`h-24 flex items-end p-3 ${color.textClass}`}
              style={{ backgroundColor: color.value }}
            >
              <span className="font-bold text-sm uppercase tracking-wider">{color.name}</span>
            </div>
            <div className="bg-surface p-3 border-t-2 border-ink">
              <code className="text-xs font-mono font-bold">{color.value}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
