import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { Feature } from '@shared/types';
import { ProgramName } from '../types';
import { IMakeProgramParameters } from './make-program-parameters';
import { ICompletionTimeParameters } from './completion-time-parameters';

export interface IProgram extends IUIEventEmitter {
  name: ProgramName;
  level: number;
  quality: number;
  completionPoints: number;
  isRepeatable: boolean;
  isAutoscalable: boolean;
  cost: number;
  ram: number;
  cores: number;
  autoUpgradeEnabled: boolean;
  unlockFeatures: Feature[];
  upgrade(newProgram: IProgram): void;
  removeEventListeners(): void;
  perform(threads: number, usedRam: number): void;
  calculateCompletionDelta(threads: number, usedCores: number, passedTime: number): number;
  calculateCompletionTime(threads: number, usedCores: number): number;
  serialize(): IMakeProgramParameters;
  buildCostParametersObject(): object;
  buildRequirementsParametersObject(threads: number): object;
  buildProgramDescriptionParametersObject(threads: number, usedRam: number): object;
  buildProcessDescriptionParametersObject(threads: number, usedCores: number, usedRam: number): object;
  buildCompletionTimeParametersObject(threads: number): ICompletionTimeParameters;
}
