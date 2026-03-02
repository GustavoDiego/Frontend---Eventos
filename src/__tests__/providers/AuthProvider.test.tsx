import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '@/app/providers/AuthProvider';

const AuthConsumer = () => {
  const { token, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="token">{token ?? 'null'}</span>
      <span data-testid="isAuthenticated">{String(isAuthenticated)}</span>
      <button onClick={() => login('novo-token')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renderiza filhos corretamente', () => {
    render(
      <AuthProvider>
        <span>Filho</span>
      </AuthProvider>
    );
    expect(screen.getByText('Filho')).toBeInTheDocument();
  });

  it('comeca sem autenticacao quando nao ha token no storage', () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
    expect(screen.getByTestId('token').textContent).toBe('null');
  });

  it('comeca autenticado quando ha token no localStorage', () => {
    localStorage.setItem('@events.token', 'token-existente');
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
    expect(screen.getByTestId('token').textContent).toBe('token-existente');
  });

  it('autentica ao chamar login com token', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
    await user.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
    expect(screen.getByTestId('token').textContent).toBe('novo-token');
  });

  it('armazena token no localStorage ao fazer login', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );
    await user.click(screen.getByRole('button', { name: 'Login' }));
    expect(localStorage.setItem).toHaveBeenCalledWith('@events.token', 'novo-token');
  });

  it('limpa autenticacao ao chamar logout', async () => {
    const user = userEvent.setup();
    localStorage.setItem('@events.token', 'token-existente');
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
    await user.click(screen.getByRole('button', { name: 'Logout' }));
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
    expect(screen.getByTestId('token').textContent).toBe('null');
  });

  it('remove token do localStorage ao fazer logout', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );
    await user.click(screen.getByRole('button', { name: 'Login' }));
    await user.click(screen.getByRole('button', { name: 'Logout' }));
    expect(localStorage.removeItem).toHaveBeenCalledWith('@events.token');
  });

  it('lanca erro ao usar useAuth fora do AuthProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => { });
    expect(() => render(<AuthConsumer />)).toThrow('useAuth must be used within an AuthProvider');
    spy.mockRestore();
  });
});
