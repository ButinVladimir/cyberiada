import { IncomeSource } from '@shared/index';

export interface IDevelopmentSerializedState {
  points: number;
  income: Record<IncomeSource, number>;
}
