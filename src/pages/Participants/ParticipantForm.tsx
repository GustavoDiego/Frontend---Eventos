import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { participantSchema, Participant } from '@/domain/participants/participant.schema';
import { participantsService, eventsService } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { BannerAlert } from '@/components/ui/BannerAlert';
import toast from 'react-hot-toast';

import { ArrowLeft } from 'lucide-react';

export function ParticipantForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = !!id;
  const isTransfer = searchParams.get('transferir') === 'true';

  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: () => eventsService.list({ status: 'ATIVO' })
  });

  const { data: participant, isLoading: isLoadingParticipant } = useQuery({
    queryKey: ['participantes', id],
    queryFn: () => participantsService.getById(id!),
    enabled: isEditing
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Participant>({
    resolver: zodResolver(participantSchema),
    defaultValues: {
      checkin: 'NAO_FEITO'
    }
  });

  useEffect(() => {
    if (participant) {
      reset(participant);
    }
  }, [participant, reset]);

  const mutation = useMutation({
    mutationFn: async (data: Participant) => {
      if (isEditing) {
        const eventChanged = participant && participant.eventoId !== data.eventoId;
        
        // Se a pessoa trocou o evento na interface de edicao ou clicou em transferir
        if (isTransfer || eventChanged) {
          await participantsService.transfer(id!, data.eventoId);
        }

        // Removemos o eventoId do DTO de update para evitar dar 400 no backend
        // já que a transferência de evento tem rota própria acima
        const { eventoId, id: _id, ...updateData } = data;
        
        if (!isTransfer) {
          return participantsService.update(id!, updateData as any);
        }
        return;
      }
      return participantsService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participantes'] });
      if (isTransfer) {
        toast.success('Participante transferido com sucesso!');
      } else if (isEditing) {
        toast.success('Participante atualizado com sucesso!');
      } else {
        toast.success('Participante criado com sucesso!');
      }
      navigate('/participantes');
    },
    onError: () => {
      toast.error('Erro ao salvar participante.');
    }
  });

  const onSubmit = (data: Participant) => {
    mutation.mutate(data);
  };

  if (isEditing && isLoadingParticipant) return <div>Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-start gap-4">
        <button type="button" onClick={() => navigate('/participantes')} className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        <h2 className="text-2xl font-display font-normal text-ink">
          {isTransfer ? 'Transferir Participante' : (isEditing ? 'Editar Participante' : 'Novo Participante')}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        {mutation.isError && <BannerAlert type="error" message="Erro ao salvar o participante." />}

        <Input
          label="Nome Completo"
          {...register('nome')}
          error={errors.nome?.message}
          disabled={isTransfer}
        />

        <Input
          type="email"
          label="E-mail"
          {...register('email')}
          error={errors.email?.message}
          disabled={isTransfer}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label={isTransfer ? "Novo Evento" : "Evento"}
            options={(events || []).map(e => ({ value: e.id, label: e.nome }))}
            {...register('eventoId')}
            error={errors.eventoId?.message}
          />
          <Select
            label="Status do Check-in"
            options={[
              { value: 'FEITO', label: 'Feito' },
              { value: 'NAO_FEITO', label: 'Pendente' }
            ]}
            {...register('checkin')}
            error={errors.checkin?.message}
            disabled={isTransfer}
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button type="submit" loading={isSubmitting || mutation.isPending}>
            {isTransfer ? 'Transferir' : 'Salvar'}
          </Button>
        </div>
      </form>
    </div>
  );
}
