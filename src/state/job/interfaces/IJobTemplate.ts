import { IAttributes, ISkills, IPersonStats } from '@state/common';

export interface IJobTemplate {
  requirements: {
    attributes: Partial<IAttributes>;
    skills: Partial<ISkills>;
    personStats: Partial<IPersonStats>;
  }

  bonusModifiers: {
    attributes: Partial<IAttributes>;
    skills: Partial<ISkills>;
    personStats: Partial<IPersonStats>;
  }

  baseMoney: number;
  baseExp: number;
  timeToDo: number;
}
