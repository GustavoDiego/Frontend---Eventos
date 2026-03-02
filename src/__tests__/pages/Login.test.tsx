import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { AuthProvider } from '@/app/providers/AuthProvider';

// Mock services
vi.mock('@/services/api', () => ({
    authService: {
        login: vi.fn(),
    },
}));

// Mock react-router-dom navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const { authService } = await import('@/services/api');

const renderLogin = () =>
    render(
        <MemoryRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </MemoryRouter>
    );

describe('Login page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('renderiza campos de email e senha', () => {
        renderLogin();
        expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
        expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    });

    it('renderiza botão de submit', () => {
        renderLogin();
        expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    });

    it('renderiza link para a página de registro', () => {
        renderLogin();
        expect(screen.getByRole('link', { name: /Crie agora/i })).toBeInTheDocument();
    });

    it('exibe erros de validação para email vazio', async () => {
        const user = userEvent.setup();
        renderLogin();
        await user.click(screen.getByRole('button', { name: /Entrar/i }));
        await waitFor(() => {
            expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
        });
    });

    it('exibe erros de validação para senha curta', async () => {
        const user = userEvent.setup();
        renderLogin();
        await user.type(screen.getByLabelText('E-mail'), 'user@test.com');
        await user.type(screen.getByLabelText('Senha'), '123');
        await user.click(screen.getByRole('button', { name: /Entrar/i }));
        await waitFor(() => {
            expect(screen.getByText('A senha deve ter pelo menos 6 caracteres')).toBeInTheDocument();
        });
    });

    it('navega para /dashboard após login bem-sucedido', async () => {
        const user = userEvent.setup();
        (authService.login as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ token: 'jwt-token' });

        renderLogin();
        await user.type(screen.getByLabelText('E-mail'), 'admin@test.com');
        await user.type(screen.getByLabelText('Senha'), 'senha123');
        await user.click(screen.getByRole('button', { name: /Entrar/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('armazena token no localStorage após login bem-sucedido', async () => {
        const user = userEvent.setup();
        (authService.login as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ token: 'jwt-token-123' });

        renderLogin();
        await user.type(screen.getByLabelText('E-mail'), 'admin@test.com');
        await user.type(screen.getByLabelText('Senha'), 'senha123');
        await user.click(screen.getByRole('button', { name: /Entrar/i }));

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('@events.token', 'jwt-token-123');
        });
    });

    it('exibe mensagem de erro ao falhar o login', async () => {
        const user = userEvent.setup();
        (authService.login as ReturnType<typeof vi.fn>).mockRejectedValueOnce({
            response: { data: { message: 'Credenciais inválidas' } },
        });

        renderLogin();
        await user.type(screen.getByLabelText('E-mail'), 'wrong@test.com');
        await user.type(screen.getByLabelText('Senha'), 'errada123');
        await user.click(screen.getByRole('button', { name: /Entrar/i }));

        await waitFor(() => {
            expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
        });
    });

    it('exibe mensagem de erro genérica quando resposta não tem message', async () => {
        const user = userEvent.setup();
        (authService.login as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network Error'));

        renderLogin();
        await user.type(screen.getByLabelText('E-mail'), 'user@test.com');
        await user.type(screen.getByLabelText('Senha'), 'senha123');
        await user.click(screen.getByRole('button', { name: /Entrar/i }));

        await waitFor(() => {
            expect(screen.getByText('Erro ao efetuar login')).toBeInTheDocument();
        });
    });

    it('desabilita botão durante o envio', async () => {
        const user = userEvent.setup();
        let resolveLogin!: (value: { token: string }) => void;
        (authService.login as ReturnType<typeof vi.fn>).mockImplementationOnce(
            () => new Promise(resolve => { resolveLogin = resolve; })
        );

        renderLogin();
        await user.type(screen.getByLabelText('E-mail'), 'admin@test.com');
        await user.type(screen.getByLabelText('Senha'), 'senha123');
        await user.click(screen.getByRole('button', { name: /Entrar/i }));

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Entrar/i })).toBeDisabled();
        });

        resolveLogin({ token: 'tok' });
    });
});
