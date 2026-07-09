import { IMainframeHardwareSnapshotState } from '../states/mainframe-hardware-state/interfaces/mainframe-hardware-snapshot-state';
import { IMainframeProgramsSnapshotState } from '../states/mainframe-programs-state/interfaces/mainframe-programs-snapshot-state';

export interface IMainframeSnapshotState {
  hardware: IMainframeHardwareSnapshotState;
  programs: IMainframeProgramsSnapshotState;
}
