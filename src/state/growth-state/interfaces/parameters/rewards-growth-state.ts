import { ISnapshotable } from '@shared/index';
import { IMultiplierGrowthSnapshotState } from '../snapshot-states';

export interface IRewardsGrowthState extends ISnapshotable<IMultiplierGrowthSnapshotState> {
  growthByProgram: number;
  resetValues(): void;
  clearValues(): void;
  getGrowthByDistrict(districtIndex: number): number;
}
