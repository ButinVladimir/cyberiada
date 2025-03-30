import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IMultiplierSerializedState } from '../serialized-states/multiplier-serialized-state';

export interface IConnectivityState extends ISerializeable<IMultiplierSerializedState>, IUIEventEmitter {
  pointsByProgram: number;
  increasePointsByProgram(pointsDelta: number): void;
}
