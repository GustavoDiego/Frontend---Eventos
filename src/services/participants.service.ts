import { api } from './api/http';
import { Participant } from '@/domain/participants/participant.schema';

export const participantsService = {
  list: async (filters?: {
    search?: string;
    eventoId?: string;
    checkin?: string;
  }): Promise<Participant[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.eventoId) params.append('eventoId', filters.eventoId);
    if (filters?.checkin) params.append('checkin', filters.checkin);

    const res = await api.get<any>('/participantes', { params });
    return Array.isArray(res.data) ? res.data : (res.data.items || res.data.data || []);
  },

  getById: async (id: string): Promise<Participant> => {
    const res = await api.get<Participant>(`/participantes/${id}`);
    return res.data;
  },

  create: async (data: any): Promise<Participant> => {
    const res = await api.post<Participant>('/participantes', data);
    return res.data;
  },

  update: async (id: string, data: any): Promise<Participant> => {
    const res = await api.put<Participant>(`/participantes/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/participantes/${id}`);
  },

  transfer: async (id: string, novoEventoId: string): Promise<any> => {
    const res = await api.post(`/participantes/${id}/transferir`, { novoEventoId });
    return res.data;
  },
};
