import { Quality, IActivity, IActivityRequirements } from '@state/common';
import { ISideJobTemplate } from './ISideJobTemplate';

export interface ISideJob extends IActivity {
  templateName: string;
  template: ISideJobTemplate;
  level: number;
  quality: Quality;
  
  requirements: IActivityRequirements;
  bonusModifier: number;

  credibility: number;
  money: number;
  exp: number;

  sectionsOpened: {
    requirements: boolean;
    bonusModifiers: boolean;
  }

  toggleRequirements: () => void;
  toggleBonusModifiers: () => void;
}
