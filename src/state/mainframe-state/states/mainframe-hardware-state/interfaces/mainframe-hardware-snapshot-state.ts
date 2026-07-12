import { IMainframeHardwareParameterSnapshotState } from './mainframe-hardware-parameter-snapshot-state';

export interface IMainframeHardwareSnapshotState {
  performance: IMainframeHardwareParameterSnapshotState;
  cores: IMainframeHardwareParameterSnapshotState;
  ram: IMainframeHardwareParameterSnapshotState;
}
