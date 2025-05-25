import {
  IDistrictState,
  IDistrictMultipliers,
  IDistrictMultiplierParameter,
  IDistrictSerializedMultipliers,
} from './interfaces';
import { DistrictCodeBaseParameter, DistrictComputationalBaseParameter, DistrictRewardsParameter } from './parameters';

export class DistrictMultipliers implements IDistrictMultipliers {
  private _codeBase: IDistrictMultiplierParameter;
  private _computationalBase: IDistrictMultiplierParameter;
  private _rewards: IDistrictMultiplierParameter;

  constructor(districtState: IDistrictState) {
    this._codeBase = new DistrictCodeBaseParameter(districtState);
    this._computationalBase = new DistrictComputationalBaseParameter(districtState);
    this._rewards = new DistrictRewardsParameter(districtState);
  }

  get codeBase() {
    return this._codeBase;
  }

  get computationalBase() {
    return this._computationalBase;
  }

  get rewards() {
    return this._rewards;
  }

  serialize(): IDistrictSerializedMultipliers {
    return {
      codeBase: this._codeBase.serialize(),
      computationalBase: this._computationalBase.serialize(),
      rewards: this._rewards.serialize(),
    };
  }

  deserialize(serializedParameters: IDistrictSerializedMultipliers): void {
    this._codeBase.deserialize(serializedParameters.codeBase);
    this._computationalBase.deserialize(serializedParameters.computationalBase);
    this._rewards.deserialize(serializedParameters.rewards);
  }
}
