import { GameSpeed } from '../types';

export interface IGeneralSerializedState {
  randomSeed: number;
  lastUpdateTime: number;
  bonusTime: number;
  gameSpeed: GameSpeed;
}
