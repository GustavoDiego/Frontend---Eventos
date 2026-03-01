import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';
import { Loading } from '@/components/ui/Loading';
import { BannerAlert } from '@/components/ui/BannerAlert';
import { Calendar, Plus, Pencil, Trash2, ClipboardCheck } from 'lucide-react';
import { format } from 'date-fns';

const meta: Meta = {
  title: 'Pages/Events/EventsList',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'List page displaying all events with actions to create, edit, and delete.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const mockEvents = [
  { id: '1', nome: 'Festival de Música 2026', dataHora: '2026-04-15T19:00:00', local: 'São Paulo, SP', status: 'ATIVO' },
  { id: '2', nome: 'Conferência Tech Summit', dataHora: '2026-05-20T09:00:00', local: 'Rio de Janeiro, RJ', status: 'ATIVO' },
  { id: '3', nome: 'Workshop Design Systems', dataHora: '2026-06-10T14:00:00', local: 'Belo Horizonte, MG', status: 'ENCERRADO' },
  { id: '4', nome: 'Hackathon Universitário', dataHora: '2026-07-25T08:00:00', local: 'Curitiba, PR', status: 'ATIVO' },
];

const FilterBar = () => (
  <div className="bg-surface border-4 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] p-4 flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row gap-4">
    <div className="flex-1 xl:w-auto">
      <Input placeholder="Buscar por nome..." />
    </div>
    <div className="w-full xl:w-64">
      <Select
        options={[
          { value: 'ATIVO', label: 'Ativo' },
          { value: 'ENCERRADO', label: 'Encerrado' },
        ]}
      />
    </div>
    <div className="w-full md:col-span-2 xl:col-span-1 xl:w-auto flex items-end justify-end">
      <Button className="w-full md:w-auto" variant="outline" size="sm" disabled>
        Limpar filtros
      </Button>
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider">
          Eventos
        </h2>
        <Button variant="primary" size="md" className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" /> Novo Evento
        </Button>
      </div>

      <FilterBar />

      <div className="grid gap-6">
        {mockEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-surface border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-6 hover:shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-display uppercase tracking-wider text-ink truncate">{ev.nome}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted font-bold">
                  <span>{format(new Date(ev.dataHora), "dd/MM/yyyy 'às' HH:mm")}</span>
                  <span>{ev.local}</span>
                  <span className={`inline-block px-2 py-0.5 text-xs font-bold uppercase border-2 border-ink ${ev.status === 'ATIVO' ? 'bg-success text-surface' : 'bg-muted/30 text-ink'}`}>
                    {ev.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm">
                  <ClipboardCheck className="w-4 h-4 mr-1" /> Check-in
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="w-4 h-4 mr-1" /> Editar
                </Button>
                <Button variant="danger" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider">
          Eventos
        </h2>
        <Button variant="primary" size="md" className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" /> Novo Evento
        </Button>
      </div>

      <FilterBar />

      <EmptyState
        icon={Calendar}
        title="Nenhum evento encontrado"
        description="Crie seu primeiro evento para começar a gerenciar participantes."
        action={<Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-1" /> Criar Evento</Button>}
      />
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider">
          Eventos
        </h2>
      </div>
      <Loading />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider">
          Eventos
        </h2>
      </div>
      <BannerAlert type="error" message="Erro ao carregar os eventos." />
    </div>
  ),
};
