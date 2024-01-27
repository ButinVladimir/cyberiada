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
}
