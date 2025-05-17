import { injectable, inject } from 'inversify';
import { TYPES } from '@state/types';
import type {
  IDevelopmentGrowthState,
  IMoneyGrowthState,
  IMultipliersGrowthState,
  IConnectivityGrowthState,
  IDistrictTierPointsGrowthState,
  IExperienceGrowthState,
} from './interfaces';
import { IGrowthState } from './interfaces/growth-state';

@injectable()
export class GrowthState implements IGrowthState {
  private _moneyGrowthState: IMoneyGrowthState;
  private _developmentGrowthState: IDevelopmentGrowthState;
  private _multipliersGrowthState: IMultipliersGrowthState;
  private _connectivityGrowthState: IConnectivityGrowthState;
  private _districtTierPointsGrowthState: IDistrictTierPointsGrowthState;
  private _experienceGrowthState: IExperienceGrowthState;

  constructor(
    @inject(TYPES.MoneyGrowthState) _moneyGrowthState: IMoneyGrowthState,
    @inject(TYPES.DevelopmentGrowthState) _developmentGrowthState: IDevelopmentGrowthState,
    @inject(TYPES.MultipliersGrowthState) _multipliersGrowthState: IMultipliersGrowthState,
    @inject(TYPES.ConnectivityGrowthState) _connectivityGrowthState: IConnectivityGrowthState,
    @inject(TYPES.DistrictTierPointsGrowthState) _districtTierPointsGrowthState: IDistrictTierPointsGrowthState,
    @inject(TYPES.ExperienceGrowthState) _experienceGrowthState: IExperienceGrowthState,
  ) {
    this._moneyGrowthState = _moneyGrowthState;
    this._developmentGrowthState = _developmentGrowthState;
    this._multipliersGrowthState = _multipliersGrowthState;
    this._connectivityGrowthState = _connectivityGrowthState;
    this._districtTierPointsGrowthState = _districtTierPointsGrowthState;
    this._experienceGrowthState = _experienceGrowthState;
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

  get connectivity(): IConnectivityGrowthState {
    return this._connectivityGrowthState;
  }

  get districtTierPoints(): IDistrictTierPointsGrowthState {
    return this._districtTierPointsGrowthState;
  }

  get experience(): IExperienceGrowthState {
    return this._experienceGrowthState;
  }

  clearValues() {
    this._multipliersGrowthState.clearValues();
    this._connectivityGrowthState.clearValues();
    this._districtTierPointsGrowthState.clearValues();
    this._experienceGrowthState.clearValues();
  }

  resetValues() {
    this._moneyGrowthState.resetValues();
    this._developmentGrowthState.resetValues();
    this._multipliersGrowthState.resetValues();
    this._connectivityGrowthState.resetValues();
    this._districtTierPointsGrowthState.resetValues();
    this._experienceGrowthState.resetValues();
  }
}
