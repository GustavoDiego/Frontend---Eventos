import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from './Button';
import { Calendar, Users, Search, Inbox } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'UI/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the empty state',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'Nenhum resultado encontrado',
    description: 'Tente ajustar seus filtros ou criar um novo item.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: Calendar,
    title: 'Nenhum evento encontrado',
    description: 'Crie seu primeiro evento para começar a gerenciar participantes.',
  },
};

export const WithAction: Story = {
  args: {
    icon: Users,
    title: 'Sem participantes',
    description: 'Ainda não há participantes cadastrados neste evento.',
    action: <Button variant="primary" size="sm">Adicionar Participante</Button>,
  },
};

export const SearchEmpty: Story = {
  args: {
    icon: Search,
    title: 'Nenhum resultado',
    description: 'Sua busca não retornou resultados. Tente outros termos.',
  },
};

export const InboxEmpty: Story = {
  args: {
    icon: Inbox,
    title: 'Caixa vazia',
    description: 'Não há notificações ou atividades recentes para exibir.',
    action: <Button variant="outline" size="sm">Atualizar</Button>,
  },
};
