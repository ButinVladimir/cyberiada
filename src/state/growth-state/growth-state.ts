import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import type {
  IDevelopmentGrowthState,
  IMoneyGrowthState,
  IProgramCompletionSpeedState,
  IMultipliersGrowthState,
  IConnectivityGrowthState,
} from './interfaces';
import { IGrowthState } from './interfaces/growth-state';

@injectable()
export class GrowthState implements IGrowthState {
  private _moneyGrowthState: IMoneyGrowthState;
  private _developmentGrowthState: IDevelopmentGrowthState;
  private _multipliersGrowthState: IMultipliersGrowthState;
  private _programCompletionSpeedState: IProgramCompletionSpeedState;
  private _connectivityGrowthState: IConnectivityGrowthState;

  constructor(
    @inject(TYPES.MoneyGrowthState) _moneyGrowthState: IMoneyGrowthState,
    @inject(TYPES.DevelopmentGrowthState) _developmentGrowthState: IDevelopmentGrowthState,
    @inject(TYPES.MultipliersGrowthState) _multipliersGrowthState: IMultipliersGrowthState,
    @inject(TYPES.ProgramCompletionSpeedState) _programCompletionSpeedState: IProgramCompletionSpeedState,
    @inject(TYPES.ConnectivityGrowthState) _connectivityGrowthState: IConnectivityGrowthState,
  ) {
    this._moneyGrowthState = _moneyGrowthState;
    this._developmentGrowthState = _developmentGrowthState;
    this._multipliersGrowthState = _multipliersGrowthState;
    this._programCompletionSpeedState = _programCompletionSpeedState;
    this._connectivityGrowthState = _connectivityGrowthState;
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

  get connectivity(): IConnectivityGrowthState {
    return this._connectivityGrowthState;
  }

  recalculateGrowth() {
    this._programCompletionSpeedState.recalculateMultipliers();
  }

  resetValues() {
    this._moneyGrowthState.resetValues();
    this._developmentGrowthState.resetValues();
    this._multipliersGrowthState.resetValues();
    this._connectivityGrowthState.resetValues();
  }
}
