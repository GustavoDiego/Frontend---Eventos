import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Trash2, Edit2, Plus } from 'lucide-react';

const meta: Meta = {
  title: 'Pages/Events/CheckinRuleForm',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Sub-component for creating or editing a single check-in rule. Has a view mode (card) and an editing mode (form).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/* ── View Mode: Active + Optional ──── */
export const ViewModeActiveOptional: Story = {
  name: 'View Mode — Active Optional',
  render: () => (
    <div className="max-w-2xl">
      <div className="bg-surface p-4 rounded-md border border-border shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-ink">QR Code</h4>
            <span className="text-xs px-2 py-0.5 rounded font-medium bg-muted/15 text-muted">Opcional</span>
          </div>
          <p className="text-sm font-ui text-secondary mt-1 flex flex-col sm:flex-row sm:gap-2">
            <span>Libera: <strong className="font-semibold text-ink">120 minutos</strong> antes</span>
            <span className="hidden sm:inline">•</span>
            <span>Encerra: <strong className="font-semibold text-ink">120 minutos</strong> depois</span>
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <label className="flex items-center cursor-pointer mr-2 select-none group">
            <div className="relative flex items-center">
              <div className="block w-10 h-6 border-2 border-ink rounded-full bg-success"></div>
              <div className="dot absolute left-[3px] bg-white border-2 border-ink w-[18px] h-[18px] rounded-full translate-x-[16px]"></div>
            </div>
            <span className="ml-2 text-sm font-bold font-ui uppercase">Ativo</span>
          </label>
          <Button variant="ghost" size="sm">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="w-4 h-4 text-danger" />
          </Button>
        </div>
      </div>
    </div>
  ),
};

/* ── View Mode: Active + Obrigatório ──── */
export const ViewModeActiveObrigatorio: Story = {
  name: 'View Mode — Active Obrigatório',
  render: () => (
    <div className="max-w-2xl">
      <div className="bg-surface p-4 rounded-md border border-border shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-ink">Crachá Físico</h4>
            <span className="text-xs px-2 py-0.5 rounded font-medium bg-danger/10 text-danger">Obrigatório</span>
          </div>
          <p className="text-sm font-ui text-secondary mt-1 flex flex-col sm:flex-row sm:gap-2">
            <span>Libera: <strong className="font-semibold text-ink">60 minutos</strong> antes</span>
            <span className="hidden sm:inline">•</span>
            <span>Encerra: <strong className="font-semibold text-ink">30 minutos</strong> depois</span>
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <label className="flex items-center cursor-pointer mr-2 select-none group">
            <div className="relative flex items-center">
              <div className="block w-10 h-6 border-2 border-ink rounded-full bg-success"></div>
              <div className="dot absolute left-[3px] bg-white border-2 border-ink w-[18px] h-[18px] rounded-full translate-x-[16px]"></div>
            </div>
            <span className="ml-2 text-sm font-bold font-ui uppercase">Ativo</span>
          </label>
          <Button variant="ghost" size="sm">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="w-4 h-4 text-danger" />
          </Button>
        </div>
      </div>
    </div>
  ),
};

/* ── View Mode: Inactive ──── */
export const ViewModeInactive: Story = {
  name: 'View Mode — Inactive',
  render: () => (
    <div className="max-w-2xl">
      <div className="bg-surface p-4 rounded-md border shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between opacity-60 bg-bg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-ink">Biometria</h4>
            <span className="text-xs px-2 py-0.5 rounded font-medium bg-muted/15 text-muted">Opcional</span>
          </div>
          <p className="text-sm font-ui text-secondary mt-1 flex flex-col sm:flex-row sm:gap-2">
            <span>Libera: <strong className="font-semibold text-ink">90 minutos</strong> antes</span>
            <span className="hidden sm:inline">•</span>
            <span>Encerra: <strong className="font-semibold text-ink">60 minutos</strong> depois</span>
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <label className="flex items-center cursor-pointer mr-2 select-none group">
            <div className="relative flex items-center">
              <div className="block w-10 h-6 border-2 border-ink rounded-full bg-muted"></div>
              <div className="dot absolute left-[3px] bg-white border-2 border-ink w-[18px] h-[18px] rounded-full"></div>
            </div>
            <span className="ml-2 text-sm font-bold font-ui uppercase">Inativo</span>
          </label>
          <Button variant="ghost" size="sm">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="w-4 h-4 text-danger" />
          </Button>
        </div>
      </div>
    </div>
  ),
};

/* ── Edit Mode (existing rule) ──── */
export const EditMode: Story = {
  name: 'Edit Mode — Existing Rule',
  render: () => (
    <div className="max-w-2xl">
      <div className="bg-surface p-5 rounded-md border border-secondary shadow-sm">
        <form className="space-y-4">
          <div className="flex flex-col gap-4">
            <Input label="Comprovante (Ex: QR Code)" defaultValue="QR Code" placeholder="Tipo de verificação" />
            <Select
              label="Obrigatoriedade"
              defaultValue="OPCIONAL"
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
            <Button className="w-full sm:w-auto" type="button" variant="ghost">Cancelar</Button>
            <Button className="w-full sm:w-auto" type="button" size="sm">Confirmar Edição</Button>
          </div>
        </form>
      </div>
    </div>
  ),
};

/* ── New Rule Form ──── */
export const NewRuleForm: Story = {
  name: 'New Rule Form',
  render: () => (
    <div className="max-w-2xl">
      <div className="bg-surface p-5 rounded-md border border-dashed border-border shadow-sm">
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
  ),
};
