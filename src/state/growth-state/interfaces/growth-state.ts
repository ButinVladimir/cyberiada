import {
  IMultipliersGrowthState,
  IDevelopmentGrowthState,
  IMoneyGrowthState,
  IConnectivityGrowthState,
  IDistrictTierPointsGrowthState,
  IExperienceGrowthState,
} from './parameters';

export interface IGrowthState {
  money: IMoneyGrowthState;
  development: IDevelopmentGrowthState;
  multipliers: IMultipliersGrowthState;
  connectivity: IConnectivityGrowthState;
  districtTierPoints: IDistrictTierPointsGrowthState;
  experience: IExperienceGrowthState;
  resetValues(): void;
  clearValues(): void;
}
