import { ISnapshotState } from '@state/app-state';

export interface ISnapshot {
  timestamp: number;
  state: ISnapshotState;
}
