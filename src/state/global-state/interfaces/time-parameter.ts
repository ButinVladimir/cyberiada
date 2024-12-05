import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { ITimeSerializedParameter } from './serialized-states/time-serialized-parameter';

export interface ITimeParameter extends ISerializeable<ITimeSerializedParameter>, IUIEventEmitter {
  lastUpdateTime: number;
  accumulatedTime: number;
  activeTime: number;
  gameTime: number;
  gameTimeTotal: number;
  updateAccumulatedTime(showNotification: boolean): void;
  updateActiveTime(): void;
  checkTimeForNextTick(): boolean;
  recalculate(): void;
}
