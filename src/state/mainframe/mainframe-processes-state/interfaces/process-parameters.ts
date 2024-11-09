import { IProgram } from '@state/progam-factory/interfaces/program';
import { IMainframeProcessesState } from './mainframe-processes-state';

export interface IProcessParameters {
  mainframeProcessesState: IMainframeProcessesState;
  program: IProgram;
  isActive: boolean;
  threads: number;
  currentCompletionPoints: number;
}
