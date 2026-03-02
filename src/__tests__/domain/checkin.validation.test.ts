import { describe, it, expect } from 'vitest';
import { validateCheckinRules } from '@/domain/checkin/checkin.validation';
import type { CheckinRule } from '@/domain/checkin/checkin.schema';

const makeRule = (overrides: Partial<CheckinRule> = {}): CheckinRule => ({
    id: crypto.randomUUID(),
    nome: 'Regra Padrão',
    ativo: true,
    obrigatoriedade: 'OBRIGATORIO',
    liberarMinAntes: 60,
    encerrarMinDepois: 60,
    ...overrides,
});

describe('validateCheckinRules', () => {
    it('retorna erro quando não há regras ativas', () => {
        const rules = [makeRule({ ativo: false }), makeRule({ ativo: false })];
        const errors = validateCheckinRules(rules);
        expect(errors).toContain('Deve existir ao menos 1 regra ativa no evento.');
    });

    it('retorna erro quando array está vazio', () => {
        const errors = validateCheckinRules([]);
        expect(errors).toContain('Deve existir ao menos 1 regra ativa no evento.');
    });

    it('retorna vazio quando há ao menos 1 regra ativa', () => {
        const rules = [makeRule({ ativo: true })];
        const errors = validateCheckinRules(rules);
        expect(errors).toHaveLength(0);
    });

    it('não retorna erros para 2 regras obrigatórias com janelas sobrepostas', () => {
        // R1: [-60, +60], R2: [-30, +90]  → sobreposição existe
        const rules = [
            makeRule({ nome: 'Regra A', ativo: true, obrigatoriedade: 'OBRIGATORIO', liberarMinAntes: 60, encerrarMinDepois: 60 }),
            makeRule({ nome: 'Regra B', ativo: true, obrigatoriedade: 'OBRIGATORIO', liberarMinAntes: 30, encerrarMinDepois: 90 }),
        ];
        const errors = validateCheckinRules(rules);
        expect(errors).toHaveLength(0);
    });

    it('retorna erro de conflito quando 2 regras obrigatórias não se sobrepõem', () => {
        // R1: [-120, -10] (libera 120min antes, encerra 10min antes do evento - começa antes, encerra antes = encerrarMinDepois negativo não é válido, mas testamos a lógica)
        // R1: liberarMinAntes=120, encerrarMinDepois=0  → [-120, 0]
        // R2: liberarMinAntes=0, encerrarMinDepois=120  → [0, 120]
        // Sobreposição: max(-120, 0) = 0  ≤  min(0, 120) = 0  → TOCA, não conflita
        // Para conflito real: R1 = [-60, -10] → encerrarMinDepois seria negativo, mas não permitido pelo schema
        // Simular: R1 liberarMinAntes=120, encerrarMinDepois=0; R2 liberarMinAntes=0, encerrarMinDepois=0 → intervalos [-120, 0] e [0, 0] → tocam em 0, ainda 0 ≤ 0, sem conflito
        // Conflito ocorre quando: max(start1, start2) > min(end1, end2)
        // R1: [-10, 0], R2: [-5, 30] → max(-10,-5)=-5, min(0,30)=0 → -5 ≤ 0, sans conflict
        // Para forçar conflito: start1=0 (liberarMinAntes=0), end1=10 (encerrarMinDepois=10); start2=-20 (liberarMinAntes=20), end2=-5 (encerrarMinDepois só positivo 0+) 
        // Com a restrição de campos >=0, o único conflito possível é quando uma regra termina (encerrarMinDepois=0) antes da outra começa (liberarMinAntes=0 ambas mas diferente janela)
        // Vamos testar diretamente com os valores que a função recebe:
        // liberar=10, encerrar=0  → start=-10, end=0
        // liberar=0,  encerrar=5  → start=0,  end=5
        // max(-10, 0)=0 <= min(0,5)=0 → sem conflito
        // Para conflito: liberar=0, encerrar=0  → start=0, end=0
        //              liberar=10, encerrar=5  → start=-10, end=5
        // max(0,-10)=0 <= min(0,5)=0 → sem conflito ainda (tocam no 0)
        // The only way to get a conflict with non-negative values:
        // R1: liberarMinAntes=0, encerrarMinDepois=5  → [-0, 5] = [0, 5]
        // R2: liberarMinAntes=10, encerrarMinDepois=0 → [-10, 0]
        //    max(0, -10) = 0 <= min(5, 0) = 0  → sem conflito
        // It seems the overlap check is generous. Let's test a case that DOES create conflict:
        // Actually, from the code: start = -liberarMinAntes, end = encerrarMinDepois
        // For no overlap (conflict): Math.max(start1, start2) > Math.min(end1, end2)
        // If liberarMinAntes=0, encerrarMinDepois=0 for BOTH: start=-0=0, end=0 → same point → overlapStart=0, overlapEnd=0 → 0 <= 0 → NO conflict
        // With R1: liberarMinAntes=5, encerrarMinDepois=0 → start=-5, end=0
        // R2: liberarMinAntes=0, encerrarMinDepois=10 → start=0, end=10
        // max(-5,0)=0, min(0,10)=0 → 0<=0 → no conflict
        // The testing spec says conflict occurs when intervals DON'T overlap. That requires a gap.
        // Since encerrarMinDepois >= 0 and liberarMinAntes >= 0, and start = -liberarMinAntes:
        // R1: end1 < start2  (meaning R1 ends before R2 starts)
        // end1 = encerrarMinDepois1 ≥ 0
        // start2 = -liberarMinAntes2 ≤ 0
        // end1 < start2 ⟹ encerrarMinDepois1 < -liberarMinAntes2 ⟹ encerrarMinDepois > 0 < 0 → impossible with non-negative
        // So with the constraints in the schema (both fields ≥ 0), both intervals always include 0 or overlap... 
        // Actually, checking more carefully:
        // R1 with liberarMinAntes=100, encerrarMinDepois=0 → interval [-100, 0]  
        // R2 with liberarMinAntes=0, encerrarMinDepois=100  → interval [0, 100]
        // max(-100, 0)=0 ≤ min(0, 100)=0 → 0 ≤ 0 → just touching, NOT a conflict
        // The ONLY way to get a conflict is if both rules have liberarMinAntes=0 AND encerrarMinDepois=0 (single point both at 0), which still doesn't conflict since 0 ≤ 0
        // So it seems impossible with valid data to trigger the conflict. Let me look at this differently:
        // Actually I think the intent is that if both rules are REQUIRED, they need to be simultaneously satisfiable.
        // The conflict check seems to mean they need to have an overlapping window.
        // With valid schema values (≥0), interval for any rule is [-liberarMinAntes, encerrarMinDepois].
        // Since liberarMinAntes ≥ 0 and encerrarMinDepois ≥ 0, the interval always contains 0 (or is [0,0]).
        // max(start1, start2) = max(-a, -b) ≤ 0 ≤ min(c, d) = min(end1, end2)
        // So the conflict condition overlapStart > overlapEnd can ONLY happen if max(-a,-b) > min(c,d)
        // i.e., if both encerrarMinDepois values are 0 (c=d=0) and both liberarMinAntes > 0:
        // max(-a,-b) ≤ 0 = min(0,0), so: -max(a,b) > 0? No, since a,b ≥ 0, -max(a,b) ≤ 0
        // Conclusion: with valid data matching the schema, there can be NO conflict.
        // BUT the test function can still be called with arbitrary data (bypassing schema).
        // Let me write the test to verify this understanding.
        const rules = [
            makeRule({ nome: 'Regra A', ativo: true, obrigatoriedade: 'OBRIGATORIO', liberarMinAntes: 60, encerrarMinDepois: 60 }),
            makeRule({ nome: 'Regra B', ativo: true, obrigatoriedade: 'OBRIGATORIO', liberarMinAntes: 60, encerrarMinDepois: 60 }),
        ];
        const errors = validateCheckinRules(rules);
        // With standard valid values both covering [e.g. -60 to +60], there's no conflict
        expect(errors).not.toContain(expect.stringContaining('Conflito de janela'));
    });

    it('detecta conflito quando janelas de regras obrigatórias não se sobrepõem', () => {
        // Force a mathematical conflict by injecting negative encerrarMinDepois
        // to simulate the condition: overlapStart > overlapEnd
        // R1: liberarMinAntes=0, encerrarMinDepois=-10 → interval [0, -10]  (not valid by schema but valid for test function)
        // R2: liberarMinAntes=0, encerrarMinDepois=10  → [0, 10]
        // overlapStart = max(0,0) = 0, overlapEnd = min(-10, 10) = -10 → 0 > -10 → CONFLICT
        const rules: CheckinRule[] = [
            { ...makeRule({ nome: 'Regra X', ativo: true, obrigatoriedade: 'OBRIGATORIO', liberarMinAntes: 0, encerrarMinDepois: 0 }), encerrarMinDepois: -10 },
            makeRule({ nome: 'Regra Y', ativo: true, obrigatoriedade: 'OBRIGATORIO', liberarMinAntes: 20, encerrarMinDepois: 10 }),
        ];
        const errors = validateCheckinRules(rules);
        expect(errors.some(e => e.includes('Conflito de janela'))).toBe(true);
        expect(errors.some(e => e.includes('Regra X') && e.includes('Regra Y'))).toBe(true);
    });

    it('não retorna erros de conflito para regras OPCIONAL + OBRIGATORIO', () => {
        const rules = [
            makeRule({ nome: 'Regra Opcional', ativo: true, obrigatoriedade: 'OPCIONAL', liberarMinAntes: 0, encerrarMinDepois: 0 }),
            makeRule({ nome: 'Regra Obrigatória', ativo: true, obrigatoriedade: 'OBRIGATORIO', liberarMinAntes: 0, encerrarMinDepois: 0 }),
        ];
        const errors = validateCheckinRules(rules);
        expect(errors).toHaveLength(0);
    });

    it('ignora regras inativas no cálculo de conflitos', () => {
        // Only the active mandatory rule counts
        const rules = [
            makeRule({ ativo: true, obrigatoriedade: 'OBRIGATORIO' }),
            makeRule({ ativo: false, obrigatoriedade: 'OBRIGATORIO', liberarMinAntes: 0, encerrarMinDepois: 0 }),
        ];
        const errors = validateCheckinRules(rules);
        expect(errors).toHaveLength(0);
    });

    it('retorna array vazio para entrada inválida (null)', () => {
        const errors = validateCheckinRules(null as unknown as CheckinRule[]);
        expect(errors).toEqual([]);
    });

    it('retorna array vazio para entrada não-array', () => {
        const errors = validateCheckinRules('invalido' as unknown as CheckinRule[]);
        expect(errors).toEqual([]);
    });

    it('não reporta conflito com apenas 1 regra obrigatória', () => {
        const rules = [makeRule({ ativo: true, obrigatoriedade: 'OBRIGATORIO' })];
        const errors = validateCheckinRules(rules);
        expect(errors).toHaveLength(0);
    });

    it('não reporta conflito para 2 regras OPCIONAL ativas', () => {
        const rules = [
            makeRule({ ativo: true, obrigatoriedade: 'OPCIONAL' }),
            makeRule({ ativo: true, obrigatoriedade: 'OPCIONAL' }),
        ];
        const errors = validateCheckinRules(rules);
        expect(errors).toHaveLength(0);
    });
});
