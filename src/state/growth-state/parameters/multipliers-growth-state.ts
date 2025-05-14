import { inject, injectable } from 'inversify';
import { TYPES } from '@state/types';
import { IMultipliersGrowthState } from '../interfaces/parameters/multipliers-growth-state';
import type { IMultiplierGrowthState } from '../interfaces/parameters/multiplier-growth-state';

@injectable()
export class MultipliersGrowthState implements IMultipliersGrowthState {
  private _codeBaseGrowthState: IMultiplierGrowthState;
  private _computationalBaseGrowthState: IMultiplierGrowthState;
  private _rewardsGrowthState: IMultiplierGrowthState;

  constructor(
    @inject(TYPES.CodeBaseGrowthState) _codeBaseGrowthState: IMultiplierGrowthState,
    @inject(TYPES.ComputationalBaseGrowthState) _computationalBaseGrowthState: IMultiplierGrowthState,
    @inject(TYPES.RewardsGrowthState) _rewardsGrowthState: IMultiplierGrowthState,
  ) {
    this._codeBaseGrowthState = _codeBaseGrowthState;
    this._computationalBaseGrowthState = _computationalBaseGrowthState;
    this._rewardsGrowthState = _rewardsGrowthState;
  }

  get codeBase() {
    return this._codeBaseGrowthState;
  }

  get computationalBase() {
    return this._computationalBaseGrowthState;
  }

  get rewards() {
    return this._rewardsGrowthState;
  }

  resetValues() {
    this._codeBaseGrowthState.resetValues();
    this._computationalBaseGrowthState.resetValues();
    this._rewardsGrowthState.resetValues();
  }
}
