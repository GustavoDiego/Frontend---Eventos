import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
    it('renderiza campo de input', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renderiza com label', () => {
        render(<Input label="E-mail" />);
        expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
        expect(screen.getByText('E-mail')).toBeInTheDocument();
    });

    it('associa label ao input via id', () => {
        render(<Input label="Nome" id="nome-input" />);
        const input = screen.getByLabelText('Nome');
        expect(input).toHaveAttribute('id', 'nome-input');
    });

    it('gera id automaticamente quando não fornecido', () => {
        render(<Input label="Campo" />);
        const input = screen.getByLabelText('Campo');
        expect(input).toHaveAttribute('id');
    });

    it('exibe mensagem de erro', () => {
        render(<Input error="Campo obrigatório" />);
        expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    });

    it('aplica aria-invalid quando há erro', () => {
        render(<Input error="Inválido" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('não aplica aria-invalid quando não há erro', () => {
        render(<Input />);
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('exibe texto de helper', () => {
        render(<Input helper="Dica de uso" />);
        expect(screen.getByText('Dica de uso')).toBeInTheDocument();
    });

    it('exibe mensagem de erro ao invés do helper quando ambos fornecidos', () => {
        render(<Input error="Erro!" helper="Helper" />);
        expect(screen.getByText('Erro!')).toBeInTheDocument();
        expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });

    it('aplica placeholder', () => {
        render(<Input placeholder="Digite aqui..." />);
        expect(screen.getByPlaceholderText('Digite aqui...')).toBeInTheDocument();
    });

    it('fica desabilitado quando disabled=true', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('aplica type password', () => {
        const { container } = render(<Input type="password" />);
        expect(container.querySelector('input[type="password"]')).toBeInTheDocument();
    });

    it('aplica className personalizada no wrapper', () => {
        render(<Input className="meu-estilo" />);
        const input = screen.getByRole('textbox');
        expect(input.className).toContain('meu-estilo');
    });

    it('encaminha ref para o elemento input', () => {
        const ref = { current: null };
        render(<Input ref={ref as React.RefObject<HTMLInputElement>} />);
        expect(ref.current).not.toBeNull();
    });
});
