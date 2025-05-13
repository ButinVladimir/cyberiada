import {
  IMultipliersGrowthState,
  IDevelopmentGrowthState,
  IMoneyGrowthState,
  IProgramCompletionSpeedState,
} from './parameters';

export interface IGrowthState {
  money: IMoneyGrowthState;
  development: IDevelopmentGrowthState;
  multipliers: IMultipliersGrowthState;
  programCompletionSpeed: IProgramCompletionSpeedState;
  resetValues(): void;
  recalculateGrowth(): void;
}
