import { ProgramName } from '@state/progam-factory/types';

export interface ISerializedProcess {
  programName: ProgramName;
  isActive: boolean;
  threads: number;
  currentCompletionPoints: number;
}
