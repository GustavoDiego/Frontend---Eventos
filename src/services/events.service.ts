import { api } from './api/http';
import { Event } from '@/domain/events/event.schema';

function sanitizeEventPayload(
  input: unknown,
): Pick<Event, 'nome' | 'dataHora' | 'local' | 'status'> {
  const candidate = input as any;
  return {
    nome: String(candidate?.nome ?? ''),
    dataHora: String(candidate?.dataHora ?? ''),
    local: String(candidate?.local ?? ''),
    status: candidate?.status === 'ENCERRADO' ? 'ENCERRADO' : 'ATIVO',
  };
}

export const eventsService = {
  list: async (filters?: { search?: string; status?: string }): Promise<Event[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);

    const res = await api.get<any>('/eventos', { params });
    return Array.isArray(res.data) ? res.data : (res.data.items || res.data.data || []);
  },

  getById: async (id: string): Promise<Event> => {
    const res = await api.get<Event>(`/eventos/${id}`);
    return res.data;
  },

  create: async (data: any): Promise<Event> => {
    const res = await api.post<Event>('/eventos', sanitizeEventPayload(data));
    return res.data;
  },

  update: async (id: string, data: any): Promise<Event> => {
    const res = await api.put<Event>(`/eventos/${id}`, sanitizeEventPayload(data));
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/eventos/${id}`);
  },
};
