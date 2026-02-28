import axios, { AxiosError } from 'axios';
import { storage } from '@/utils/storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // Check if the backend is wrapping the response in the standard pattern
    if (response.data && response.data.statusCode && response.data.data !== undefined) {
      response.data = response.data.data;
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      storage.clearToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
