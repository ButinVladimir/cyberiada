import {
  ICodeBaseGrowthState,
  IDevelopmentGrowthState,
  IMoneyGrowthState,
  IProgramCompletionSpeedState,
} from './parameters';

export interface IGrowthState {
  moneyGrowth: IMoneyGrowthState;
  developmentGrowth: IDevelopmentGrowthState;
  codeBaseGrowth: ICodeBaseGrowthState;
  programCompletionSpeed: IProgramCompletionSpeedState;
  requestGrowthRecalculation(): void;
  recalculateGrowth(): void;
}
