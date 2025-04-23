import { IMainframeHardwareSerializedState } from '../states/mainframe-hardware-state/interfaces/mainframe-hardware-serialized-state';
import { IMainframeProgramsSerializedState } from '../states/mainframe-programs-state/interfaces/mainframe-programs-serialized-state';
import { IMainframeProcessesSerializedState } from '../states/mainframe-processes-state/interfaces/mainframe-processes-serialized-state';

export interface IMainframeSerializedState {
  hardware: IMainframeHardwareSerializedState;
  programs: IMainframeProgramsSerializedState;
  processes: IMainframeProcessesSerializedState;
}
