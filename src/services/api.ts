import { api } from './api/http';
import { DashboardData, Event } from '@/domain/events/event.schema';
import { Participant } from '@/domain/participants/participant.schema';
import { CheckinRule, checkinRuleSchema } from '@/domain/checkin/checkin.schema';
import { LoginRequest, LoginResponse, RegisterRequest } from '@/domain/auth/auth.schema';

function sanitizeCheckinRule(input: unknown): CheckinRule {
  const candidate = input as any;
  // Build an explicit payload with only the backend-accepted fields.
  // This prevents sending read-only/foreign keys like eventoId/createdAt/updatedAt.
  return {
    id: String(candidate?.id ?? ''),
    nome: String(candidate?.nome ?? ''),
    ativo: Boolean(candidate?.ativo),
    obrigatoriedade: candidate?.obrigatoriedade === 'OBRIGATORIO' ? 'OBRIGATORIO' : 'OPCIONAL',
    liberarMinAntes: Number(candidate?.liberarMinAntes ?? 0),
    encerrarMinDepois: Number(candidate?.encerrarMinDepois ?? 0),
  };
}

function sanitizeEventPayload(input: unknown): Pick<Event, 'nome' | 'dataHora' | 'local' | 'status'> {
  const candidate = input as any;
  return {
    nome: String(candidate?.nome ?? ''),
    dataHora: String(candidate?.dataHora ?? ''),
    local: String(candidate?.local ?? ''),
    status: candidate?.status === 'ENCERRADO' ? 'ENCERRADO' : 'ATIVO',
  };
}

export const authService = {
  login: async (data: LoginRequest) => {
    const res = await api.post<LoginResponse>('/auth/login', data);
    return res.data;
  },
  register: async (data: RegisterRequest) => {
    const res = await api.post<{message: string, user: any}>('/auth/register', data);
    return res.data;
  },
};

export const dashboardService = {
  getDashboard: async () => {
    const res = await api.get<DashboardData>('/dashboard');
    return res.data;
  },
};

export const eventsService = {
  list: async (filters?: { search?: string; status?: string }): Promise<Event[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);
    // When dealing with paginated data directly extracted from data.data, we take its internal arrays
    const res = await api.get<any>('/eventos', { params });
    // If backend returns a paginated structure: { items: [], total: ... } then return .items or .data
    // Or if it's already unwrapped array by interceptor, return directly
    return Array.isArray(res.data) ? res.data : (res.data.items || res.data.data || []);
  },
  getById: async (id: string) => {
    const res = await api.get<Event>(`/eventos/${id}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await api.post<Event>('/eventos', sanitizeEventPayload(data));
    return res.data;
  },
  update: async (id: string, data: any) => {
    const res = await api.put<Event>(`/eventos/${id}`, sanitizeEventPayload(data));
    return res.data;
  },
  delete: async (id: string) => {
    await api.delete(`/eventos/${id}`);
  },
};

export const participantsService = {
  list: async (filters?: { search?: string; eventoId?: string; checkin?: string }): Promise<Participant[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.eventoId) params.append('eventoId', filters.eventoId);
    if (filters?.checkin) params.append('checkin', filters.checkin);
    const res = await api.get<any>('/participantes', { params });
    return Array.isArray(res.data) ? res.data : (res.data.items || res.data.data || []);
  },
  getById: async (id: string) => {
    const res = await api.get<Participant>(`/participantes/${id}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await api.post<Participant>('/participantes', data);
    return res.data;
  },
  update: async (id: string, data: any) => {
    const res = await api.put<Participant>(`/participantes/${id}`, data);
    return res.data;
  },
  delete: async (id: string) => {
    await api.delete(`/participantes/${id}`);
  },
  transfer: async (id: string, novoEventoId: string) => {
    const res = await api.post(`/participantes/${id}/transferir`, { novoEventoId });
    return res.data;
  }
};

export const checkinService = {
  getRules: async (eventoId: string): Promise<CheckinRule[]> => {
    const res = await api.get<any>(`/eventos/${eventoId}/regras-checkin`);
    const raw = Array.isArray(res.data) ? res.data : (res.data.regras || res.data.data || res.data.items || []);
    if (!Array.isArray(raw)) return [];

    // Strip any backend-provided extra fields before they hit the UI state.
    return raw
      .map(sanitizeCheckinRule)
      .map((r) => {
        const parsed = checkinRuleSchema.safeParse(r);
        return parsed.success ? parsed.data : r;
      });
  },
  updateRules: async (eventoId: string, regras: CheckinRule[]): Promise<CheckinRule[]> => {
    const sanitizedRegras = (Array.isArray(regras) ? regras : []).map(sanitizeCheckinRule);
    const res = await api.put<{ regras: CheckinRule[] }>(`/eventos/${eventoId}/regras-checkin`, { regras: sanitizedRegras });
    const updated = Array.isArray(res.data?.regras) ? res.data.regras : [];
    return updated
      .map(sanitizeCheckinRule)
      .map((r) => {
        const parsed = checkinRuleSchema.safeParse(r);
        return parsed.success ? parsed.data : r;
      });
  },
};
