import { IMultiplierGrowthState } from './multiplier-growth-state';

export interface IMultipliersGrowthState {
  codeBase: IMultiplierGrowthState;
  computationalBase: IMultiplierGrowthState;
  connectivity: IMultiplierGrowthState;
  rewards: IMultiplierGrowthState;
  recalculateGrowth(): void;
}
