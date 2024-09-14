import { ProgramName } from '@state/progam-factory/types';
import { ISerializeable, IUIEventEmitter } from '@shared/interfaces';
import { IDevelopingProgram } from './developing-program';
import { IMainframeDevelopingProgramsSerializedState } from './mainframe-developing-programs-serialized-state';
import type { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';

export interface IMainframeDevelopingProgramsState
  extends ISerializeable<IMainframeDevelopingProgramsSerializedState>,
    IUIEventEmitter {
  listDevelopingPrograms(): ProgramName[];
  getDevelopingProgramByName(programName: ProgramName): IDevelopingProgram | undefined;
  addDevelopingProgram(parameters: IMakeProgramParameters): boolean;
  deleteDevelopingProgram(programName: ProgramName): void;
  increaseDevelopingProgramCompletion(delta: number): void;
}
