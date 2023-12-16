import { ITemplateRequirements, ITemplateBonusModifiers } from '@state/common';

export interface ISideJobTemplate {
  requirements: ITemplateRequirements;
  bonusModifiers: ITemplateBonusModifiers;

  baseCredibility: number;
  baseMoney: number;
  baseExp: number;
  baseTime: number;
  baseCost: number;
}
