import { Quality, IActivity, IActivityRequirements } from '@state/common';
import { ISideJobTemplate } from './ISideJobTemplate';

export interface ISideJobSearch extends IActivity {
  id: string;
  templateName: string;
  template: ISideJobTemplate;
  level: number;
  quality: Quality;
  performingPersonId: string;
  
  requirements: IActivityRequirements;
  bonusModifier: number;

  credibility: number;
  money: number;
  exp: number;

  attemptsLeft: number;
  timeLeft: number;
}
