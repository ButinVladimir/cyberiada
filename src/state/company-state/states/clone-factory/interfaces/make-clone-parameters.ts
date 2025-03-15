import { CloneTemplateName } from '../types';

export interface IMakeCloneParameters {
  name: string;
  templateName: CloneTemplateName;
  experience: number;
  level: number;
  quality: number;
  autoUpgradeEnabled: boolean;
}
