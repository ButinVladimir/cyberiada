import { ISerializeable, ISnapshotable } from '@shared/index';
import { IMultiplierSerializedState } from '../serialized-states';
import { IMultiplierSnapshotState } from '../snapshot-states';

export interface IMultiplierState
  extends ISerializeable<IMultiplierSerializedState>, ISnapshotable<IMultiplierSnapshotState> {
  pointsByProgram: number;
  programMultiplier: number;
  totalMultiplier: number;
  increasePointsByProgram(pointsDelta: number): void;
  recalculateMultipliers(): void;
}
