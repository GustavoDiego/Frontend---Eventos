import { api } from './api/http';
import { CheckinRule, checkinRuleSchema } from '@/domain/checkin/checkin.schema';

function sanitizeCheckinRule(input: unknown): CheckinRule {
  const candidate = input as any;
  return {
    id: String(candidate?.id ?? ''),
    nome: String(candidate?.nome ?? ''),
    ativo: Boolean(candidate?.ativo),
    obrigatoriedade:
      candidate?.obrigatoriedade === 'OBRIGATORIO' ? 'OBRIGATORIO' : 'OPCIONAL',
    liberarMinAntes: Number(candidate?.liberarMinAntes ?? 0),
    encerrarMinDepois: Number(candidate?.encerrarMinDepois ?? 0),
  };
}

function parseRule(raw: unknown): CheckinRule {
  const sanitized = sanitizeCheckinRule(raw);
  const parsed = checkinRuleSchema.safeParse(sanitized);
  return parsed.success ? parsed.data : sanitized;
}

export const checkinService = {
  getRules: async (eventoId: string): Promise<CheckinRule[]> => {
    const res = await api.get<any>(`/eventos/${eventoId}/regras-checkin`);
    const raw = Array.isArray(res.data)
      ? res.data
      : (res.data.regras || res.data.data || res.data.items || []);

    if (!Array.isArray(raw)) return [];
    return raw.map(parseRule);
  },

  updateRules: async (eventoId: string, regras: CheckinRule[]): Promise<CheckinRule[]> => {
    const sanitized = (Array.isArray(regras) ? regras : []).map(sanitizeCheckinRule);
    const res = await api.put<{ regras: CheckinRule[] }>(
      `/eventos/${eventoId}/regras-checkin`,
      { regras: sanitized },
    );
    const updated = Array.isArray(res.data?.regras) ? res.data.regras : [];
    return updated.map(parseRule);
  },
};
