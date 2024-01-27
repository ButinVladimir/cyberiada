import { IAttributes } from './IAttributes';
import { ISkills } from './ISkills';
import { IPersonStats } from './IPersonStats';

export interface ITemplateRequirements {
  attributes: Partial<IAttributes>;
  skills: Partial<ISkills>;
  personStats: Partial<IPersonStats>;
  credibility: number;
}
