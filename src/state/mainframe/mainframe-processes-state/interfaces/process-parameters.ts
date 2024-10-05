import { IProgram } from '@state/progam-factory/interfaces/program';

export interface IProcessParameters {
  program: IProgram;
  isActive: boolean;
  threads: number;
  currentCompletionPoints: number;
}
