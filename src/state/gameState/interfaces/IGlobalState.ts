import { GameSpeedState } from '@state/common';

export interface IGlobalState {
  money: number;
  credibility: number;
  bonusTime: number;
  gameSpeedState: GameSpeedState;

  changeMoney: (delta: number) => void;
  changeCredibility: (delta: number) => void;
  changeBonusTime: (delta: number) => void;
  changeGameSpeedState: (state: GameSpeedState) => void;
}
