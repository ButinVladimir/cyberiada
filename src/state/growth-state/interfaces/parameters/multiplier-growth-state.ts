import { ISnapshotable } from '@shared/index';
import { IMultiplierGrowthSnapshotState } from '../snapshot-states';

export interface IMultiplierGrowthState extends ISnapshotable<IMultiplierGrowthSnapshotState> {
  growthByProgram: number;
  resetValues(): void;
  clearValues(): void;
  getGrowthByDistrict(districtIndex: number): number;
}
