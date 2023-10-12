import { IPerson } from '../interfaces';
import { EXP_REQUIREMENT_BASE, EXP_REQUIREMENT_FACTOR } from '../constants';
import { Attributes } from './Attributes';
import { Skills } from './Skills';
import { Stats } from './Stats'; 

export class Person implements IPerson {
  id = '';
  name = '';
  exp = 0;
  level = 0;
  hp = 0;
  loyalty = 0;
  attributePoints = 0;
  skillPoints = 0;

  attributes = new Attributes();
  skills = new Skills();
  stats = new Stats();

  calculateExpToLevelUp = (levelUps: number) => {
    return (2 * EXP_REQUIREMENT_BASE + (2 * this.level + levelUps - 1) * EXP_REQUIREMENT_FACTOR) * levelUps / 2;    
  };

  calculateLevelUpsFromExp = () => {
    let levelUps = 0;
    let step = 1;
  
    while (step > 0) {
      const nextLevelUps = levelUps + step;
      const nextExp = this.calculateExpToLevelUp(nextLevelUps);
  
      if (nextExp > this.exp) {
        step = Math.floor(step / 2);
      } else {
        levelUps = nextLevelUps;
        step *= 2;
      }
    }
  
    return levelUps;  
  };
}
