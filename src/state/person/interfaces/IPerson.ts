import { IAttributes } from './IAttributes';
import { ISkills } from './ISkills';
import { IStats } from './IStats';

export interface IPerson {
  id: string;
  name: string;
  exp: number;
  level: number;
  hp: number;
  loyalty: number;
  attributePoints: number;
  skillPoints: number;
  attributes: IAttributes;
  skills: ISkills;
  stats: IStats;

  calculateExpToLevelUp(levelUps: number): number;
  calculateLevelUpsFromExp(): number;
}
