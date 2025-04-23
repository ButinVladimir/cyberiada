import { CloneTemplateName } from '../types';

export interface IMakeCloneParameters {
  id: string;
  name: string;
  templateName: CloneTemplateName;
  experience: number;
  level: number;
  quality: number;
  autoUpgradeEnabled: boolean;
}
