import { IProgram } from './program';
import { IMakeProgramParameters } from './make-program-parameters';

export interface IProgramFactory {
  makeProgram(parameters: IMakeProgramParameters): IProgram;
  deleteProgram(program: IProgram): void;
  deleteAllPrograms(): void;
}
