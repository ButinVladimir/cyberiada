import { IGrowthSnapshotState } from '@state/growth-state';
import { IGlobalSnapshotState } from '@state/global-state';
import { IMainframeSnapshotState } from '@state/mainframe-state';
import { IClonesSnapshotState } from '@state/clones-state';
import { ICitySnapshotState } from '@state/city-state';

export interface ISnapshotState {
  global: IGlobalSnapshotState;
  growth: IGrowthSnapshotState;
  city: ICitySnapshotState;
  mainframe: IMainframeSnapshotState;
  clones: IClonesSnapshotState;
}
