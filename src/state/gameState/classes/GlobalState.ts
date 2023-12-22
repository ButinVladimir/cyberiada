import { makeAutoObservable } from 'mobx';
import { IGlobalState } from '../interfaces';
import { GameSpeedState } from '@state/common';

export class GlobalState implements IGlobalState {
  money = 0;
  credibility = 0;
  bonusTime = 0;
  gameSpeedState: GameSpeedState = 'withoutBonusTime';
  level = 1;

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

  changeLevel = (newLevel: number): void => {
    this.level = newLevel;
  };
}
