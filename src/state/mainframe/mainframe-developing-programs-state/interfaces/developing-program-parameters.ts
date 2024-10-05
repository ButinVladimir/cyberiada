import { IProgram } from '@state/progam-factory/interfaces/program';
import { IProgramFactory } from '@state/progam-factory/interfaces/program-factory';

export interface IDevelopingProgramParameters {
  program: IProgram;
  isActive: boolean;
  currentDevelopmentPoints: number;
  programFactory: IProgramFactory;
}
