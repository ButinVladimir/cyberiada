import { ISerializeable } from '@shared/interfaces/serializable';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { IMakeProgramParameters } from '@state/progam-factory/interfaces/make-program-parameters';
import { ProgramName } from '@state/progam-factory/types';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IMainframeProgramsSerializedState } from './mainframe-programs-serialized-state';

export interface IMainframeProgramsState extends ISerializeable<IMainframeProgramsSerializedState>, IUIEventEmitter {
  purchaseProgram(programParameters: IMakeProgramParameters): boolean;
  listOwnedPrograms(): IProgram[];
  getOwnedProgramByName(name: ProgramName): IProgram | undefined;
  toggleProgramsAutoUpgrade(active: boolean): void;
  requestUiUpdate(): void;
}
