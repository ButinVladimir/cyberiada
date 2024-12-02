import { ProgramName } from '../types';

export interface IMakeProgramParameters {
  name: ProgramName;
  level: number;
  quality: number;
  autoUpgradeEnabled: boolean;
}
