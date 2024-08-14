import { ISerializeable } from '@shared/interfaces/serializable';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import { ProgramName } from '@state/progam-factory/types';
import { IMainframeSerializedState } from './mainframe-serialized-state';

export interface IMainframeState extends ISerializeable<IMainframeSerializedState> {
  performance: number;
  cores: number;
  ram: number;
  addProgram(programParameters: IMakeProgramParameters): void;
  listOwnedPrograms(): IProgram[];
  getOwnedProgramByName(name: ProgramName): IProgram | undefined;
}
