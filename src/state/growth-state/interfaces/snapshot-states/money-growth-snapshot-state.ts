import { IncomeSource } from '@shared/index';

export interface IMoneyGrowthSnapshotState {
  totalGrowth: number;
  growths: Record<IncomeSource, number>;
}
