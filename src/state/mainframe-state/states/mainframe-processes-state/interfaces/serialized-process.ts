import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export interface ISerializedProcess {
  programName: ProgramName;
  isActive: boolean;
  threads: number;
  currentCompletionPoints: number;
}
