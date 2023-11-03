import { IAttributes, ISkills, IPersonStats } from '@state/common';

export interface IJob {
  id: string;
  templateName: string;
  requirements: {
    attributes: IAttributes;
    skills: ISkills;
    personStats: IPersonStats;
  }
  moneyModifiers: {
    attributes: IAttributes;
    skills: ISkills;
    personStats: IPersonStats;
  }
  money: number;
  exp: number;
  timeAvailable: number;
  timeToDo: number;
}
