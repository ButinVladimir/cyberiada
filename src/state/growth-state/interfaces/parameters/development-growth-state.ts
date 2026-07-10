import { IncomeSource, ISnapshotable } from '@shared/index';
import { IDevelopmentGrowthSnapshotState } from '../snapshot-states';

export interface IDevelopmentGrowthState extends ISnapshotable<IDevelopmentGrowthSnapshotState> {
  totalGrowth: number;
  getGrowth(incomeSource: IncomeSource): number;
  resetValues(): void;
}
