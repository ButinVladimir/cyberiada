import { ISnapshotable } from '@shared/index';
import { IExperienceGrowthSnapshotState } from '../snapshot-states';

export interface IExperienceGrowthState extends ISnapshotable<IExperienceGrowthSnapshotState> {
  resetValues(): void;
  clearValues(): void;
  getGrowthByClone(cloneId: string): number;
}
