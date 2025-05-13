import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import type {
  IDevelopmentGrowthState,
  IMoneyGrowthState,
  IProgramCompletionSpeedState,
  IMultipliersGrowthState,
} from './interfaces';
import { IGrowthState } from './interfaces/growth-state';

@injectable()
export class GrowthState implements IGrowthState {
  private _moneyGrowthState: IMoneyGrowthState;
  private _developmentGrowthState: IDevelopmentGrowthState;
  private _multipliersGrowthState: IMultipliersGrowthState;
  private _programCompletionSpeedState: IProgramCompletionSpeedState;

  constructor(
    @inject(TYPES.MoneyGrowthState) _moneyGrowthState: IMoneyGrowthState,
    @inject(TYPES.DevelopmentGrowthState) _developmentGrowthState: IDevelopmentGrowthState,
    @inject(TYPES.MultipliersGrowthState) _multipliersGrowthState: IMultipliersGrowthState,
    @inject(TYPES.ProgramCompletionSpeedState) _programCompletionSpeedState: IProgramCompletionSpeedState,
  ) {
    this._moneyGrowthState = _moneyGrowthState;
    this._developmentGrowthState = _developmentGrowthState;
    this._multipliersGrowthState = _multipliersGrowthState;
    this._programCompletionSpeedState = _programCompletionSpeedState;
  }

  get money(): IMoneyGrowthState {
    return this._moneyGrowthState;
  }

  get development(): IDevelopmentGrowthState {
    return this._developmentGrowthState;
  }

  get multipliers(): IMultipliersGrowthState {
    return this._multipliersGrowthState;
  }

  get programCompletionSpeed(): IProgramCompletionSpeedState {
    return this._programCompletionSpeedState;
  }

  recalculateGrowth() {
    this._programCompletionSpeedState.recalculateMultipliers();
    this._multipliersGrowthState.recalculateGrowth();
  }

  resetValues() {
    this._moneyGrowthState.resetValues();
    this._developmentGrowthState.resetValues();
  }
}
