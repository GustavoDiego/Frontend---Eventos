import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
    },
}));

describe('ConfirmDialog', () => {
    const defaultProps = {
        open: true,
        message: 'Tem certeza que deseja excluir?',
        onConfirm: vi.fn(),
        onCancel: vi.fn(),
    };

    it('renderiza quando open=true', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('não renderiza quando open=false', () => {
        render(<ConfirmDialog {...defaultProps} open={false} />);
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    it('renderiza a mensagem corretamente', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByText('Tem certeza que deseja excluir?')).toBeInTheDocument();
    });

    it('renderiza título padrão "Confirmar ação"', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByText('Confirmar ação')).toBeInTheDocument();
    });

    it('renderiza título personalizado', () => {
        render(<ConfirmDialog {...defaultProps} title="Excluir Evento" />);
        expect(screen.getByText('Excluir Evento')).toBeInTheDocument();
    });

    it('exibe botão de confirmação com label padrão', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
    });

    it('exibe botão de cancelamento com label padrão', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
    });

    it('exibe labels personalizados nos botões', () => {
        render(<ConfirmDialog {...defaultProps} confirmLabel="Sim, excluir" cancelLabel="Não, manter" />);
        expect(screen.getByRole('button', { name: 'Sim, excluir' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Não, manter' })).toBeInTheDocument();
    });

    it('chama onConfirm ao clicar em confirmar', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
        await user.click(screen.getByRole('button', { name: 'Confirmar' }));
        expect(onConfirm).toHaveBeenCalledOnce();
    });

    it('chama onCancel ao clicar em cancelar', async () => {
        const user = userEvent.setup();
        const onCancel = vi.fn();
        render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
        await user.click(screen.getByRole('button', { name: 'Cancelar' }));
        expect(onCancel).toHaveBeenCalledOnce();
    });

    it('chama onCancel ao pressionar Escape', async () => {
        const user = userEvent.setup();
        const onCancel = vi.fn();
        render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
        await user.keyboard('{Escape}');
        expect(onCancel).toHaveBeenCalledOnce();
    });

    it('desabilita botão de confirmação quando loading=true', () => {
        render(<ConfirmDialog {...defaultProps} loading={true} />);
        expect(screen.getByRole('button', { name: 'Confirmar' })).toBeDisabled();
    });

    it('tem aria-modal="true"', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
    });
});
