import { makeAutoObservable } from 'mobx';
import { IPersonStats } from '../interfaces';

export class PersonStats implements IPersonStats {
  damage = 0;
  defense = 0;
  maxHp = 0;

  constructor() {
    makeAutoObservable(this);
  }
}
