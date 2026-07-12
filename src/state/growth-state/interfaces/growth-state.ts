import { ISnapshotable } from '@/shared';
import {
  IMultipliersGrowthState,
  IDevelopmentGrowthState,
  IMoneyGrowthState,
  IConnectivityGrowthState,
  IInfluenceGrowthState,
  IExperienceGrowthState,
  IRewardsGrowthState,
} from './parameters';
import { IGrowthSnapshotState } from './snapshot-states';

export interface IGrowthState extends ISnapshotable<IGrowthSnapshotState> {
  money: IMoneyGrowthState;
  development: IDevelopmentGrowthState;
  multipliers: IMultipliersGrowthState;
  connectivity: IConnectivityGrowthState;
  rewards: IRewardsGrowthState;
  influence: IInfluenceGrowthState;
  experience: IExperienceGrowthState;
  resetValues(): void;
  clearValues(): void;
}
