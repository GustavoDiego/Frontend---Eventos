import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Users, Pencil, Trash2, Plus, ArrowRightLeft } from 'lucide-react';
import { participantsService, eventsService } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Loading } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { BannerAlert } from '@/components/ui/BannerAlert';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

export function ParticipantsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [eventoId, setEventoId] = useState('');
  const [checkin, setCheckin] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

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
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteMutation.mutate(deleteTarget, {
        onSettled: () => setDeleteTarget(null),
      });
    }
  };

  const getEventName = (id: string) => {
    const e = events?.find(ev => ev.id === id);
    return e ? e.nome : '-';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-5xl md:text-6xl font-display font-normal text-ink uppercase tracking-wider">
          Participantes
        </h2>
        <Button variant="primary" size="md" className="w-full sm:w-auto" onClick={() => navigate('/participantes/novo')}>
          <Plus className="w-5 h-5 mr-2" />
          Novo Participante
        </Button>
      </div>

      <div className="bg-surface border-4 border-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] p-4 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-4">
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

      {error && <BannerAlert type="error" message="Erro ao carregar a lista de participantes." />}

      {isLoading ? <Loading /> : (
        <>
          {participantes?.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Nenhum participante encontrado"
              description="Cadastre participantes para começar a gerenciar presenças."
              action={
                <Button variant="primary" size="sm" onClick={() => navigate('/participantes/novo')}>
                  <Plus className="w-4 h-4 mr-1" /> Cadastrar Participante
                </Button>
              }
            />
          ) : (
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
                  {participantes?.map((p, i) => (
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
                          <Button variant="outline" size="sm" onClick={() => navigate(`/participantes/${p.id}/editar?transferir=true`)} title="Transferir">
                            <ArrowRightLeft className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => navigate(`/participantes/${p.id}/editar`)} title="Editar">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)} title="Remover" disabled={deleteMutation.isPending}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Remover Participante"
        message="Tem certeza que deseja remover este participante? Esta ação não pode ser desfeita."
        confirmLabel="Remover"
        cancelLabel="Cancelar"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
