import { api } from './api/http';
import { LoginRequest, LoginResponse, RegisterRequest } from '@/domain/auth/auth.schema';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>('/auth/login', data);
    return res.data;
  },

  register: async (data: RegisterRequest): Promise<{ message: string; user: any }> => {
    const res = await api.post<{ message: string; user: any }>('/auth/register', data);
    return res.data;
  },
};
