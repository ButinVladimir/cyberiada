import { ISnapshotable, IncomeSource } from '@shared/index';
import { IMoneyGrowthSnapshotState } from '../snapshot-states';

export interface IMoneyGrowthState extends ISnapshotable<IMoneyGrowthSnapshotState> {
  totalGrowth: number;
  getGrowth(incomeSource: IncomeSource): number;
  resetValues(): void;
}
