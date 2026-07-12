import { Attribute, ISnapshotable, Skill } from '@shared/index';
import { IMakeCloneParameters } from './make-clone-parameters';
import { ICloneTemplate } from './clone-template';
import { ICloneSnapshot } from './clone-snapshot';

export interface IClone extends ISnapshotable<ICloneSnapshot> {
  id: string;
  name: string;
  templateName: string;
  template: ICloneTemplate;
  experience: number;
  tier: number;
  level: number;
  autoUpgradeEnabled: boolean;
  experienceMultiplier: number;
  replaceTemplate(templateName: string, tier: number, level: number): void;
  setLevel(level: number): void;
  increaseExperience(delta: number, share: boolean): void;
  getLevelRequirements(level: number): number;
  getTotalAttributeValue(attribute: Attribute): number;
  getTotalSkillValue(skill: Skill): number;
  recalculate(): void;
  removeAllEventListeners(): void;
  serialize(): IMakeCloneParameters;
}
