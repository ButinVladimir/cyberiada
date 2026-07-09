import { ISerializeable, ISnapshotable } from '@shared/index';
import { ISerializedState } from './serialized-state';
import { ISnapshotState } from './snapshot-state';

export interface IAppState extends ISerializeable<ISerializedState>, ISnapshotable<ISnapshotState> {
  updateState(updateTime: number): void;
  fastForwardState(updateTime: number): boolean;
  simulate(): void;
}
