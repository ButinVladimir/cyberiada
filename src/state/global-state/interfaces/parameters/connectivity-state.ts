import { ISerializeable, ISnapshotable } from '@shared/index';
import { IConnectivitySerializedState } from '../serialized-states';
import { IConnectivitySnapshotState } from '../snapshot-states';

export interface IConnectivityState
  extends ISerializeable<IConnectivitySerializedState>, ISnapshotable<IConnectivitySnapshotState> {
  pointsByProgram: number;
  increasePointsByProgram(pointsDelta: number): void;
}
