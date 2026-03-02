import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '@/services/auth.service';
import { api } from '@/services/api/http';

vi.mock('@/services/api/http', () => ({
    api: {
        post: vi.fn(),
    },
}));

const mockedApi = vi.mocked(api);

describe('authService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('login', () => {
        it('retorna token ao fazer login com sucesso', async () => {
            (mockedApi.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
                data: { token: 'jwt-token-mock' },
            });

            const result = await authService.login({ email: 'user@test.com', password: 'senha123' });

            expect(result).toEqual({ token: 'jwt-token-mock' });
            expect(mockedApi.post).toHaveBeenCalledWith('/auth/login', {
                email: 'user@test.com',
                password: 'senha123',
            });
        });

        it('propaga erros da API', async () => {
            const error = new Error('Credenciais inválidas');
            (mockedApi.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);

            await expect(
                authService.login({ email: 'wrong@test.com', password: 'errada' })
            ).rejects.toThrow('Credenciais inválidas');
        });

        it('chama o endpoint correto para login', async () => {
            (mockedApi.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: { token: 'tok' } });
            await authService.login({ email: 'a@b.com', password: 'pass123' });
            expect(mockedApi.post).toHaveBeenCalledWith('/auth/login', expect.any(Object));
        });
    });

    describe('register', () => {
        it('retorna mensagem e usuário ao registrar com sucesso', async () => {
            const mockResponse = { message: 'Usuário criado', user: { id: '1', name: 'João' } };
            (mockedApi.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockResponse });

            const result = await authService.register({
                name: 'João Silva',
                email: 'joao@test.com',
                password: 'senha123',
            });

            expect(result).toEqual(mockResponse);
            expect(mockedApi.post).toHaveBeenCalledWith('/auth/register', {
                name: 'João Silva',
                email: 'joao@test.com',
                password: 'senha123',
            });
        });

        it('propaga erros ao registrar', async () => {
            (mockedApi.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('E-mail já usado'));
            await expect(
                authService.register({ name: 'João', email: 'dup@test.com', password: 'senha123' })
            ).rejects.toThrow('E-mail já usado');
        });
    });
});
