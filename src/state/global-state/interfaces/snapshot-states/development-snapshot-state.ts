import { IncomeSource } from '@shared/index';

export interface IDevelopmentSnapshotState {
  points: number;
  level: number;
  income: Record<IncomeSource, number>;
}
