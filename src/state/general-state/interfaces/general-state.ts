import { IGeneralSerializedState } from './general-serialized-state';
import { GameSpeed } from '../types';

export interface IGeneralState {
  randomSeed: number;
  lastUpdateTime: number;
  bonusTime: number;
  gameSpeed: GameSpeed;
  changeGameSpeed(gameSpeed: GameSpeed): void;
  updateLastUpdateTime(): void;
  decreaseBonusTimeByTick(): boolean;
  startNewState(): void;
  deserialize(serializedState: IGeneralSerializedState): void;
  serialize(): IGeneralSerializedState;
  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  fireUiEvents(): void;
}
