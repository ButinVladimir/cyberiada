import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IGeneralSerializedState } from './general-serialized-state';
import { GameSpeed } from '../types';

export interface IGeneralState extends ISerializeable<IGeneralSerializedState>, IUIEventEmitter {
  randomSeed: number;
  lastUpdateTime: number;
  bonusTime: number;
  gameSpeed: GameSpeed;
  money: number;
  changeGameSpeed(gameSpeed: GameSpeed): void;
  updateLastUpdateTime(): void;
  decreaseBonusTimeByTick(): boolean;
  increaseMoney(moneyDelta: number): void;
  purchase(cost: number, handler: () => void): boolean;
}
