import { ISerializeable } from '@shared/interfaces/serializable';
import { ISerializedState } from './serialized-state';

export interface IAppState extends ISerializeable<ISerializedState> {
  updateState(): void;
  fastForwardState(): boolean;
}
