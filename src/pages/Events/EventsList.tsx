import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Edit, Trash2, Settings, Plus } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-display font-normal">Eventos</h2>
        <Button className="w-full sm:w-auto" onClick={() => navigate('/eventos/novo')}>
          <Plus className="w-5 h-5 mr-2" />
          Criar Evento
        </Button>
      </div>

<div className="bg-surface p-4 rounded-md border border-border flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row gap-4">
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
              description="Você ainda não cadastrou nenhum evento ou nenhum resultado bate com os filtros."
              action={<Button onClick={() => navigate('/eventos/novo')}>Criar Evento</Button>}
            />
          ) : (
            <div className="grid border border-border bg-surface rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-bg/50 border-b border-border uppercase text-xs font-semibold text-muted">
                    <tr>
                      <th className="p-4">Nome</th>
                      <th className="p-4">Data</th>
                      <th className="p-4">Local</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {events?.map((ev) => (
                      <tr key={ev.id} className="hover:bg-bg/50 transition-colors">
                        <td className="p-4 font-semibold text-ink">{ev.nome}</td>
                        <td className="p-4 text-ink">{format(new Date(ev.dataHora), "dd/MM/yyyy HH:mm")}</td>
                        <td className="p-4 text-ink">{ev.local}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${ev.status === 'ATIVO' ? 'bg-success/15 text-[#0F8A50]' : 'bg-muted/15 text-muted'}`}>
                            {ev.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/eventos/${ev.id}/regras-checkin`)} title="Regras de Check-in">
                            <Settings className="w-4 h-4 text-secondary" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/eventos/${ev.id}/editar`)} title="Editar">
                            <Edit className="w-4 h-4 text-ink" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(ev.id)} title="Remover" disabled={deleteMutation.isPending}>
                            <Trash2 className="w-4 h-4 text-danger" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
