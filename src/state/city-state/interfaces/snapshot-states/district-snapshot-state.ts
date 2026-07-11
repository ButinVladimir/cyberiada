import { DistrictUnlockState } from '../../types';
import { IDistrictParametersSnapshot } from './parameters';
import { IDistrictCountersSnapshotState } from './counters';

export interface IDistrictSnapshotState {
  name: string;
  districtType: string;
  state: DistrictUnlockState;
  parameters: IDistrictParametersSnapshot;
  counters: IDistrictCountersSnapshotState;
}
