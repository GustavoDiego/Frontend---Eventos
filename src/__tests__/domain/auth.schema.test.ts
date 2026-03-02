import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '@/domain/auth/auth.schema';

describe('loginSchema', () => {
    it('valida dados corretos', () => {
        const result = loginSchema.safeParse({ email: 'user@test.com', password: 'senha123' });
        expect(result.success).toBe(true);
    });

    it('rejeita email inválido', () => {
        const result = loginSchema.safeParse({ email: 'naoeemail', password: 'senha123' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('E-mail inválido');
        }
    });

    it('rejeita senha menor que 6 caracteres', () => {
        const result = loginSchema.safeParse({ email: 'user@test.com', password: '123' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('A senha deve ter pelo menos 6 caracteres');
        }
    });

    it('rejeita email vazio', () => {
        const result = loginSchema.safeParse({ email: '', password: 'senha123' });
        expect(result.success).toBe(false);
    });

    it('rejeita senha vazia', () => {
        const result = loginSchema.safeParse({ email: 'user@test.com', password: '' });
        expect(result.success).toBe(false);
    });

    it('rejeita objeto vazio', () => {
        const result = loginSchema.safeParse({});
        expect(result.success).toBe(false);
    });
});

describe('registerSchema', () => {
    it('valida dados corretos', () => {
        const result = registerSchema.safeParse({
            name: 'João Silva',
            email: 'joao@test.com',
            password: 'senha123',
        });
        expect(result.success).toBe(true);
    });

    it('rejeita nome menor que 2 caracteres', () => {
        const result = registerSchema.safeParse({
            name: 'J',
            email: 'joao@test.com',
            password: 'senha123',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('O nome deve ter pelo menos 2 caracteres');
        }
    });

    it('rejeita email inválido', () => {
        const result = registerSchema.safeParse({
            name: 'João',
            email: 'invalido',
            password: 'senha123',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('E-mail inválido');
        }
    });

    it('rejeita senha curta', () => {
        const result = registerSchema.safeParse({
            name: 'João',
            email: 'joao@test.com',
            password: '12345',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('A senha deve ter pelo menos 6 caracteres');
        }
    });

    it('aceita nome exatamente com 2 caracteres', () => {
        const result = registerSchema.safeParse({
            name: 'Jo',
            email: 'jo@test.com',
            password: 'senha123',
        });
        expect(result.success).toBe(true);
    });

    it('aceita senha exatamente com 6 caracteres', () => {
        const result = registerSchema.safeParse({
            name: 'João',
            email: 'joao@test.com',
            password: 'abc123',
        });
        expect(result.success).toBe(true);
    });
});
