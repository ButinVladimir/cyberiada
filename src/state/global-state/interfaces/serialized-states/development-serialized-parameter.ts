import { IncomeSource } from '@shared/types';

export interface IDevelopmentSerializedParameter {
  points: number;
  income: Record<IncomeSource, number>;
}
