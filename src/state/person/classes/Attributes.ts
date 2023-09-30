import { makeObservable, observable } from 'mobx';
import { IAttributes } from '../interfaces';

export class Attributes implements IAttributes {
  strength = 0;
  endurance = 0;
  agility = 0;
  perception = 0;
  intellect = 0;
  charisma = 0;

  constructor() {
    makeObservable(this, {
      strength: observable,
      endurance: observable,
      agility: observable,
      perception: observable,
      intellect: observable,
      charisma: observable,
    });
  }
}