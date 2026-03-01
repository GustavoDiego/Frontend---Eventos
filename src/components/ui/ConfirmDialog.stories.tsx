import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from './Button';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'UI/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Popup de confirmação brutalist que substitui o `window.confirm` nativo. Suporta variantes danger e warning, estado de loading, e animações de entrada/saída.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['danger', 'warning'],
    },
    open: { control: 'boolean' },
    loading: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

/* ── Danger ─────────────────────────────── */
export const Danger: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Remover Evento
        </Button>
        <ConfirmDialog
          open={open}
          title="Remover Evento"
          message="Tem certeza que deseja remover este evento? Esta ação não pode ser desfeita."
          confirmLabel="Remover"
          cancelLabel="Cancelar"
          variant="danger"
          onConfirm={() => {
            alert('Confirmado!');
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

/* ── Warning ────────────────────────────── */
export const Warning: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Remover Regra
        </Button>
        <ConfirmDialog
          open={open}
          title="Remover Regra"
          message="Tem certeza que deseja remover esta regra de check-in?"
          confirmLabel="Remover"
          cancelLabel="Cancelar"
          variant="warning"
          onConfirm={() => {
            alert('Confirmado!');
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

/* ── Loading ────────────────────────────── */
export const Loading: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    };

    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Remover (com loading)
        </Button>
        <ConfirmDialog
          open={open}
          title="Remover Participante"
          message="Tem certeza que deseja remover este participante? Esta ação não pode ser desfeita."
          confirmLabel="Remover"
          cancelLabel="Cancelar"
          variant="danger"
          loading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

/* ── Custom Labels ──────────────────────── */
export const CustomLabels: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Ação Personalizada
        </Button>
        <ConfirmDialog
          open={open}
          title="Confirmar Envio"
          message="Ao confirmar, os dados serão enviados para processamento e não poderão ser alterados."
          confirmLabel="Sim, enviar"
          cancelLabel="Voltar"
          variant="warning"
          onConfirm={() => {
            alert('Enviado!');
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

/* ── Always Open (for visual testing) ──── */
export const AlwaysOpen: Story = {
  args: {
    open: true,
    title: 'Remover Item',
    message: 'Esta ação é irreversível. Deseja continuar?',
    confirmLabel: 'Confirmar',
    cancelLabel: 'Cancelar',
    variant: 'danger',
    loading: false,
    onConfirm: () => {},
    onCancel: () => {},
  },
};
