import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IAvailableProgramsSerializedState } from '../../serialized-states/available-items/available-programs-serialized-state';
import { ProgramName } from '@state/progam-factory/types';

export interface IAvailableProgramsState extends ISerializeable<IAvailableProgramsSerializedState>, IUIEventEmitter {
  loanedProgramQuality: number;
  listAvailablePrograms(): ProgramName[];
  isProgramAvailable(programName: ProgramName, quality: number, level: number): boolean;
  getProgramHighestAvailableQuality(programName: ProgramName): number;
}
