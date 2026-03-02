import { describe, it, expect } from 'vitest';
import { participantSchema } from '@/domain/participants/participant.schema';

describe('participantSchema', () => {
    const validParticipant = {
        nome: 'Maria Souza',
        email: 'maria@test.com',
        eventoId: 'evento-001',
    };

    it('valida participante com dados corretos', () => {
        const result = participantSchema.safeParse(validParticipant);
        expect(result.success).toBe(true);
    });

    it('aplica default NAO_FEITO para checkin quando não informado', () => {
        const result = participantSchema.safeParse(validParticipant);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.checkin).toBe('NAO_FEITO');
        }
    });

    it('aceita checkin FEITO', () => {
        const result = participantSchema.safeParse({ ...validParticipant, checkin: 'FEITO' });
        expect(result.success).toBe(true);
        if (result.success) expect(result.data.checkin).toBe('FEITO');
    });

    it('aceita checkin NAO_FEITO', () => {
        const result = participantSchema.safeParse({ ...validParticipant, checkin: 'NAO_FEITO' });
        expect(result.success).toBe(true);
    });

    it('rejeita checkin com valor inválido', () => {
        const result = participantSchema.safeParse({ ...validParticipant, checkin: 'PENDENTE' });
        expect(result.success).toBe(false);
    });

    it('rejeita nome menor que 2 caracteres', () => {
        const result = participantSchema.safeParse({ ...validParticipant, nome: 'M' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Nome deve ter no mínimo 2 caracteres');
        }
    });

    it('rejeita email inválido', () => {
        const result = participantSchema.safeParse({ ...validParticipant, email: 'invalido' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('E-mail inválido');
        }
    });

    it('rejeita eventoId vazio', () => {
        const result = participantSchema.safeParse({ ...validParticipant, eventoId: '' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Evento é obrigatório');
        }
    });

    it('permite id ausente (campo opcional)', () => {
        const result = participantSchema.safeParse(validParticipant);
        expect(result.success).toBe(true);
    });

    it('aceita id quando fornecido', () => {
        const result = participantSchema.safeParse({ ...validParticipant, id: 'part-001' });
        expect(result.success).toBe(true);
    });

    it('aceita nome com exatamente 2 caracteres', () => {
        const result = participantSchema.safeParse({ ...validParticipant, nome: 'Mi' });
        expect(result.success).toBe(true);
    });
});
