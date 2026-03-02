import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
    it('renderiza com texto filho', () => {
        render(<Button>Clique Aqui</Button>);
        expect(screen.getByRole('button', { name: 'Clique Aqui' })).toBeInTheDocument();
    });

    it('aplica variante primary por padrão', () => {
        render(<Button>Primário</Button>);
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('bg-primary');
    });

    it('aplica variante secondary', () => {
        render(<Button variant="secondary">Secundário</Button>);
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('bg-secondary');
    });

    it('aplica variante danger', () => {
        render(<Button variant="danger">Perigo</Button>);
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('bg-danger');
    });

    it('aplica variante ghost', () => {
        render(<Button variant="ghost">Fantasma</Button>);
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('bg-transparent');
    });

    it('aplica variante outline', () => {
        render(<Button variant="outline">Contorno</Button>);
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('bg-surface');
    });

    it('aplica tamanho sm', () => {
        render(<Button size="sm">Pequeno</Button>);
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('h-10');
    });

    it('aplica tamanho md por padrão', () => {
        render(<Button>Médio</Button>);
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('h-12');
    });

    it('aplica tamanho lg', () => {
        render(<Button size="lg">Grande</Button>);
        const btn = screen.getByRole('button');
        expect(btn.className).toContain('h-14');
    });

    it('fica desabilitado quando disabled=true', () => {
        render(<Button disabled>Bloqueado</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('fica desabilitado quando loading=true', () => {
        render(<Button loading>Carregando</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('exibe spinner de loading quando loading=true', () => {
        const { container } = render(<Button loading>Salvando</Button>);
        expect(container.querySelector('svg.animate-spin')).toBeInTheDocument();
    });

    it('não exibe spinner quando não está carregando', () => {
        const { container } = render(<Button>Normal</Button>);
        expect(container.querySelector('svg.animate-spin')).not.toBeInTheDocument();
    });

    it('chama onClick ao ser clicado', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Clique</Button>);
        await user.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('não chama onClick quando desabilitado', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        render(<Button disabled onClick={handleClick}>Desabilitado</Button>);
        await user.click(screen.getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('aplica className personalizada', () => {
        render(<Button className="minha-classe">Botão</Button>);
        expect(screen.getByRole('button').className).toContain('minha-classe');
    });

    it('renderiza como type="submit"', () => {
        render(<Button type="submit">Enviar</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });
});
