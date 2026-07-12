import { ISnapshotable } from '@shared/index';
import { IConnectivityGrowthSnapshotState } from '../snapshot-states';

export interface IConnectivityGrowthState extends ISnapshotable<IConnectivityGrowthSnapshotState> {
  growthByProgram: number;
  resetValues(): void;
  clearValues(): void;
  getBaseGrowthByDistrict(districtIndex: number): number;
  getTotalGrowthByDistrict(districtIndex: number): number;
}
