import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { ITimeSerializedState } from '../serialized-states/time-serialized-state';

export interface ITimeState extends ISerializeable<ITimeSerializedState>, IUIEventEmitter {
  lastUpdateTime: number;
  accumulatedTime: number;
  activeTime: number;
  gameTime: number;
  gameTimeTotal: number;
  updateAccumulatedTime(showNotification: boolean): void;
  updateActiveTime(): void;
  checkTimeForNextTick(): boolean;
  makeNextTick(): void;
}
