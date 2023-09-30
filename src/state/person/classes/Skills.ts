import { makeObservable, observable } from 'mobx';
import { ISkills } from '../interfaces';

export class Skills implements ISkills {
  meleeCombat = 0;
  rangedCombat = 0;
  stealth = 0;
  security = 0;
  infoGathering = 0;
  persuasion = 0;
  hacking = 0;
  engineering = 0;
  chemistry = 0;

  constructor() {
    makeObservable(this, {
      meleeCombat: observable,
      rangedCombat: observable,
      stealth: observable,
      security: observable,
      infoGathering: observable,
      persuasion: observable,
      hacking: observable,
      engineering: observable,
      chemistry: observable,
    });
  }
}