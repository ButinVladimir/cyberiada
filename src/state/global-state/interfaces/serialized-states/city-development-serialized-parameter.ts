import { IncomeSource } from '@shared/types';

export interface ICityDevelopmentSerializedParameter {
  points: number;
  income: Record<IncomeSource, number>;
}
