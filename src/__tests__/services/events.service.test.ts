import { describe, it, expect, vi, beforeEach } from 'vitest';
import { eventsService } from '@/services/events.service';
import { api } from '@/services/api/http';
import type { Event } from '@/domain/events/event.schema';

vi.mock('@/services/api/http', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

const mockedApi = vi.mocked(api);

const mockEvent: Event = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    nome: 'Conferência Tech',
    dataHora: '2026-07-10T14:00:00',
    local: 'São Paulo',
    status: 'ATIVO',
};

describe('eventsService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('list', () => {
        it('retorna lista de eventos quando resposta é array', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: [mockEvent] });
            const result = await eventsService.list();
            expect(result).toEqual([mockEvent]);
            expect(mockedApi.get).toHaveBeenCalledWith('/eventos', expect.any(Object));
        });

        it('retorna lista quando resposta tem .items', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: { items: [mockEvent] } });
            const result = await eventsService.list();
            expect(result).toEqual([mockEvent]);
        });

        it('retorna lista quando resposta tem .data', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: { data: [mockEvent] } });
            const result = await eventsService.list();
            expect(result).toEqual([mockEvent]);
        });

        it('passa filtros de busca como query params', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: [] });
            await eventsService.list({ search: 'festival', status: 'ATIVO' });
            expect(mockedApi.get).toHaveBeenCalled();
        });
    });

    describe('getById', () => {
        it('retorna evento pelo id', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockEvent });
            const result = await eventsService.getById('550e8400-e29b-41d4-a716-446655440000');
            expect(result).toEqual(mockEvent);
            expect(mockedApi.get).toHaveBeenCalledWith('/eventos/550e8400-e29b-41d4-a716-446655440000');
        });
    });

    describe('create', () => {
        it('cria evento e retorna o evento criado', async () => {
            (mockedApi.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockEvent });
            const result = await eventsService.create({
                nome: 'Conferência Tech',
                dataHora: '2026-07-10T14:00:00',
                local: 'São Paulo',
                status: 'ATIVO',
            });
            expect(result).toEqual(mockEvent);
            expect(mockedApi.post).toHaveBeenCalledWith('/eventos', {
                nome: 'Conferência Tech',
                dataHora: '2026-07-10T14:00:00',
                local: 'São Paulo',
                status: 'ATIVO',
            });
        });

        it('sanitiza campo status inválido para ATIVO por padrão', async () => {
            (mockedApi.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockEvent });
            await eventsService.create({ nome: 'Teste', dataHora: '2026-01-01', local: 'SP', status: 'INVALIDO' });
            const callArg = (mockedApi.post as ReturnType<typeof vi.fn>).mock.calls[0][1];
            expect(callArg.status).toBe('ATIVO');
        });

        it('sanitiza campo status ENCERRADO corretamente', async () => {
            (mockedApi.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockEvent });
            await eventsService.create({ nome: 'Evento', dataHora: '2026-01-01', local: 'RJ', status: 'ENCERRADO' });
            const callArg = (mockedApi.post as ReturnType<typeof vi.fn>).mock.calls[0][1];
            expect(callArg.status).toBe('ENCERRADO');
        });
    });

    describe('update', () => {
        it('atualiza evento e retorna o evento atualizado', async () => {
            const updated = { ...mockEvent, nome: 'Conferência Tech 2' };
            (mockedApi.put as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: updated });
            const result = await eventsService.update(mockEvent.id, { ...mockEvent, nome: 'Conferência Tech 2' });
            expect(result).toEqual(updated);
            expect(mockedApi.put).toHaveBeenCalledWith(
                `/eventos/${mockEvent.id}`,
                expect.objectContaining({ nome: 'Conferência Tech 2' })
            );
        });
    });

    describe('delete', () => {
        it('deleta evento pelo id', async () => {
            (mockedApi.delete as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});
            await eventsService.delete(mockEvent.id);
            expect(mockedApi.delete).toHaveBeenCalledWith(`/eventos/${mockEvent.id}`);
        });
    });
});
