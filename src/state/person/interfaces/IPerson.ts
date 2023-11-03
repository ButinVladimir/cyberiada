import { IAttributes, ISkills, IPersonStats } from '@state/common';

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
  personStats: IPersonStats;

  calculateExpToLevelUp(levelUps: number): number;
  calculateLevelUpsFromExp(): number;
  update(person: IPerson): void;
}
