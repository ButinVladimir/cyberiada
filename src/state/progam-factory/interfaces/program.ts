import { ProgramName } from '../types';
import { IMakeProgramParameters } from './make-program-parameters';

export interface IProgram {
  name: ProgramName;
  level: number;
  quality: number;
  completionPoints: number;
  developmentPoints: number;
  isRepeatable: boolean;
  isAutoscalable: boolean;
  cost: number;
  ram: number;
  cores: number;
  updateProgram(newProgram: IProgram): void;
  perform(threads: number, usedRam: number): void;
  serialize(): IMakeProgramParameters;
  buildCostParametersObject(): object;
  buildRequirementsParametersObject(threads: number): object;
  buildDescriptionParametersObject(threads: number, usedRam: number): object;
}
