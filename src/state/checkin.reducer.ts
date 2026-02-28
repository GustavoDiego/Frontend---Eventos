import { CheckinRule } from '@/domain/checkin/checkin.schema';
import { validateCheckinRules } from '@/domain/checkin/checkin.validation';

export type CheckinState = {
  rules: CheckinRule[];
  initialRules: CheckinRule[];
  validationErrors: string[];
  isDirty: boolean;
};

export type CheckinAction = 
  | { type: 'LOAD_SUCCESS'; payload: CheckinRule[] }
  | { type: 'ADD_RULE'; payload: CheckinRule }
  | { type: 'UPDATE_RULE'; payload: CheckinRule }
  | { type: 'REMOVE_RULE'; payload: string }
  | { type: 'TOGGLE_ACTIVE'; payload: string }
  | { type: 'RESET_CHANGES' }
  | { type: 'VALIDATE' }
  | { type: 'SET_DIRTY'; payload: boolean };

export function checkinReducer(state: CheckinState, action: CheckinAction): CheckinState {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return {
        ...state,
        rules: action.payload,
        initialRules: action.payload,
        validationErrors: [],
        isDirty: false
      };
    
    case 'ADD_RULE': {
      const newRules = [...state.rules, action.payload];
      return { ...state, rules: newRules, isDirty: true };
    }

    case 'UPDATE_RULE': {
      const newRules = state.rules.map(r => r.id === action.payload.id ? action.payload : r);
      return { ...state, rules: newRules, isDirty: true };
    }

    case 'REMOVE_RULE': {
      const newRules = state.rules.filter(r => r.id !== action.payload);
      return { ...state, rules: newRules, isDirty: true };
    }

    case 'TOGGLE_ACTIVE': {
      const newRules = state.rules.map(r => r.id === action.payload ? { ...r, ativo: !r.ativo } : r);
      return { ...state, rules: newRules, isDirty: true };
    }

    case 'RESET_CHANGES': {
      return {
        ...state,
        rules: state.initialRules,
        isDirty: false,
        validationErrors: []
      };
    }

    case 'VALIDATE': {
      const errors = validateCheckinRules(state.rules);
      return { ...state, validationErrors: errors };
    }

    case 'SET_DIRTY': {
      return { ...state, isDirty: action.payload };
    }

    default:
      return state;
  }
}
