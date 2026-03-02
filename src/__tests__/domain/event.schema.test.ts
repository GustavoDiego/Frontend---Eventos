import { describe, it, expect } from 'vitest';
import { eventSchema } from '@/domain/events/event.schema';

describe('eventSchema', () => {
    const validEvent = {
        nome: 'Festival de Música',
        dataHora: '2026-06-15T20:00:00',
        local: 'Parque Central',
        status: 'ATIVO' as const,
    };

    it('valida evento com dados corretos', () => {
        const result = eventSchema.safeParse(validEvent);
        expect(result.success).toBe(true);
    });

    it('valida evento com id', () => {
        const result = eventSchema.safeParse({
            ...validEvent,
            id: '550e8400-e29b-41d4-a716-446655440000',
        });
        expect(result.success).toBe(true);
    });

    it('permite id ausente (campo opcional)', () => {
        const result = eventSchema.safeParse(validEvent);
        expect(result.success).toBe(true);
    });

    it('rejeita id inválido (não é UUID)', () => {
        const result = eventSchema.safeParse({ ...validEvent, id: 'nao-uuid' });
        expect(result.success).toBe(false);
    });

    it('rejeita nome menor que 3 caracteres', () => {
        const result = eventSchema.safeParse({ ...validEvent, nome: 'AB' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Nome deve ter no mínimo 3 caracteres');
        }
    });

    it('rejeita data vazia', () => {
        const result = eventSchema.safeParse({ ...validEvent, dataHora: '' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Data e hora são obrigatórios');
        }
    });

    it('rejeita local menor que 3 caracteres', () => {
        const result = eventSchema.safeParse({ ...validEvent, local: 'AB' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Local deve ter no mínimo 3 caracteres');
        }
    });

    it('aceita status ATIVO', () => {
        const result = eventSchema.safeParse({ ...validEvent, status: 'ATIVO' });
        expect(result.success).toBe(true);
        if (result.success) expect(result.data.status).toBe('ATIVO');
    });

    it('aceita status ENCERRADO', () => {
        const result = eventSchema.safeParse({ ...validEvent, status: 'ENCERRADO' });
        expect(result.success).toBe(true);
        if (result.success) expect(result.data.status).toBe('ENCERRADO');
    });

    it('rejeita status inválido', () => {
        const result = eventSchema.safeParse({ ...validEvent, status: 'CANCELADO' });
        expect(result.success).toBe(false);
    });

    it('rejeita objeto vazio', () => {
        const result = eventSchema.safeParse({});
        expect(result.success).toBe(false);
    });
});
