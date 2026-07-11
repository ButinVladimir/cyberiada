import { IDistrictSnapshotState } from './district-snapshot-state';

export interface ICitySnapshotState {
  districts: Record<number, IDistrictSnapshotState>;
}
