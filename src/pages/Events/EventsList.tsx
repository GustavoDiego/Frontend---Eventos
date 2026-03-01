import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Pencil, Trash2, ClipboardCheck, Plus } from 'lucide-react';
import { eventsService } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Loading } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { BannerAlert } from '@/components/ui/BannerAlert';
import toast from 'react-hot-toast';

export function EventsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const hasActiveFilters = Boolean(search.trim() || status);
  const handleClearFilters = () => {
    setSearch('');
    setStatus('');
  };

  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events', search, status],
    queryFn: () => eventsService.list({ search, status })
  });

  const deleteMutation = useMutation({
    mutationFn: eventsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Evento removido com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao remover evento.');
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este evento?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider">
          Eventos
        </h2>
        <Button variant="primary" size="md" className="w-full sm:w-auto" onClick={() => navigate('/eventos/novo')}>
          <Plus className="w-5 h-5 mr-2" />
          Novo Evento
        </Button>
      </div>

      <div className="bg-surface border-4 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] p-4 flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row gap-4">
        <div className="flex-1 xl:w-auto">
          <Input
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full xl:w-64">
          <Select
            options={[
              { value: 'ATIVO', label: 'Ativo' },
              { value: 'ENCERRADO', label: 'Encerrado' }
            ]}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="w-full md:col-span-2 xl:col-span-1 xl:w-auto flex items-end justify-end">
          <Button className="w-full md:w-auto" variant="outline" size="sm" onClick={handleClearFilters} disabled={!hasActiveFilters}>
            Limpar filtros
          </Button>
        </div>
      </div>

      {error && <BannerAlert type="error" message="Erro ao carregar os eventos." />}

      {isLoading ? <Loading /> : (
        <>
          {events?.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="Nenhum evento encontrado"
              description="Crie seu primeiro evento para começar a gerenciar participantes."
              action={
                <Button variant="primary" size="sm" onClick={() => navigate('/eventos/novo')}>
                  <Plus className="w-4 h-4 mr-1" /> Criar Evento
                </Button>
              }
            />
          ) : (
            <div className="grid gap-6">
              {events?.map((ev) => (
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
                      <Button variant="outline" size="sm" onClick={() => navigate(`/eventos/${ev.id}/regras-checkin`)} title="Regras de Check-in">
                        <ClipboardCheck className="w-4 h-4 mr-1" /> Check-in
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/eventos/${ev.id}/editar`)} title="Editar">
                        <Pencil className="w-4 h-4 mr-1" /> Editar
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(ev.id)} title="Remover" disabled={deleteMutation.isPending}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
