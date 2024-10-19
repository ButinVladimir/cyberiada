import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ProgramName } from '../types';
import { IMakeProgramParameters } from './make-program-parameters';

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
  update(newProgram: IProgram): void;
  removeEventListeners(): void;
  perform(threads: number, usedRam: number): void;
  serialize(): IMakeProgramParameters;
  buildCostParametersObject(): object;
  buildRequirementsParametersObject(threads: number): object;
  buildDescriptionParametersObject(threads: number, usedRam: number): object;
}
