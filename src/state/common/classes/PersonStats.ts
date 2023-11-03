import { makeAutoObservable } from 'mobx';
import { IPersonStats } from '../interfaces';

export class PersonStats implements IPersonStats {
  closeCombatScore = 0;
  rangedCombatScore = 0;
  defense = 0;
  maxHp = 0;

  constructor() {
    makeAutoObservable(this);
  }
}
