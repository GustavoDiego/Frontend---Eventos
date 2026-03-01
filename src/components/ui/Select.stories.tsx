import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const sampleOptions = [
  { value: 'option1', label: 'Opção 1' },
  { value: 'option2', label: 'Opção 2' },
  { value: 'option3', label: 'Opção 3' },
  { value: 'option4', label: 'Opção 4' },
];

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text above the select',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the select',
    },
    helper: {
      control: 'text',
      description: 'Helper text displayed below the select',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
    },
  },
  args: {
    options: sampleOptions,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: 'Categoria',
    options: sampleOptions,
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Tipo de Evento',
    options: [
      { value: 'conference', label: 'Conferência' },
      { value: 'workshop', label: 'Workshop' },
      { value: 'meetup', label: 'Meetup' },
    ],
    helper: 'Selecione o tipo do evento',
  },
};

export const WithError: Story = {
  args: {
    label: 'Categoria',
    options: sampleOptions,
    error: 'Seleção obrigatória',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo Bloqueado',
    options: sampleOptions,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    options: sampleOptions,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Select label="Normal" options={sampleOptions} />
      <Select label="Com Helper" options={sampleOptions} helper="Texto auxiliar" />
      <Select label="Com Erro" options={sampleOptions} error="Campo obrigatório" />
      <Select label="Desabilitado" options={sampleOptions} disabled />
    </div>
  ),
};
