import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Loading } from '@/components/ui/Loading';
import { BannerAlert } from '@/components/ui/BannerAlert';
import { Save, ArrowLeft, Edit2, Trash2, Plus } from 'lucide-react';

const meta: Meta = {
  title: 'Pages/Events/CheckinRules',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Page for managing check-in rules for a specific event. Uses CheckinRuleForm sub-components with a summary sidebar.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const mockRules = [
  { id: '1', nome: 'QR Code', ativo: true, obrigatoriedade: 'OBRIGATORIO' as const, liberarMinAntes: 120, encerrarMinDepois: 120 },
  { id: '2', nome: 'Crachá Físico', ativo: true, obrigatoriedade: 'OPCIONAL' as const, liberarMinAntes: 60, encerrarMinDepois: 30 },
  { id: '3', nome: 'Biometria', ativo: false, obrigatoriedade: 'OPCIONAL' as const, liberarMinAntes: 90, encerrarMinDepois: 60 },
];

const RuleCard = ({ rule }: { rule: typeof mockRules[number] }) => (
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
          <div className={`block w-10 h-6 border-2 border-ink rounded-full transition-colors ${rule.ativo ? 'bg-success' : 'bg-muted'}`}></div>
          <div className={`dot absolute left-[3px] bg-white border-2 border-ink w-[18px] h-[18px] rounded-full transition-transform ${rule.ativo ? 'translate-x-[16px]' : ''}`}></div>
        </div>
        <span className="ml-2 text-sm font-bold font-ui uppercase">{rule.ativo ? 'Ativo' : 'Inativo'}</span>
      </label>
      <Button variant="ghost" size="sm">
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Trash2 className="w-4 h-4 text-danger" />
      </Button>
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col items-start gap-4">
          <button type="button" className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl font-display font-normal text-ink">Regras de Check-in</h2>
            <p className="text-sm text-secondary font-ui mt-1">Configurando evento: <strong className="text-ink">Festival de Música 2026</strong></p>
          </div>
        </div>
        <div className="flex w-full sm:w-auto gap-2 mt-4 sm:mt-0">
          <Button className="flex-1 sm:flex-none" variant="outline">Descartar</Button>
          <Button className="flex-1 sm:flex-none">
            <Save className="w-5 h-5 mr-2" /> Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <div className="lg:col-span-2 space-y-4">
          {mockRules.map(rule => (
            <RuleCard key={rule.id} rule={rule} />
          ))}

          <div className="border border-dashed border-border bg-surface/50 rounded-md p-6 flex flex-col items-center justify-center">
            <p className="text-sm text-muted mb-4">Deseja exigir outro tipo de check-in?</p>
            <div className="bg-surface p-5 rounded-md border border-dashed border-border shadow-sm w-full">
              <form className="space-y-4">
                <div className="flex flex-col gap-4">
                  <Input label="Comprovante (Ex: QR Code)" placeholder="Tipo de verificação" />
                  <Select
                    label="Obrigatoriedade"
                    options={[
                      { value: 'OPCIONAL', label: 'Opcional' },
                      { value: 'OBRIGATORIO', label: 'Obrigatório' },
                    ]}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input type="number" label="Minutos antes do evento (Liberação)" defaultValue="120" min="0" />
                  <Input type="number" label="Minutos depois do evento (Encerramento)" defaultValue="120" min="0" />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                  <Button className="w-full sm:w-auto" type="button" size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Adicionar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-md shadow-sm h-min sticky top-36">
          <h3 className="font-semibold mb-4 text-ink border-b pb-2">Resumo das Regras</h3>
          <ul className="text-sm text-ink space-y-2">
            <li><strong>Total de regras:</strong> {mockRules.length}</li>
            <li><strong>Ativas:</strong> {mockRules.filter(r => r.ativo).length}</li>
            <li><strong>Obrigatórias:</strong> {mockRules.filter(r => r.ativo && r.obrigatoriedade === 'OBRIGATORIO').length}</li>
          </ul>
          <p className="text-xs text-muted mt-6">
            Lembre-se: pelo menos uma regra deve estar ativa. Regras obrigatórias devem ter intervalos de tempo que permitam check-in simultâneo.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const WithValidationErrors: Story = {
  render: () => (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col items-start gap-4">
          <button type="button" className="text-secondary hover:underline flex items-center text-sm font-semibold font-ui">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </button>
          <div className="flex flex-col">
            <h2 className="text-2xl font-display font-normal text-ink">Regras de Check-in</h2>
            <p className="text-sm text-secondary font-ui mt-1">Configurando evento: <strong className="text-ink">Festival de Música 2026</strong></p>
          </div>
        </div>
        <div className="flex w-full sm:w-auto gap-2 mt-4 sm:mt-0">
          <Button className="flex-1 sm:flex-none" disabled>
            <Save className="w-5 h-5 mr-2" /> Salvar
          </Button>
        </div>
      </div>

      <BannerAlert type="error" title="Regra Inválida" message="Pelo menos uma regra deve estar ativa." className="mb-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] border-2 border-ink" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <div className="lg:col-span-2 space-y-4">
          {mockRules.filter(r => !r.ativo).map(rule => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>

        <div className="bg-surface border border-border p-6 rounded-md shadow-sm h-min sticky top-36">
          <h3 className="font-semibold mb-4 text-ink border-b pb-2">Resumo das Regras</h3>
          <ul className="text-sm text-ink space-y-2">
            <li><strong>Total de regras:</strong> 1</li>
            <li><strong>Ativas:</strong> 0</li>
            <li><strong>Obrigatórias:</strong> 0</li>
          </ul>
          <p className="text-xs text-muted mt-6">
            Lembre-se: pelo menos uma regra deve estar ativa. Regras obrigatórias devem ter intervalos de tempo que permitam check-in simultâneo.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => <Loading />,
};
