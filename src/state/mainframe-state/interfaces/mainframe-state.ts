import { ISerializeable, ISnapshotable } from '@shared/index';
import { IMainframeHardwareState } from '../states/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IMainframeProgramsState } from '../states/mainframe-programs-state/interfaces/mainframe-programs-state';
import { IMainframeProcessesState } from '../states/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IProgramFactory } from '../states/progam-factory/interfaces/program-factory';
import { IMainframeSerializedState } from './mainframe-serialized-state';
import { IMainframeSnapshotState } from './mainframe-snapshot-state';

export interface IMainframeState
  extends ISerializeable<IMainframeSerializedState>, ISnapshotable<IMainframeSnapshotState> {
  hardware: IMainframeHardwareState;
  programs: IMainframeProgramsState;
  processes: IMainframeProcessesState;
  programFactory: IProgramFactory;
}
