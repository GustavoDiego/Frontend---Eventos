import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { BannerAlert } from '@/components/ui/BannerAlert';
import { ArrowLeft } from 'lucide-react';

const meta: Meta = {
  title: 'Pages/Participants/ParticipantForm',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Form for creating, editing, or transferring participant records.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const eventOptions = [
  { value: '1', label: 'Festival de Música 2026' },
  { value: '2', label: 'Conferência Tech Summit' },
  { value: '3', label: 'Workshop Design Systems' },
  { value: '4', label: 'Hackathon Universitário' },
];

const checkinOptions = [
  { value: 'FEITO', label: 'Feito' },
  { value: 'NAO_FEITO', label: 'Pendente' },
];

export const CreateNew: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-start gap-4">
        <button type="button" className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        <h2 className="text-2xl font-display font-normal text-ink">Novo Participante</h2>
      </div>

      <form className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        <Input label="Nome Completo" />
        <Input type="email" label="E-mail" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select label="Evento" options={eventOptions} />
          <Select label="Status do Check-in" options={checkinOptions} />
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button type="button">Salvar</Button>
        </div>
      </form>
    </div>
  ),
};

export const EditExisting: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-start gap-4">
        <button type="button" className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        <h2 className="text-2xl font-display font-normal text-ink">Editar Participante</h2>
      </div>

      <form className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        <Input label="Nome Completo" defaultValue="João da Silva" />
        <Input type="email" label="E-mail" defaultValue="joao@email.com" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select label="Evento" defaultValue="1" options={eventOptions} />
          <Select label="Status do Check-in" defaultValue="NAO_FEITO" options={checkinOptions} />
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button type="button">Salvar</Button>
        </div>
      </form>
    </div>
  ),
};

export const TransferMode: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-start gap-4">
        <button type="button" className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        <h2 className="text-2xl font-display font-normal text-ink">Transferir Participante</h2>
      </div>

      <form className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        <Input label="Nome Completo" defaultValue="João da Silva" disabled />
        <Input type="email" label="E-mail" defaultValue="joao@email.com" disabled />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select label="Novo Evento" options={eventOptions} />
          <Select label="Status do Check-in" defaultValue="FEITO" options={checkinOptions} disabled />
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button type="button">Transferir</Button>
        </div>
      </form>
    </div>
  ),
};

export const WithValidationErrors: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-start gap-4">
        <button type="button" className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        <h2 className="text-2xl font-display font-normal text-ink">Novo Participante</h2>
      </div>

      <form className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        <BannerAlert type="error" message="Erro ao salvar o participante." />

        <Input label="Nome Completo" error="Nome é obrigatório" />
        <Input type="email" label="E-mail" value="invalid" error="E-mail inválido" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select label="Evento" options={eventOptions} error="Selecione um evento" />
          <Select label="Status do Check-in" options={checkinOptions} error="Selecione um status" />
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button type="button">Salvar</Button>
        </div>
      </form>
    </div>
  ),
};

export const Submitting: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-start gap-4">
        <button type="button" className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        <h2 className="text-2xl font-display font-normal text-ink">Novo Participante</h2>
      </div>

      <form className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        <Input label="Nome Completo" defaultValue="João da Silva" disabled />
        <Input type="email" label="E-mail" defaultValue="joao@email.com" disabled />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select label="Evento" defaultValue="1" options={eventOptions} disabled />
          <Select label="Status do Check-in" defaultValue="NAO_FEITO" options={checkinOptions} disabled />
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button type="button" loading>Salvar</Button>
        </div>
      </form>
    </div>
  ),
};
