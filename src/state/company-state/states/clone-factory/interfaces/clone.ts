import { Attribute, Skill } from '@shared/types';
import { CloneTemplateName } from '../types';
import { IMakeCloneParameters } from './make-clone-parameters';

export interface IClone {
  id: string;
  name: string;
  templateName: CloneTemplateName;
  experience: number;
  tier: number;
  level: number;
  autoUpgradeEnabled: boolean;
  increaseExperience(delta: number): void;
  earnExperience(delta: number): void;
  getLevelRequirements(level: number): number;
  getBaseAttributeValue(attribute: Attribute): number;
  getTotalAttributeValue(attribute: Attribute): number;
  getBaseSkillValue(skill: Skill): number;
  getTotalSkillValue(skill: Skill): number;
  recalculate(): void;
  removeAllEventListeners(): void;
  serialize(): IMakeCloneParameters;
}
