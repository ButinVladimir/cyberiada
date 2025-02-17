import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import type {
  ICodeBaseGrowthState,
  IDevelopmentGrowthState,
  IMoneyGrowthState,
  IProgramCompletionSpeedState,
} from './interfaces';
import { IGrowthState } from './interfaces/growth-state';

@injectable()
export class GrowthState implements IGrowthState {
  private _moneyGrowthState: IMoneyGrowthState;
  private _developmentGrowthState: IDevelopmentGrowthState;
  private _codeBaseGrowthState: ICodeBaseGrowthState;
  private _programCompletionSpeedState: IProgramCompletionSpeedState;

  constructor(
    @inject(TYPES.MoneyGrowthState) _moneyGrowthState: IMoneyGrowthState,
    @inject(TYPES.DevelopmentGrowthState) _developmentGrowthState: IDevelopmentGrowthState,
    @inject(TYPES.CodeBaseGrowthState) _codeBaseGrowthState: ICodeBaseGrowthState,
    @inject(TYPES.ProgramCompletionSpeedState) _programCompletionSpeedState: IProgramCompletionSpeedState,
  ) {
    this._moneyGrowthState = _moneyGrowthState;
    this._developmentGrowthState = _developmentGrowthState;
    this._codeBaseGrowthState = _codeBaseGrowthState;
    this._programCompletionSpeedState = _programCompletionSpeedState;
  }

  get moneyGrowth(): IMoneyGrowthState {
    return this._moneyGrowthState;
  }

  get developmentGrowth(): IDevelopmentGrowthState {
    return this._developmentGrowthState;
  }

  get codeBaseGrowth(): ICodeBaseGrowthState {
    return this._codeBaseGrowthState;
  }

  get programCompletionSpeed(): IProgramCompletionSpeedState {
    return this._programCompletionSpeedState;
  }

  requestGrowthRecalculation() {
    this._moneyGrowthState.requestGrowthRecalculation();
    this._developmentGrowthState.requestGrowthRecalculation();
    this._codeBaseGrowthState.requestGrowthRecalculation();
    this._programCompletionSpeedState.requestMultiplierRecalculation();
  }

  recalculateGrowth() {
    this._moneyGrowthState.recalculateGrowth();
    this._developmentGrowthState.recalculateGrowth();
    this._codeBaseGrowthState.recalculateGrowth();
    this._programCompletionSpeedState.recalculateMultipliers();
  }
}
