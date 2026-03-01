import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input',
    },
    helper: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome...',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'admin@events.com',
    helper: 'Insira um e-mail válido',
  },
};

export const WithError: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'admin@events.com',
    value: 'invalid-email',
    error: 'E-mail inválido',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo Desabilitado',
    placeholder: 'Não editável',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: '******',
  },
};

export const Number: Story = {
  args: {
    label: 'Quantidade',
    type: 'number',
    placeholder: '0',
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Input sem label...',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input label="Normal" placeholder="Digite algo..." />
      <Input label="Com Helper" placeholder="Exemplo..." helper="Texto auxiliar" />
      <Input label="Com Erro" placeholder="Inválido" error="Campo obrigatório" />
      <Input label="Desabilitado" placeholder="Não editável" disabled />
    </div>
  ),
};
