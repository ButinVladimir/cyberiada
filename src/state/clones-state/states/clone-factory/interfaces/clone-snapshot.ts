import { Attribute, Skill } from '@shared/index';

export interface ICloneSnapshot {
  id: string;
  name: string;
  templateName: string;
  experience: number;
  level: number;
  tier: number;
  experienceMultiplier: number;
  attributes: Record<Attribute, number>;
  skills: Record<Skill, number>;
}
