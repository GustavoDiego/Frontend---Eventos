import { describe, it, expect } from 'vitest';
import { checkinRuleSchema } from '@/domain/checkin/checkin.schema';

describe('checkinRuleSchema', () => {
    const validRule = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Regra Principal',
        ativo: true,
        obrigatoriedade: 'OBRIGATORIO' as const,
        liberarMinAntes: 30,
        encerrarMinDepois: 60,
    };

    it('valida regra de check-in correta', () => {
        const result = checkinRuleSchema.safeParse(validRule);
        expect(result.success).toBe(true);
    });

    it('aceita obrigatoriedade OPCIONAL', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, obrigatoriedade: 'OPCIONAL' });
        expect(result.success).toBe(true);
        if (result.success) expect(result.data.obrigatoriedade).toBe('OPCIONAL');
    });

    it('rejeita id que não é UUID', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, id: 'nao-uuid' });
        expect(result.success).toBe(false);
    });

    it('rejeita nome menor que 3 caracteres', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, nome: 'AB' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Nome deve ter no mínimo 3 caracteres');
        }
    });

    it('rejeita liberarMinAntes negativo', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, liberarMinAntes: -1 });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Deve ser igual ou maior que 0');
        }
    });

    it('rejeita liberarMinAntes acima de 1440', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, liberarMinAntes: 1441 });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Máximo 1 dia (1440 min)');
        }
    });

    it('rejeita encerrarMinDepois negativo', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, encerrarMinDepois: -1 });
        expect(result.success).toBe(false);
    });

    it('rejeita encerrarMinDepois acima de 1440', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, encerrarMinDepois: 1441 });
        expect(result.success).toBe(false);
    });

    it('aceita liberarMinAntes = 0', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, liberarMinAntes: 0 });
        expect(result.success).toBe(true);
    });

    it('aceita encerrarMinDepois = 1440 (máximo)', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, encerrarMinDepois: 1440 });
        expect(result.success).toBe(true);
    });

    it('rejeita obrigatoriedade inválida', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, obrigatoriedade: 'EXIGIDO' });
        expect(result.success).toBe(false);
    });

    it('rejeita ativo não booleano', () => {
        const result = checkinRuleSchema.safeParse({ ...validRule, ativo: 'sim' });
        expect(result.success).toBe(false);
    });
});
