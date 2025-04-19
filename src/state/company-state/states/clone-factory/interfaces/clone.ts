import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { Attribute, Skill } from '@shared/types';
import { CloneTemplateName } from '../types';
import { IMakeCloneParameters } from './make-clone-parameters';

export interface IClone extends IUIEventEmitter {
  id: string;
  name: string;
  templateName: CloneTemplateName;
  experience: number;
  level: number;
  quality: number;
  cost: number;
  synchonization: number;
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
