import { ISnapshotable } from '@shared/index';
import { IInfluenceGrowthSnapshotState } from '../snapshot-states';

export interface IInfluenceGrowthState extends ISnapshotable<IInfluenceGrowthSnapshotState> {
  resetValues(): void;
  clearValues(): void;
  getGrowthByDistrict(districtIndex: number): number;
}
