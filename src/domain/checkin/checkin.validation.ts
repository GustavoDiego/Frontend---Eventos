import { CheckinRule } from './checkin.schema';

export function validateCheckinRules(rules: CheckinRule[]): string[] {
  const errors: string[] = [];
  
  // Fallback se por acaso rules não for um array válido
  if (!rules || !Array.isArray(rules)) {
    return errors;
  }

  const activeRules = rules.filter(r => r.ativo);

  if (activeRules.length === 0) {
    errors.push('Deve existir ao menos 1 regra ativa no evento.');
  }

  const mandatoryRules = activeRules.filter(r => r.obrigatoriedade === 'OBRIGATORIO');
  
  if (mandatoryRules.length > 1) {
    for (let i = 0; i < mandatoryRules.length; i++) {
      for (let j = i + 1; j < mandatoryRules.length; j++) {
        const r1 = mandatoryRules[i];
        const r2 = mandatoryRules[j];
        
        // As ranges are calculated based on Event DateTime. Let EventTime = T
        // Interval for r1: [T - r1.liberarMinAntes, T + r1.encerrarMinDepois]
        // Two intervals [a, b] and [c, d] only intersect if max(a,c) <= min(b,d)
        
        // We consider times relative to EventTime T as numeric offsets.
        // Start time = -liberarMinAntes
        // End time = +encerrarMinDepois
        
        const start1 = -r1.liberarMinAntes;
        const end1 = r1.encerrarMinDepois;
        const start2 = -r2.liberarMinAntes;
        const end2 = r2.encerrarMinDepois;
        
        const overlapStart = Math.max(start1, start2);
        const overlapEnd = Math.min(end1, end2);
        
        if (overlapStart > overlapEnd) {
          errors.push(`Conflito de janela: As regras obrigatórias "${r1.nome}" e "${r2.nome}" possuem horários de check-in que não se sobrepõem. Para que duas regras sejam simultaneamente cumpríveis, deve haver um período em que ambas estejam ativas.`);
        }
      }
    }
  }
  
  return errors;
}