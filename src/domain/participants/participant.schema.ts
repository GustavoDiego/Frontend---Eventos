import { z } from 'zod';

export const participantSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  eventoId: z.string().min(1, 'Evento é obrigatório'),
  checkin: z.enum(['FEITO', 'NAO_FEITO']).default('NAO_FEITO'),
});

export type CheckinStatus = "FEITO" | "NAO_FEITO";

export type Participant = {
  id: string;
  nome: string;
  email: string;
  eventoId: string;
  checkin: CheckinStatus;
  createdAt?: string;
  updatedAt?: string;
};
