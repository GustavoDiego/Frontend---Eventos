import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Calendar } from 'lucide-react';

describe('EmptyState', () => {
    it('renderiza título e descrição', () => {
        render(<EmptyState title="Nenhum evento" description="Crie um evento para começar" />);
        expect(screen.getByText('Nenhum evento')).toBeInTheDocument();
        expect(screen.getByText('Crie um evento para começar')).toBeInTheDocument();
    });

    it('renderiza ícone quando fornecido', () => {
        const { container } = render(
            <EmptyState icon={Calendar} title="Vazio" description="Sem dados" />
        );
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('não renderiza ícone quando não fornecido', () => {
        const { container } = render(<EmptyState title="Vazio" description="Sem dados" />);
        expect(container.querySelector('svg')).not.toBeInTheDocument();
    });

    it('renderiza ação quando fornecida', () => {
        render(
            <EmptyState
                title="Vazio"
                description="Sem dados"
                action={<button>Criar</button>}
            />
        );
        expect(screen.getByRole('button', { name: 'Criar' })).toBeInTheDocument();
    });

    it('não renderiza ação quando não fornecida', () => {
        render(<EmptyState title="Vazio" description="Sem dados" />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('aplica className personalizada', () => {
        const { container } = render(
            <EmptyState title="Vazio" description="Sem dados" className="minha-classe" />
        );
        expect((container.firstChild as HTMLElement).className).toContain('minha-classe');
    });

    it('renderiza título como h3', () => {
        render(<EmptyState title="Título aqui" description="Desc" />);
        expect(screen.getByRole('heading', { level: 3, name: 'Título aqui' })).toBeInTheDocument();
    });
});
