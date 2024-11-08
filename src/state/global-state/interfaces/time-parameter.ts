import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ITimeSerializedParameter } from './serialized-states/time-serialized-parameter';

export interface ITimeParameter extends ISerializeable<ITimeSerializedParameter>, IUIEventEmitter {
  lastUpdateTime: number;
  accumulatedTime: number;
  gameTime: number;
  gameTimeTotal: number;
  updateLastUpdateTime(): void;
  tryNextTick(): boolean;
}
