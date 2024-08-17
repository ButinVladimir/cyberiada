import { ProgramName } from '@state/progam-factory/types';

export interface ISerializedProcess {
  id: string;
  programName: ProgramName;
  isActive: boolean;
  currentCompletionPoints: number;
}
