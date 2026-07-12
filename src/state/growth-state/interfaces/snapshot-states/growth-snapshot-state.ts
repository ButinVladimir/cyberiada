import { IConnectivityGrowthSnapshotState } from './connectivity-growth-snapshot-state';
import { IDevelopmentGrowthSnapshotState } from './development-growth-snapshot-state';
import { IExperienceGrowthSnapshotState } from './experience-growth-snapshot-state';
import { IInfluenceGrowthSnapshotState } from './influence-growth-snapshot-state';
import { IMoneyGrowthSnapshotState } from './money-growth-snapshot-state';
import { IMultipliersGrowthSnapshotState } from './multipliers-growth-snapshot-state';
import { IMultiplierGrowthSnapshotState } from './multiplier-growth-snapshot-state';

export interface IGrowthSnapshotState {
  money: IMoneyGrowthSnapshotState;
  development: IDevelopmentGrowthSnapshotState;
  multipliers: IMultipliersGrowthSnapshotState;
  connectivity: IConnectivityGrowthSnapshotState;
  rewards: IMultiplierGrowthSnapshotState;
  influence: IInfluenceGrowthSnapshotState;
  experience: IExperienceGrowthSnapshotState;
}
