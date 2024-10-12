import { IProgram } from '@state/progam-factory/interfaces/program';
import { IGrowthState } from '@state/growth-state/interfaces/growth-state';

export interface IProcessParameters {
  growthState: IGrowthState;
  program: IProgram;
  isActive: boolean;
  threads: number;
  currentCompletionPoints: number;
}
