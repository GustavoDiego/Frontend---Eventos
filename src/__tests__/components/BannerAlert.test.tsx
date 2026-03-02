import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BannerAlert } from '@/components/ui/BannerAlert';

describe('BannerAlert', () => {
    it('renderiza mensagem de erro', () => {
        render(<BannerAlert type="error" message="Credenciais inválidas" />);
        expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
    });

    it('renderiza mensagem de warning', () => {
        render(<BannerAlert type="warning" message="Atenção!" />);
        expect(screen.getByText('Atenção!')).toBeInTheDocument();
    });

    it('renderiza mensagem de info', () => {
        render(<BannerAlert type="info" message="Informação importante" />);
        expect(screen.getByText('Informação importante')).toBeInTheDocument();
    });

    it('renderiza mensagem de success', () => {
        render(<BannerAlert type="success" message="Operação concluída" />);
        expect(screen.getByText('Operação concluída')).toBeInTheDocument();
    });

    it('renderiza título quando fornecido', () => {
        render(<BannerAlert type="error" title="Erro de login" message="Tente novamente" />);
        expect(screen.getByText('Erro de login')).toBeInTheDocument();
        expect(screen.getByText('Tente novamente')).toBeInTheDocument();
    });

    it('não renderiza título quando não fornecido', () => {
        render(<BannerAlert type="info" message="Sem título" />);
        expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('aplica estilos de erro (classe bg-danger)', () => {
        const { container } = render(<BannerAlert type="error" message="Erro" />);
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.className).toContain('bg-danger');
    });

    it('aplica estilos de sucesso (classe bg-success)', () => {
        const { container } = render(<BannerAlert type="success" message="Ok" />);
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.className).toContain('bg-success');
    });

    it('aplica className personalizada', () => {
        const { container } = render(<BannerAlert type="info" message="teste" className="minha-classe" />);
        expect((container.firstChild as HTMLElement).className).toContain('minha-classe');
    });
});
