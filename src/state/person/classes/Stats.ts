import { makeAutoObservable } from 'mobx';
import { IStats } from '../interfaces';

export class Stats implements IStats {
  closeCombatScore = 0;
  rangedCombatScore = 0;
  defense = 0;
  speed = 0;
  maxHp = 0;

  constructor() {
    makeAutoObservable(this);
  }
}
