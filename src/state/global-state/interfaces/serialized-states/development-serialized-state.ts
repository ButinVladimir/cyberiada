import { IncomeSource } from '@shared/types';

export interface IDevelopmentSerializedState {
  points: number;
  income: Record<IncomeSource, number>;
}
