import { IAttributes, ISkills, IPersonStats, Quality } from '@state/common';
import { IJobTemplate } from './IJobTemplate';

export interface IJob {
  id: string;
  templateName: string;
  template: IJobTemplate | null;
  level: number;
  quality: Quality;
  
  requirements: {
    attributes: IAttributes;
    skills: ISkills;
    personStats: IPersonStats;
  }
  bonusModifiers: {
    attributes: IAttributes;
    skills: ISkills;
    personStats: IPersonStats;
  }

  money: number;
  exp: number;
  timeAvailable: number;
  timeToDo: number;

  sectionsOpened: {
    requirements: boolean;
    bonusModifiers: boolean;
  }

  toggleRequirements(): void;
  toggleBonusModifiers(): void;
}
