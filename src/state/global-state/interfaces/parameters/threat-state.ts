import { ISerializeable } from '@shared/interfaces/serializable';
import { IThreatSerializedState } from '../serialized-states/threat-serialized-state';

export interface IThreatState extends ISerializeable<IThreatSerializedState> {
  notoriety: number;
  level: number;
}
