import type { Meta, StoryObj } from '@storybook/react-vite';
import { BannerAlert } from './BannerAlert';

const meta: Meta<typeof BannerAlert> = {
  title: 'UI/BannerAlert',
  component: BannerAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'Type of alert banner',
    },
    title: {
      control: 'text',
      description: 'Optional title for the alert',
    },
    message: {
      control: 'text',
      description: 'Alert message content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BannerAlert>;

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Ocorreu um erro ao processar sua solicitação.',
  },
};

export const ErrorWithTitle: Story = {
  args: {
    type: 'error',
    title: 'Erro de validação',
    message: 'Verifique os campos obrigatórios e tente novamente.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Atenção: o evento será encerrado em breve.',
  },
};

export const WarningWithTitle: Story = {
  args: {
    type: 'warning',
    title: 'Aviso importante',
    message: 'Sua sessão expira em 5 minutos.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    message: 'Novas funcionalidades foram adicionadas.',
  },
};

export const InfoWithTitle: Story = {
  args: {
    type: 'info',
    title: 'Novidade',
    message: 'Agora você pode exportar relatórios em PDF.',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Evento criado com sucesso!',
  },
};

export const SuccessWithTitle: Story = {
  args: {
    type: 'success',
    title: 'Operação concluída',
    message: 'Todos os participantes foram importados com sucesso.',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <BannerAlert type="error" title="Erro" message="Algo deu errado." />
      <BannerAlert type="warning" title="Aviso" message="Preste atenção." />
      <BannerAlert type="info" title="Info" message="Informação útil." />
      <BannerAlert type="success" title="Sucesso" message="Tudo certo!" />
    </div>
  ),
};
