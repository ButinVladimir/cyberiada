import { makeObservable, observable } from 'mobx';
import { IStats } from '../interfaces';

export class Stats implements IStats {
  meleeScore = 0;
  rangedScore = 0;
  defense = 0;
  speed = 0;
  driving = 0;
  maxHp = 0;

  constructor() {
    makeObservable(this, {
      meleeScore: observable,
      rangedScore: observable,
      defense: observable,
      speed: observable,
      driving: observable,
      maxHp: observable,
    });
  }
}