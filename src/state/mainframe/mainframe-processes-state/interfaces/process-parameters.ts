import { IProgram } from '@state/progam-factory/interfaces/program';
import { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import { IMainframeProcessesState } from './mainframe-processes-state';

export interface IProcessParameters {
  mainframeProcessesState: IMainframeProcessesState;
  growthState: IGrowthState;
  program: IProgram;
  isActive: boolean;
  threads: number;
  currentCompletionPoints: number;
}
