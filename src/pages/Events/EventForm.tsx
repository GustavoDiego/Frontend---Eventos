import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, Event } from '@/domain/events/event.schema';
import { eventsService } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { BannerAlert } from '@/components/ui/BannerAlert';
import toast from 'react-hot-toast';

import { ArrowLeft } from 'lucide-react';

export function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = !!id;

  const { data: event, isLoading: isLoadingEvent } = useQuery({
    queryKey: ['events', id],
    queryFn: () => eventsService.getById(id!),
    enabled: isEditing
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Event>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: 'ATIVO'
    }
  });

  useEffect(() => {
    if (event) {
      reset({
        ...event,
        dataHora: new Date(event.dataHora).toISOString().slice(0, 16)
      });
    }
  }, [event, reset]);

  const mutation = useMutation({
    mutationFn: (data: Event) => isEditing ? eventsService.update(id!, data) : eventsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      if (isEditing) {
        toast.success('Evento atualizado com sucesso!');
      } else {
        toast.success('Evento criado com sucesso!');
      }
      navigate('/eventos');
    },
    onError: () => {
      toast.error('Erro ao salvar evento.');
    }
  });

  const onSubmit = (data: Event) => {
    const payload = {
      ...data,
      dataHora: new Date(data.dataHora).toISOString(),
    };
    mutation.mutate(payload);
  };

  if (isEditing && isLoadingEvent) return <div>Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-start gap-4">
        <button type="button" onClick={() => navigate('/eventos')} className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        <h2 className="text-2xl font-display font-normal text-ink">{isEditing ? 'Editar Evento' : 'Novo Evento'}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-surface p-6 rounded-md border border-border shadow-sm space-y-6">
        {mutation.isError && <BannerAlert type="error" message="Erro ao salvar o evento." />}

        <Input
          label="Nome do Evento"
          {...register('nome')}
          error={errors.nome?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="datetime-local"
            label="Data e Hora"
            {...register('dataHora')}
            error={errors.dataHora?.message}
          />
          <Select
            label="Status"
            options={[
              { value: 'ATIVO', label: 'Ativo' },
              { value: 'ENCERRADO', label: 'Encerrado' }
            ]}
            {...register('status')}
            error={errors.status?.message}
          />
        </div>

        <Input
          label="Local"
          {...register('local')}
          error={errors.local?.message}
        />

        <div className="flex justify-end pt-4 border-t border-border">
          <Button type="submit" loading={isSubmitting || mutation.isPending}>
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
