import { IncomeSource } from '@shared/types';

export interface IDevelopmentSerializedState {
  points: number;
  level: number;
  income: Record<IncomeSource, number>;
}
