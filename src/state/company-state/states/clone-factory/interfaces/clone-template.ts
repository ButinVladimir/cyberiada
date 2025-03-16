import { IExponentWithQuality } from '@shared/interfaces/exponent-with-quality';
import { IExponent } from '@shared/interfaces/exponent';
import { Attribute, Skill } from '@shared/types';

interface ICloneTemplateParameter {
  base: number;
  perLevel: number;
  qualityMultiplier: number;
}

export interface ICloneTemplate {
  cost: IExponentWithQuality;
  ram: {
    baseMultiplier: number;
    qualityMultiplier: number;
  };
  levelRequirements: IExponent;
  attributes: Record<Attribute, ICloneTemplateParameter>;
  skills: Record<Skill, ICloneTemplateParameter>;
}
