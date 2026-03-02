import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '@/components/ui/Select';

const options = [
    { value: 'ATIVO', label: 'Ativo' },
    { value: 'ENCERRADO', label: 'Encerrado' },
];

describe('Select', () => {
    it('renderiza elemento select', () => {
        render(<Select options={options} />);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renderiza todas as opções', () => {
        render(<Select options={options} />);
        expect(screen.getByRole('option', { name: 'Ativo' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Encerrado' })).toBeInTheDocument();
    });

    it('renderiza label quando fornecido', () => {
        render(<Select options={options} label="Status" />);
        expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });

    it('exibe mensagem de erro', () => {
        render(<Select options={options} error="Campo obrigatório" />);
        expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    });

    it('aplica aria-invalid quando há erro', () => {
        render(<Select options={options} error="Erro" />);
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('não aplica aria-invalid sem erro', () => {
        render(<Select options={options} />);
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('exibe helper quando fornecido', () => {
        render(<Select options={options} helper="Selecione um valor" />);
        expect(screen.getByText('Selecione um valor')).toBeInTheDocument();
    });

    it('fica desabilitado quando disabled=true', () => {
        render(<Select options={options} disabled />);
        expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('chama onChange ao selecionar opção', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        render(<Select options={options} onChange={handleChange} />);
        await user.selectOptions(screen.getByRole('combobox'), 'ATIVO');
        expect(handleChange).toHaveBeenCalled();
    });

    it('aplica id personalizado e associa à label', () => {
        render(<Select options={options} label="Status" id="status-field" />);
        expect(screen.getByLabelText('Status')).toHaveAttribute('id', 'status-field');
    });

    it('usa valor padrão quando fornecido', () => {
        render(<Select options={options} defaultValue="ENCERRADO" />);
        expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('ENCERRADO');
    });
});
