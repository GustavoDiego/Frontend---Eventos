import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  dataHora: z.string().min(1, 'Data e hora são obrigatórios'),
  local: z.string().min(3, 'Local deve ter no mínimo 3 caracteres'),
  status: z.enum(['ATIVO', 'ENCERRADO']),
});

export type EventStatus = "ATIVO" | "ENCERRADO";

export type Event = {
  id: string;
  nome: string;
  dataHora: string;
  local: string;
  status: EventStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type DashboardData = {
  totalEventos: number;
  totalParticipantes: number;
  proximosEventos: { id: string; nome: string; dataHora: string }[];
  ultimasAtividades: { tipo: string; participante: string; evento: string; em: string }[];
};
