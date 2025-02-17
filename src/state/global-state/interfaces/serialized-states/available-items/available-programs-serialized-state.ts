import { ProgramName } from '@state/progam-factory/types';

export interface IAvailableProgramsSerializedState {
  loanedProgramQuality: number;
  loanedPrograms: ProgramName[];
}
