import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { BannerAlert } from '@/components/ui/BannerAlert';
import { ArrowLeft } from 'lucide-react';

const meta: Meta = {
  title: 'Pages/Events/EventForm',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Form for creating or editing events.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const CreateNew: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-start gap-4">
        <button type="button" className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        <h2 className="text-2xl font-display font-normal text-ink">Novo Evento</h2>
      </div>

      <form className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        <Input label="Nome do Evento" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input type="datetime-local" label="Data e Hora" />
          <Select
            label="Status"
            options={[
              { value: 'ATIVO', label: 'Ativo' },
              { value: 'ENCERRADO', label: 'Encerrado' },
            ]}
          />
        </div>

        <Input label="Local" />

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
        <h2 className="text-2xl font-display font-normal text-ink">Editar Evento</h2>
      </div>

      <form className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        <Input label="Nome do Evento" defaultValue="Festival de Música 2026" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input type="datetime-local" label="Data e Hora" defaultValue="2026-04-15T19:00" />
          <Select
            label="Status"
            defaultValue="ATIVO"
            options={[
              { value: 'ATIVO', label: 'Ativo' },
              { value: 'ENCERRADO', label: 'Encerrado' },
            ]}
          />
        </div>

        <Input label="Local" defaultValue="São Paulo, SP" />

        <div className="flex justify-end pt-4 border-t border-border">
          <Button type="button">Salvar</Button>
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
        <h2 className="text-2xl font-display font-normal text-ink">Novo Evento</h2>
      </div>

      <form className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        <BannerAlert type="error" message="Erro ao salvar o evento." />

        <Input label="Nome do Evento" error="Nome é obrigatório" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input type="datetime-local" label="Data e Hora" error="Data é obrigatória" />
          <Select
            label="Status"
            options={[
              { value: 'ATIVO', label: 'Ativo' },
              { value: 'ENCERRADO', label: 'Encerrado' },
            ]}
            error="Selecione um status"
          />
        </div>

        <Input label="Local" error="Local é obrigatório" />

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
        <h2 className="text-2xl font-display font-normal text-ink">Novo Evento</h2>
      </div>

      <form className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        <Input label="Nome do Evento" defaultValue="Festival de Música 2026" disabled />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input type="datetime-local" label="Data e Hora" defaultValue="2026-04-15T19:00" disabled />
          <Select
            label="Status"
            defaultValue="ATIVO"
            options={[
              { value: 'ATIVO', label: 'Ativo' },
              { value: 'ENCERRADO', label: 'Encerrado' },
            ]}
            disabled
          />
        </div>

        <Input label="Local" defaultValue="São Paulo, SP" disabled />

        <div className="flex justify-end pt-4 border-t border-border">
          <Button type="button" loading>Salvar</Button>
        </div>
      </form>
    </div>
  ),
};
