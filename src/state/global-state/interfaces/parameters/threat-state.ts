import { ISerializeable, ISnapshotable } from '@shared/index';
import { IThreatSerializedState } from '../serialized-states';
import { IThreatSnapshotState } from '../snapshot-states';

export interface IThreatState extends ISerializeable<IThreatSerializedState>, ISnapshotable<IThreatSnapshotState> {
  notoriety: number;
  level: number;
}
