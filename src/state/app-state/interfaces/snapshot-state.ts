import { IGrowthSnapshotState } from '@state/growth-state';
import { IGlobalSnapshotState } from '@state/global-state';
import { IMainframeSnapshotState } from '@state/mainframe-state';
import { IClonesSnapshotState } from '@state/clones-state';

export interface ISnapshotState {
  global: IGlobalSnapshotState;
  growth: IGrowthSnapshotState;
  mainframe: IMainframeSnapshotState;
  clones: IClonesSnapshotState;
}
