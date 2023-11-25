import { makeAutoObservable } from 'mobx';
import { IGlobalState } from '../interfaces';
import { GameSpeedState } from '../types';

export class GlobalState implements IGlobalState {
  money = 0;
  credibility = 0;
  bonusTime = 0;
  gameSpeedState: GameSpeedState = 'withoutBonusTime';

  constructor() {
    makeAutoObservable(this);
  }

  changeMoney = (delta: number): void => {
    this.money += delta;
  };

  changeCredibility = (delta: number): void => {
    this.credibility += delta;
  };

  changeBonusTime = (delta: number): void => {
    this.bonusTime += delta;
  };

  changeGameSpeedState = (state: GameSpeedState): void => {
    this.gameSpeedState = state;
  };
}
