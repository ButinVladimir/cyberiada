import { Quality, IActivity, IActivityRequirements } from '@state/common';
import { ISideJobTemplate } from './ISideJobTemplate';

export interface ISideJob extends IActivity {
  id: string;
  templateName: string;
  template: ISideJobTemplate;
  level: number;
  quality: Quality;
  
  requirements: IActivityRequirements;
  bonusModifier: number;

  credibility: number;
  money: number;
  exp: number;
}
