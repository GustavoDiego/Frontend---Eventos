import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';
import { Loading } from '@/components/ui/Loading';
import { BannerAlert } from '@/components/ui/BannerAlert';
import { Users, Plus, Pencil, Trash2, ArrowRightLeft } from 'lucide-react';

const meta: Meta = {
  title: 'Pages/Participants/ParticipantsList',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'List page displaying all participants with actions to create, edit, transfer, and delete.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const mockEvents = [
  { id: '1', nome: 'Festival de Música 2026' },
  { id: '2', nome: 'Conferência Tech Summit' },
  { id: '3', nome: 'Workshop Design Systems' },
  { id: '4', nome: 'Hackathon Universitário' },
];

const mockParticipants = [
  { id: '1', nome: 'João Silva', email: 'joao@email.com', eventoId: '1', checkin: 'FEITO' as const },
  { id: '2', nome: 'Maria Santos', email: 'maria@email.com', eventoId: '2', checkin: 'NAO_FEITO' as const },
  { id: '3', nome: 'Pedro Costa', email: 'pedro@email.com', eventoId: '3', checkin: 'FEITO' as const },
  { id: '4', nome: 'Ana Oliveira', email: 'ana@email.com', eventoId: '1', checkin: 'NAO_FEITO' as const },
  { id: '5', nome: 'Lucas Souza', email: 'lucas@email.com', eventoId: '4', checkin: 'FEITO' as const },
];

const getEventName = (eventoId: string) => {
  const e = mockEvents.find(ev => ev.id === eventoId);
  return e ? e.nome : '-';
};

const FilterBar = () => (
  <div className="bg-surface border-4 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] p-4 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-4">
    <div className="flex-1 lg:w-auto">
      <Input placeholder="Buscar por nome ou e-mail..." />
    </div>
    <div className="w-full lg:w-64">
      <Select
        options={mockEvents.map(e => ({ value: e.id, label: e.nome }))}
      />
    </div>
    <div className="w-full lg:w-48">
      <Select
        options={[
          { value: 'FEITO', label: 'Check-in: Feito' },
          { value: 'NAO_FEITO', label: 'Check-in: Pendente' },
        ]}
      />
    </div>
    <div className="w-full md:col-span-2 lg:col-span-1 lg:w-auto flex items-end justify-end">
      <Button className="w-full lg:w-auto" variant="outline" size="sm" disabled>
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
          Participantes
        </h2>
        <Button variant="primary" size="md" className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" /> Novo Participante
        </Button>
      </div>

      <FilterBar />

      <div className="overflow-x-auto">
        <table className="w-full border-4 border-ink">
          <thead>
            <tr className="bg-ink text-[#FAF6EF]">
              <th className="text-left p-4 font-display uppercase tracking-wider text-lg">Nome</th>
              <th className="text-left p-4 font-display uppercase tracking-wider text-lg">E-mail</th>
              <th className="text-left p-4 font-display uppercase tracking-wider text-lg">Evento</th>
              <th className="text-center p-4 font-display uppercase tracking-wider text-lg">Check-in</th>
              <th className="text-right p-4 font-display uppercase tracking-wider text-lg">Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockParticipants.map((p, i) => (
              <tr key={p.id} className={`border-t-2 border-ink ${i % 2 === 0 ? 'bg-surface' : 'bg-bg'} hover:bg-[#B8F400] transition-colors`}>
                <td className="p-4 font-bold text-ink">{p.nome}</td>
                <td className="p-4 text-muted">{p.email}</td>
                <td className="p-4 text-muted">{getEventName(p.eventoId)}</td>
                <td className="p-4 text-center">
                  <span className={`inline-block px-3 py-1 text-xs font-bold uppercase border-2 border-ink ${p.checkin === 'FEITO' ? 'bg-success text-surface' : 'bg-warning text-ink'}`}>
                    {p.checkin === 'FEITO' ? 'Sim' : 'Não'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" title="Transferir">
                      <ArrowRightLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="danger" size="sm" title="Remover">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider">
          Participantes
        </h2>
        <Button variant="primary" size="md" className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" /> Novo Participante
        </Button>
      </div>

      <FilterBar />

      <EmptyState
        icon={Users}
        title="Nenhum participante encontrado"
        description="Cadastre participantes para começar a gerenciar presenças."
        action={<Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-1" /> Cadastrar Participante</Button>}
      />
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider">
        Participantes
      </h2>
      <Loading />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider">
        Participantes
      </h2>
      <BannerAlert type="error" message="Erro ao carregar a lista de participantes." />
    </div>
  ),
};
