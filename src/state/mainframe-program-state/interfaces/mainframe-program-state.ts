import { ISerializeable } from '@shared/interfaces/serializable';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import { ProgramName } from '@state/progam-factory/types';
import { IMainframeProgramSerializedState } from './mainframe-program-serialized-state';

export interface IMainframeProgramState extends ISerializeable<IMainframeProgramSerializedState> {
  addProgram(programParameters: IMakeProgramParameters): void;
  listOwnedPrograms(): IProgram[];
  getOwnedProgramByName(name: ProgramName): IProgram | undefined;
}
