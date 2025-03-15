import { ISerializeable } from '@shared/interfaces/serializable';
import { IMainframeHardwareState } from '../states/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IMainframeProgramsState } from '../states/mainframe-programs-state/interfaces/mainframe-programs-state';
import { IMainframeProcessesState } from '../states/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IProgramFactory } from '../states/progam-factory/interfaces/program-factory';
import { IMainframeSerializedState } from './mainframe-serialized-state';

export interface IMainframeState extends ISerializeable<IMainframeSerializedState> {
  hardware: IMainframeHardwareState;
  programs: IMainframeProgramsState;
  processes: IMainframeProcessesState;
  programFactory: IProgramFactory;
}
