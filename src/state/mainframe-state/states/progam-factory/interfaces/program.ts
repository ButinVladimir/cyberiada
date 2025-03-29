import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { Feature } from '@shared/types';
import { ProgramName } from '../types';
import { IMakeProgramParameters } from './make-program-parameters';

export interface IProgram extends IUIEventEmitter {
  name: ProgramName;
  level: number;
  quality: number;
  completionPoints: number;
  isAutoscalable: boolean;
  cost: number;
  ram: number;
  cores: number;
  autoUpgradeEnabled: boolean;
  unlockFeatures: Feature[];
  upgrade(newProgram: IProgram): void;
  removeEventListeners(): void;
  handlePerformanceUpdate(): void;
  perform(threads: number, usedRam: number): void;
  calculateCompletionDelta(threads: number, usedCores: number, passedTime: number): number;
  calculateCompletionTime(threads: number, usedCores: number): number;
  calculateCompletionMinTime(threads: number): number;
  calculateCompletionMaxTime(threads: number): number;
  serialize(): IMakeProgramParameters;
}
