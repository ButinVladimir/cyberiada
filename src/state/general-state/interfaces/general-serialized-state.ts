import { GameSpeed } from '../types';

export interface IGeneralSerializedState {
  randomSeed: number;
  lastUpdateTime: number;
  offlineTime: number;
  gameSpeed: GameSpeed;
  money: number;
  cityLevel: number;
  cityDevelopmentPoints: number;
}
