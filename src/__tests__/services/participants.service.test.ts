import { describe, it, expect, vi, beforeEach } from 'vitest';
import { participantsService } from '@/services/participants.service';
import { api } from '@/services/api/http';
import type { Participant } from '@/domain/participants/participant.schema';

vi.mock('@/services/api/http', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

const mockedApi = vi.mocked(api);

const mockParticipant: Participant = {
    id: 'part-001',
    nome: 'Carlos Oliveira',
    email: 'carlos@test.com',
    eventoId: 'evento-001',
    checkin: 'NAO_FEITO',
};

describe('participantsService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('list', () => {
        it('retorna lista de participantes (array direto)', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: [mockParticipant] });
            const result = await participantsService.list();
            expect(result).toEqual([mockParticipant]);
        });

        it('retorna lista quando resposta tem .items', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: { items: [mockParticipant] } });
            const result = await participantsService.list();
            expect(result).toEqual([mockParticipant]);
        });

        it('retorna lista quando resposta tem .data', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: { data: [mockParticipant] } });
            const result = await participantsService.list();
            expect(result).toEqual([mockParticipant]);
        });

        it('passa filtros como query params', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: [] });
            await participantsService.list({ search: 'Carlos', eventoId: 'ev-01', checkin: 'NAO_FEITO' });
            expect(mockedApi.get).toHaveBeenCalled();
        });
    });

    describe('getById', () => {
        it('retorna participante pelo id', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockParticipant });
            const result = await participantsService.getById('part-001');
            expect(result).toEqual(mockParticipant);
            expect(mockedApi.get).toHaveBeenCalledWith('/participantes/part-001');
        });
    });

    describe('create', () => {
        it('cria participante e retorna os dados', async () => {
            (mockedApi.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockParticipant });
            const result = await participantsService.create({
                nome: 'Carlos Oliveira',
                email: 'carlos@test.com',
                eventoId: 'evento-001',
            });
            expect(result).toEqual(mockParticipant);
            expect(mockedApi.post).toHaveBeenCalledWith('/participantes', expect.any(Object));
        });
    });

    describe('update', () => {
        it('atualiza participante pelo id', async () => {
            const updated = { ...mockParticipant, checkin: 'FEITO' as const };
            (mockedApi.put as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: updated });
            const result = await participantsService.update('part-001', { checkin: 'FEITO' });
            expect(result).toEqual(updated);
            expect(mockedApi.put).toHaveBeenCalledWith('/participantes/part-001', { checkin: 'FEITO' });
        });
    });

    describe('delete', () => {
        it('deleta participante pelo id', async () => {
            (mockedApi.delete as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});
            await participantsService.delete('part-001');
            expect(mockedApi.delete).toHaveBeenCalledWith('/participantes/part-001');
        });
    });

    describe('transfer', () => {
        it('transfere participante para outro evento', async () => {
            const mockResult = { ...mockParticipant, eventoId: 'evento-002' };
            (mockedApi.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockResult });
            const result = await participantsService.transfer('part-001', 'evento-002');
            expect(result).toEqual(mockResult);
            expect(mockedApi.post).toHaveBeenCalledWith('/participantes/part-001/transferir', {
                novoEventoId: 'evento-002',
            });
        });
    });
});
