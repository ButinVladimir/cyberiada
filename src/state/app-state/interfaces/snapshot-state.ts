import { IGlobalSnapshotState } from '@state/global-state';
import { IMainframeSnapshotState } from '@state/mainframe-state';

export interface ISnapshotState {
  global: IGlobalSnapshotState;
  mainframe: IMainframeSnapshotState;
}
