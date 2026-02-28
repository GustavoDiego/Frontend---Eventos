import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Users, Edit, Trash2, Plus, ArrowRightLeft } from 'lucide-react';
import { participantsService, eventsService } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Loading } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { BannerAlert } from '@/components/ui/BannerAlert';
import toast from 'react-hot-toast';

export function ParticipantsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [eventoId, setEventoId] = useState('');
  const [checkin, setCheckin] = useState('');

  const hasActiveFilters = Boolean(search.trim() || eventoId || checkin);
  const handleClearFilters = () => {
    setSearch('');
    setEventoId('');
    setCheckin('');
  };

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () => eventsService.list()
  });

  const { data: participantes, isLoading, error } = useQuery({
    queryKey: ['participantes', search, eventoId, checkin],
    queryFn: () => participantsService.list({ search, eventoId, checkin })
  });

  const deleteMutation = useMutation({
    mutationFn: participantsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantes'] });
      toast.success('Participante removido com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao remover participante.');
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este participante?')) {
      deleteMutation.mutate(id);
    }
  };

  const getEventName = (id: string) => {
    const e = events?.find(ev => ev.id === id);
    return e ? e.nome : '-';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-display font-normal">Participantes</h2>
        <Button className="w-full sm:w-auto" onClick={() => navigate('/participantes/novo')}>
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Participante
        </Button>
      </div>

<div className="bg-surface p-4 rounded-md border border-border flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-4">
        <div className="flex-1 lg:w-auto">
          <Input
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-64">
          <Select
            options={(events || []).map(e => ({ value: e.id, label: e.nome }))}
            value={eventoId}
            onChange={(e) => setEventoId(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-48">
          <Select
            options={[
              { value: 'FEITO', label: 'Check-in: Feito' },
              { value: 'NAO_FEITO', label: 'Check-in: Pendente' }
            ]}
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
          />
        </div>
        <div className="w-full md:col-span-2 lg:col-span-1 lg:w-auto flex items-end justify-end">
          <Button className="w-full lg:w-auto" variant="outline" size="sm" onClick={handleClearFilters} disabled={!hasActiveFilters}>
            Limpar filtros
          </Button>
        </div>
      </div>

      {error && <BannerAlert type="error" message="Erro ao carregar lista de participantes." />}

      {isLoading ? <Loading /> : (
        <>
          {participantes?.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Nenhum participante"
              description="Não foram encontrados participantes com os filtros atuais."
              action={
                <Button onClick={handleClearFilters} disabled={!hasActiveFilters}>Limpar filtros</Button>
              }
            />
          ) : (
            <div className="bg-surface rounded-md border border-border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-bg/50 border-b border-border uppercase text-xs font-semibold text-muted">
                    <tr>
                      <th className="p-4">Nome</th>
                      <th className="p-4">E-mail</th>
                      <th className="p-4">Evento</th>
                      <th className="p-4">Check-in</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {participantes?.map((p) => (
                      <tr key={p.id} className="hover:bg-bg/50">
                        <td className="p-4 font-semibold text-ink">{p.nome}</td>
                        <td className="p-4 text-ink">{p.email}</td>
                        <td className="p-4 text-ink">{getEventName(p.eventoId)}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${p.checkin === 'FEITO' ? 'bg-success/15 text-[#0F8A50]' : 'bg-warning/15 text-[#B37B16]'}`}>
                            {p.checkin === 'FEITO' ? 'Feito' : 'Pendente'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/participantes/${p.id}/editar?transferir=true`)} title="Transferir">
                            <ArrowRightLeft className="w-4 h-4 text-secondary" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/participantes/${p.id}/editar`)} title="Editar">
                            <Edit className="w-4 h-4 text-ink" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)} title="Remover" disabled={deleteMutation.isPending}>
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
