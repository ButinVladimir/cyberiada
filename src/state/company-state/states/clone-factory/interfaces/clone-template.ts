import { IExponent, IQualityExponent, IQualityLinear } from '@shared/interfaces/formulas';
import { Attribute, Skill } from '@shared/types';

export interface ICloneTemplate {
  cost: IQualityExponent;
  synchronization: {
    multiplier: number;
    baseQuality: number;
  };
  levelRequirements: IExponent;
  attributes: Record<Attribute, IQualityLinear>;
  skills: Record<Skill, IQualityLinear>;
}
