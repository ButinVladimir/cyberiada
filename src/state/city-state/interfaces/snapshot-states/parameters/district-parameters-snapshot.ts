import { IDistrictInfluenceParameterSnapshot } from './district-influence-parameter-snapshot';
import { IDistrictSynchronizationParameterSnapshot } from './district-synchronization-parameter-snapshot';
import { IDistrictConnectivityParameterSnapshot } from './district-connectivity-parameter-snapshot';
import { IDistrictRewardsParameterSnapshot } from './district-rewards-parameter-snapshot';
import { IDistrictMultipliersSnapshot } from './district-multipliers-snapshot';
import { IDistrictProcessCompletionSpeedParameterSnapshot } from './district-process-completion-speed-parameter-snapshot';
import { IDistrictExperienceShareMultiplierParameterSnapshot } from './district-experience-share-multiplier-parameter-snapshot';

export interface IDistrictParametersSnapshot {
  influence: IDistrictInfluenceParameterSnapshot;
  synchronization: IDistrictSynchronizationParameterSnapshot;
  connectivity: IDistrictConnectivityParameterSnapshot;
  rewards: IDistrictRewardsParameterSnapshot;
  multipliers: IDistrictMultipliersSnapshot;
  processCompletionSpeed: IDistrictProcessCompletionSpeedParameterSnapshot;
  experienceShareMultiplier: IDistrictExperienceShareMultiplierParameterSnapshot;
}
