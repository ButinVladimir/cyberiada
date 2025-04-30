import {
  IDistrictTierParameter,
  IDistrictSerializedParameters,
  IDistrictState,
  IDistrictParameters,
} from './interfaces';
import { DistrictTierParameter } from './parameters';

export class DistrictParameters implements IDistrictParameters {
  private _tier: IDistrictTierParameter;

  constructor(districtState: IDistrictState) {
    this._tier = new DistrictTierParameter(districtState);
  }

  get tier() {
    return this._tier;
  }

  recalculate(): void {
    this.tier.recalculate();
  }

  serialize(): IDistrictSerializedParameters {
    return {
      tier: this._tier.serialize(),
    };
  }

  deserialize(serializedParameters: IDistrictSerializedParameters): void {
    this._tier.deserialize(serializedParameters.tier);
  }
}
