import { api } from './api/http';
import { DashboardData } from '@/domain/events/event.schema';

export const dashboardService = {
  getDashboard: async (): Promise<DashboardData> => {
    const res = await api.get<DashboardData>('/dashboard');
    return res.data;
  },
};
