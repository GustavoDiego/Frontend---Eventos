import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from '@/components/ui/Loading';
import { BannerAlert } from '@/components/ui/BannerAlert';
import { format } from 'date-fns';

const meta: Meta = {
  title: 'Pages/Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Dashboard page displaying an overview of events, participants, and recent activities.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const mockData = {
  totalEventos: 12,
  totalParticipantes: 247,
  proximosEventos: [
    { id: '1', nome: 'Festival de Música 2026', dataHora: '2026-04-15T19:00:00' },
    { id: '2', nome: 'Conferência Tech Summit', dataHora: '2026-05-20T09:00:00' },
    { id: '3', nome: 'Workshop Design Systems', dataHora: '2026-06-10T14:00:00' },
  ],
  ultimasAtividades: [
    { participante: 'João Silva', evento: 'Festival de Música', em: '2026-03-01T10:30:00' },
    { participante: 'Maria Santos', evento: 'Tech Summit', em: '2026-02-28T16:45:00' },
    { participante: 'Pedro Costa', evento: 'Workshop Design', em: '2026-02-28T14:20:00' },
  ],
};

export const Default: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider mix-blend-multiply">
          Visão Geral
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#B8F400] p-8 border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all flex flex-col justify-center">
          <p className="text-xl font-bold text-ink uppercase tracking-widest mb-4">Total Eventos</p>
          <h3 className="text-6xl font-display font-normal text-ink">{mockData.totalEventos}</h3>
        </div>
        <div className="bg-[#9933FF] p-8 border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all flex flex-col justify-center">
          <p className="text-xl font-bold text-[#FAF6EF] uppercase tracking-widest mb-4">Participantes</p>
          <h3 className="text-6xl font-display font-normal text-[#B8F400]">{mockData.totalParticipantes}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-surface border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-8">
          <h3 className="text-3xl font-display font-normal text-[#FF4D3D] uppercase tracking-wider mb-8 border-b-4 border-ink pb-4">Próximos Eventos</h3>
          <div className="space-y-6 pt-2">
            {mockData.proximosEventos.map(ev => (
              <div key={ev.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-[#FAF6EF] p-4 border-2 border-ink group hover:bg-[#FF4D3D] hover:text-[#FAF6EF] transition-colors cursor-default">
                <div className="font-bold text-xl sm:text-2xl uppercase tracking-wider truncate flex-1 min-w-0" title={ev.nome}>{ev.nome}</div>
                <div className="text-sm sm:text-lg font-mono font-bold whitespace-nowrap shrink-0">{format(new Date(ev.dataHora), "dd/MM/yyyy 'às' HH:mm")}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FF2DAA] text-ink border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-8">
          <h3 className="text-3xl font-display font-normal text-ink uppercase tracking-wider mb-8 border-b-4 border-ink pb-4">Últimas Atividades</h3>
          <div className="space-y-4 pt-2">
            {mockData.ultimasAtividades.map((at, i) => (
              <div key={i} className="flex flex-col bg-surface p-4 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                <div className="font-bold text-xl uppercase">{at.participante} <span className="text-sm font-normal text-ink/70 ml-1">em {at.evento}</span></div>
                <div className="text-sm font-mono font-bold mt-1 bg-ink text-[#B8F400] w-fit px-2 py-0.5">{format(new Date(at.em), "dd/MM/yy HH:mm")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => <Loading />,
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <BannerAlert type="error" message="Erro ao carregar os dados do painel." />
      <button className="text-secondary self-start font-semibold">Tentar novamente</button>
    </div>
  ),
};

export const EmptyDashboard: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider mix-blend-multiply">
          Visão Geral
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#B8F400] p-8 border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] flex flex-col justify-center">
          <p className="text-xl font-bold text-ink uppercase tracking-widest mb-4">Total Eventos</p>
          <h3 className="text-6xl font-display font-normal text-ink">0</h3>
        </div>
        <div className="bg-[#9933FF] p-8 border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] flex flex-col justify-center">
          <p className="text-xl font-bold text-[#FAF6EF] uppercase tracking-widest mb-4">Participantes</p>
          <h3 className="text-6xl font-display font-normal text-[#B8F400]">0</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-surface border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-8">
          <h3 className="text-3xl font-display font-normal text-[#FF4D3D] uppercase tracking-wider mb-8 border-b-4 border-ink pb-4">Próximos Eventos</h3>
          <p className="text-xl font-bold py-4">Nenhum evento próximo.</p>
        </div>

        <div className="bg-[#FF2DAA] text-ink border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-8">
          <h3 className="text-3xl font-display font-normal text-ink uppercase tracking-wider mb-8 border-b-4 border-ink pb-4">Últimas Atividades</h3>
          <p className="text-xl font-bold py-4">Nenhuma atividade recente.</p>
        </div>
      </div>
    </div>
  ),
};
