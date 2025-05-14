import {
  IMultipliersGrowthState,
  IDevelopmentGrowthState,
  IMoneyGrowthState,
  IProgramCompletionSpeedState,
  IConnectivityGrowthState,
} from './parameters';

export interface IGrowthState {
  money: IMoneyGrowthState;
  development: IDevelopmentGrowthState;
  multipliers: IMultipliersGrowthState;
  connectivity: IConnectivityGrowthState;
  programCompletionSpeed: IProgramCompletionSpeedState;
  resetValues(): void;
  recalculateGrowth(): void;
}
