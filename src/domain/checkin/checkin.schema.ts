import { z } from 'zod';

export const checkinRuleSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  ativo: z.boolean(),
  obrigatoriedade: z.enum(['OBRIGATORIO', 'OPCIONAL']),
  liberarMinAntes: z.number().min(0, 'Deve ser igual ou maior que 0').max(1440, 'Máximo 1 dia (1440 min)'),
  encerrarMinDepois: z.number().min(0, 'Deve ser igual ou maior que 0').max(1440, 'Máximo 1 dia (1440 min)'),
});

export type RuleRequired = "OBRIGATORIO" | "OPCIONAL";

export type CheckinRule = z.infer<typeof checkinRuleSchema>;
