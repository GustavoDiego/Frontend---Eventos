import { describe, it, expect } from 'vitest';
import { checkinReducer, CheckinState } from '@/state/checkin.reducer';
import type { CheckinRule } from '@/domain/checkin/checkin.schema';

const makeRule = (overrides: Partial<CheckinRule> = {}): CheckinRule => ({
    id: crypto.randomUUID(),
    nome: 'Regra Teste',
    ativo: true,
    obrigatoriedade: 'OBRIGATORIO',
    liberarMinAntes: 30,
    encerrarMinDepois: 30,
    ...overrides,
});

const initialState: CheckinState = {
    rules: [],
    initialRules: [],
    validationErrors: [],
    isDirty: false,
};

describe('checkinReducer', () => {
    describe('LOAD_SUCCESS', () => {
        it('carrega regras e reseta o estado sujo', () => {
            const rules = [makeRule(), makeRule()];
            const state = checkinReducer({ ...initialState, isDirty: true }, {
                type: 'LOAD_SUCCESS',
                payload: rules,
            });
            expect(state.rules).toEqual(rules);
            expect(state.initialRules).toEqual(rules);
            expect(state.isDirty).toBe(false);
            expect(state.validationErrors).toEqual([]);
        });

        it('limpa erros de validação anteriores ao carregar', () => {
            const state = checkinReducer(
                { ...initialState, validationErrors: ['Erro anterior'] },
                { type: 'LOAD_SUCCESS', payload: [] }
            );
            expect(state.validationErrors).toEqual([]);
        });
    });

    describe('ADD_RULE', () => {
        it('adiciona uma nova regra ao estado', () => {
            const rule = makeRule({ nome: 'Nova Regra' });
            const state = checkinReducer(initialState, { type: 'ADD_RULE', payload: rule });
            expect(state.rules).toHaveLength(1);
            expect(state.rules[0]).toEqual(rule);
        });

        it('marca estado como sujo ao adicionar regra', () => {
            const state = checkinReducer(initialState, { type: 'ADD_RULE', payload: makeRule() });
            expect(state.isDirty).toBe(true);
        });

        it('preserva regras existentes ao adicionar nova', () => {
            const ruleA = makeRule({ nome: 'Regra A' });
            const ruleB = makeRule({ nome: 'Regra B' });
            const stateWithA = checkinReducer(initialState, { type: 'ADD_RULE', payload: ruleA });
            const stateWithB = checkinReducer(stateWithA, { type: 'ADD_RULE', payload: ruleB });
            expect(stateWithB.rules).toHaveLength(2);
            expect(stateWithB.rules[0]).toEqual(ruleA);
            expect(stateWithB.rules[1]).toEqual(ruleB);
        });
    });

    describe('UPDATE_RULE', () => {
        it('atualiza uma regra existente pelo id', () => {
            const rule = makeRule({ nome: 'Original' });
            const stateWithRule = checkinReducer(initialState, { type: 'ADD_RULE', payload: rule });
            const updated = { ...rule, nome: 'Atualizada' };
            const state = checkinReducer(stateWithRule, { type: 'UPDATE_RULE', payload: updated });
            expect(state.rules[0].nome).toBe('Atualizada');
        });

        it('marca estado como sujo ao atualizar', () => {
            const rule = makeRule();
            const stateWithRule = checkinReducer(initialState, { type: 'ADD_RULE', payload: rule });
            const state = checkinReducer(
                { ...stateWithRule, isDirty: false },
                { type: 'UPDATE_RULE', payload: { ...rule, nome: 'Modificada' } }
            );
            expect(state.isDirty).toBe(true);
        });

        it('não altera outras regras ao atualizar uma', () => {
            const ruleA = makeRule({ nome: 'A' });
            const ruleB = makeRule({ nome: 'B' });
            let state = checkinReducer(initialState, { type: 'ADD_RULE', payload: ruleA });
            state = checkinReducer(state, { type: 'ADD_RULE', payload: ruleB });
            state = checkinReducer(state, { type: 'UPDATE_RULE', payload: { ...ruleA, nome: 'A Modificada' } });
            expect(state.rules.find(r => r.id === ruleB.id)?.nome).toBe('B');
        });
    });

    describe('REMOVE_RULE', () => {
        it('remove regra pelo id', () => {
            const rule = makeRule();
            const stateWithRule = checkinReducer(initialState, { type: 'ADD_RULE', payload: rule });
            const state = checkinReducer(stateWithRule, { type: 'REMOVE_RULE', payload: rule.id });
            expect(state.rules).toHaveLength(0);
        });

        it('marca estado como sujo ao remover', () => {
            const rule = makeRule();
            const stateWithRule = checkinReducer(initialState, { type: 'ADD_RULE', payload: rule });
            const state = checkinReducer(
                { ...stateWithRule, isDirty: false },
                { type: 'REMOVE_RULE', payload: rule.id }
            );
            expect(state.isDirty).toBe(true);
        });

        it('preserva outras regras ao remover uma', () => {
            const ruleA = makeRule({ nome: 'A' });
            const ruleB = makeRule({ nome: 'B' });
            let state = checkinReducer(initialState, { type: 'ADD_RULE', payload: ruleA });
            state = checkinReducer(state, { type: 'ADD_RULE', payload: ruleB });
            state = checkinReducer(state, { type: 'REMOVE_RULE', payload: ruleA.id });
            expect(state.rules).toHaveLength(1);
            expect(state.rules[0]).toEqual(ruleB);
        });
    });

    describe('TOGGLE_ACTIVE', () => {
        it('alterna ativo de true para false', () => {
            const rule = makeRule({ ativo: true });
            const stateWithRule = checkinReducer(initialState, { type: 'ADD_RULE', payload: rule });
            const state = checkinReducer(stateWithRule, { type: 'TOGGLE_ACTIVE', payload: rule.id });
            expect(state.rules[0].ativo).toBe(false);
        });

        it('alterna ativo de false para true', () => {
            const rule = makeRule({ ativo: false });
            const stateWithRule = checkinReducer(initialState, { type: 'ADD_RULE', payload: rule });
            const state = checkinReducer(stateWithRule, { type: 'TOGGLE_ACTIVE', payload: rule.id });
            expect(state.rules[0].ativo).toBe(true);
        });

        it('marca estado como sujo ao alternar', () => {
            const rule = makeRule();
            const stateWithRule = checkinReducer(initialState, { type: 'ADD_RULE', payload: rule });
            const state = checkinReducer(
                { ...stateWithRule, isDirty: false },
                { type: 'TOGGLE_ACTIVE', payload: rule.id }
            );
            expect(state.isDirty).toBe(true);
        });
    });

    describe('RESET_CHANGES', () => {
        it('reverte regras para initialRules', () => {
            const original = [makeRule({ nome: 'Original' })];
            let state: CheckinState = { ...initialState, rules: original, initialRules: original };
            const modified = { ...original[0], nome: 'Modificada' };
            state = checkinReducer(state, { type: 'UPDATE_RULE', payload: modified });
            expect(state.rules[0].nome).toBe('Modificada');
            state = checkinReducer(state, { type: 'RESET_CHANGES' });
            expect(state.rules[0].nome).toBe('Original');
        });

        it('redefine isDirty para false', () => {
            const state = checkinReducer({ ...initialState, isDirty: true }, { type: 'RESET_CHANGES' });
            expect(state.isDirty).toBe(false);
        });

        it('limpa erros de validação', () => {
            const state = checkinReducer(
                { ...initialState, validationErrors: ['Erro X'] },
                { type: 'RESET_CHANGES' }
            );
            expect(state.validationErrors).toEqual([]);
        });
    });

    describe('VALIDATE', () => {
        it('retorna erros quando não há regras ativas', () => {
            const rule = makeRule({ ativo: false });
            const state: CheckinState = { ...initialState, rules: [rule] };
            const newState = checkinReducer(state, { type: 'VALIDATE' });
            expect(newState.validationErrors.length).toBeGreaterThan(0);
        });

        it('retorna sem erros quando há regras ativas válidas', () => {
            const rule = makeRule({ ativo: true });
            const state: CheckinState = { ...initialState, rules: [rule] };
            const newState = checkinReducer(state, { type: 'VALIDATE' });
            expect(newState.validationErrors).toHaveLength(0);
        });

        it('não modifica as regras ao validar', () => {
            const rule = makeRule();
            const state: CheckinState = { ...initialState, rules: [rule] };
            const newState = checkinReducer(state, { type: 'VALIDATE' });
            expect(newState.rules).toEqual([rule]);
        });
    });

    describe('SET_DIRTY', () => {
        it('define isDirty como true', () => {
            const state = checkinReducer(initialState, { type: 'SET_DIRTY', payload: true });
            expect(state.isDirty).toBe(true);
        });

        it('define isDirty como false', () => {
            const state = checkinReducer({ ...initialState, isDirty: true }, { type: 'SET_DIRTY', payload: false });
            expect(state.isDirty).toBe(false);
        });
    });

    describe('ação desconhecida', () => {
        it('retorna estado inalterado para ação desconhecida', () => {
            const state = checkinReducer(initialState, { type: 'UNKNOWN' } as never);
            expect(state).toEqual(initialState);
        });
    });
});
