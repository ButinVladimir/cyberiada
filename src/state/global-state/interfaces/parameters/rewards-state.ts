import { ISerializeable, ISnapshotable } from '@shared/index';
import { IMultiplierSerializedState } from '../serialized-states';
import { IRewardsSnapshotState } from '../snapshot-states';

export interface IRewardsState
  extends ISerializeable<IMultiplierSerializedState>, ISnapshotable<IRewardsSnapshotState> {
  pointsByProgram: number;
  multiplierByProgram: number;
  increasePointsByProgram(pointsDelta: number): void;
  recalculateMultiplier(): void;
}
