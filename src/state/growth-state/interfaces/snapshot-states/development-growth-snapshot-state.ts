import { IncomeSource } from '@shared/index';

export interface IDevelopmentGrowthSnapshotState {
  totalGrowth: number;
  growths: Record<IncomeSource, number>;
}
