import { ISerializeable, ISnapshotable, IncomeSource } from '@shared/index';
import { IDevelopmentSerializedState } from '../serialized-states';
import { IDevelopmentSnapshotState } from '../snapshot-states';

export interface IDevelopmentState
  extends ISerializeable<IDevelopmentSerializedState>, ISnapshotable<IDevelopmentSnapshotState> {
  points: number;
  level: number;
  increase(pointsDelta: number, incomeSource: IncomeSource): void;
  getIncome(incomeSource: IncomeSource): number;
  getLevelRequirements(level: number): number;
  recalculateLevel(): void;
}
