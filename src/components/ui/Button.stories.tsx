import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'outline'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
  args: {
    children: 'Clique aqui',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Botão Ghost',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Botão Perigo',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Botão Outline',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Botão Pequeno',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Botão Médio',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Botão Grande',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Carregando...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Desabilitado',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary">Primário</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Perigo</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};
