import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IGlobalSerializedState } from './serialized-states/global-serialized-state';
import { GameSpeed } from '../types';
import { IMoneyParameter } from './money-parameter';
import { ITimeParameter } from './time-parameter';
import { ICityDevelopmentParameter } from './city-development-parameter';

export interface IGlobalState extends ISerializeable<IGlobalSerializedState>, IUIEventEmitter {
  randomSeed: number;
  gameSpeed: GameSpeed;
  money: IMoneyParameter;
  time: ITimeParameter;
  cityDevelopment: ICityDevelopmentParameter;
  recalculate(): void;
}
