import { DistrictBaseMultiplierParameter } from './district-base-multiplier-parameter';

export class DistrictRewardsParameter extends DistrictBaseMultiplierParameter {
  getMultiplierParameters() {
    const districtTypeInfo = this._district.template;

    return districtTypeInfo.parameters.rewards;
  }
}
