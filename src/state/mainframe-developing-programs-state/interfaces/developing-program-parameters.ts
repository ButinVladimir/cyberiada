import { IProgram } from '@state/progam-factory/interfaces/program';
import { IMainframeDevelopingProgramsState } from './mainframe-developing-programs-state';

export interface IDevelopingProgramParameters {
  program: IProgram;
  isActive: boolean;
  currentDevelopmentPoints: number;
  mainframeDevelopingProgramsState: IMainframeDevelopingProgramsState;
}
