import { DistrictMultipliers } from './district-multipliers';
import {
  IDistrictTierParameter,
  IDistrictSerializedParameters,
  IDistrictState,
  IDistrictParameters,
  IDistrictConnectivityParameter,
  IDistrictMultipliers,
  IDistrictSynchronizationParameter,
} from './interfaces';
import { DistrictConnectivityParameter, DistrictTierParameter, DistrictSynchronizationParameter } from './parameters';

export class DistrictParameters implements IDistrictParameters {
  private _tier: IDistrictTierParameter;

  private _connectivity: IDistrictConnectivityParameter;

  private _synchronization: IDistrictSynchronizationParameter;

  private _multipliers: IDistrictMultipliers;

  constructor(districtState: IDistrictState) {
    this._tier = new DistrictTierParameter(districtState);
    this._connectivity = new DistrictConnectivityParameter(districtState);
    this._synchronization = new DistrictSynchronizationParameter(districtState);
    this._multipliers = new DistrictMultipliers(districtState);
  }

  get tier() {
    return this._tier;
  }

  get synchronization() {
    return this._synchronization;
  }

  get connectivity() {
    return this._connectivity;
  }

  get multipliers() {
    return this._multipliers;
  }

  recalculate(): void {
    this._tier.recalculate();
    this._connectivity.recalculate();
  }

  serialize(): IDistrictSerializedParameters {
    return {
      tier: this._tier.serialize(),
      connectivtiy: this._connectivity.serialize(),
      multipliers: this._multipliers.serialize(),
    };
  }

  deserialize(serializedParameters: IDistrictSerializedParameters): void {
    this._tier.deserialize(serializedParameters.tier);
    this._connectivity.deserialize(serializedParameters.connectivtiy);
    this._multipliers.deserialize(serializedParameters.multipliers);
  }

  removeAllEventListeners(): void {
    this._tier.removeAllEventListeners();
    this._synchronization.removeAllEventListeners();
  }
}
