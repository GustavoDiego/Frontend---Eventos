import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkinService } from '@/services/checkin.service';
import { api } from '@/services/api/http';
import type { CheckinRule } from '@/domain/checkin/checkin.schema';

vi.mock('@/services/api/http', () => ({
    api: {
        get: vi.fn(),
        put: vi.fn(),
    },
}));

const mockedApi = vi.mocked(api);

const mockRule: CheckinRule = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    nome: 'Check-in Principal',
    ativo: true,
    obrigatoriedade: 'OBRIGATORIO',
    liberarMinAntes: 60,
    encerrarMinDepois: 30,
};

describe('checkinService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getRules', () => {
        it('retorna regras quando resposta é array', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: [mockRule] });
            const result = await checkinService.getRules('evento-001');
            expect(result).toHaveLength(1);
            expect(result[0].nome).toBe('Check-in Principal');
            expect(mockedApi.get).toHaveBeenCalledWith('/eventos/evento-001/regras-checkin');
        });

        it('retorna regras quando resposta tem .regras', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: { regras: [mockRule] } });
            const result = await checkinService.getRules('evento-001');
            expect(result).toHaveLength(1);
        });

        it('retorna regras quando resposta tem .data', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: { data: [mockRule] } });
            const result = await checkinService.getRules('evento-001');
            expect(result).toHaveLength(1);
        });

        it('retorna array vazio quando resposta não é array', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: 'invalido' });
            const result = await checkinService.getRules('evento-001');
            expect(result).toEqual([]);
        });

        it('sanitiza campos da regra recebida', async () => {
            const rawRule = { ...mockRule, liberarMinAntes: '45', encerrarMinDepois: '15' };
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: [rawRule] });
            const result = await checkinService.getRules('evento-001');
            expect(typeof result[0].liberarMinAntes).toBe('number');
            expect(typeof result[0].encerrarMinDepois).toBe('number');
        });
    });

    describe('updateRules', () => {
        it('envia regras sanitizadas e retorna regras atualizadas', async () => {
            (mockedApi.put as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
                data: { regras: [mockRule] },
            });
            const result = await checkinService.updateRules('evento-001', [mockRule]);
            expect(result).toHaveLength(1);
            expect(mockedApi.put).toHaveBeenCalledWith(
                '/eventos/evento-001/regras-checkin',
                { regras: expect.any(Array) }
            );
        });

        it('retorna array vazio quando resposta não tem .regras', async () => {
            (mockedApi.put as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: {} });
            const result = await checkinService.updateRules('evento-001', [mockRule]);
            expect(result).toEqual([]);
        });

        it('trata entrada não-array de regras sem erro', async () => {
            (mockedApi.put as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: { regras: [] } });
            const result = await checkinService.updateRules('evento-001', null as unknown as CheckinRule[]);
            expect(result).toEqual([]);
        });
    });
});
