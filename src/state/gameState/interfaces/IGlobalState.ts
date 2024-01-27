import { GameSpeedState } from '@state/common';

export interface IGlobalState {
  money: number;
  credibility: number;
  bonusTime: number;
  gameSpeedState: GameSpeedState;
  level: number;
}
