import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/api';
import { Loading } from '@/components/ui/Loading';
import { BannerAlert } from '@/components/ui/BannerAlert';
import { format } from 'date-fns';

export function Dashboard() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getDashboard
  });

  if (isLoading) return <Loading />;
  if (error) return (
    <div className="flex flex-col gap-4">
      <BannerAlert type="error" message="Erro ao carregar os dados do painel." />
      <button onClick={() => refetch()} className="text-secondary self-start font-semibold">Tentar novamente</button>
    </div>
  );
  if (!data) return null;

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider mix-blend-multiply">
          Visão Geral
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#B8F400] p-8 border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all flex flex-col justify-center">
          <p className="text-xl font-bold text-ink uppercase tracking-widest mb-4">Total Eventos</p>
          <h3 className="text-6xl font-display font-normal text-ink">{data.totalEventos}</h3>
        </div>
        <div className="bg-[#9933FF] p-8 border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all flex flex-col justify-center">
          <p className="text-xl font-bold text-[#FAF6EF] uppercase tracking-widest mb-4">Participantes</p>
          <h3 className="text-6xl font-display font-normal text-[#B8F400]">{data.totalParticipantes}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-surface border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-8">
          <h3 className="text-3xl font-display font-normal text-[#FF4D3D] uppercase tracking-wider mb-8 border-b-4 border-ink pb-4">Próximos Eventos</h3>
          {data.proximosEventos.length === 0 ? (
            <p className="text-xl font-bold py-4">Nenhum evento próximo.</p>
          ) : (
            <div className="space-y-6 pt-2">
              {data.proximosEventos.map(ev => (
                <div key={ev.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-[#FAF6EF] p-4 border-2 border-ink group hover:bg-[#FF4D3D] hover:text-[#FAF6EF] transition-colors cursor-default">
                  <div className="font-bold text-xl sm:text-2xl uppercase tracking-wider truncate flex-1 min-w-0" title={ev.nome}>{ev.nome}</div>
                  <div className="text-sm sm:text-lg font-mono font-bold whitespace-nowrap shrink-0">{format(new Date(ev.dataHora), "dd/MM/yyyy 'às' HH:mm")}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#FF2DAA] text-ink border-4 border-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-8">
          <h3 className="text-3xl font-display font-normal text-ink uppercase tracking-wider mb-8 border-b-4 border-ink pb-4">Últimas Atividades</h3>
          {data.ultimasAtividades.length === 0 ? (
            <p className="text-xl font-bold py-4">Nenhuma atividade recente.</p>
          ) : (
            <div className="space-y-4 pt-2">
              {data.ultimasAtividades.map((at, i) => (
                <div key={i} className="flex flex-col bg-surface p-4 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                  <div className="font-bold text-xl uppercase">{at.participante} <span className="text-sm font-normal text-ink/70 ml-1">em {at.evento}</span></div>
                  <div className="text-sm font-mono font-bold mt-1 bg-ink text-[#B8F400] w-fit px-2 py-0.5">{format(new Date(at.em), "dd/MM/yy HH:mm")}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
