import { describe, it, expect, vi, beforeEach } from 'vitest';
import { dashboardService } from '@/services/dashboard.service';
import { api } from '@/services/api/http';
import type { DashboardData } from '@/domain/events/event.schema';

vi.mock('@/services/api/http', () => ({
    api: {
        get: vi.fn(),
    },
}));

const mockedApi = vi.mocked(api);

const mockDashboard: DashboardData = {
    totalEventos: 5,
    totalParticipantes: 120,
    proximosEventos: [
        { id: 'ev-001', nome: 'Festival', dataHora: '2026-04-15T18:00:00' },
    ],
    ultimasAtividades: [
        { tipo: 'checkin', participante: 'Ana', evento: 'Festival', em: '2026-03-01T10:00:00' },
    ],
};

describe('dashboardService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getDashboard', () => {
        it('retorna dados do dashboard com sucesso', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockDashboard });
            const result = await dashboardService.getDashboard();
            expect(result).toEqual(mockDashboard);
            expect(mockedApi.get).toHaveBeenCalledWith('/dashboard');
        });

        it('retorna totalEventos correto', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockDashboard });
            const result = await dashboardService.getDashboard();
            expect(result.totalEventos).toBe(5);
        });

        it('retorna totalParticipantes correto', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockDashboard });
            const result = await dashboardService.getDashboard();
            expect(result.totalParticipantes).toBe(120);
        });

        it('propaga erro da API', async () => {
            (mockedApi.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Erro de rede'));
            await expect(dashboardService.getDashboard()).rejects.toThrow('Erro de rede');
        });
    });
});
