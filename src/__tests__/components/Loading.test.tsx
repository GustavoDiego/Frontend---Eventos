import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from '@/components/ui/Loading';

describe('Loading', () => {
    it('renderiza texto de carregamento', () => {
        render(<Loading />);
        expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    it('renderiza ícone de spinner', () => {
        const { container } = render(<Loading />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('aplica className personalizada', () => {
        const { container } = render(<Loading className="minha-classe" />);
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.className).toContain('minha-classe');
    });

    it('mantém classes padrão quando className fornecida', () => {
        const { container } = render(<Loading className="extra" />);
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.className).toContain('flex');
        expect(wrapper.className).toContain('items-center');
    });

    it('renderiza sem erros sem className', () => {
        expect(() => render(<Loading />)).not.toThrow();
    });
});
