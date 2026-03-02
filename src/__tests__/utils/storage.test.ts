import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storage } from '@/utils/storage';

describe('storage', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    describe('getToken', () => {
        it('retorna null quando não há token armazenado', () => {
            expect(storage.getToken()).toBeNull();
        });

        it('retorna o token quando armazenado', () => {
            localStorage.setItem('@events.token', 'meu-token-jwt');
            expect(storage.getToken()).toBe('meu-token-jwt');
        });
    });

    describe('setToken', () => {
        it('armazena o token no localStorage', () => {
            storage.setToken('abc123');
            expect(localStorage.setItem).toHaveBeenCalledWith('@events.token', 'abc123');
        });

        it('sobrescreve token existente', () => {
            storage.setToken('token-antigo');
            storage.setToken('token-novo');
            expect(localStorage.setItem).toHaveBeenLastCalledWith('@events.token', 'token-novo');
        });
    });

    describe('clearToken', () => {
        it('remove o token do localStorage', () => {
            storage.clearToken();
            expect(localStorage.removeItem).toHaveBeenCalledWith('@events.token');
        });

        it('não lança erro se não há token para remover', () => {
            expect(() => storage.clearToken()).not.toThrow();
        });
    });

    describe('fluxo completo', () => {
        it('armazena, recupera e remove token', () => {
            storage.setToken('jwt.token.aqui');
            expect(storage.getToken()).toBe('jwt.token.aqui');
            storage.clearToken();
            // After clear, getItem should return null
            expect(localStorage.getItem('@events.token')).toBeNull();
        });
    });
});
