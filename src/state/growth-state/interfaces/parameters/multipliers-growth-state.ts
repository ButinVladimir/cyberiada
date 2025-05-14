import { IMultiplierGrowthState } from './multiplier-growth-state';

export interface IMultipliersGrowthState {
  codeBase: IMultiplierGrowthState;
  computationalBase: IMultiplierGrowthState;
  rewards: IMultiplierGrowthState;
  resetValues(): void;
}
