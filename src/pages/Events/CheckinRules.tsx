import { useEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, ArrowLeft } from 'lucide-react';
import { checkinService, eventsService } from '@/services/api';
import { checkinReducer } from '@/state/checkin.reducer';
import { CheckinRule } from '@/domain/checkin/checkin.schema';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { BannerAlert } from '@/components/ui/BannerAlert';
import { CheckinRuleForm } from './CheckinRuleForm';
import toast from 'react-hot-toast';

export function CheckinRules() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(checkinReducer, {
    rules: [],
    initialRules: [],
    validationErrors: [],
    isDirty: false
  });

  const { data: event, isLoading: isLoadingEvent } = useQuery({
    queryKey: ['events', id],
    queryFn: () => eventsService.getById(id!)
  });

  const { data: rules, isLoading: isLoadingRules } = useQuery({
    queryKey: ['checkinRules', id],
    queryFn: () => checkinService.getRules(id!)
  });

  useEffect(() => {
    if (rules) {
      dispatch({ type: 'LOAD_SUCCESS', payload: rules });
      // Initial validate
      setTimeout(() => dispatch({ type: 'VALIDATE' }), 0);
    }
  }, [rules]);

  // Re-validate when rules change
  useEffect(() => {
    dispatch({ type: 'VALIDATE' });
  }, [state.rules]);

  const mutation = useMutation({
    mutationFn: (newRules: CheckinRule[]) => checkinService.updateRules(id!, newRules),
    onSuccess: (updatedRules) => {
      queryClient.invalidateQueries({ queryKey: ['checkinRules', id] });
      dispatch({ type: 'LOAD_SUCCESS', payload: updatedRules });
      toast.success('Regras salvas com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao salvar as regras de check-in.');
    }
  });

  const handleSave = () => {
    if (state.validationErrors.length > 0) return;
    mutation.mutate(state.rules);
  };

  const handleAddRule = (rule: CheckinRule) => {
    dispatch({ type: 'ADD_RULE', payload: rule });
  };

  const handleUpdateRule = (rule: CheckinRule) => {
    dispatch({ type: 'UPDATE_RULE', payload: rule });
  };

  const handleRemove = (ruleId: string) => {
    if (window.confirm('Remover esta regra?')) {
      dispatch({ type: 'REMOVE_RULE', payload: ruleId });
    }
  };

  if (isLoadingEvent || isLoadingRules) return <Loading />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col items-start gap-4">
          <button type="button" onClick={() => navigate('/eventos')} className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl font-display font-normal text-ink">Regras de Check-in</h2>
            <p className="text-sm text-secondary font-ui mt-1">Configurando evento: <strong className="text-ink">{event?.nome}</strong></p>
          </div>
        </div>
        <div className="flex w-full sm:w-auto gap-2 mt-4 sm:mt-0">
          {state.isDirty && (
            <Button className="flex-1 sm:flex-none" variant="outline" onClick={() => dispatch({ type: 'RESET_CHANGES' })}>
              Descartar
            </Button>
          )}
          <Button
            className="flex-1 sm:flex-none"
            onClick={handleSave}
            disabled={!state.isDirty || state.validationErrors.length > 0 || mutation.isPending}
            loading={mutation.isPending}
          >
            <Save className="w-5 h-5 mr-2" /> Salvar
          </Button>
        </div>
      </div>

      {state.validationErrors.map((err, i) => (
        <BannerAlert key={i} type="error" title="Regra Inválida" message={err} className="mb-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] border-2 border-ink" />
      ))}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <div className="lg:col-span-2 space-y-4">
          {(state.rules || []).map(rule => (
            <CheckinRuleForm
              key={rule.id}
              rule={rule}
              onSave={handleUpdateRule}
              onRemove={() => handleRemove(rule.id)}
              onToggle={() => dispatch({ type: 'TOGGLE_ACTIVE', payload: rule.id })}
            />
          ))}

          <div className="border border-dashed border-border bg-surface/50 rounded-md p-6 flex flex-col items-center justify-center">
            <p className="text-sm text-muted mb-4">Deseja exigir outro tipo de check-in?</p>
            <CheckinRuleForm isNew onSave={handleAddRule} />
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-md shadow-sm h-min sticky top-36">
          <h3 className="font-semibold mb-4 text-ink border-b pb-2">Resumo das Regras</h3>
          <ul className="text-sm text-ink space-y-2">
            <li><strong>Total de regras:</strong> {(state.rules || []).length}</li>
            <li><strong>Ativas:</strong> {(state.rules || []).filter(r => r.ativo).length}</li>
            <li><strong>Obrigatórias:</strong> {state.rules.filter(r => r.ativo && r.obrigatoriedade === 'OBRIGATORIO').length}</li>
          </ul>
          <p className="text-xs text-muted mt-6">
            Lembre-se: pelo menos uma regra deve estar ativa. Regras obrigatórias devem ter intervalos de tempo que permitam check-in simultâneo.
          </p>
        </div>
      </div>
    </div>
  );
}
