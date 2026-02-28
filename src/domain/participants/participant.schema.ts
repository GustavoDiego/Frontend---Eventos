import { z } from 'zod';

export const participantSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  eventoId: z.string().min(1, 'Evento é obrigatório'),
  checkin: z.enum(['FEITO', 'NAO_FEITO']).default('NAO_FEITO'),
});

export type Participant = {
  id: string;
  nome: string;
  email: string;
  eventoId: string;
  checkin: 'FEITO' | 'NAO_FEITO';
  createdAt?: string;
  updatedAt?: string;
};
