import { ISerializeable } from '@shared/interfaces/serializable';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import { ProgramName } from '@state/progam-factory/types';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IMainframeOwnedProgramsSerializedState } from './mainframe-owned-programs-serialized-state';

export interface IMainframeOwnedProgramsState
  extends ISerializeable<IMainframeOwnedProgramsSerializedState>,
    IUIEventEmitter {
  addProgram(newProgram: IProgram): void;
  purchaseProgram(programParameters: IMakeProgramParameters): boolean;
  listOwnedPrograms(): IProgram[];
  getOwnedProgramByName(name: ProgramName): IProgram | undefined;
}
