import { IAttributes } from './IAttributes';
import { ISkills } from './ISkills';
import { IPersonStats } from './IPersonStats';

export interface ITemplateBonusModifiers {
  attributes: Partial<IAttributes>;
  skills: Partial<ISkills>;
  personStats: Partial<IPersonStats>;
}
