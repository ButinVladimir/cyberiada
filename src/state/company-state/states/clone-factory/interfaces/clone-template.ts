import { IExponent, ITierExponent, ITierLinear } from '@shared/interfaces/formulas';
import { Attribute, Skill } from '@shared/types';

export interface ICloneTemplate {
  cost: ITierExponent;
  synchronization: {
    multiplier: number;
    baseTier: number;
  };
  experienceMultiplier: ITierLinear;
  levelRequirements: IExponent;
  attributes: Record<Attribute, ITierLinear>;
  skills: Record<Skill, ITierLinear>;
}
