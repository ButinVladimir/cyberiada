import { IAttributes } from './IAttributes';
import { ISkills } from './ISkills';
import { IPersonStats } from './IPersonStats';

export interface IActivityRequirements {
  attributes: IAttributes;
  skills: ISkills;
  personStats: IPersonStats;
  credibility: number;
}
