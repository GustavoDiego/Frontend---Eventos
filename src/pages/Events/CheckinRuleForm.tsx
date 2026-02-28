import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckinRule, checkinRuleSchema } from '@/domain/checkin/checkin.schema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Trash2, Edit2, Plus } from 'lucide-react';

interface CheckinRuleFormProps {
  rule?: CheckinRule;
  isNew?: boolean;
  onSave: (rule: CheckinRule) => void;
  onRemove?: () => void;
  onToggle?: () => void;
}

export function CheckinRuleForm({ rule, isNew, onSave, onRemove, onToggle }: CheckinRuleFormProps) {
  const [isEditing, setIsEditing] = useState(isNew || false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CheckinRule>({
    resolver: zodResolver(checkinRuleSchema),
    defaultValues: rule || {
      id: crypto.randomUUID(),
      nome: '',
      ativo: true,
      obrigatoriedade: 'OPCIONAL',
      liberarMinAntes: 120,
      encerrarMinDepois: 120
    }
  });

  const onSubmit = (data: CheckinRule) => {
    onSave(data);
    if (isNew) {
      reset({ id: crypto.randomUUID(), nome: '', ativo: true, obrigatoriedade: 'OPCIONAL', liberarMinAntes: 120, encerrarMinDepois: 120 });
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  if (!isEditing && !isNew && rule) {
    return (
      <div className={`bg-surface p-4 rounded-md border shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-colors ${!rule.ativo ? 'opacity-60 bg-bg' : 'border-border'}`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-ink">{rule.nome}</h4>
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${rule.obrigatoriedade === 'OBRIGATORIO' ? 'bg-danger/10 text-danger' : 'bg-muted/15 text-muted'}`}>
              {rule.obrigatoriedade === 'OBRIGATORIO' ? 'Obrigatório' : 'Opcional'}
            </span>
          </div>
          <p className="text-sm font-ui text-secondary mt-1 flex flex-col sm:flex-row sm:gap-2">
            <span>Libera: <strong className="font-semibold text-ink">{rule.liberarMinAntes} minutos</strong> antes</span>
            <span className="hidden sm:inline">•</span>
            <span>Encerra: <strong className="font-semibold text-ink">{rule.encerrarMinDepois} minutos</strong> depois</span>
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <label className="flex items-center cursor-pointer mr-2 select-none group">
            <div className="relative flex items-center">
              <input type="checkbox" className="sr-only" checked={rule.ativo} onChange={onToggle} />
              <div className={`block w-10 h-6 border-2 border-ink rounded-full transition-colors ${rule.ativo ? 'bg-success' : 'bg-muted'}`}></div>
              <div className={`dot absolute left-[3px] bg-white border-2 border-ink w-[18px] h-[18px] rounded-full transition-transform ${rule.ativo ? 'translate-x-[16px]' : ''}`}></div>
            </div>
            <span className="ml-2 text-sm font-bold font-ui uppercase">{rule.ativo ? 'Ativo' : 'Inativo'}</span>
          </label>

          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          {onRemove && (
            <Button variant="ghost" size="sm" onClick={onRemove}>
              <Trash2 className="w-4 h-4 text-danger" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface p-5 rounded-md border ${isNew ? 'border-dashed border-border' : 'border-secondary'} shadow-sm`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4">
          <Input label="Comprovante (Ex: QR Code)" {...register('nome')} error={errors.nome?.message} placeholder="Tipo de verificação" />
          <Select
            label="Obrigatoriedade"
            options={[
              { value: 'OPCIONAL', label: 'Opcional' },
              { value: 'OBRIGATORIO', label: 'Obrigatório' }
            ]}
            {...register('obrigatoriedade')}
            error={errors.obrigatoriedade?.message}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Input
            type="number"
            label="Minutos antes do evento (Liberação)"
            {...register('liberarMinAntes', { valueAsNumber: true })}
            error={errors.liberarMinAntes?.message}
            min="0"
          />
          <Input
            type="number"
            label="Minutos depois do evento (Encerramento)"
            {...register('encerrarMinDepois', { valueAsNumber: true })} 
            error={errors.encerrarMinDepois?.message} 
            min="0"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
          {!isNew && (
            <Button className="w-full sm:w-auto" type="button" variant="ghost" onClick={() => {
              reset(rule);
              setIsEditing(false);
            }}>
              Cancelar
            </Button>
          )}
          <Button className="w-full sm:w-auto" type="submit" size="sm">
            {isNew ? <><Plus className="w-4 h-4 mr-2" /> Adicionar</> : 'Confirmar Edição'}
          </Button>
        </div>
      </form>
    </div>
  );
}
